import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ActionButton,
  Chip,
  KeyVal,
  Meter,
  Panel,
  PanelHead,
  ScreenTitle,
} from "@/components/twin/primitives";
import { PLANTS, ROADMAP, STATIONS, ZONES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/scale")({
  head: () => ({
    meta: [
      { title: "Scalability & Roadmap — DigitalTwin" },
      {
        name: "description",
        content:
          "Multi-plant, multi-line configuration-driven expansion and phased sensor deployment roadmap for unevenly instrumented assembly lines.",
      },
      { property: "og:title", content: "Scalability & Roadmap — DigitalTwin" },
      {
        property: "og:description",
        content: "New line = configure, not rebuild. Phased instrumentation roadmap.",
      },
    ],
  }),
  component: ScaleScreen,
});

function ScaleScreen() {
  const [selectedPlant, setSelectedPlant] = useState(PLANTS[0]!.id);
  const [activeStage, setActiveStage] = useState(2);

  const plant = PLANTS.find((p) => p.id === selectedPlant) ?? PLANTS[0]!;

  return (
    <div className="tech-grid">
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-8">
        <ScreenTitle
          title="Multi-Plant Expansion & Instrumentation Roadmap"
          lede="The DigitalTwin platform is configuration-driven. Adding a new plant, line, or station requires zero software rebuilds. Sensor deployment is phased selectively where data shows the highest risk."
          right={
            <div className="flex items-center gap-3">
              <Link to="/digital-twin">
                <ActionButton tone="ghost">← AI Command Center</ActionButton>
              </Link>
            </div>
          }
        />

        {/* ========================================================================= */}
        {/* SECTION 1: PHASED INSTRUMENTATION ROADMAP */}
        {/* ========================================================================= */}
        <Panel className="border-border/80 shadow-sm">
          <PanelHead
            title="Phased Sensor Deployment Roadmap"
            right={<Chip tone="signal">Selective Deployment</Chip>}
          />
          <div className="p-5 space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <p className="max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
                Do not attempt to sensorize all 36 stations on day one. Start with proxy data and historical baselines, then add physical sensors selectively where exposure data proves highest risk (see maintenance-window policy below).
              </p>
              <span className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-purple-300 font-mono text-[10.5px]">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                Zero Production Downtime (see policy below)
              </span>
            </div>

            {/* Interactive 5-Stage Stepper */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 pt-2">
              {ROADMAP.map((r, idx) => {
                const isCurrent = idx === activeStage;
                const isPast = idx < activeStage;
                return (
                  <button
                    key={r.stage}
                    onClick={() => setActiveStage(idx)}
                    className={cn(
                      "flex flex-col text-left p-4 rounded-xl border transition-all cursor-pointer",
                      isCurrent
                        ? "border-purple-500 bg-purple-500/15 shadow-sm scale-102"
                        : isPast
                        ? "border-emerald-500/40 bg-emerald-500/5 hover:border-emerald-500/60"
                        : "border-border/70 bg-panel/70 hover:border-purple-500/40 hover:bg-panel-raised"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold text-purple-400">{r.stage}</span>
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          isCurrent
                            ? "bg-purple-400 animate-pulse"
                            : isPast
                            ? "bg-emerald-400"
                            : "bg-zinc-500"
                        )}
                      />
                    </div>
                    <h4 className="text-[13px] font-semibold text-foreground">{r.title}</h4>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground">
                      {r.body}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono text-[12px] font-bold">
                  OT
                </div>
                <div>
                  <div className="text-[12.5px] font-semibold text-foreground">
                    Hardware Installation Policy: Scheduled Maintenance Windows Only
                  </div>
                  <div className="text-[11.5px] text-muted-foreground">
                    Physical sensors (e.g. ST-14 tool load cells) are installed during scheduled 4-hour weekend line maintenance.
                  </div>
                </div>
              </div>
              <Chip tone="ok">Non-Disruptive Deployment</Chip>
            </div>
          </div>
        </Panel>

        {/* ========================================================================= */}
        {/* SECTION 2: MULTI-PLANT & MULTI-LINE SCALABILITY ARCHITECTURE */}
        {/* ========================================================================= */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Plant & Maturity Selector */}
          <Panel>
            <PanelHead title="Multi-Plant Sensor Maturity Levels" />
            <div className="p-5 space-y-4">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Different manufacturing sites operate at varying sensor maturity levels. All sites stream into the same standardized Digital Twin schema.
              </p>

              <div className="space-y-3">
                {PLANTS.map((p) => {
                  const isSel = p.id === selectedPlant;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPlant(p.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer",
                        isSel
                          ? "border-purple-500 bg-purple-500/15 shadow-sm"
                          : "border-border/70 bg-panel/70 hover:border-purple-500/40 hover:bg-panel-raised"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] font-bold text-purple-300">{p.id}</span>
                          <h4 className="text-[14px] font-medium text-foreground">{p.name}</h4>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[11.5px] text-muted-foreground">
                          <span>{p.lines.join(" · ")}</span>
                          <span>•</span>
                          <span>{p.stations} Workstations</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Chip
                          tone={p.level === 3 ? "signal" : p.level === 2 ? "ok" : "warn"}
                        >
                          {p.maturity}
                        </Chip>
                        <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                          Maturity Level {p.level}/3
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Cross-Plant Learning Highlight */}
              <div className="mt-4 rounded-xl border border-border/80 bg-panel-raised/50 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="label-xs text-emerald-300 font-semibold">Cross-Plant Defect Learning Loop</span>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  When Plant 01 (Ingolstadt, Level 3) identifies the multi-variable ST-14 tool drift pattern, that pattern signature is immediately distributed to Plant 03 (Puebla, Level 1) to enable early detection during its sensor rollout.
                </p>
              </div>
            </div>
          </Panel>

          {/* Configuration-Driven Line Definition */}
          <Panel>
            <PanelHead title="Configuration-Driven Plant Hierarchy" />
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div>
                  <span className="label-xs text-purple-400 font-semibold">Selected Architecture:</span>
                  <div className="text-[15px] font-semibold text-foreground">{plant.name}</div>
                </div>
                <Chip tone="signal">JSON / YAML Config Schema</Chip>
              </div>

              <div className="space-y-3">
                <KeyVal k="Total Lines Active" v={`${plant.lines.length} Production Lines`} />
                <KeyVal k="Active Line Identifiers" v={plant.lines.join(", ")} />
                <KeyVal k="Station Layout Definition" v="Declarative Graph Schema (36 Nodes/Line)" />
                <KeyVal k="Telemetry Stream Protocol" v="OPC-UA / MQTT Read-Only Broker" />
                <KeyVal k="Deployment Model" v="Local Edge Appliance + Read-Only OT Path" />
              </div>

              <div className="rounded-xl border border-border/80 bg-background/80 p-4 font-mono text-[11px] space-y-1">
                <div className="text-muted-foreground">// Declarative Plant Line Config</div>
                <div className="text-purple-300">plant_id: <span className="text-foreground">"{plant.id}"</span></div>
                <div className="text-purple-300">lines: <span className="text-emerald-300">[{plant.lines.map(l => `"${l}"`).join(", ")}]</span></div>
                <div className="text-purple-300">maturity_mode: <span className="text-amber-300">"{plant.maturity}"</span></div>
                <div className="text-purple-300">zero_downtime_onboarding: <span className="text-emerald-400">true</span></div>
              </div>

              <div className="rounded-lg bg-panel-raised/60 p-3 text-[12px] text-muted-foreground flex items-center justify-between">
                <span>Adding new line layout:</span>
                <span className="font-mono text-purple-300 font-semibold">Config change (0 code rebuild)</span>
              </div>
            </div>
          </Panel>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: PARTIAL INSTRUMENTATION ARCHITECTURE HIERARCHY */}
        {/* ========================================================================= */}
        <Panel>
          <PanelHead title="Partial Instrumentation Hierarchy — 3-Tier Signal Engine" />
          <div className="px-5 pt-4 pb-2 border-b border-border/70">
            <p className="text-[12.5px] text-muted-foreground leading-relaxed">
              This is today's snapshot across all 36 stations — the roadmap above shows how a station progresses from Tier 3 up to Tier 1 over time.
            </p>
          </div>
          <div className="grid gap-0 divide-y divide-border/70 lg:grid-cols-3 lg:divide-y-0 lg:divide-x">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="label-xs text-emerald-400 font-semibold">Tier 1 · Direct Sensors</span>
                <Chip tone="ok">High Confidence (0.95)</Chip>
              </div>
              <h4 className="text-[14px] font-semibold text-foreground">Sensors & Machine IO</h4>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Direct PLC/sensor telemetry (torque nutrunners, laser weld checkers, thermal cameras, pressure transducers).
              </p>
              <div className="font-mono text-[11px] text-muted-foreground space-y-1">
                <div>• Sampled every single takt cycle</div>
                <div>• Automatic SPC control limit bounds</div>
                <div>• Station coverage: 18 / 36 stations</div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="label-xs text-amber-400 font-semibold">Tier 2 · Proxy & Human</span>
                <Chip tone="warn">Medium Confidence (0.72)</Chip>
              </div>
              <h4 className="text-[14px] font-semibold text-foreground">Proxy Events & Worker Notes</h4>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Bar code scans, Andon pulls, RFID badge swipes, and structured operator voice notes recorded on the line.
              </p>
              <div className="font-mono text-[11px] text-muted-foreground space-y-1">
                <div>• Event-driven timestamp delta tracking</div>
                <div>• GenAI structured worker symptom notes</div>
                <div>• Station coverage: 12 / 36 stations</div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="label-xs text-zinc-400 font-semibold">Tier 3 · Statistical Baseline</span>
                <Chip tone="histo">Model-Trim Baseline (0.45)</Chip>
              </div>
              <h4 className="text-[14px] font-semibold text-foreground">Historical Station Models</h4>
              <p className="text-[12px] text-muted-foreground leading-relaxed">
                Stations with zero physical sensors rely on fleet historical baseline distributions adjusted by vehicle model and trim.
              </p>
              <div className="font-mono text-[11px] text-muted-foreground space-y-1">
                <div>• Mixed-model trim-aware variance envelope</div>
                <div>• Zero false-positive baseline indexing</div>
                <div>• Station coverage: 6 / 36 stations</div>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
