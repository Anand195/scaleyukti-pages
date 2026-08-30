import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Navy text on the bright orange fill keeps WCAG AA contrast (white-on-orange is only ~3:1).
  primary: "bg-brand-orange text-brand-navy-deep hover:brightness-90",
  secondary:
    "border border-brand-border-strong text-brand-ink hover:border-brand-orange hover:text-brand-orange",
  ghost: "text-brand-muted hover:text-brand-ink",
};

export function Button({
  variant = "primary",
  pending = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  pending?: boolean;
}) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled || pending}
      {...props}
    >
      {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
