import { cn } from "@/lib/utils";

interface LumenLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon";
  className?: string;
}

const sizeMap = {
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 32, text: "text-2xl" },
  lg: { icon: 44, text: "text-4xl" },
  xl: { icon: 56, text: "text-5xl" },
};

const LumenLogo = ({ size = "md", variant = "full", className }: LumenLogoProps) => {
  const s = sizeMap[size];

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="url(#lumen-gradient)"
          strokeWidth="2.5"
          opacity="0.35"
        />
        <circle
          cx="24"
          cy="24"
          r="12"
          fill="url(#lumen-gradient)"
          opacity="0.9"
        />
        <path
          d="M24 4V10"
          stroke="url(#lumen-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M24 38V44"
          stroke="url(#lumen-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M4 24H10"
          stroke="url(#lumen-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M38 24H44"
          stroke="url(#lumen-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M10.1 10.1L14.3 14.3"
          stroke="url(#lumen-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M33.7 33.7L37.9 37.9"
          stroke="url(#lumen-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M10.1 37.9L14.3 33.7"
          stroke="url(#lumen-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M33.7 14.3L37.9 10.1"
          stroke="url(#lumen-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="24" cy="24" r="4" fill="white" opacity="0.95" />
        <defs>
          <linearGradient id="lumen-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--lumen-accent))" />
            <stop offset="1" stopColor="hsl(var(--lumen-glow))" />
          </linearGradient>
        </defs>
      </svg>

      {variant === "full" && (
        <span
          className={cn(
            s.text,
            "font-bold tracking-tight bg-linear-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
          )}
        >
          Lumen
        </span>
      )}
    </div>
  );
};

export default LumenLogo;
