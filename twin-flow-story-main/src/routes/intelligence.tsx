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
import { ALERT_GROUPS, MODEL_BASELINES, STATIONS, VEHICLES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/intelligence")({
  head: () => ({
    meta: [
      { title: "Intelligence Pipeline & Prediction — DigitalTwin" },
      {
        name: "description",
        content:
          "SPC statistical check → Classical ML multi-variable pattern detection → GenAI reasoning pipeline, with alarm prioritization and downstream propagation prediction.",
      },
      { property: "og:title", content: "Intelligence Pipeline & Prediction — DigitalTwin" },
      {
        property: "og:description",
        content:
          "Connected intelligence layers: SPC → Classical ML → GenAI Reasoning with downstream risk prediction.",
      },
    ],
  }),
  component: IntelligenceScreen,
});

function IntelligenceScreen() {
  const [activeLayer, setActiveLayer] = useState<"spc" | "ml" | "genai">("genai");
  const [selectedAlert, setSelectedAlert] = useState(ALERT_GROUPS[0]!.id);
  const [vinActionState, setVinActionState] = useState<"online" | "shipped">("online");

  const alert = ALERT_GROUPS.find((a) => a.id === selectedAlert) ?? ALERT_GROUPS[0]!;

  return (
    <div className="tech-grid">
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-8">
        <ScreenTitle
          title="SPC → Classical ML → GenAI Reasoning Pipeline"
          lede="The Digital Twin passes live vehicle telemetry through three connected intelligence layers. Statistical checks catch obvious limits, ML identifies multi-variable drift patterns, and GenAI synthesizes human-readable root-cause explanations."
          right={
            <div className="flex items-center gap-3">
              <Link to="/digital-twin">
                <ActionButton tone="ghost">← AI Command Center</ActionButton>
              </Link>
            </div>
          }
        />

        {/* ========================================================================= */}
        {/* SECTION 1: CONNECTED INTELLIGENCE PIPELINE */}
        {/* ========================================================================= */}
        <Panel className="border-border/80 shadow-sm">
          <PanelHead
            index="01"
            title="Connected 3-Tier Intelligence Pipeline"
            right={
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveLayer("spc")}
                  className={cn(
                    "px-3 py-1 font-mono text-[10.5px] font-semibold rounded-md border transition-all cursor-pointer",
                    activeLayer === "spc"
                      ? "border-rose-500/50 bg-rose-500/15 text-rose-300"
                      : "border-border/70 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Layer 1 · SPC
                </button>
                <button
                  onClick={() => setActiveLayer("ml")}
                  className={cn(
                    "px-3 py-1 font-mono text-[10.5px] font-semibold rounded-md border transition-all cursor-pointer",
                    activeLayer === "ml"
                      ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                      : "border-border/70 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Layer 2 · Classical ML
                </button>
                <button
                  onClick={() => setActiveLayer("genai")}
                  className={cn(
                    "px-3 py-1 font-mono text-[10.5px] font-semibold rounded-md border transition-all cursor-pointer",
                    activeLayer === "genai"
                      ? "border-purple-500 bg-purple-500/20 text-purple-300"
                      : "border-border/70 text-muted-foreground hover:text-foreground"
                  )}
                >
                  Layer 3 · GenAI
                </button>
              </div>
            }
          />

          <div className="p-5 space-y-6">
            {/* Visual Pipeline Flow */}
            <div className="grid gap-4 lg:grid-cols-3">
              {/* Layer 1: SPC */}
              <div
                onClick={() => setActiveLayer("spc")}
                className={cn(
                  "p-5 rounded-xl border transition-all cursor-pointer space-y-3",
                  activeLayer === "spc"
                    ? "border-rose-500/70 bg-rose-950/20 shadow-md ring-1 ring-rose-500/40"
                    : "border-border/70 bg-panel/70 hover:border-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="label-xs text-rose-400 font-bold">Tier 1 · Statistical Check</span>
                  <Chip tone="danger">SPC Flag</Chip>
                </div>
                <h3 className="text-[16px] font-semibold text-foreground">Statistical Process Control</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Catches immediate single-variable threshold violations against model-trim specific control limits.
                </p>
                <div className="rounded-lg border border-border/80 bg-background/80 p-3 font-mono text-[11px] space-y-1">
                  <div className="text-muted-foreground">Parameter: Subframe Torque</div>
                  <div className="text-muted-foreground">Baseline (X5 Sport): 42–48 Nm</div>
                  <div className="text-rose-400 font-bold text-[12px]">Current: 51.2 Nm (Over limit)</div>
                </div>
              </div>

              {/* Layer 2: Classical ML */}
              <div
                onClick={() => setActiveLayer("ml")}
                className={cn(
                  "p-5 rounded-xl border transition-all cursor-pointer space-y-3",
                  activeLayer === "ml"
                    ? "border-amber-500/70 bg-amber-950/20 shadow-md ring-1 ring-amber-500/40"
                    : "border-border/70 bg-panel/70 hover:border-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="label-xs text-amber-400 font-bold">Tier 2 · Pattern Detection</span>
                  <Chip tone="warn">Pattern Detected</Chip>
                </div>
                <h3 className="text-[16px] font-semibold text-foreground">Classical Multi-Variable ML</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Identifies subtle combinations of factors that individually pass SPC but together indicate drift.
                </p>
                <div className="rounded-lg border border-border/80 bg-background/80 p-3 font-mono text-[11px] space-y-1">
                  <div className="text-amber-300">• Torque slightly elevated (+3.1 Nm)</div>
                  <div className="text-amber-300">• Tool T14 age: 18 days (drift slope)</div>
                  <div className="text-amber-300">• Part batch changed to #4471</div>
                  <div className="text-amber-300">• Cycle time drifting +7s</div>
                </div>
              </div>

              {/* Layer 3: GenAI */}
              <div
                onClick={() => setActiveLayer("genai")}
                className={cn(
                  "p-5 rounded-xl border transition-all cursor-pointer space-y-3",
                  activeLayer === "genai"
                    ? "border-purple-500 bg-purple-950/30 shadow-md ring-1 ring-purple-500/50"
                    : "border-border/70 bg-panel/70 hover:border-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="label-xs text-purple-400 font-bold">Tier 3 · Evidence Synthesis</span>
                  <Chip tone="signal">GenAI Reasoning</Chip>
                </div>
                <h3 className="text-[16px] font-semibold text-foreground">GenAI Reasoning & Action</h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  Translates technical multi-variable evidence into clear English explanations and actionable recommendations.
                </p>
                <div className="rounded-lg border border-purple-500/40 bg-purple-950/40 p-3 text-[12px] space-y-1">
                  <div className="font-semibold text-purple-200">Recommended Action:</div>
                  <div className="text-muted-foreground leading-snug">
                    Inspect Station 14 nutrunner T14 calibration before VIN 7HGB…9321 leaves Paint booth.
                  </div>
                </div>
              </div>
            </div>

            {/* GenAI Plain-English Evidence Explanation */}
            <div className="rounded-xl border border-purple-500/30 bg-panel-raised/60 p-5 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                  <span className="label-xs text-purple-400 font-semibold">
                    GenAI Root-Cause Explanation for VIN 7HGBH41JXMN109321
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Chip tone="signal">Confidence: 88%</Chip>
                  <Chip tone="danger">Severity: Structural</Chip>
                </div>
              </div>

              <div className="text-[13.5px] leading-relaxed text-foreground/90 space-y-2">
                <p>
                  <strong className="text-purple-300">Observation:</strong> Vehicle <strong>7HGB…9321 (X5 Sport)</strong> has an elevated structural risk score (0.86) due to an abnormal subframe torque reading (51.2 Nm vs 42–48 Nm baseline) at Station 14.
                </p>
                <p>
                  <strong className="text-purple-300">Contextual Synthesis:</strong> Tool T14 was last serviced 18 days ago (exceeding the 14-day calibration window). Simultaneously, a new fastener lot (Batch #4471 from Nord Fasteners) was introduced at 06:10 on Shift B, coinciding with operator A. Sharma's shift transition. Worker voice note confirmed: <em>"Torque felt inconsistent on the left mount."</em>
                </p>
                <p>
                  <strong className="text-purple-300">Prescribed Intervention:</strong> Hold VIN 7HGB…9321 at Station 21 for manual re-torque verification. Recalibrate Nutrunner T14 during the next scheduled shift change to protect 9 other exposed VINs.
                </p>
              </div>
            </div>
          </div>
        </Panel>

        {/* ========================================================================= */}
        {/* SECTION 2: ALARM PRIORITIZATION & FATIGUE PROTECTION */}
        {/* ========================================================================= */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Panel>
            <PanelHead
              index="02"
              title="Alarm Prioritization (10 Alerts → 1 Operational Issue)"
            />
            <div className="p-5 space-y-4">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Rather than flooding the floor supervisor with 20 raw sensor threshold alarms, alerts sharing the same underlying root cause are grouped into prioritized operational issues.
              </p>

              <div className="space-y-3">
                {ALERT_GROUPS.map((a) => {
                  const isSel = a.id === selectedAlert;
                  return (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAlert(a.id)}
                      className={cn(
                        "w-full flex flex-col p-4 rounded-xl border text-left transition-all cursor-pointer",
                        isSel
                          ? "border-purple-500 bg-purple-500/15 shadow-sm"
                          : "border-border/70 bg-panel/70 hover:border-purple-500/40 hover:bg-panel-raised"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Chip
                            tone={
                              a.priority === "HIGH"
                                ? "danger"
                                : a.priority === "MEDIUM"
                                ? "warn"
                                : "ok"
                            }
                          >
                            {a.priority} PRIORITY
                          </Chip>
                          <span className="font-mono text-[11px] text-muted-foreground">{a.id}</span>
                        </div>
                        <span className="font-mono text-[11px] font-bold text-purple-300">
                          {a.vins} VINs Impacted
                        </span>
                      </div>

                      <div className="text-[14px] font-semibold text-foreground">{a.title}</div>
                      <div className="mt-1 flex items-center justify-between text-[11.5px] text-muted-foreground">
                        <span>Severity: {a.severity}</span>
                        <span>Confidence: {Math.round(a.confidence * 100)}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Panel>

          {/* Grouped Alert Details */}
          <Panel>
            <PanelHead index="03" title={`Grouped Root Cause: ${alert.id}`} />
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div>
                  <div className="text-[15px] font-semibold text-foreground">{alert.title}</div>
                  <div className="label-xs mt-0.5 text-purple-400">ST-{String(alert.station).padStart(2, "0")} · {alert.rootCause}</div>
                </div>
                <Chip tone="danger">{alert.vins} VINs Grouped</Chip>
              </div>

              <div className="space-y-2">
                <div className="label-xs text-foreground/80 font-semibold">Grouped Individual Alarms (Suppressed):</div>
                <div className="space-y-1.5">
                  {alert.collapsed.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-border/70 bg-background/80 px-3 py-2 font-mono text-[11px]"
                    >
                      <span className="text-foreground/90">{c}</span>
                      <span className="text-purple-400 text-[10px]">Bundled →</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border/60">
                <Meter
                  value={alert.severityScore}
                  tone="danger"
                  label="Composite Priority Score"
                  right={`${Math.round(alert.severityScore * 100)}%`}
                />
              </div>
            </div>
          </Panel>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: DOWNSTREAM PROPAGATION PREDICTION */}
        {/* ========================================================================= */}
        <Panel>
          <PanelHead
            index="04"
            title="Downstream Propagation Prediction (Detect at Source, Not End of Line)"
          />
          <div className="p-5 space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <p className="max-w-3xl text-[13px] text-muted-foreground leading-relaxed">
                When an anomaly occurs at Station 14, the Digital Twin projects downstream risk propagation across subsequent manufacturing stages instead of discovering the defect after 36 stations at Final Inspection.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVinActionState("online")}
                  className={cn(
                    "px-3 py-1 font-mono text-[10.5px] rounded-md border transition-all cursor-pointer",
                    vinActionState === "online"
                      ? "border-purple-500 bg-purple-500/20 text-purple-300 font-semibold"
                      : "border-border/70 text-muted-foreground"
                  )}
                >
                  Still On Line
                </button>
                <button
                  onClick={() => setVinActionState("shipped")}
                  className={cn(
                    "px-3 py-1 font-mono text-[10.5px] rounded-md border transition-all cursor-pointer",
                    vinActionState === "shipped"
                      ? "border-rose-500 bg-rose-500/20 text-rose-300 font-semibold"
                      : "border-border/70 text-muted-foreground"
                  )}
                >
                  Already Shipped
                </button>
              </div>
            </div>

            {/* Propagation Chain */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <div className="p-4 rounded-xl border border-rose-500/60 bg-rose-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-rose-400">ST-14 ORIGIN</span>
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                </div>
                <div className="text-[13px] font-semibold text-foreground">Subframe Mount</div>
                <div className="text-[11.5px] text-rose-300 font-mono">Torque drift +3.1 Nm</div>
                <Chip tone="danger">Source Anomaly</Chip>
              </div>

              <div className="p-4 rounded-xl border border-amber-500/50 bg-amber-950/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-amber-400">ST-18 PREDICTED</span>
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                </div>
                <div className="text-[13px] font-semibold text-foreground">Sealer Apply</div>
                <div className="text-[11.5px] text-muted-foreground">Gap alignment shift</div>
                <Chip tone="warn">68% Risk Prop</Chip>
              </div>

              <div className="p-4 rounded-xl border border-amber-500/50 bg-amber-950/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-amber-400">ST-21 PREDICTED</span>
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                </div>
                <div className="text-[13px] font-semibold text-foreground">Base Coat</div>
                <div className="text-[11.5px] text-muted-foreground">Vibration stress flag</div>
                <Chip tone="warn">74% Risk Prop</Chip>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/50 bg-purple-950/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-purple-400">ST-28 PREDICTED</span>
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                </div>
                <div className="text-[13px] font-semibold text-foreground">Powertrain Marriage</div>
                <div className="text-[11.5px] text-muted-foreground">Mount bolt mismatch</div>
                <Chip tone="signal">82% Risk Prop</Chip>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-panel/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-muted-foreground">ST-36 FINAL</span>
                  <span className="h-2 w-2 rounded-full bg-zinc-500" />
                </div>
                <div className="text-[13px] font-semibold text-foreground">Final Inspection</div>
                <div className="text-[11.5px] text-muted-foreground">Late detection avoided</div>
                <Chip tone="ok">Prevented Scrap</Chip>
              </div>
            </div>

            {/* Immediate VIN Action Banner */}
            <div className="rounded-xl border border-purple-500/40 bg-purple-950/25 p-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-[13px] font-semibold text-foreground">
                  VIN 7HGBH41JXMN109321 Action Directive:
                </div>
                <div className="text-[12px] text-muted-foreground">
                  {vinActionState === "online"
                    ? "Vehicle is currently at ST-21 (Paint). Directive: Route to Buffer Bay B for recheck before ST-24 Final Assembly."
                    : "Vehicle has departed the plant. Directive: Flag VIN in warranty registry for proactive fastener service recall."}
                </div>
              </div>
              <ActionButton tone={vinActionState === "online" ? "signal" : "danger"}>
                {vinActionState === "online" ? "Pull Vehicle for Recheck" : "Flag for Recall / Service"}
              </ActionButton>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
