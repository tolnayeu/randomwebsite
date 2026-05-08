import Link from "next/link";
import { cn } from "@/lib/cn";

type ButtonProps = {
  variant?: "primary" | "ghost" | "outline";
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  variant = "primary",
  href,
  className,
  children,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const styles = {
    primary:
      "bg-[var(--accent)] text-[var(--background)] hover:brightness-110 focus-visible:outline-[var(--accent)]",
    ghost:
      "bg-white/5 text-[var(--foreground)] hover:bg-white/10 focus-visible:outline-white/40",
    outline:
      "border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-[var(--accent)]",
  } as const;

  const cls = cn(base, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
