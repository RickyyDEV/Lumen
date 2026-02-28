// app/icon.tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const LUMEN_YELLOW = "#facc15";
const LUMEN_GLOW = "#fbbf24"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 48 48"
          fill="none"
        >
          {/* Definição do Gradiente com cores fixas */}
          <defs>
            <linearGradient id="lumen-gradient-icon" x1="4" y1="4" x2="44" y2="44">
              <stop stopColor={LUMEN_YELLOW} />
              <stop offset="1" stopColor={LUMEN_GLOW} />
            </linearGradient>
          </defs>

          {/* Anel Externo */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="url(#lumen-gradient-icon)"
            strokeWidth="3"
            strokeOpacity="0.4"
          />
          
          {/* Círculo Central */}
          <circle
            cx="24"
            cy="24"
            r="12"
            fill="url(#lumen-gradient-icon)"
          />

          {/* Raios de Luz */}
          <path d="M24 4V10" stroke={LUMEN_YELLOW} strokeWidth="3" strokeLinecap="round" />
          <path d="M24 38V44" stroke={LUMEN_YELLOW} strokeWidth="3" strokeLinecap="round" />
          <path d="M4 24H10" stroke={LUMEN_YELLOW} strokeWidth="3" strokeLinecap="round" />
          <path d="M38 24H44" stroke={LUMEN_YELLOW} strokeWidth="3" strokeLinecap="round" />

          {/* Ponto Central de Brilho */}
          <circle cx="24" cy="24" r="4" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
