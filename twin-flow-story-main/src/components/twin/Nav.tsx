import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const LAYERS = [
  { to: "/", label: "Production Line", depth: "L0" },
  { to: "/digital-twin", label: "Digital Twin", depth: "L1" },
  { to: "/intelligence", label: "Intelligence", depth: "L2" },
  { to: "/trace", label: "Trace", depth: "L3" },
  { to: "/validation", label: "Validation", depth: "L4" },
  { to: "/operations", label: "Operations", depth: "L5" },
  { to: "/scale", label: "Scale", depth: "L6" },
] as const;

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-8 gap-y-3 px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 group-hover:border-purple-400 group-hover:bg-purple-500/25 transition-all">
            <span className="font-bold text-[15px] leading-none select-none">&gt;</span>
          </div>
          <div className="flex items-baseline">
            <span className="text-[14.5px] font-bold tracking-tight text-foreground">
              DigitalTwin
            </span>
          </div>
        </Link>

        <nav className="flex flex-1 flex-wrap items-center gap-x-1 gap-y-1">
          {LAYERS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "group relative px-3 py-1.5 font-mono text-[10.5px] font-medium tracking-[0.1em] uppercase transition-colors rounded-md",
                  active
                    ? "text-purple-300 bg-purple-500/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-panel-raised/50",
                )}
              >
                <span className="mr-1.5 text-purple-400/70 font-bold">{l.depth}</span>
                {l.label}
                {active && (
                  <span className="absolute -bottom-[13px] left-2 right-2 h-[2px] bg-purple-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase">
          <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Read-only OT link
          </span>
          <span className="hidden border-l border-border/80 pl-3 text-muted-foreground sm:inline">
            Enterprise Twin
          </span>
        </div>
      </div>
    </header>
  );
}

