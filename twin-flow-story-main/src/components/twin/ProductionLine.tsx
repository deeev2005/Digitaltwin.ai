import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { STATIONS, ZONES, type Instrumentation, type Station } from "@/lib/demo-data";
import type { LiveVehicle } from "./useLineSim";

export const INSTRUMENT_META: Record<
  Instrumentation,
  { label: string; glyph: string; cls: string; dot: string }
> = {
  sensor: {
    label: "Sensor Telemetry",
    glyph: "▮▮▮",
    cls: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
  proxy: {
    label: "Proxy / Worker Note",
    glyph: "▮▮",
    cls: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    dot: "bg-amber-400",
  },
  historical: {
    label: "Baseline Model",
    glyph: "▮",
    cls: "text-zinc-300 border-zinc-500/30 bg-zinc-500/10",
    dot: "bg-zinc-400",
  },
};

interface Props {
  vehicles: LiveVehicle[];
  selectedVin?: string | null;
  onSelectVehicle?: (vin: string) => void;
  selectedStation?: number | null;
  onSelectStation?: (id: number) => void;
  highlightStations?: number[];
  dangerStations?: number[];
  exposureByVin?: Record<string, "high" | "medium" | "low">;
  compact?: boolean;
  onOpenAiCenter?: () => void;
  isAiCenterActive?: boolean;
}

export function ProductionLine({
  vehicles,
  selectedVin,
  onSelectVehicle,
  selectedStation,
  onSelectStation,
  highlightStations = [],
  dangerStations = [],
  exposureByVin,
  compact,
  onOpenAiCenter,
  isAiCenterActive = false,
}: Props) {
  const byZone = useMemo(
    () => ZONES.map((z) => ({ ...z, stations: STATIONS.filter((s) => s.zone === z.key) })),
    [],
  );

  const lineContainerRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [stationXCoords, setStationXCoords] = useState<number[]>(() =>
    STATIONS.map((_, idx) => ((idx + 0.5) / STATIONS.length) * 1200)
  );
  const [harnessWidth, setHarnessWidth] = useState<number>(1200);

  const measureStations = useCallback(() => {
    if (!lineContainerRef.current) return;
    const containerRect = lineContainerRef.current.getBoundingClientRect();
    if (containerRect.width === 0) return;

    const coords = STATIONS.map((_, idx) => {
      const el = stationRefs.current[idx];
      if (!el) {
        return ((idx + 0.5) / STATIONS.length) * containerRect.width;
      }
      const rect = el.getBoundingClientRect();
      return rect.left + rect.width / 2 - containerRect.left;
    });

    setStationXCoords(coords);
    setHarnessWidth(containerRect.width);
  }, []);

  useEffect(() => {
    measureStations();
    window.addEventListener("resize", measureStations);
    const ro = new ResizeObserver(() => {
      measureStations();
    });
    if (lineContainerRef.current) {
      ro.observe(lineContainerRef.current);
    }
    return () => {
      window.removeEventListener("resize", measureStations);
      ro.disconnect();
    };
  }, [measureStations]);

  return (
    <div className="relative overflow-x-auto select-none">
      <div className="min-w-[1240px] px-2 pt-2 pb-2">
        {/* Zone header rail with section signal counts */}
        <div className="flex gap-4 mb-2">
          {byZone.map((z) => {
            const isBody = z.key === "BODY";
            const isPaint = z.key === "PAINT";
            const colorCls = isBody
              ? "text-purple-400 border-purple-500/40 bg-purple-500/10"
              : isPaint
              ? "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
              : "text-amber-400 border-amber-500/40 bg-amber-500/10";
            return (
              <div key={z.key} style={{ flex: z.stations.length }} className="min-w-0">
                <div
                  className={cn(
                    "flex items-baseline justify-between border-b-2 pb-1.5 px-3 rounded-t-lg",
                    colorCls
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-current" />
                    <span className="label-xs text-foreground font-semibold tracking-wider">
                      {z.label} Section
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <span className="opacity-80">ST {z.range}</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-background/80 border border-border/60 text-[9.5px]">
                      {z.stations.length} STATIONS WIRED
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sequential Assembly Line Physical Track */}
        <div className="relative h-[86px] my-1 rounded-xl bg-panel/70 border border-border/70 px-2 py-1 overflow-hidden shadow-sm flex gap-4">
          {/* Main assembly line track background */}
          <div className="absolute inset-x-4 top-[52px] h-[3px] bg-gradient-to-r from-purple-500/60 via-purple-400/40 to-purple-600/60 rounded-full opacity-80" />
          
          {/* Flow indicator on physical line */}
          <div className="absolute inset-x-4 top-[52px] h-[3px] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />

          {/* Zone-by-Zone Track & Labeled Vehicle Badges */}
          {byZone.map((z) => (
            <div key={z.key} style={{ flex: z.stations.length }} className="relative flex min-w-0 gap-[3px] h-full items-center">
              {z.stations.map((s) => {
                const vehicle = vehicles.find((v) => v.pos === s.id);
                const sel = vehicle ? selectedVin === vehicle.vin : false;
                const exp = vehicle ? exposureByVin?.[vehicle.vin] : undefined;
                const isAtRisk = vehicle ? vehicle.status === "at-risk" || exp === "high" : false;
                const isWatch = vehicle ? vehicle.status === "watch" : false;

                return (
                  <div key={s.id} className="relative flex-1 flex flex-col items-center justify-center h-full">
                    {/* Station Track Connector Dot */}
                    <span 
                      className={cn(
                        "h-2.5 w-2.5 rounded-full border transition-all duration-300 z-10 absolute top-[48px]",
                        selectedStation === s.id
                          ? "bg-purple-400 border-white scale-125 shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                          : dangerStations.includes(s.id)
                          ? "bg-rose-500 border-white scale-125 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                          : "bg-background border-border"
                      )}
                    />

                    {/* Sequential Vehicle Badge perfectly aligned over station */}
                    {vehicle && (
                      <button
                        type="button"
                        onClick={() => onSelectVehicle?.(vehicle.vin)}
                        className={cn(
                          "group absolute top-[9px] z-20 cursor-pointer transition-all duration-300",
                          vehicle.pos === 1 ? "animate-in fade-in duration-300" : ""
                        )}
                        aria-label={`Vehicle ${vehicle.short}`}
                      >
                        <div className="flex flex-col items-center">
                          <div className="relative">
                            {isAtRisk && (
                              <span className="pulse-ring absolute -inset-1 rounded-full border-2 border-rose-500/80" />
                            )}
                            <div
                              className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[9.5px] font-bold transition-all shadow-sm whitespace-nowrap select-none",
                                sel
                                  ? "border-purple-400 bg-purple-950/95 text-purple-200 ring-2 ring-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.5)] scale-105"
                                  : isAtRisk
                                  ? "border-rose-500/80 bg-rose-950/90 text-rose-200 shadow-[0_0_8px_rgba(244,63,94,0.3)] hover:scale-105"
                                  : isWatch
                                  ? "border-amber-500/70 bg-amber-950/80 text-amber-200 hover:border-amber-400 hover:scale-105"
                                  : "border-border/80 bg-panel-raised/95 text-foreground/90 hover:border-purple-500/50 hover:scale-105"
                              )}
                            >
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full shrink-0",
                                  isAtRisk
                                    ? "bg-rose-500 animate-pulse"
                                    : isWatch
                                    ? "bg-amber-400"
                                    : "bg-emerald-400"
                                )}
                              />
                              <span>{vehicle.short}</span>
                            </div>
                          </div>
                          <span
                            className={cn(
                              "mt-1 h-1.5 w-1 rounded-full transition-colors",
                              sel ? "bg-purple-400" : "bg-transparent"
                            )}
                          />
                        </div>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Station Nodes Grid */}
        <div className="flex gap-4 mt-1">
          {byZone.map((z) => (
            <div key={z.key} style={{ flex: z.stations.length }} className="flex min-w-0 gap-[3px]">
              {z.stations.map((s) => (
                <StationNode
                  key={s.id}
                  nodeRef={(el) => {
                    stationRefs.current[s.id - 1] = el;
                  }}
                  station={s}
                  active={vehicles.some((v) => v.pos === s.id)}
                  selected={selectedStation === s.id}
                  highlighted={highlightStations.includes(s.id)}
                  danger={dangerStations.includes(s.id)}
                  onClick={() => onSelectStation?.(s.id)}
                  compact={compact}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* WIRES / CABLES ILLUSTRATION: DIRECTLY CONNECTED TO STATION BLOCKS */}
        {/* ========================================================================= */}
        <div
          ref={lineContainerRef}
          className="relative mt-0.5 rounded-xl bg-panel/40 border border-border/60 p-3 pt-1 shadow-sm"
        >
          {/* Subtle Header Banner & Cable Type Legend */}
          <div className="flex items-center justify-between border-b border-border/40 pb-1.5 mb-1 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400/90 font-bold">
                SIGNAL BUS WIRING HARNESS · 36 STATIONS STREAMING DIRECTLY INTO AI COMMAND CENTER
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[9.5px]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" /> Body Cables
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Paint Cables
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Final Assembly Cables
              </span>
            </div>
          </div>

          {/* SVG Wiring Canvas with Real Animated Signal Packets */}
          <div className="relative h-[155px] w-full">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${harnessWidth} 155`}
            >
              <defs>
                {/* Subtle Glow Filter for Signals */}
                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Central AI Center Target Point: (harnessWidth / 2, 120) */}
              {STATIONS.map((s, index) => {
                const startX = stationXCoords[index] ?? ((index + 0.5) / STATIONS.length) * harnessWidth;
                const endX = harnessWidth / 2;
                const endY = 120;
                const isBody = s.zone === "BODY";
                const isPaint = s.zone === "PAINT";
                const isUnwired = s.id === 26 || s.id === 31 || s.id === 33;
                const wireColor = isUnwired
                  ? "#6B7280"
                  : isBody
                  ? "#A855F7"
                  : isPaint
                  ? "#10B981"
                  : "#F59E0B";
                const isDanger = (dangerStations.includes(s.id) || s.id === 14) && !isUnwired;
                const isSelected = selectedStation === s.id;
                const pathId = `wire-path-${s.id}`;

                // Smooth cubic bezier curves originating directly from the station lower center connector
                const midY = 40 + (Math.abs(startX - endX) / (endX || 1)) * 30;
                const pathD = `M ${startX} 0 C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`;

                return (
                  <g key={s.id}>
                    {/* Shadow Cable */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="black"
                      strokeWidth={isDanger || isSelected ? 3 : 1.5}
                      opacity={isUnwired ? 0.2 : 0.35}
                    />

                    {/* Illuminated Wire */}
                    <path
                      id={pathId}
                      d={pathD}
                      fill="none"
                      stroke={isUnwired ? "#6B7280" : (isDanger ? "#F43F5E" : wireColor)}
                      strokeWidth={isDanger ? 2 : isSelected ? 2 : 1}
                      strokeDasharray={isUnwired ? "none" : (isDanger ? "4 2" : isSelected ? "5 3" : "none")}
                      opacity={isUnwired ? 0.35 : (isDanger ? 0.95 : isSelected ? 0.95 : 0.45)}
                      filter={isDanger || isSelected ? "url(#softGlow)" : undefined}
                    />

                    {/* Connector Port Junction Dot at the station lower center */}
                    <circle
                      cx={startX}
                      cy={0}
                      r={isDanger ? 2.5 : isSelected ? 2.5 : 1.5}
                      fill={isUnwired ? "#6B7280" : (isDanger ? "#F43F5E" : wireColor)}
                      opacity={isUnwired ? 0.4 : 0.9}
                    />

                    {/* Animated Moving Data Pulse along the Cable — Disabled for stations 26, 31, 33 */}
                    {!isUnwired && (index % 2 === 0 || isDanger || isSelected) && (
                      <circle
                        r={isDanger ? 2.5 : isSelected ? 2.5 : 1.8}
                        fill={isDanger ? "#F43F5E" : "#E9D5FF"}
                        opacity={0.9}
                      >
                        <animateMotion
                          dur={`${2.0 + (index % 5) * 0.4}s`}
                          repeatCount="indefinite"
                          path={pathD}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Main AI Center Core Input Port */}
              <circle cx={harnessWidth / 2} cy={120} r={10} fill="#A855F7" opacity={0.2} />
              <circle cx={harnessWidth / 2} cy={120} r={5} fill="#A855F7" filter="url(#softGlow)" />
            </svg>

            {/* AI COMMAND CENTER INTERACTIVE BUTTON */}
            <div className="absolute left-1/2 bottom-1 -translate-x-1/2 flex flex-col items-center z-30">
              <button
                type="button"
                onClick={() => {
                  if (onOpenAiCenter) {
                    onOpenAiCenter();
                  }
                }}
                className={cn(
                  "group relative p-[1.5px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
                  "hover:scale-[1.03] active:scale-[0.98]",
                  isAiCenterActive && "scale-[1.02]"
                )}
                aria-label="Click to open AI Command Center"
              >
                {/* Ambient breathing backglow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/40 via-fuchsia-500/40 to-purple-600/40 rounded-2xl blur-md opacity-70 group-hover:opacity-100 group-hover:blur-lg transition-all animate-pulse" />

                {/* Animated spinning conic border shine */}
                <span className="absolute inset-[-1000%] animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_65%,#e879f9_85%,#a855f7_100%)]" />

                {/* Inner button surface */}
                <div
                  className={cn(
                    "relative flex items-center gap-3.5 px-6 py-2.5 rounded-[10.5px] transition-all duration-300",
                    "bg-gradient-to-r from-panel-raised via-purple-950/60 to-panel-raised backdrop-blur-md",
                    "group-hover:bg-purple-950/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]",
                    isAiCenterActive ? "bg-purple-950/90" : ""
                  )}
                >
                  {/* Subtle surface shine sweep */}
                  <span className="absolute inset-0 rounded-[10.5px] overflow-hidden pointer-events-none">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </span>

                  {/* Glowing AI Symbol Icon */}
                  <div className="relative flex items-center justify-center h-9 w-9 rounded-lg bg-purple-500/25 border border-purple-400/50 group-hover:border-purple-300 group-hover:scale-105 group-hover:bg-purple-500/35 transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                    <span className="font-mono text-purple-200 group-hover:text-white font-bold text-sm select-none">&gt;_</span>
                  </div>

                  <div className="text-left">
                    <div className="text-[14.5px] font-bold tracking-tight text-white group-hover:text-purple-100 flex items-center gap-1.5 drop-shadow-sm">
                      AI Command Center
                    </div>
                    <div className="text-[11px] text-purple-300/90 font-mono tracking-wide flex items-center gap-1">
                      <span>Digital Twin Intelligence</span>
                      <span className="group-hover:translate-x-1 text-purple-400 transition-transform">→</span>
                    </div>
                  </div>

                  <div className="ml-2 pl-3.5 border-l border-purple-500/30 text-right font-mono">
                    <div className="text-[12px] font-bold text-purple-300">
                      {vehicles.length} ACTIVE
                    </div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wider">
                      TWINS
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Signal Legend & Coverage Summary */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border/60 pt-3">
          <div className="flex items-center gap-4">
            {(Object.keys(INSTRUMENT_META) as Instrumentation[]).map((k) => (
              <span key={k} className="flex items-center gap-1.5 label-xs">
                <span className={cn("h-2 w-2 rounded-full", INSTRUMENT_META[k].dot)} />
                {INSTRUMENT_META[k].label}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 font-mono text-[10.5px] text-muted-foreground">
            <span className="text-emerald-400 font-medium">{STATIONS.filter((s) => s.instrumentation === "sensor").length} Sensors</span>
            <span>·</span>
            <span className="text-amber-400 font-medium">{STATIONS.filter((s) => s.instrumentation === "proxy").length} Proxies</span>
            <span>·</span>
            <span className="text-zinc-400 font-medium">{STATIONS.filter((s) => s.instrumentation === "historical").length} Baselines</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StationNode({
  station,
  active,
  selected,
  highlighted,
  danger,
  onClick,
  compact,
  nodeRef,
}: {
  station: Station;
  active: boolean;
  selected: boolean;
  highlighted: boolean;
  danger: boolean;
  onClick: () => void;
  compact?: boolean | undefined;
  nodeRef?: (el: HTMLButtonElement | null) => void;
}) {
  const isUnwired = station.id === 26 || station.id === 31 || station.id === 33;
  const meta = INSTRUMENT_META[station.instrumentation];
  return (
    <button
      ref={nodeRef}
      onClick={onClick}
      title={`${station.code} · ${station.name} · ${meta.label}`}
      className={cn(
        "group relative flex flex-1 flex-col items-center gap-1.5 border-t-2 pt-2 pb-1.5 transition-all rounded-b-md duration-200 cursor-pointer",
        danger && !isUnwired
          ? "border-t-rose-500 bg-rose-500/15"
          : selected
            ? "border-t-purple-500 bg-purple-500/15 z-10"
            : highlighted
              ? "border-t-amber-500 bg-amber-500/10"
              : active
                ? "border-t-foreground/50 bg-panel-raised/60"
                : "border-t-border/70 hover:border-t-purple-400 hover:bg-panel-raised/70",
      )}
    >
      <span
        className={cn(
          "font-mono text-[9.5px] font-semibold tracking-tight",
          danger && !isUnwired ? "text-rose-400 font-bold" : selected ? "text-purple-300 font-bold" : "text-muted-foreground group-hover:text-foreground",
        )}
      >
        {String(station.id).padStart(2, "0")}
      </span>
      <span className={cn("h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125", isUnwired ? "bg-zinc-500" : meta.dot, active && !isUnwired && "animate-pulse")} />
      
      {/* Signal stem visualization */}
      <span className="flex h-3 items-end gap-[2px]">
        {Array.from({
          length:
            station.instrumentation === "sensor" ? 3 : station.instrumentation === "proxy" ? 2 : 1,
        }).map((_, i) => (
          <span
            key={i}
            className={cn("w-[2px] rounded-t", isUnwired ? "bg-zinc-500 opacity-30" : meta.dot)}
            style={{ height: `${4 + i * 3}px`, opacity: isUnwired ? 0.3 : (active || selected ? 1 : 0.4) }}
          />
        ))}
      </span>

      {/* Signal Output Connector Pin at lower center of the block */}
      <span
        className={cn(
          "absolute -bottom-[3px] left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full border transition-all z-20",
          isUnwired
            ? "bg-zinc-500 border-zinc-600 shadow-none opacity-50"
            : danger
              ? "bg-rose-400 border-rose-600 shadow-[0_0_6px_rgba(244,63,94,0.8)]"
              : selected
                ? "bg-purple-300 border-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.8)]"
                : active
                  ? "bg-white border-purple-400 shadow-[0_0_4px_rgba(168,85,247,0.5)]"
                  : "bg-panel-raised border-border/80 group-hover:border-purple-400 group-hover:bg-purple-400/50"
        )}
      />

      {!compact && (
        <span className="pointer-events-none absolute -bottom-1 left-1/2 hidden -translate-x-1/2 translate-y-full whitespace-nowrap panel z-30 px-2.5 py-1.5 font-mono text-[10.5px] group-hover:block shadow-lg border border-purple-500/40 rounded-lg">
          {station.code} · {station.name}
          <span className="ml-2 text-purple-400 font-semibold">conf {station.confidence.toFixed(2)}</span>
        </span>
      )}
    </button>
  );
}

