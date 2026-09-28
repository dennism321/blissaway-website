const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

type LogoProps = {
  className?: string;
  title?: string;
};

export function LogoMark({ className, title = "Bliss Away" }: LogoProps) {
  return (
    <img
      src={`${basePath}/images/bliss-away-mark.webp`}
      alt={title}
      className={className}
    />
  );
}

export function FullLogo({ className, title = "Bliss Away Facials and Waxing" }: LogoProps) {
  return (
    <img
      src={`${basePath}/images/bliss-away-logo.webp`}
      alt={title}
      width={900}
      height={900}
      className={className ? `full-logo ${className}` : "full-logo"}
    />
  );
}

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className={onDark ? "wordmark on-dark" : "wordmark"}>
      <span className="wordmark-bliss">Bliss</span>
      <span className="wordmark-away">Away</span>
    </span>
  );
}

export function LeafMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden="true">
      <path fill="currentColor" d="M12 1 C 9 5 6 8 12 15 C 18 8 15 5 12 1Z" />
      <path fill="currentColor" d="M4 6 C 2 10 6 13 12 11 C 8 8 6 6 4 6Z" />
      <path fill="currentColor" d="M20 6 C 22 10 18 13 12 11 C 16 8 18 6 20 6Z" />
    </svg>
  );
}
