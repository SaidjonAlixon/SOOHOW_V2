const logoSrc = `${import.meta.env.BASE_URL}logo.png`;

const imgSizes = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
} as const;

const titleSizes = {
  sm: "text-xl",
  md: "text-3xl",
  lg: "text-4xl",
} as const;

const subtitleSizes = {
  sm: "text-[8px] tracking-[2px]",
  md: "text-[10px] tracking-[3px]",
  lg: "text-[11px] tracking-[3px]",
} as const;

interface LogoProps {
  size?: keyof typeof imgSizes;
  className?: string;
  showImage?: boolean;
  showText?: boolean;
}

export function Logo({
  size = "md",
  className = "",
  showImage = true,
  showText = true,
}: LogoProps) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      data-testid="site-logo"
    >
      {showImage && (
        <img
          src={logoSrc}
          alt=""
          aria-hidden
          className={`w-auto object-contain shrink-0 ${imgSizes[size]}`}
        />
      )}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-display leading-none text-[#00A8E8] tracking-wider ${titleSizes[size]}`}
          >
            SOOHOW
          </span>
          <span
            className={`font-sans font-light site-muted uppercase ${subtitleSizes[size]}`}
          >
            CENTRAL ASIA
          </span>
        </div>
      )}
    </div>
  );
}
