import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Panel({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("panel rounded-xl shadow-sm border border-border/70", className)} {...rest}>
      {children}
    </div>
  );
}

export function PanelHead({
  index,
  title,
  right,
}: {
  index?: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 px-5 py-3.5 bg-panel-raised/30 rounded-t-xl">
      <div className="flex items-baseline gap-2.5 min-w-0">
        {index && <span className="label-xs text-signal font-semibold tracking-wider">{index}</span>}
        <h2 className="truncate text-[13px] font-semibold tracking-wide text-foreground/90 uppercase">{title}</h2>
      </div>
      {right}
    </div>
  );
}

export function Chip({
  children,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  tone?: "muted" | "signal" | "warn" | "danger" | "ok" | "human" | "histo";
  className?: string;
}) {
  const tones: Record<string, string> = {
    muted: "border-border text-muted-foreground bg-muted/40",
    signal: "border-purple-500/40 text-purple-300 bg-purple-500/10",
    warn: "border-amber-500/40 text-amber-300 bg-amber-500/10",
    danger: "border-rose-500/40 text-rose-300 bg-rose-500/10",
    ok: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    human: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10",
    histo: "border-zinc-500/40 text-zinc-400 bg-zinc-500/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.08em] uppercase transition-colors",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Meter({
  value,
  tone = "signal",
  label,
  right,
}: {
  value: number;
  tone?: "signal" | "warn" | "danger" | "ok" | "human";
  label?: string;
  right?: string;
}) {
  const bg: Record<string, string> = {
    signal: "bg-purple-500",
    warn: "bg-amber-500",
    danger: "bg-rose-500",
    ok: "bg-emerald-500",
    human: "bg-indigo-500",
  };
  return (
    <div className="space-y-1.5">
      {(label || right) && (
        <div className="flex justify-between items-center">
          <span className="label-xs text-muted-foreground">{label}</span>
          <span className="font-mono text-[11px] font-medium text-foreground/90">{right}</span>
        </div>
      )}
      <div className="h-[4px] w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", bg[tone])}
          style={{ width: `${Math.max(3, Math.min(100, value * 100))}%` }}
        />
      </div>
    </div>
  );
}

export function KeyVal({ k, v, mono = true }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/50 py-2 last:border-0">
      <span className="label-xs pt-0.5 text-muted-foreground font-normal">{k}</span>
      <span
        className={cn(
          "text-right text-[12.5px] text-foreground/90 font-medium",
          mono && "font-mono text-[11.5px]",
        )}
      >
        {v}
      </span>
    </div>
  );
}

export function StepNote({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-3xl text-[13px] leading-relaxed text-muted-foreground">{children}</p>
  );
}

export function ScreenTitle({
  eyebrow,
  title,
  lede,
  right,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  right?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-6 border-b border-border/70 pb-6">
      <div className="min-w-0">
        {eyebrow && (
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            <span className="label-xs text-purple-400 font-semibold tracking-wider">{eyebrow}</span>
          </div>
        )}
        <h1 className={cn("text-[26px] font-bold tracking-tight text-foreground sm:text-[32px]", eyebrow && "mt-2.5")}>
          {title}
        </h1>
        {lede ? (
          <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-muted-foreground">{lede}</p>
        ) : null}
      </div>
      {right}
    </header>
  );
}

export function ActionButton({
  children,
  onClick,
  tone = "signal",
  className,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: "signal" | "danger" | "ghost" | "warn";
  className?: string;
  disabled?: boolean;
}) {
  const tones: Record<string, string> = {
    signal: "border-purple-500/40 text-purple-300 bg-purple-950/20 hover:bg-purple-900/30 hover:border-purple-500/70 shadow-sm",
    danger: "border-rose-500/40 text-rose-300 bg-rose-950/20 hover:bg-rose-900/30 hover:border-rose-500/70",
    warn: "border-amber-500/40 text-amber-300 bg-amber-950/20 hover:bg-amber-900/30 hover:border-amber-500/70",
    ghost: "border-border/80 bg-panel/60 text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-panel-raised",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 font-mono text-[11px] font-semibold tracking-[0.1em] uppercase transition-all duration-200 disabled:opacity-40 cursor-pointer",
        tones[tone],
        className,
      )}
    >
      {children}
    </button>
  );
}

