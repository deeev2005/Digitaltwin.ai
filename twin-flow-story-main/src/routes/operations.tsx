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
import { ALERT_GROUPS, STATIONS, VEHICLES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/operations")({
  head: () => ({
    meta: [
      { title: "Operational Views & Roles — DigitalTwin" },
      {
        name: "description",
        content:
          "Three personas, one single source of truth: Floor Supervisor, Plant Manager, and Executive Leadership views over the unified vehicle digital twin dataset.",
      },
      { property: "og:title", content: "Operational Views & Roles — DigitalTwin" },
      {
        property: "og:description",
        content: "Floor Supervisor · Plant Manager · Leadership views over the Digital Twin.",
      },
    ],
  }),
  component: OperationsScreen,
});

type Role = "supervisor" | "manager" | "leadership";

function OperationsScreen() {
  const [role, setRole] = useState<Role>("supervisor");

  return (
    <div className="tech-grid">
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-8">
        <ScreenTitle
          title="Role-Based Operational Lenses over the Unified Twin"
          lede="The same underlying per-VIN Digital Twin data serves three critical personas with zero data silos: Floor Supervisors acting in the moment, Plant Managers diagnosing systemic trends, and Leadership measuring ROI and business value."
          right={
            <div className="flex items-center gap-3">
              <Link to="/digital-twin">
                <ActionButton tone="ghost">← AI Command Center</ActionButton>
              </Link>
            </div>
          }
        />

        {/* Role Switcher Navigation Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-border/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="label-xs text-purple-400 font-semibold">Select Operational Perspective:</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRole("supervisor")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer",
                role === "supervisor"
                  ? "border-purple-500 bg-purple-500/20 text-purple-300 shadow-sm"
                  : "border-border/70 bg-panel/70 text-muted-foreground hover:text-foreground hover:bg-panel-raised"
              )}
            >
              <span>1. Floor Supervisor</span>
              <span className="text-[10px] opacity-70">(Real-Time)</span>
            </button>

            <button
              onClick={() => setRole("manager")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer",
                role === "manager"
                  ? "border-purple-500 bg-purple-500/20 text-purple-300 shadow-sm"
                  : "border-border/70 bg-panel/70 text-muted-foreground hover:text-foreground hover:bg-panel-raised"
              )}
            >
              <span>2. Plant Manager</span>
              <span className="text-[10px] opacity-70">(Trends & Drift)</span>
            </button>

            <button
              onClick={() => setRole("leadership")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-[11px] font-semibold tracking-wider uppercase transition-all cursor-pointer",
                role === "leadership"
                  ? "border-purple-500 bg-purple-500/20 text-purple-300 shadow-sm"
                  : "border-border/70 bg-panel/70 text-muted-foreground hover:text-foreground hover:bg-panel-raised"
              )}
            >
              <span>3. Leadership</span>
              <span className="text-[10px] opacity-70">(ROI & Scale)</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: FLOOR SUPERVISOR PERSPECTIVE */}
        {/* ========================================================================= */}
        {role === "supervisor" && (
          <div className="space-y-6">
            <Panel className="border-border/80 shadow-sm">
              <PanelHead
                index="SUPERVISOR"
                title="Floor Supervisor Live Cockpit · What Needs Attention Right Now?"
                right={<Chip tone="danger">1 Active Line Intervention</Chip>}
              />
              <div className="p-5 space-y-6">
                {/* TOP SUMMARY CARDS (WITH EXPANDED EXPOSED FLEET VIN BREAKDOWN) */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="p-4 rounded-xl border border-rose-500/50 bg-rose-950/20 space-y-1">
                    <span className="label-xs text-rose-400 font-bold">Current Urgent Action</span>
                    <div className="text-[16px] font-bold text-foreground">ST-14 Subframe Mount</div>
                    <p className="text-[11.5px] text-muted-foreground">Nutrunner T14 torque drifting +3.1 Nm</p>
                  </div>

                  {/* 4. EXPANDED EXPOSED FLEET CARD WITH LIVE VIN TABLE */}
                  <div className="p-4 rounded-xl border border-purple-500/40 bg-purple-950/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="label-xs text-purple-400 font-bold">Exposed Fleet on Line</span>
                      <Chip tone="danger">10 VINs Affected</Chip>
                    </div>
                    <div className="space-y-1.5 pt-0.5 font-mono text-[10.5px]">
                      {[
                        { vin: "7HGB…9321", st: "ST-21", risk: "86%", tone: "danger" as const },
                        { vin: "8XYZ…0118", st: "ST-17", risk: "74%", tone: "danger" as const },
                        { vin: "2MNO…8362", st: "ST-26", risk: "68%", tone: "warn" as const },
                        { vin: "9ZZT…6780", st: "ST-34", risk: "42%", tone: "warn" as const },
                        { vin: "4KLP…1109", st: "ST-14", risk: "88%", tone: "danger" as const },
                      ].map((item) => (
                        <div
                          key={item.vin}
                          className="flex items-center justify-between p-1 rounded border border-purple-500/25 bg-purple-950/40"
                        >
                          <span className="font-bold text-foreground">{item.vin}</span>
                          <span className="text-purple-300">{item.st}</span>
                          <Chip tone={item.tone}>{item.risk}</Chip>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] font-mono text-muted-foreground pt-0.5 border-t border-purple-500/20">
                      +5 additional exposed VINs in queue
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-1">
                    <span className="label-xs text-emerald-400 font-bold">Live Takt Pace</span>
                    <div className="text-[16px] font-bold text-emerald-300">58s / 60s Target</div>
                    <p className="text-[11.5px] text-muted-foreground">Line running at nominal takt velocity</p>
                  </div>

                  <div className="p-4 rounded-xl border border-border/80 bg-panel space-y-1">
                    <span className="label-xs text-muted-foreground font-bold">Shift B Status</span>
                    <div className="text-[16px] font-bold text-foreground">Operator: A. Sharma</div>
                    <p className="text-[11.5px] text-muted-foreground">Reassigned 3 shifts ago · ramp active</p>
                  </div>
                </div>

                {/* REAL-TIME TELEMETRY & INSTRUMENTATION ROW (ITEMS 1 & 5) */}
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* 1. LIVE SENSOR READOUT CARD */}
                  <div className="p-4 rounded-xl border border-rose-500/50 bg-rose-950/25 space-y-2.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                        <span className="label-xs text-rose-400 font-bold uppercase">ST-14 Live Feed · Nutrunner T14</span>
                      </div>
                      <Chip tone="danger">Live Sensor Stream</Chip>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between items-center bg-rose-950/40 p-2 rounded border border-rose-500/30">
                        <span className="text-foreground font-semibold">Torque (current cycle):</span>
                        <span className="text-rose-400 font-bold text-[12.5px]">
                          51.2 Nm ⚠ <span className="text-[10px] text-muted-foreground font-normal">(limit: 42–48 Nm)</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center px-2 py-0.5">
                        <span className="text-muted-foreground">Torque (rolling 10-cycle avg):</span>
                        <span className="text-amber-300 font-semibold">
                          49.6 Nm ↑ <span className="text-[9.5px] text-muted-foreground font-normal">(trending up)</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center px-2 py-0.5">
                        <span className="text-muted-foreground">Cycle time:</span>
                        <span className="text-amber-300 font-semibold">
                          66s ↑ <span className="text-[9.5px] text-muted-foreground font-normal">(target: 60s)</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center px-2 py-0.5">
                        <span className="text-muted-foreground">Tool vibration:</span>
                        <span className="text-amber-300 font-semibold">
                          0.82g ↑ <span className="text-[9.5px] text-muted-foreground font-normal">(baseline: 0.65g)</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center bg-rose-950/30 p-2 rounded border border-rose-500/20">
                        <span className="text-rose-300">Last calibration:</span>
                        <span className="text-rose-400 font-bold">
                          18 days ago ⚠ <span className="text-[9.5px] text-muted-foreground font-normal">(limit: 14 days)</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 5. SPC CONTROL CHART WIDGET */}
                  <SpcControlChart />
                </div>

                {/* 2. MULTI-STATION LIVE STATUS STRIP (ST-11 THROUGH ST-18) */}
                <div className="p-4 rounded-xl border border-border/80 bg-panel-raised/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      <span className="label-xs text-purple-300 font-bold uppercase tracking-wider">
                        Multi-Station Live Status Strip · Focus Window (ST-11 → ST-18)
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">Target Takt: 60s</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                    {[
                      { st: 11, name: "Subframe Prep", cycle: 58, status: "ok" },
                      { st: 12, name: "Crossmember", cycle: 59, status: "ok" },
                      { st: 13, name: "Geometry Gate", cycle: 61, status: "warn" },
                      { st: 14, name: "Subframe Mount", cycle: 66, status: "flag" },
                      { st: 15, name: "Steering Rack", cycle: 59, status: "ok" },
                      { st: 16, name: "Brake Lines", cycle: 60, status: "ok" },
                      { st: 17, name: "Underbody Seal", cycle: 62, status: "warn" },
                      { st: 18, name: "Sealer Apply", cycle: 64, status: "warn" },
                    ].map((item) => (
                      <div
                        key={item.st}
                        className={cn(
                          "p-2 rounded-lg border flex flex-col items-center justify-between text-center font-mono text-[10px]",
                          item.status === "flag"
                            ? "border-rose-500/60 bg-rose-950/30 text-rose-200"
                            : item.status === "warn"
                            ? "border-amber-500/40 bg-amber-950/20 text-amber-200"
                            : "border-border/70 bg-panel/70 text-foreground/90"
                        )}
                      >
                        <div className="flex items-center gap-1.5 font-bold">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full shrink-0",
                              item.status === "flag"
                                ? "bg-rose-500 animate-pulse"
                                : item.status === "warn"
                                ? "bg-amber-400"
                                : "bg-emerald-400"
                            )}
                          />
                          <span>ST-{item.st}</span>
                        </div>
                        <div className="text-[9px] text-muted-foreground truncate max-w-full my-0.5">{item.name}</div>
                        <div className={cn("font-bold text-[10.5px]", item.cycle > 60 ? "text-amber-300" : "text-emerald-400")}>
                          {item.cycle}s / 60s
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. BUFFER LEVELS MINI-PANEL */}
                <div className="p-4 rounded-xl border border-border/80 bg-panel-raised/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="label-xs text-purple-400 font-semibold">Live Station Buffer Levels (Upstream / Downstream ST-14)</span>
                    <Chip tone="warn">Flow Bottleneck Monitor</Chip>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {/* Buffer ST-13 -> ST-14 */}
                    <div className="space-y-1.5 p-2.5 rounded-lg border border-border/70 bg-panel">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-foreground font-medium">Buffer ST-13 → ST-14:</span>
                        <span className="text-amber-300 font-bold">4 / 6 Capacity (66%)</span>
                      </div>
                      <div className="h-2 w-full bg-panel-raised rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: "66%" }} />
                      </div>
                      <span className="text-[9.5px] font-mono text-muted-foreground">Upstream accumulation build-up</span>
                    </div>

                    {/* Buffer ST-14 -> ST-15 */}
                    <div className="space-y-1.5 p-2.5 rounded-lg border border-rose-500/40 bg-rose-950/20">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-rose-300 font-medium">Buffer ST-14 → ST-15:</span>
                        <span className="text-rose-400 font-bold">2 / 6 Capacity (33% · Draining ⚠)</span>
                      </div>
                      <div className="h-2 w-full bg-panel-raised rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full animate-pulse" style={{ width: "33%" }} />
                      </div>
                      <span className="text-[9.5px] font-mono text-rose-300">Downstream starvation hazard</span>
                    </div>

                    {/* Buffer ST-15 -> ST-16 */}
                    <div className="space-y-1.5 p-2.5 rounded-lg border border-border/70 bg-panel">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-foreground font-medium">Buffer ST-15 → ST-16:</span>
                        <span className="text-emerald-400 font-bold">5 / 6 Capacity (83%)</span>
                      </div>
                      <div className="h-2 w-full bg-panel-raised rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: "83%" }} />
                      </div>
                      <span className="text-[9.5px] font-mono text-muted-foreground">Nominal downstream buffer</span>
                    </div>
                  </div>
                </div>

                {/* IMMEDIATE ACTION DIRECTIVE FOR SHIFT B SUPERVISOR */}
                <div className="rounded-xl border border-purple-500/40 bg-panel-raised/80 p-5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                      <h4 className="text-[14px] font-bold text-foreground">
                        Immediate Action Directive for Shift B Supervisor
                      </h4>
                    </div>
                    <Chip tone="danger">Priority AG-1042</Chip>
                  </div>

                  <p className="text-[13px] text-foreground/90 leading-relaxed">
                    Route VIN <strong>7HGB…9321</strong> to Inspection Bay B upon leaving Paint Booth ST-21. Perform manual re-torque check on 6 subframe bolts. Recalibrate Nutrunner T14 during 14:00 shift change.
                  </p>

                  <div className="flex items-center gap-3">
                    <ActionButton tone="signal">Acknowledge & Dispatch Technician</ActionButton>
                    <ActionButton tone="ghost">Route Lead VIN to Recheck Bay</ActionButton>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: PLANT MANAGER PERSPECTIVE */}
        {/* ========================================================================= */}
        {role === "manager" && (
          <div className="space-y-6">
            <Panel className="border-border/80 shadow-sm">
              <PanelHead
                index="PLANT MANAGER"
                title="Plant Manager Overview · What Is Changing Over Time?"
                right={<Chip tone="signal">Weekly Trend Analytics</Chip>}
              />
              <div className="p-5 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="p-4 rounded-xl border border-border/80 bg-panel space-y-1">
                    <span className="label-xs text-muted-foreground font-bold">Rolling 30-Day Defect Containment</span>
                    <div className="text-[20px] font-bold text-emerald-400">99.2%</div>
                    <p className="text-[11.5px] text-muted-foreground">42 potential defects caught upstream</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/80 bg-panel space-y-1">
                    <span className="label-xs text-muted-foreground font-bold">Chronically Drifting Stations</span>
                    <div className="text-[20px] font-bold text-amber-400">2 Stations</div>
                    <p className="text-[11.5px] text-muted-foreground">ST-14 (Body) & ST-27 (Final)</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/80 bg-panel space-y-1">
                    <span className="label-xs text-muted-foreground font-bold">Shift Variance Ratio</span>
                    <div className="text-[20px] font-bold text-purple-300">Shift B: 1.4x</div>
                    <p className="text-[11.5px] text-muted-foreground">Higher variance during operator changeover</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/80 bg-panel space-y-1">
                    <span className="label-xs text-muted-foreground font-bold">Average Detection Latency</span>
                    <div className="text-[20px] font-bold text-purple-300">1.2 Stations</div>
                    <p className="text-[11.5px] text-muted-foreground">vs 22 stations baseline before Digital Twin</p>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="p-4 rounded-xl border border-border/80 bg-panel-raised/60 space-y-3">
                    <div className="label-xs text-purple-400 font-semibold">Station-by-Station Defect Origin Distribution</div>
                    <div className="space-y-2 font-mono text-[11.5px]">
                      <div className="flex justify-between"><span>ST-14 Subframe Mount:</span><span className="text-rose-400 font-bold">64% of flags</span></div>
                      <div className="flex justify-between"><span>ST-27 Brake Line Bolt:</span><span className="text-amber-400 font-bold">22% of flags</span></div>
                      <div className="flex justify-between"><span>ST-31 Cockpit Marriage:</span><span className="text-zinc-400 font-bold">14% of flags</span></div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-border/80 bg-panel-raised/60 space-y-3">
                    <div className="label-xs text-purple-400 font-semibold">Mixed-Model Baseline Compliance</div>
                    <div className="space-y-2 font-mono text-[11.5px]">
                      <div className="flex justify-between"><span>X5 Sport (Aluminium Subframe):</span><span className="text-emerald-400">97.8% in spec</span></div>
                      <div className="flex justify-between"><span>X5 Base (Steel Subframe):</span><span className="text-emerald-400">99.1% in spec</span></div>
                      <div className="flex justify-between"><span>C3 Touring (Extended Rail):</span><span className="text-emerald-400">98.5% in spec</span></div>
                    </div>
                  </div>

                  {/* NEW CARD 1: Instrumentation Roadmap */}
                  <div className="p-4 rounded-xl border border-border/80 bg-panel-raised/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="label-xs text-purple-400 font-semibold">Instrumentation Roadmap</div>
                      <Chip tone="warn">Q3 Upgrade Window</Chip>
                    </div>
                    <p className="text-[12px] text-foreground/90 leading-relaxed">
                      Next maintenance window (Q3): add torque sensors at <strong>ST-31, ST-33</strong> (highest inferred-risk, currently proxy-only) → Est. sensor coverage <strong className="text-emerald-400 font-mono">78% → 84%</strong>.
                    </p>
                  </div>

                  {/* NEW CARD 2: Data Confidence Breakdown */}
                  <div className="p-4 rounded-xl border border-border/80 bg-panel-raised/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="label-xs text-purple-400 font-semibold">Data Confidence Breakdown</div>
                      <Chip tone="ok">36 Stations Active</Chip>
                    </div>
                    <div className="space-y-1.5 font-mono text-[11.5px]">
                      <div className="flex justify-between">
                        <span className="text-emerald-400 font-bold">26 / 36 Stations:</span>
                        <span className="text-foreground">Measured (Direct Sensor)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-amber-400 font-bold">6 / 36 Stations:</span>
                        <span className="text-foreground">Proxy / Inferred Telemetry</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400 font-bold">4 / 36 Stations:</span>
                        <span className="text-foreground">Historical Baseline Only</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground italic pt-1 border-t border-border/60">
                      "Human worker notes contributed to 18% of confirmed flags this month."
                    </p>
                  </div>
                </div>

                {/* Shared Continuous Learning Status Card */}
                <ContinuousLearningCard />
              </div>
            </Panel>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: LEADERSHIP / EXECUTIVE PERSPECTIVE */}
        {/* ========================================================================= */}
        {role === "leadership" && (
          <div className="space-y-6">
            <Panel className="border-border/80 shadow-sm">
              <PanelHead
                index="LEADERSHIP"
                title="Executive Leadership Dashboard · Business Value & Scale"
                right={<Chip tone="ok">Enterprise ROI Metrics</Chip>}
              />
              <div className="p-5 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-1">
                    <span className="label-xs text-emerald-400 font-bold">Year-to-Date Scrap Avoidance</span>
                    <div className="text-[22px] font-bold text-emerald-300">$2.48M</div>
                    <p className="text-[11.5px] text-muted-foreground">Prevented tear-downs & yard recalls</p>
                  </div>
                  <div className="p-4 rounded-xl border border-purple-500/40 bg-purple-950/20 space-y-1">
                    <span className="label-xs text-purple-400 font-bold">Recall Exposure Reduction</span>
                    <div className="text-[22px] font-bold text-purple-300">-86%</div>
                    <p className="text-[11.5px] text-muted-foreground">Pinpoint VIN batch tracing in minutes</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/80 bg-panel space-y-1">
                    <span className="label-xs text-muted-foreground font-bold">Platform Rollout Progress</span>
                    <div className="text-[22px] font-bold text-foreground">3 Plants / 6 Lines</div>
                    <p className="text-[11.5px] text-muted-foreground">Ingolstadt, Pune, Puebla</p>
                  </div>
                  <div className="p-4 rounded-xl border border-border/80 bg-panel space-y-1">
                    <span className="label-xs text-muted-foreground font-bold">System Payback Period</span>
                    <div className="text-[22px] font-bold text-purple-300">4.2 Months</div>
                    <p className="text-[11.5px] text-muted-foreground">Across all instrumented lines</p>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {/* NEW CARD 1: Rollout Maturity by Site */}
                  <div className="p-4 rounded-xl border border-border/80 bg-panel-raised/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="label-xs text-purple-400 font-semibold">Rollout Maturity by Site</div>
                      <Chip tone="signal">Multi-Plant Readiness</Chip>
                    </div>
                    <div className="space-y-2 text-[12px]">
                      <div className="p-2.5 rounded-lg border border-purple-500/30 bg-purple-950/20 flex items-center justify-between flex-wrap gap-1 font-mono text-[11px]">
                        <span className="font-bold text-purple-300">Ingolstadt:</span>
                        <span className="text-foreground">Stage 3 (Full ML / GenAI)</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-950/20 flex items-center justify-between flex-wrap gap-1 font-mono text-[11px]">
                        <span className="font-bold text-amber-300">Pune:</span>
                        <span className="text-foreground">Stage 2 (SPC + partial ML)</span>
                      </div>
                      <div className="p-2.5 rounded-lg border border-border/70 bg-panel flex items-center justify-between flex-wrap gap-1 font-mono text-[11px]">
                        <span className="font-bold text-zinc-300">Puebla:</span>
                        <span className="text-foreground">Stage 1 (Proxy + Historical, onboarding)</span>
                      </div>
                    </div>
                  </div>

                  {/* NEW CARD 2: Defects-Per-Vehicle (DPV) Trend */}
                  <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/15 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="label-xs text-emerald-400 font-semibold">Defects-Per-Vehicle (DPV) Trend</div>
                      <Chip tone="ok">-38.7% Reduction</Chip>
                    </div>
                    <div className="flex items-baseline gap-3 pt-1">
                      <div className="text-[28px] font-bold text-emerald-300 font-mono">0.19 DPV</div>
                      <span className="text-[12px] font-mono text-muted-foreground">down from 0.31 DPV</span>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-relaxed pt-1 border-t border-border/60">
                      DPV trend: <strong className="text-emerald-300 font-mono">0.31 → 0.19</strong> over 2 quarters across all production lines.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-purple-500/30 bg-panel-raised/60 p-5 space-y-3">
                  <h4 className="text-[14px] font-bold text-foreground">
                    Strategic Impact: Shift from Post-Production Inspection to In-Flight Twin Intelligence
                  </h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    By constructing an individual Digital Twin for each VIN as it moves through the line, manufacturing operations eliminate the latency between defect creation and defect discovery, driving predictable yield and zero unexpected recalls.
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        )}
      </div>
    </div>
  );
}

function ContinuousLearningCard() {
  return (
    <div className="rounded-xl border border-purple-500/40 bg-purple-950/20 p-4 shadow-sm space-y-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="label-xs text-purple-300 font-bold uppercase tracking-wider">
            Continuous Learning Status
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <Chip tone="ok">88% Model Precision</Chip>
          <Chip tone="signal">+6% Feedback Loop</Chip>
        </div>
      </div>
      <p className="text-[12.5px] text-foreground/90 leading-relaxed font-medium">
        Model precision this quarter: <span className="text-purple-300 font-bold">82% → 88%</span> from confirmed floor feedback · <span className="text-emerald-400 font-semibold">340 flags reviewed, 312 confirmed true</span>.
      </p>
    </div>
  );
}

function SpcControlChart() {
  const points = [
    { cycle: 1, val: 44.8 },
    { cycle: 2, val: 45.2 },
    { cycle: 3, val: 44.5 },
    { cycle: 4, val: 45.6 },
    { cycle: 5, val: 45.1 },
    { cycle: 6, val: 44.9 },
    { cycle: 7, val: 45.3 },
    { cycle: 8, val: 46.0 },
    { cycle: 9, val: 45.8 },
    { cycle: 10, val: 46.2 },
    { cycle: 11, val: 46.5 },
    { cycle: 12, val: 47.1 },
    { cycle: 13, val: 47.8 },
    { cycle: 14, val: 48.4 },
    { cycle: 15, val: 49.1 },
    { cycle: 16, val: 49.8 },
    { cycle: 17, val: 50.4 },
    { cycle: 18, val: 50.9 },
    { cycle: 19, val: 51.0 },
    { cycle: 20, val: 51.2 },
  ];

  const minVal = 40.0;
  const maxVal = 53.0;
  const width = 360;
  const height = 110;

  const getY = (v: number) => height - ((v - minVal) / (maxVal - minVal)) * height;
  const getX = (i: number) => (i / (points.length - 1)) * (width - 20) + 10;

  const polylinePoints = points
    .map((p, i) => `${getX(i)},${getY(p.val)}`)
    .join(" ");

  const uclY = getY(48.0);
  const lclY = getY(42.0);
  const targetY = getY(45.0);

  return (
    <div className="p-4 rounded-xl border border-rose-500/50 bg-rose-950/25 space-y-2.5 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="label-xs text-rose-400 font-bold uppercase tracking-wider">
            ST-14 SPC Control Chart · Torque (Last 20 Cycles)
          </span>
        </div>
        <Chip tone="danger">UCL Breach (+3.2 Nm)</Chip>
      </div>

      <div className="relative pt-1">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[110px] overflow-visible">
          {/* LCL Line (42 Nm) */}
          <line x1="0" y1={lclY} x2={width} y2={lclY} stroke="rgba(245, 158, 11, 0.4)" strokeDasharray="3 3" strokeWidth="1" />
          <text x={width - 5} y={lclY - 3} fill="#F59E0B" fontSize="8" textAnchor="end" fontFamily="monospace">LCL: 42.0 Nm</text>

          {/* Nominal Target Line (45 Nm) */}
          <line x1="0" y1={targetY} x2={width} y2={targetY} stroke="rgba(16, 185, 129, 0.4)" strokeDasharray="2 2" strokeWidth="1" />
          <text x={width - 5} y={targetY - 3} fill="#10B981" fontSize="8" textAnchor="end" fontFamily="monospace">Nominal: 45.0 Nm</text>

          {/* UCL Line (48 Nm) */}
          <line x1="0" y1={uclY} x2={width} y2={uclY} stroke="rgba(244, 63, 94, 0.6)" strokeDasharray="3 3" strokeWidth="1.2" />
          <text x={width - 5} y={uclY - 3} fill="#F43F5E" fontSize="8" textAnchor="end" fontFamily="monospace">UCL: 48.0 Nm ⚠</text>

          {/* Polyline Data */}
          <polyline fill="none" stroke="#C084FC" strokeWidth="1.8" points={polylinePoints} />

          {/* Points */}
          {points.map((p, i) => {
            const isOol = p.val > 48.0;
            return (
              <g key={i}>
                <circle
                  cx={getX(i)}
                  cy={getY(p.val)}
                  r={isOol ? "4" : "2.5"}
                  fill={isOol ? "#F43F5E" : "#10B981"}
                  stroke={isOol ? "#FFFFFF" : "none"}
                  strokeWidth="0.8"
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex justify-between font-mono text-[9.5px] text-muted-foreground pt-1 border-t border-rose-500/20">
        <span>Cycle 1: 44.8 Nm</span>
        <span className="text-rose-400 font-bold">Cycle 20: 51.2 Nm (Out-of-Control)</span>
      </div>
    </div>
  );
}
