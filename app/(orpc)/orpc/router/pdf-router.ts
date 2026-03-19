import z from "zod";
import { authMiddleware, base } from "../../procedure";
import { PDFiumLibrary } from "@hyzyla/pdfium";
import { ORPCError } from "@orpc/client";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

const checkPdfPages = base
  .route({
    method: "POST",
    path: "/pdf/checkPages",
    summary: "Check PDF pages",
  })
  .use(authMiddleware)
  .input(
    z.object({
      file: z.file().refine((f) => f.type === "application/pdf", {
        message: "File must be a PDF",
      }),
    }),
  )
  .handler(async ({ input }) => {
    const library = await PDFiumLibrary.init();
    const document = await library.loadDocument(
      Buffer.from(await input.file.arrayBuffer()),
    );
    return {
      pageCount: document.getPageCount(),
    };
  });

const createPdf = base
  .route({
    method: "POST",
    path: "/pdf/create",
    summary: "upload PDF",
  })
  .use(authMiddleware)
  .input(
    z.object({
      name: z.string().min(1),
      file: z.file().refine((e) => e.type === "application/pdf"),
      length: z.enum(["curto", "medio", "detalhado"]),
      output: z.enum(["paragrafos", "topicos", "estruturado"]),
      focus: z.enum(["geral", "tecnico", "academico", "negocios"]),
      quotes: z.boolean(),
      keywords: z.boolean(),
      language: z.enum(["pt", "en", "es"]),
    }),
  )
  .handler(async ({ context, input }) => {
    try {
      const library = await PDFiumLibrary.init();
      const document = await library.loadDocument(
        Buffer.from(await input.file.arrayBuffer()),
      );
      const pdfDb = await context.db.pdf.create({
        data: {
          focus: input.focus,
          userId: context.user.id,
          name: input.name,
          format: input.output,
          length: input.length,
          quotes: input.quotes,
          keywords: input.keywords,
          language: input.language,
          pages: document.getPageCount(),
        },
      });
      return { id: pdfDb.id };
    } catch (e) {
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Ocorreu um erro ao tentar adicionar o PDF ao banco de dados.",
      });
    }
  });

const upload = base
  .route({
    method: "POST",
    path: "/pdf/upload",
    summary: "upload PDF",
  })
  .use(authMiddleware)
  .input(
    z.object({
      pdfId: z.string().min(1),
      file: z.file().refine((e) => e.type === "application/pdf"),
    }),
  )
  .handler(async ({ context, input }) => {
    try {
      const library = await PDFiumLibrary.init();
      const document = await library.loadDocument(
        Buffer.from(await input.file.arrayBuffer()),
      );
      if (document.getPageCount() >= 20)
        throw new ORPCError("UNAUTHORIZED", {
          message: "O PDF não pode conter mais que 20 páginas.",
        });
      await context.s3.write(
        "pdfs/" + input.pdfId + "/" + input.file.name,
        Buffer.from(await input.file.arrayBuffer()),
      );
      return {
        ok: true,
      };
    } catch (e) {
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Ocorreu um erro ao tentar fazer upload do PDF.",
      });
    }
  });

const think = base
  .route({
    method: "POST",
    path: "/pdf/think",
    summary: "think PDF",
  })
  .use(authMiddleware)
  .input(
    z.object({
      pdfId: z.string().min(1),
      fileName: z.string().min(1),
    }),
  )
  .handler(async ({ context, input }) => {
    const pdf = await context.db.pdf.findUnique({
      where: { id: input.pdfId },
    });
    if (!pdf)
      throw new ORPCError("NOT_FOUND", {
        message: "PDF não encontrado no banco de dados.",
      });
    try {
      const file = await context.s3
        .file("pdfs/" + input.pdfId + "/" + input.fileName)
        .arrayBuffer();

      const { text } = await generateText({
        model: google("gemini-2.5-flash-lite"),
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `You are an expert document analysis AI specialized in extracting structured knowledge from PDFs.

Your goal is to transform the document into structured knowledge that can power an interactive knowledge webpage.

CRITICAL RULES:

The response MUST be valid JSON.

DO NOT include explanations.

DO NOT include markdown.

DO NOT include comments.

DO NOT include text before or after the JSON.

The JSON must be strictly parseable.

If information does not exist in the document, return null.

DO NOT hallucinate missing facts.

Prefer concise and accurate outputs.

GENERAL GUIDELINES:

Extract semantic meaning from the document.

Organize information logically.

Focus on educational and informational value.

Avoid redundancy.

Keep arrays reasonably sized (do not generate excessive items).

All textual outputs must be written in: ${pdf.language}

Return the result using EXACTLY the following JSON structure:
{
"document": {
"title": "string",
"author": "string | null",
"year": "number | null",
"language": "string",
"pages_estimated": "number",
"document_type": "article | research | book | report | essay | presentation | unknown"
},

"metadata": {
"main_topic": "string",
"academic_field": "string | null",
"intended_audience": "students | researchers | professionals | general | unknown"
},

"table_of_contents": [
{
"id": "section-id",
"title": "section title"
}
],

"summary": {
"short": "2–3 sentence concise summary",
"detailed": "1–3 paragraph explanation of the document"
},

"highlights": [
"important takeaway from the document",
"another key highlight"
],

"key_points": [
{
"title": "string",
"description": "string"
}
],

"sections": [
{
"id": "section-id",
"title": "Section title",
"summary": "Short explanation of the section",
"important_concepts": [
"concept",
"concept",
"concept"
]
}
],

"entities": {
"people": [
{
"name": "person name",
"role": "role or profession"
}
],
"organizations": [
{
"name": "organization name",
"type": "company | university | institution | unknown"
}
],
"technologies": [
"technology or technical concept mentioned"
]
},

"quotes": [
{
"text": "exact quote extracted from the document",
"context": "why this quote is important"
}
],

"statistics": [
{
"description": "what the statistic refers to",
"value": "number or percentage",
"context": "short explanation"
}
],

"keywords": [
"keyword",
"keyword",
"keyword"
],

"insights": [
"important insight derived from the document",
"another insight"
],

"questions_for_study": [
"question related to the document",
"another question"
],

"reading_metadata": {
"estimated_reading_time_minutes": "number",
"difficulty_level": "beginner | intermediate | advanced"
},

"confidence": {
"document_structure": "0.0 - 1.0",
"summary_accuracy": "0.0 - 1.0",
"information_completeness": "0.0 - 1.0"
}
}`,
              },
              {
                type: "file",
                data: Buffer.from(file),
                mediaType: "application/pdf",
                filename: input.fileName,
              },
            ],
          },
        ],
      });
      const aiResult = JSON.parse(text);
      await context.db.pdf.update({
        where: {
          id: input.pdfId,
        },
        data: {
          summary: {
            create: {
              id: input.pdfId,
              title: aiResult.document.title,
              author: aiResult.document.author,
              mainTopic: aiResult.metadata.main_topic,
              shortSummary: aiResult.summary.short,
              detailedSummary: aiResult.summary.detailed,
              difficultyLevel: aiResult.reading_metadata.difficulty_level,
              readingTime:
                aiResult.reading_metadata.estimated_reading_time_minutes,
              analysis: aiResult,
              userId: context.user.id,
            },
          },
        },
      });
      return { ok: true };
    } catch (e) {
      console.error(e);
      await context.db.pdf.delete({
        where: {
          id: pdf.id,
        },
      });
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message:
          "Não foi possivel gerar o resumo do pdf. Tente novamente mais tarde",
      });
    }
  });
const getPdfList = base
  .route({
    method: "POST",
    path: "/pdf/getList",
    summary: "Get PDF list",
  })
  .use(authMiddleware)
  .input(
    z.object({
      cursor: z.string().optional(),
      limit: z.number().max(8),
      search: z.string().optional(),
    }),
  )
  .handler(async ({ context, input }) => {
    const { cursor, limit } = input;
    const pdfs = await context.db.pdf.findMany({
      where: {
        userId: context.user.id,
        name: {
          contains: input.search,
          mode: "insensitive",
        },
      },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(input.search);
    let nextCursor: string | undefined = undefined;

    if (pdfs.length > limit) {
      const nextItem = pdfs.pop();
      nextCursor = nextItem!.id;
    }

    return {
      items: pdfs,
      nextCursor,
    };
  });

export const pdf = { upload, checkPdfPages, createPdf, think, getPdfList };
