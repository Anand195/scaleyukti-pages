import { InputHTMLAttributes } from "react";

export function Field({
  label,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-brand-ink">{label}</span>
      <input
        className={`w-full rounded-lg border border-brand-border-strong bg-brand-navy-deep px-3 py-2.5 text-brand-ink placeholder:text-brand-muted/60 transition-colors focus:border-brand-orange ${className}`}
        {...props}
      />
    </label>
  );
}
