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
import {
  ALERT_GROUPS,
  MODEL_BASELINES,
  STATIONS,
  TWIN_HISTORY,
  VEHICLES,
  stationById,
} from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/digital-twin")({
  validateSearch: (search: Record<string, unknown>): { vin?: string | undefined; tab?: "architecture" | "vin" | undefined } => {
    return {
      vin: typeof search["vin"] === "string" ? (search["vin"] as string) : undefined,
      tab:
        search["tab"] === "architecture" || search["tab"] === "vin"
          ? (search["tab"] as "architecture" | "vin")
          : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Main AI Center — Architecture & Digital Twin" },
      {
        name: "description",
        content:
          "Main AI Center hub: Select between the AI Architecture (SPC, ML & GenAI) and live Vehicle Digital Twins.",
      },
      { property: "og:title", content: "Main AI Center — Architecture & Digital Twin" },
      {
        property: "og:description",
        content: "Explore AI Architecture (SPC, ML, GenAI) or inspect per-VIN Digital Twins.",
      },
    ],
  }),
  component: TwinScreen,
});

const SIGNAL_GROUPS = [
  {
    key: "machine",
    label: "Machine / sensor",
    tone: "ok" as const,
    items: ["Torque", "Temperature", "Pressure", "Cycle time", "Tool measurement"],
    y: 12,
  },
  {
    key: "proxy",
    label: "Proxy",
    tone: "warn" as const,
    items: ["Timestamp", "Andon pull", "Part scan", "Badge swipe"],
    y: 36,
  },
  {
    key: "human",
    label: "Human",
    tone: "human" as const,
    items: ["Handwritten note", "Voice note", "Checklist"],
    y: 60,
  },
  {
    key: "context",
    label: "Context",
    tone: "signal" as const,
    items: ["Operator", "Shift", "Supplier", "Part batch", "Tool ID", "Maintenance", "Environment"],
    y: 84,
  },
];

function TwinScreen() {
  const search = Route.useSearch();
  // If tab search param is given, use it; otherwise null means show the 2 options screen
  const [tab, setTab] = useState<"architecture" | "vin" | null>(search.tab ?? null);
  const [vin, setVin] = useState(search.vin ?? VEHICLES[0]!.vin);

  return (
    <div className="tech-grid">
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-8">
        {/* ========================================================================= */}
        {/* CASE 1: TWO OPTIONS SELECTION SCREEN (WHEN CLICKING MAIN AI CENTER) */}
        {/* ========================================================================= */}
        {tab === null && (
          <div className="space-y-8">
            <ScreenTitle
              eyebrow="Main AI Center · Operational Gateway"
              title="Select Main AI Center Destination"
              right={
                <Link to="/">
                  <ActionButton tone="ghost">← Back to Production Line</ActionButton>
                </Link>
              }
            />

            {/* SIX LARGE INTERACTIVE OPTION CARDS */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-2">
              {/* Option 1: Architecture Card */}
              <button
                type="button"
                onClick={() => setTab("architecture")}
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-purple-500/40 bg-panel/90 hover:border-purple-400 hover:bg-purple-950/20 transition-all duration-200 text-left cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-end">
                    <Chip tone="signal">AI Pipeline</Chip>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-foreground group-hover:text-purple-300 transition-colors">
                      Architecture Dashboard
                    </h3>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase">
                    Connected Intelligence
                  </span>
                  <span className="font-mono text-[12px] font-bold text-purple-300 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open Architecture Dashboard →
                  </span>
                </div>
              </button>

              {/* Option 2: Digital Twin Card */}
              <button
                type="button"
                onClick={() => setTab("vin")}
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-border/80 bg-panel/90 hover:border-purple-400 hover:bg-purple-950/20 transition-all duration-200 text-left cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-end">
                    <Chip tone="ok">Per VIN Twins</Chip>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-foreground group-hover:text-purple-300 transition-colors">
                      Vehicle Digital Twins
                    </h3>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase">
                    Station Telemetry
                  </span>
                  <span className="font-mono text-[12px] font-bold text-purple-300 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open Digital Twin Scene →
                  </span>
                </div>
              </button>

              {/* Option 3: Root Cause & Fleet Trace Card */}
              <Link
                to="/trace"
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-border/80 bg-panel/90 hover:border-purple-400 hover:bg-purple-950/20 transition-all duration-200 text-left cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-end">
                    <Chip tone="human">Fleet Trace</Chip>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-foreground group-hover:text-purple-300 transition-colors">
                      Root Cause Context &amp; Fleet Trace
                    </h3>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase">
                    Fleet Exposure
                  </span>
                  <span className="font-mono text-[12px] font-bold text-purple-300 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open Batch Trace →
                  </span>
                </div>
              </Link>

              {/* Option 4: Validation & OT Cybersecurity Card */}
              <Link
                to="/validation"
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-border/80 bg-panel/90 hover:border-purple-400 hover:bg-purple-950/20 transition-all duration-200 text-left cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-end">
                    <Chip tone="danger">Validation &amp; OT</Chip>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-foreground group-hover:text-purple-300 transition-colors">
                      Validation &amp; OT Cybersecurity
                    </h3>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase">
                    Security &amp; Safety
                  </span>
                  <span className="font-mono text-[12px] font-bold text-purple-300 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open Validation &amp; OT →
                  </span>
                </div>
              </Link>

              {/* Option 5: Operational Views Card */}
              <Link
                to="/operations"
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-border/80 bg-panel/90 hover:border-purple-400 hover:bg-purple-950/20 transition-all duration-200 text-left cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-end">
                    <Chip tone="signal">Operational Views</Chip>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-foreground group-hover:text-purple-300 transition-colors">
                      Role Based Operational Lenses
                    </h3>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase">
                    Multi Persona Lens
                  </span>
                  <span className="font-mono text-[12px] font-bold text-purple-300 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open Operational Views →
                  </span>
                </div>
              </Link>

              {/* Option 6: Scale & Configuration Card */}
              <Link
                to="/scale"
                className="group relative flex flex-col justify-between p-7 rounded-2xl border border-border/80 bg-panel/90 hover:border-purple-400 hover:bg-purple-950/20 transition-all duration-200 text-left cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:scale-[1.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-end">
                    <Chip tone="warn">Scale &amp; Roadmap</Chip>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-bold text-foreground group-hover:text-purple-300 transition-colors">
                      Scale &amp; Multi Plant Expansion
                    </h3>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-muted-foreground uppercase">
                    Configuration Driven
                  </span>
                  <span className="font-mono text-[12px] font-bold text-purple-300 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open Scale &amp; Roadmap →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 2: ARCHITECTURE DASHBOARD (SPC / ML / GENAI) */}
        {/* ========================================================================= */}
        {tab === "architecture" && (
          <div className="space-y-8">
            <ScreenTitle
              eyebrow="Main AI Center · Architecture Dashboard"
              title="AI Architecture"
              right={
                <div className="flex items-center gap-3">
                  <ActionButton tone="ghost" onClick={() => setTab(null)}>
                    ← AI Command Center
                  </ActionButton>
                </div>
              }
            />

            <ArchitectureDashboard />
          </div>
        )}

        {/* ========================================================================= */}
        {/* CASE 3: VEHICLE DIGITAL TWIN SCENE */}
        {/* ========================================================================= */}
        {tab === "vin" && (
          <div className="space-y-8">
            <ScreenTitle
              eyebrow="Main AI Center · Vehicle Digital Twin"
              title="Live Vehicle Digital Twins & Telemetry Stream"
              lede="Real-time per-VIN Digital Twin reconstruction aggregating sensor, proxy, and human notes across the 36-station line. Every signal is bound to a VIN and a station."
              right={
                <div className="flex items-center gap-3">
                  <ActionButton tone="ghost" onClick={() => setTab(null)}>
                    ← AI Command Center
                  </ActionButton>
                </div>
              }
            />

            <VinTwin vin={vin} onVin={setVin} onSwitchToArch={() => setTab("architecture")} />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// ARCHITECTURE DASHBOARD (SPC, CLASSICAL ML & GENAI REASONING PIPELINE)
// ============================================================================
function ArchitectureDashboard() {
  const [selectedAlert, setSelectedAlert] = useState(ALERT_GROUPS[0]!.id);
  const [vinActionState, setVinActionState] = useState<"online" | "shipped">("online");
  const [flowLevel, setFlowLevel] = useState<"station" | "vin" | "line">("station");

  return (
    <div className="space-y-8">
      {/* FLOW LEVEL NAVIGATION CONTROL */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border border-purple-500/30 bg-panel/90 shadow-md gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 font-mono text-[13px] font-bold border border-purple-500/40">
            ☵
          </div>
          <div>
            <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider font-bold block">
              Select Flow Level
            </span>
            <span className="text-[13px] font-semibold text-foreground">
              {flowLevel === "station" && "Scope: Single Station (ST-14): Detection & Reasoning"}
              {flowLevel === "vin" && "Scope: Single Vehicle (VIN 7HGB…9321): Longitudinal Station Chain"}
              {flowLevel === "line" && "Scope: Entire Assembly Line: Cross Station & Multi VIN Aggregation"}
            </span>
          </div>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-background/90 border border-border/80 gap-1 self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => setFlowLevel("station")}
            className={cn(
              "flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer",
              flowLevel === "station"
                ? "bg-purple-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-panel"
            )}
          >
            Station Wise Detection
          </button>
          <button
            type="button"
            onClick={() => setFlowLevel("vin")}
            className={cn(
              "flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer",
              flowLevel === "vin"
                ? "bg-purple-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-panel"
            )}
          >
            VIN Wise Digital Twin
          </button>
          <button
            type="button"
            onClick={() => setFlowLevel("line")}
            className={cn(
              "flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all cursor-pointer",
              flowLevel === "line"
                ? "bg-purple-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-panel"
            )}
          >
            Line Wide Aggregation
          </button>
        </div>
      </div>

      {/* SECTION 01: DYNAMIC FLOW DIAGRAM ACCORDING TO SELECTED TAB */}
      {flowLevel === "station" && <StationWiseDetectionFlow />}
      {flowLevel === "vin" && <VinWiseDigitalTwinFlow />}
      {flowLevel === "line" && <LineWideAggregationFlow />}

      {/* SECTION 02 & 03: Alarm Prioritization & Downstream Propagation */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* SECTION 02: ALARM PRIORITIZATION */}
        <Panel>
          <PanelHead
            title={
              flowLevel === "station"
                ? "Station Alarm Status: ST-14"
                : flowLevel === "vin"
                ? "This Vehicle's Alarm History"
                : "Alarm Prioritization (10 Alarms → 1 Grouped Issue)"
            }
            right={
              flowLevel === "station" ? (
                <Chip tone="danger">ST-14 Origin Only</Chip>
              ) : flowLevel === "vin" ? (
                <Chip tone="warn">VIN 7HGB…9321 Scope</Chip>
              ) : (
                <Chip tone="danger">10 Alarms → 3 Grouped Issues</Chip>
              )
            }
          />
          <div className="p-5 space-y-4">
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {flowLevel === "station" &&
                "Active alarms originating exclusively at Station 14 (Subframe Mount). Filtered to isolate station-level equipment and fastener drift."}
              {flowLevel === "vin" &&
                "Chronological alarm grouping tied to vehicle VIN 7HGB…9321 across every station passed on its manufacturing journey."}
              {flowLevel === "line" &&
                "Alerts sharing the same root cause are grouped into prioritized operational issues to protect operators against alarm fatigue."}
            </p>

            {/* STATION-WISE SCOPE: ST-14 ONLY */}
            {flowLevel === "station" && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-rose-500 bg-rose-950/20 shadow-sm space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Chip tone="danger">HIGH PRIORITY</Chip>
                      <span className="font-mono text-[11px] text-rose-300 font-bold">AG-1042</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-rose-300">
                      10 VINs Impacted (Tool T14 Drift)
                    </span>
                  </div>
                  <div className="text-[14px] font-bold text-foreground">
                    Subframe Bolt Torque Drift (Nutrunner T14)
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] text-muted-foreground font-mono">
                    <span>Severity: Critical</span>
                    <span>Confidence: 88%</span>
                  </div>
                  <div className="mt-2 p-2.5 rounded-lg border border-purple-500/30 bg-purple-950/30 font-mono text-[10px] text-purple-300 leading-snug">
                    Filtered View: Showing only ST-14 origin flags. AG-1043 (ST-27) and AG-1044 (ST-31) belong to other stations and are excluded from this station's scope.
                  </div>
                </div>
              </div>
            )}

            {/* VIN-WISE SCOPE: VIN 7HGB…9321 ONLY */}
            {flowLevel === "vin" && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-rose-500 bg-rose-950/20 shadow-sm space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <Chip tone="danger">HIGH PRIORITY</Chip>
                      <span className="font-mono text-[11px] text-rose-300 font-bold">AG-1042 (Lead VIN)</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-rose-300">
                      Origin: ST-14 Subframe Mount
                    </span>
                  </div>
                  <div className="text-[14px] font-bold text-foreground">
                    This vehicle is one of 10 VINs affected by Station 14 tool drift
                  </div>
                  <div className="flex items-center justify-between text-[11.5px] text-muted-foreground font-mono">
                    <span>Severity: Critical</span>
                    <span>Confidence: 88%</span>
                  </div>
                  <div className="mt-2 p-2.5 rounded-lg border border-rose-500/30 bg-rose-950/30 font-mono text-[10px] text-rose-300 leading-snug">
                    Flag Detail: Torque 51.2 Nm recorded on this chassis. Fastener joint requires buffer verification before paint bake ramp.
                  </div>
                </div>

                {/* Placeholder structure ready for any other station flags on this VIN */}
                <div className="p-3.5 rounded-xl border border-border/70 bg-panel/60 space-y-1.5 opacity-80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Chip tone="ok">Nominal</Chip>
                      <span className="font-mono text-[11px] text-muted-foreground">ST-01..13 Log</span>
                    </div>
                    <span className="font-mono text-[10.5px] text-emerald-400 font-semibold">13 Clean Passes</span>
                  </div>
                  <div className="text-[12.5px] font-medium text-foreground/90">
                    Precursor Stations: Zero Alarms Recorded
                  </div>
                  <p className="text-[10.5px] text-muted-foreground leading-snug">
                    No prior station-level flags or threshold violations recorded on this vehicle's journey.
                  </p>
                </div>
              </div>
            )}

            {/* LINE-WIDE SCOPE: ALL GROUPED ALARMS */}
            {flowLevel === "line" && (
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
                      <div className="mt-1 flex items-center justify-between text-[11.5px] text-muted-foreground font-mono">
                        <span>Severity: {a.severity}</span>
                        <span>Confidence: {Math.round(a.confidence * 100)}%</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </Panel>

        {/* SECTION 03: DOWNSTREAM PROPAGATION */}
        <Panel>
          <PanelHead
            title={
              flowLevel === "station"
                ? "Local Flag Detail"
                : flowLevel === "vin"
                ? "Downstream Propagation Prediction · VIN 7HGB…9321"
                : "Aggregate Propagation Risk Across Active VINs"
            }
            right={
              flowLevel === "station" ? (
                <Chip tone="danger">ST-14 Local Scope</Chip>
              ) : flowLevel === "vin" ? (
                <Chip tone="warn">3 Predicted Stages</Chip>
              ) : (
                <Chip tone="signal">3 At-Risk VINs</Chip>
              )
            }
          />
          <div className="p-5 space-y-4">
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              {flowLevel === "station" &&
                "ST-14 flagged: torque 51.2 Nm vs 42-48 Nm limit. Propagation risk to downstream stations is calculated at the VIN level (see VIN Wise view)."}
              {flowLevel === "vin" &&
                "When an anomaly occurs at Station 14, the Digital Twin projects downstream risk propagation across subsequent manufacturing stages specifically for VIN 7HGB…9321 instead of discovering the defect after 36 stations at Final Inspection."}
              {flowLevel === "line" &&
                "3 VINs currently show active downstream propagation risk from Station-14-origin flags; 1 VIN (7HGB…9321) has the highest cumulative risk (82% at Powertrain Marriage)."}
            </p>

            {/* STATION-WISE SCOPE: LOCAL FLAG DETAIL */}
            {flowLevel === "station" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5 font-mono text-[10.5px]">
                  <div className="p-3 rounded-xl border border-rose-500/50 bg-rose-950/20 space-y-1">
                    <span className="text-muted-foreground">Subframe Bolt Torque:</span>
                    <div className="text-[13px] font-bold text-rose-300">51.2 Nm (Flagged)</div>
                    <span className="text-[9.5px] text-muted-foreground">Limit Band: 42.0 - 48.0 Nm</span>
                  </div>
                  <div className="p-3 rounded-xl border border-amber-500/40 bg-amber-950/20 space-y-1">
                    <span className="text-muted-foreground">Press Vibration:</span>
                    <div className="text-[13px] font-bold text-amber-300">+12% drift</div>
                    <span className="text-[9.5px] text-muted-foreground">Harmonic frequency shift</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/80 bg-background/80 space-y-1">
                    <span className="text-muted-foreground">Fastener Nutrunner:</span>
                    <div className="text-[12px] font-bold text-foreground">Tool T14</div>
                    <span className="text-[9.5px] text-amber-400">18 days unserviced (&gt;14d)</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/80 bg-background/80 space-y-1">
                    <span className="text-muted-foreground">Part Batch:</span>
                    <div className="text-[12px] font-bold text-foreground">Batch #4471</div>
                    <span className="text-[9.5px] text-muted-foreground">Nord Fasteners supplier</span>
                  </div>
                </div>

                <div className="rounded-xl border border-purple-500/40 bg-purple-950/25 p-3.5 space-y-1 font-mono text-[10.5px]">
                  <span className="text-purple-300 font-bold block">Scope Boundary:</span>
                  <p className="text-muted-foreground leading-snug">
                    A station only knows about its own local sensor readings. Downstream defect propagation (ST-18 Sealer, ST-21 Base Coat, ST-28 Powertrain) is vehicle-specific and computed across the vehicle's longitudinal twin.
                  </p>
                </div>
              </div>
            )}

            {/* VIN-WISE SCOPE: VIN PROPAGATION CHAIN */}
            {flowLevel === "vin" && (
              <div className="space-y-3">
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="p-3.5 rounded-xl border border-rose-500/60 bg-rose-950/20 space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-rose-400 font-bold">
                      <span>ST-14 ORIGIN</span>
                      <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    </div>
                    <div className="text-[13px] font-semibold text-foreground">Subframe Mount</div>
                    <div className="text-[11px] text-rose-300 font-mono">Torque drift +3.1 Nm</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-amber-500/50 bg-amber-950/15 space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-amber-400 font-bold">
                      <span>ST-18 PREDICTED</span>
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div className="text-[13px] font-semibold text-foreground">Sealer Apply</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Gap alignment shift (68%)</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-amber-500/50 bg-amber-950/15 space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-amber-400 font-bold">
                      <span>ST-21 PREDICTED</span>
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                    </div>
                    <div className="text-[13px] font-semibold text-foreground">Base Coat</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Vibration stress flag (74%)</div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-purple-500/50 bg-purple-950/15 space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-purple-400 font-bold">
                      <span>ST-28 PREDICTED</span>
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                    </div>
                    <div className="text-[13px] font-semibold text-foreground">Powertrain Marriage</div>
                    <div className="text-[11px] text-muted-foreground font-mono">Mount bolt mismatch (82%)</div>
                  </div>
                </div>

                <div className="rounded-xl border border-purple-500/40 bg-purple-950/25 p-3.5 flex items-center justify-between flex-wrap gap-2">
                  <div className="text-[12px] text-foreground/90 font-medium">
                    Lead VIN 7HGB…9321 Action:
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setVinActionState("online")}
                      className={cn(
                        "px-2.5 py-1 font-mono text-[10px] rounded-md border transition-all cursor-pointer",
                        vinActionState === "online"
                          ? "border-purple-500 bg-purple-500/20 text-purple-300 font-semibold"
                          : "border-border/70 text-muted-foreground"
                      )}
                    >
                      On Line (Buffer Hold)
                    </button>
                    <button
                      onClick={() => setVinActionState("shipped")}
                      className={cn(
                        "px-2.5 py-1 font-mono text-[10px] rounded-md border transition-all cursor-pointer",
                        vinActionState === "shipped"
                          ? "border-rose-500 bg-rose-500/20 text-rose-300 font-semibold"
                          : "border-border/70 text-muted-foreground"
                      )}
                    >
                      Shipped (Recall Review)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* LINE-WIDE SCOPE: AGGREGATE FLEET ROLLUP */}
            {flowLevel === "line" && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5 font-mono text-[10.5px]">
                  <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-950/20 space-y-1">
                    <span className="text-muted-foreground">Active At-Risk Fleet:</span>
                    <div className="text-[13px] font-bold text-rose-300">3 Online VINs</div>
                    <span className="text-[9.5px] text-muted-foreground">Traversing Stations 15–24</span>
                  </div>
                  <div className="p-3 rounded-xl border border-purple-500/40 bg-purple-950/20 space-y-1">
                    <span className="text-muted-foreground">Peak Fleet Risk Point:</span>
                    <div className="text-[13px] font-bold text-purple-300">ST-28 (82%)</div>
                    <span className="text-[9.5px] text-muted-foreground">Lead VIN 7HGB…9321</span>
                  </div>
                  <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-1">
                    <span className="text-muted-foreground">Buffer Containment:</span>
                    <div className="text-[12px] font-bold text-emerald-300">ST-21 Ingress</div>
                    <span className="text-[9.5px] text-muted-foreground">Hold scheduled pre-bake</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/80 bg-background/80 space-y-1">
                    <span className="text-muted-foreground">Fleet Cost Avoided:</span>
                    <div className="text-[12px] font-bold text-foreground">$184,000</div>
                    <span className="text-[9.5px] text-emerald-400 font-semibold">10 VINs Protected</span>
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/25 p-3.5 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                  <span className="text-emerald-300 font-bold">Fleet Protection Active:</span>
                  <span className="text-foreground/90">
                    Lead VIN 7HGB…9321 held at ST-21 buffer. 2 trailing VINs queued for re-torque.
                  </span>
                  <Chip tone="ok">100% Contained</Chip>
                </div>
              </div>
            )}
          </div>
        </Panel>
      </div>

      {/* SECTION 04: Continuous Learning Feedback Loop */}
      <Panel className="border-border/80 shadow-sm">
        <PanelHead
          title={
            flowLevel === "station"
              ? "Station Model Feedback (ST-14 Local Tuning)"
              : flowLevel === "vin"
              ? "This Vehicle's Twin Update & Historical Record"
              : "Fleet-Wide Learning Summary (Line-Wide Model Retraining)"
          }
          right={
            flowLevel === "station" ? (
              <Chip tone="ok">ST-14 Model Active</Chip>
            ) : flowLevel === "vin" ? (
              <Chip tone="signal">Twin History Logged</Chip>
            ) : (
              <Chip tone="ok">Closed Loop Active</Chip>
            )
          }
        />
        <div className="p-5 space-y-4">
          {/* STATION-WISE SCOPE: STATION 14 MODEL FEEDBACK */}
          {flowLevel === "station" && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-center font-mono text-[11px]">
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-purple-300 font-bold">Station Inspection</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Shift B supervisor verifies Nutrunner T14 calibration & joint torque
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-purple-300 font-bold">Station Log Update</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Confirmed 51.2 Nm reading recorded to ST-14 local baseline
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-emerald-300 font-bold">Retrain ST-14 Model</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    SPC baseline bands & ML anomaly weights recalibrated
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-950/30 space-y-1">
                  <span className="text-purple-300 font-bold">Station Precision</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Higher detection precision on subsequent ST-14 cycles
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[12.5px] text-foreground/90">
                    <strong>Station Model Feedback:</strong> Supervisor confirmed ST-14 torque flag as TRUE: this station's model confidence increased from 82% to 88%.
                  </span>
                </div>
                <Chip tone="ok">+6% Model Confidence</Chip>
              </div>
            </>
          )}

          {/* VIN-WISE SCOPE: THIS VEHICLE'S TWIN UPDATE */}
          {flowLevel === "vin" && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-center font-mono text-[11px]">
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-purple-300 font-bold">Physical Verification</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    ST-14 torque flag verified TRUE on chassis 7HGB…9321
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-purple-300 font-bold">Immutable VIN Log</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    True positive permanently recorded in VIN twin passport
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-emerald-300 font-bold">Propagation Retraining</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Training pair added for downstream ST-18/21/28 risk models
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-950/30 space-y-1">
                  <span className="text-purple-300 font-bold">Lifecycle Traceability</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Full audit trail preserved for warranty & recall defense
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-purple-400" />
                  <span className="text-[12.5px] text-foreground/90">
                    <strong>This Vehicle's Twin Update:</strong> This VIN's flag at ST-14 was confirmed TRUE by inspection: logged permanently to this VIN's twin history, contributing to the retraining of the ST-14 model and any propagation model using this VIN as a training example.
                  </span>
                </div>
                <Chip tone="signal">Logged to VIN Twin</Chip>
              </div>
            </>
          )}

          {/* LINE-WIDE SCOPE: FLEET-WIDE LEARNING SUMMARY */}
          {flowLevel === "line" && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-center font-mono text-[11px]">
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-purple-300 font-bold">Plant-Wide Inspection</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    4 alerts confirmed TRUE, 1 dismissed as false alarm across line
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-purple-300 font-bold">Fleet Pattern Ingestion</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Cross-station correlations updated across all 36 stations
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-border/80 bg-background/80 space-y-1">
                  <span className="text-emerald-300 font-bold">Model Retraining</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Net effect: 2 station models updated (ST-14, ST-27)
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-purple-500/40 bg-purple-950/30 space-y-1">
                  <span className="text-purple-300 font-bold">Fleet Precision</span>
                  <p className="text-[10.5px] text-muted-foreground">
                    Higher precision across all subsequent takt cycles
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-4 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-[12.5px] text-foreground/90">
                    <strong>Fleet-Wide Learning Summary:</strong> This shift: 4 alerts confirmed TRUE, 1 dismissed as false alarm across the line. Net effect: 2 station models updated (ST-14, ST-27), overall fleet-wide alert precision up 3% week-over-week.
                  </span>
                </div>
                <Chip tone="ok">+3% Fleet Precision</Chip>
              </div>
            </>
          )}
        </div>
      </Panel>
    </div>
  );
}

// ============================================================================
// 1. STATION-WISE DETECTION FLOW (VERTICAL BRANCHING TREE DIAGRAM)
// ============================================================================
function StationWiseDetectionFlow() {
  // Nodes in tree sequence:
  // Level 1: 'plc' (1. PLC / Station Sensor)
  // Level 2: 'ot' (2. OT Integration & Data Diode)
  // Level 3 (Branching fork): 'tier1a' (3a. SPC) & 'tier1b' (3b. Physics-Informed)
  // Level 4 (Merge back): 'tier2' (4. Tier 2 Classical ML)
  // Level 5: 'gate' (5. Validation Gate Checkpoint)
  // Level 6: 'tier3' (6. Tier 3 GenAI Reasoning)
  // Level 7: 'action' (7. Output & Action)

  // Default: start with 'tier3' open for immediate root-cause insight
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set(["tier3"]));
  const [multiMode, setMultiMode] = useState(false);

  const toggleNode = (nodeId: string) => {
    setOpenNodes((prev) => {
      if (multiMode) {
        const next = new Set(prev);
        if (next.has(nodeId)) next.delete(nodeId);
        else next.add(nodeId);
        return next;
      } else {
        if (prev.has(nodeId)) return new Set();
        return new Set([nodeId]);
      }
    });
  };

  const expandAll = () => {
    setOpenNodes(new Set(["plc", "ot", "tier1a", "tier1b", "tier2", "gate", "worker_notes", "tier3", "action"]));
  };

  const collapseAll = () => {
    setOpenNodes(new Set());
  };

  const isExpanded = (id: string) => openNodes.has(id);
  const anyExpanded = openNodes.size > 0;
  const pulseClass = anyExpanded ? "wire-dash-slow" : "wire-dash";

  return (
    <Panel className="border-border/80 shadow-md overflow-hidden">
      <PanelHead
        title="Interactive Intelligence Pipeline · Station Wise Detection"
        right={
          <div className="flex items-center gap-2">
            <span className="label-xs text-purple-400 font-semibold mr-1">
              Active Stream: <span className="text-foreground">VIN 7HGB…9321</span>
            </span>
            <button
              type="button"
              onClick={() => setMultiMode(!multiMode)}
              className={cn(
                "px-2.5 py-1 text-[10px] font-mono border rounded-md transition-colors cursor-pointer",
                multiMode
                  ? "border-purple-500 bg-purple-500/20 text-purple-300 font-semibold"
                  : "border-border/70 text-muted-foreground hover:text-foreground"
              )}
              title="Toggle multi-expand comparison mode"
            >
              {multiMode ? "Multi-Select: ON" : "Single Focus"}
            </button>
            <button
              type="button"
              onClick={expandAll}
              className="px-2.5 py-1 text-[10px] font-mono border border-border/70 rounded-md bg-panel-raised/60 hover:border-purple-500/40 text-purple-300 transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2.5 py-1 text-[10px] font-mono border border-border/70 rounded-md bg-panel-raised/60 hover:border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        }
      />

      <div className="p-5 space-y-6">
        {/* Scope Header Label & Instruction Banner */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-[12.5px] text-muted-foreground border-b border-border/70 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-400 animate-pulse" />
            <div>
              <div className="label-xs text-purple-400 font-bold tracking-wide">
                Scope: Single Station (ST-14): Detection &amp; Reasoning
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>Flagged Signal</span>
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Pattern Drift</span>
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>GenAI Reasoned</span>
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* VERTICAL BRANCHING TREE DIAGRAM */}
        {/* ================================================================= */}
        <div className="relative w-full max-w-[1240px] mx-auto py-2">
          {/* LEVEL 1: PLC / Station Sensor */}
          <div className="max-w-[500px] mx-auto">
            <FlowNode
              id="plc"
              title="PLC / Station Sensor"
              subtitle="ST-14 Subframe Mount"
              badge="Raw Signal Origin"
              tone="danger"
              isOpen={isExpanded("plc")}
              onToggle={() => toggleNode("plc")}
              hasActiveFlag
              icon="ST-14"
            >
              <div className="space-y-2 text-[11.5px]">
                <div className="label-xs text-rose-400 font-bold">Raw Telemetry Feeding In (Cycle #1093)</div>
                <div className="rounded-lg border border-border/80 bg-background/90 p-2.5 font-mono text-[10.5px] space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subframe Torque:</span>
                    <span className="text-rose-400 font-bold">51.2 Nm (Over limit)</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Press Vibration:</span>
                    <span className="text-amber-400">+12% deviation</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Paint Booth Temp:</span>
                    <span className="text-amber-400">23.8°C (+2.4°C drift)</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Cycle Time:</span>
                    <span className="text-muted-foreground">65s (+7s drift)</span>
                  </div>
                </div>
                <div className="pt-1 text-[10.5px] text-muted-foreground space-y-0.5 font-mono">
                  <div>Tool: Nutrunner T14 (Age: 18d)</div>
                  <div>Part Batch: #4471 (Nord Fasteners)</div>
                  <div>Operator: A. Sharma · Shift B</div>
                  <div className="text-purple-300 italic">"Torque felt inconsistent on left mount"</div>
                </div>
              </div>
            </FlowNode>
          </div>

          {/* CONNECTOR 1: 1 → 2 */}
          <VerticalWire pulseClass={pulseClass} color="#F43F5E" />

          {/* LEVEL 2: OT Integration & Hardware Data Diode */}
          <div className="max-w-[500px] mx-auto">
            <FlowNode
              id="ot"
              title="OT Integration"
              subtitle="Hardware Data Diode"
              badge="Read Only Air Gap"
              tone="neutral"
              isOpen={isExpanded("ot")}
              onToggle={() => toggleNode("ot")}
              icon="DIODE"
            >
              <div className="space-y-2 text-[11px]">
                <div className="label-xs text-zinc-300 font-bold">5-Stage Hardware Isolation</div>
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="p-1.5 rounded bg-background/80 border border-border/70">
                    <span className="text-purple-300 font-semibold">Legacy PLCs:</span> Proprietary Modbus RTU (No write access)
                  </div>
                  <div className="p-1.5 rounded bg-background/80 border border-border/70">
                    <span className="text-purple-300 font-semibold">Edge Gateway:</span> Translates tags to OPC-UA/MQTT
                  </div>
                  <div className="p-1.5 rounded bg-background/80 border border-border/70">
                    <span className="text-purple-300 font-semibold">Process Historian:</span> Direct low-risk query tap
                  </div>
                  <div className="p-1.5 rounded bg-emerald-950/20 border border-emerald-500/40 text-emerald-300">
                    <span className="font-semibold">Data Diode:</span> Optical 1 way physics gate (Zero packet return)
                  </div>
                  <div className="p-1.5 rounded bg-purple-950/20 border border-purple-500/40 text-purple-300">
                    <span className="font-semibold">AI Core:</span> Separated inference network
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground italic pt-1 leading-tight">
                  "Read only by architecture, not just by policy: twin can never touch machinery."
                </p>
              </div>
            </FlowNode>
          </div>

          {/* CONNECTOR 2: FORK (2 → 3a & 3b) */}
          <ForkWire pulseClass={pulseClass} />

          {/* LEVEL 3: PARALLEL BRANCHES (SPC & Physics-Informed) */}
          <div className="max-w-[760px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Branch 3a: Tier 1A SPC Control */}
              <FlowNode
                id="tier1a"
                title="Tier 1A · SPC Control"
                subtitle="Statistical Threshold Check"
                badge="SPC Limit Flag"
                tone="danger"
                isOpen={isExpanded("tier1a")}
                onToggle={() => toggleNode("tier1a")}
                hasActiveFlag
                icon="SPC"
              >
                <div className="space-y-2 text-[11px]">
                  <div className="label-xs text-rose-400 font-bold">Statistical Process Control</div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    Catches immediate single-variable threshold violations against model-trim specific control limits.
                  </p>
                  <div className="rounded-lg border border-rose-500/40 bg-rose-950/20 p-2 space-y-1 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-rose-300 font-bold uppercase text-[9.5px]">
                      <span>Subframe Bolt Torque</span>
                      <span className="text-rose-400">FLAGGED</span>
                    </div>
                    <div className="text-muted-foreground">Baseline (X5 Sport): 42–48 Nm</div>
                    <div className="text-rose-400 font-bold">Current: 51.2 Nm (Over limit)</div>
                  </div>
                </div>
              </FlowNode>

              {/* Branch 3b: Tier 1B Physics-Informed Model */}
              <FlowNode
                id="tier1b"
                title="Tier 1B · Physics Informed"
                subtitle="Safety Joint Margin Check"
                badge="Margin Exceeded"
                tone="danger"
                isOpen={isExpanded("tier1b")}
                onToggle={() => toggleNode("tier1b")}
                hasActiveFlag
                icon="PHY"
              >
                <div className="space-y-2 text-[11px]">
                  <div className="label-xs text-purple-400 font-bold">Physics Informed Joint Model</div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    Uses known engineering torque-to-joint-failure curves rather than only historical statistics, giving defensible risk estimates even at sensor-poor stations.
                  </p>
                  <div className="rounded-lg border border-purple-500/40 bg-purple-950/25 p-2 space-y-1 text-[10.5px]">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-purple-300 font-bold uppercase text-[9.5px]">Joint Pre-Load Stress</span>
                      <span className="text-emerald-400 text-[8.5px] font-bold">Safety Joint</span>
                    </div>
                    <p className="text-[10px] text-purple-200 leading-snug font-mono">
                      Subframe bolt: known failure curve indicates &gt;50 Nm exceeds safe joint pre-load margin, independent of historical baseline.
                    </p>
                  </div>
                </div>
              </FlowNode>
            </div>
          </div>

          {/* CONNECTOR 3: 3a & 3b (Tier 1) → 4 (Tier 2 Classical ML) & Direct Telemetry Signal Lines to 6 */}
          <Tier1BranchWire pulseClass={pulseClass} />

          {/* MIDDLE ZONE (Centered Level 4 ML + Level 5 Validation Gate with unbroken side telemetry signal lines to 6) */}
          <div className="relative max-w-[760px] mx-auto">
            {/* Direct Signal Line from 3a (SPC Flag) running down left rail to 6 */}
            <div className="hidden md:block absolute left-[24px] top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none z-0">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
                <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(244,63,94,0.25)" strokeWidth="2" strokeDasharray="4 6" />
                <line x1="1" y1="0" x2="1" y2="100" stroke="#F43F5E" strokeWidth="2.5" className={pulseClass} />
              </svg>
            </div>

            {/* Direct Signal Line from 3b (Physics Margin) running down right rail to 6 */}
            <div className="hidden md:block absolute right-[24px] top-0 bottom-0 w-[2px] translate-x-1/2 pointer-events-none z-0">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
                <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(168,85,247,0.25)" strokeWidth="2" strokeDasharray="4 6" />
                <line x1="1" y1="0" x2="1" y2="100" stroke="#A855F7" strokeWidth="2.5" className={pulseClass} />
              </svg>
            </div>

            <div className="space-y-0 relative z-10">
              {/* LEVEL 4: Tier 2 · Classical Multi-Variable ML */}
              <div className="max-w-[500px] mx-auto">
                <FlowNode
                  id="tier2"
                  title="Tier 2 · Classical ML"
                  subtitle="Multi Variable Pattern"
                  badge="Pattern Detected"
                  tone="warn"
                  isOpen={isExpanded("tier2")}
                  onToggle={() => toggleNode("tier2")}
                  icon="ML"
                >
                  <div className="space-y-2 text-[11px]">
                    <div className="label-xs text-amber-400 font-bold">Correlated Multi Factor Drift</div>
                    <p className="text-[10px] text-muted-foreground leading-snug">
                      Catches multi variable drift combinations where each metric individually passes standard limits.
                    </p>
                    <div className="rounded-lg border border-border/80 bg-background/80 p-2 font-mono text-[9.5px] space-y-1">
                      <div className="text-amber-300">• Press vibration: +12% drift</div>
                      <div className="text-amber-300">• Paint temp: 2.4°C above spec</div>
                      <div className="text-amber-300">• Torque elevated: +3.1 Nm</div>
                      <div className="text-amber-300">• Tool T14 age: 18 days</div>
                      <div className="text-amber-300">• Part batch: #4471</div>
                      <div className="text-amber-300">• Cycle time: +7s drift</div>
                    </div>
                  </div>
                </FlowNode>
              </div>

              {/* CONNECTOR 4: ML → Gate (4 → 5) */}
              <VerticalWire pulseClass={pulseClass} color="#F59E0B" />

              {/* LEVEL 5: Validation Gate Checkpoint */}
              <div className="max-w-[500px] mx-auto">
                <FlowNode
                  id="gate"
                  title="Validation Gate"
                  subtitle="Shadow Mode Checkpoint"
                  badge="94% Backtest (6 wks)"
                  tone="ok"
                  isOpen={isExpanded("gate")}
                  onToggle={() => toggleNode("gate")}
                  isGateCheckpoint
                  icon="GATE"
                >
                  <div className="space-y-2 text-[11px]">
                    <div className="label-xs text-emerald-400 font-bold">Shadow Mode &amp; Backtesting</div>
                    <p className="text-[10px] text-muted-foreground leading-snug">
                      Predictions run silently against historical outcomes before triggering live floor alerts. Transferred patterns from other plants also re-enter shadow mode locally.
                    </p>
                    <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/20 p-2 text-center font-mono text-[10px] text-emerald-300 space-y-0.5">
                      <div className="font-bold">Model Status: VALIDATED</div>
                      <div className="text-[9px] text-muted-foreground">94% accuracy over 6-week backtest</div>
                    </div>
                  </div>
                </FlowNode>
              </div>
            </div>
          </div>

          {/* CONNECTOR 5: Convergence of Direct 3a/3b Signal Lines + Validated ML Line into 6 */}
          <ConvergenceToGenAIWire pulseClass={pulseClass} />

          {/* LEVEL 6: Tier 3 · GenAI Reasoning with Separate Side Worker Notes Node */}
          <div className="relative w-full">
            {/* Main GenAI Node centered in the main flow */}
            <div className="max-w-[500px] mx-auto">
              <FlowNode
                id="tier3"
                title="Tier 3 · GenAI Reasoning"
                subtitle="Dual Input Evidence Synthesis"
                badge="88% Confidence"
                tone="signal"
                isOpen={isExpanded("tier3")}
                onToggle={() => toggleNode("tier3")}
                icon="GENAI"
              >
                <div className="space-y-2.5 text-[11px]">
                  <div className="label-xs text-purple-400 font-bold">
                    GenAI Dual Input Evidence Synthesis for VIN 7HGB…9321
                  </div>

                  {/* Explicit Inputs Received Box */}
                  <div className="rounded-lg border border-purple-500/40 bg-purple-950/40 p-2.5 space-y-1.5 font-mono text-[10px]">
                    <div className="text-purple-300 font-bold uppercase tracking-wider text-[9.5px]">
                      Inputs Received:
                    </div>
                    <div className="text-rose-300 flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold shrink-0">From SPC/Physics:</span>
                      <span>raw threshold violation (torque 51.2 Nm vs. 42-48 Nm limit, safe joint margin exceeded)</span>
                    </div>
                    <div className="text-amber-300 flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold shrink-0">From Classical ML:</span>
                      <span>multi factor risk score 0.86, contributing factors: tool age (18d), batch change (#4471), cycle time drift (+7s), press vibration (+12%)</span>
                    </div>
                    <div className="text-indigo-300 flex items-start gap-1.5">
                      <span className="text-indigo-400 font-bold shrink-0">From Worker Notes (Side Stream):</span>
                      <span>speech to text voice note ("Torque felt inconsistent on left mount") + OCR shift logs</span>
                    </div>
                  </div>

                  {/* Synthesis & Action */}
                  <div className="space-y-1.5 text-[10.5px] leading-snug text-foreground/90 pt-1">
                    <div>
                      <strong className="text-purple-300">Observation:</strong> Vehicle 7HGB…9321 elevated risk (0.86) from 51.2 Nm torque at ST-14.
                    </div>
                    <div>
                      <strong className="text-purple-300">Contextual Synthesis:</strong> Tool T14 unserviced 18d (&gt;14d limit) + Batch #4471 switch on Shift B. Worker voice note confirmed symptom.
                    </div>
                    <div>
                      <strong className="text-purple-300">Prescribed Intervention:</strong> Buffer hold at ST-21 for retorque verification + recalibrate nutrunner during shift change.
                    </div>
                  </div>
                </div>
              </FlowNode>
            </div>

            {/* Horizontal signal wire from Worker Notes into GenAI on desktop */}
            <div className="hidden lg:block absolute left-[calc(50%+250px)] right-[250px] xl:right-[270px] top-7 h-[2px] pointer-events-none z-10">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <line x1="100%" y1="0" x2="0" y2="0" stroke="rgba(99,102,241,0.3)" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="100%" y1="0" x2="0" y2="0" stroke="#818CF8" strokeWidth="2.5" className={pulseClass} />
                <path d="M 6 -3.5 L 0 0 L 6 3.5" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="100%" cy="0" r="2.5" fill="#818CF8" />
              </svg>
            </div>

            {/* Standalone Worker Notes Node - Positioned at far right with increased distance */}
            <div className="mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:w-[250px] xl:w-[270px]">
              <FlowNode
                id="worker_notes"
                title="Worker Notes"
                subtitle="OCR & Speech to Text"
                badge="Human Context"
                tone="neutral"
                isOpen={isExpanded("worker_notes")}
                onToggle={() => toggleNode("worker_notes")}
                icon="NOTES"
              >
                <div className="space-y-2 text-[11px]">
                  <div className="label-xs text-indigo-300 font-bold">Multimodal Floor Ingestion</div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    We feed worker notes through OCR and speech to text models to give more qualitative context to the GenAI reasoning engine alongside automated sensor metrics.
                  </p>
                  <div className="rounded-lg border border-indigo-500/30 bg-indigo-950/25 p-2 space-y-1 font-mono text-[9.5px]">
                    <div className="text-indigo-300">
                      <strong className="text-indigo-400">🎙 Speech to Text:</strong> Voice note transcribed ("Torque felt inconsistent")
                    </div>
                    <div className="text-purple-300">
                      <strong className="text-purple-400">📝 OCR Extraction:</strong> Shift B physical checklist notation
                    </div>
                  </div>
                </div>
              </FlowNode>
            </div>

            {/* GenAI Analytical Role Caption */}
            <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground italic px-3 leading-tight">
              "GenAI performs no calculation of its own: it synthesizes and explains the outputs SPC and ML already computed, combined with worker notes and historical context."
            </p>
          </div>

          {/* CONNECTOR 6: 6 → 7 (Unified Reasoning Pulse) */}
          <VerticalWire pulseClass={pulseClass} color="#A855F7" />

          {/* LEVEL 7: Output / Operational Action */}
          <div className="max-w-[500px] mx-auto">
            <FlowNode
              id="action"
              title="Output & Action"
              subtitle="Operational Intervention"
              badge="Alert AG-1042"
              tone="danger"
              isOpen={isExpanded("action")}
              onToggle={() => toggleNode("action")}
              hasActiveFlag
              icon="ALERT"
            >
              <div className="space-y-2 text-[11px]">
                <div className="label-xs text-rose-400 font-bold">Prescribed Operational Action</div>
                <div className="rounded-lg border border-rose-500/50 bg-rose-950/25 p-2 space-y-1">
                  <div className="font-semibold text-rose-200">Lead VIN 7HGB…9321:</div>
                  <div className="text-[10px] text-muted-foreground leading-snug">
                    Hold in Station 21 buffer for retorque verification before paint bake.
                  </div>
                  <div className="pt-1 text-[9.5px] font-mono text-purple-300">
                    Grouped Issue: AG-1042 (10 VINs protected)
                  </div>
                </div>
              </div>
            </FlowNode>
          </div>
        </div>



        {/* Prompt 1 Single Station Scope Caption */}
        <p className="text-center font-mono text-[11px] text-purple-300/80 italic pt-1">
          "Runs independently per station, using that station's own control limits, baselines, and trained ML model."
        </p>
      </div>
    </Panel>
  );
}

// ============================================================================
// 2. VIN-WISE DIGITAL TWIN FLOW (VERTICAL BRANCHING TREE DIAGRAM)
// ============================================================================
function VinWiseDigitalTwinFlow() {
  // Tree Nodes:
  // Level 1: 'vin_entry' (1. VIN Entry)
  // Level 2: 'accumulation' (2. Station Record Accumulation: ST-1 to ST-13)
  // Level 3: 'st14' (3. ST-14 · Flag Origin)
  // Level 4 (3-way Branching fork): 'st18' (4a. Sealer Apply 68%), 'st21' (4b. Base Coat 74%), 'st28' (4c. Powertrain Marriage 82%)
  // Level 5 (Merge back): 'twin_core' (5. VIN Twin Core Record)
  // Level 6: 'disposition' (6. Final Disposition: On Line Buffer Hold / Shipped Recall Review)

  // Default: start with 'st14' open for immediate flag origin inspection
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set(["st14"]));
  const [multiMode, setMultiMode] = useState(false);
  const [vinAction, setVinAction] = useState<"online" | "shipped">("online");

  const toggleNode = (nodeId: string) => {
    setOpenNodes((prev) => {
      if (multiMode) {
        const next = new Set(prev);
        if (next.has(nodeId)) next.delete(nodeId);
        else next.add(nodeId);
        return next;
      } else {
        if (prev.has(nodeId)) return new Set();
        return new Set([nodeId]);
      }
    });
  };

  const expandAll = () => {
    setOpenNodes(new Set(["vin_entry", "accumulation", "st14", "st18", "st21", "st28", "twin_core", "worker_notes_vin", "genai_propagation_verdict", "disposition"]));
  };

  const collapseAll = () => {
    setOpenNodes(new Set());
  };

  const isExpanded = (id: string) => openNodes.has(id);
  const anyExpanded = openNodes.size > 0;
  const pulseClass = anyExpanded ? "wire-dash-slow" : "wire-dash";

  const CLEAN_PASS_STATIONS = [
    { id: 1, code: "ST-01", name: "Underbody Load", metric: "12.4 kN", status: "Nominal" },
    { id: 2, code: "ST-02", name: "Floor Pan Weld", metric: "9.4 kA", status: "Nominal" },
    { id: 3, code: "ST-03", name: "Rear Rail Set", metric: "44.2 Nm", status: "Nominal" },
    { id: 4, code: "ST-04", name: "Front Rail Set", metric: "9.1 kA", status: "Nominal" },
    { id: 5, code: "ST-05", name: "Body Side L", metric: "3.8 mm", status: "In-Spec" },
    { id: 6, code: "ST-06", name: "Body Side R", metric: "3.8 mm", status: "In-Spec" },
    { id: 7, code: "ST-07", name: "Roof Framing", metric: "0.19 g", status: "Nominal" },
    { id: 8, code: "ST-08", name: "Respot Weld A", metric: "Pass", status: "Nominal" },
    { id: 9, code: "ST-09", name: "Respot Weld B", metric: "Pass", status: "Nominal" },
    { id: 10, code: "ST-10", name: "Door Hang", metric: "3.8 mm", status: "In-Spec" },
    { id: 11, code: "ST-11", name: "Hood / Deck Fit", metric: "Pass", status: "Nominal" },
    { id: 12, code: "ST-12", name: "Fender Set", metric: "0.21 g", status: "Nominal" },
    { id: 13, code: "ST-13", name: "Geometry Gate", metric: "0.71 proxy", status: "Pass" },
  ];

  return (
    <Panel className="border-border/80 shadow-md overflow-hidden">
      <PanelHead
        title="Interactive Intelligence Pipeline · VIN-Wise Digital Twin"
        right={
          <div className="flex items-center gap-2">
            <span className="label-xs text-purple-400 font-semibold mr-1">
              Active Stream: <span className="text-foreground">VIN 7HGB…9321</span>
            </span>
            <button
              type="button"
              onClick={() => setMultiMode(!multiMode)}
              className={cn(
                "px-2.5 py-1 text-[10px] font-mono border rounded-md transition-colors cursor-pointer",
                multiMode
                  ? "border-purple-500 bg-purple-500/20 text-purple-300 font-semibold"
                  : "border-border/70 text-muted-foreground hover:text-foreground"
              )}
              title="Toggle multi-expand comparison mode"
            >
              {multiMode ? "Multi-Select: ON" : "Single Focus"}
            </button>
            <button
              type="button"
              onClick={expandAll}
              className="px-2.5 py-1 text-[10px] font-mono border border-border/70 rounded-md bg-panel-raised/60 hover:border-purple-500/40 text-purple-300 transition-colors cursor-pointer"
            >
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2.5 py-1 text-[10px] font-mono border border-border/70 rounded-md bg-panel-raised/60 hover:border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        }
      />

      <div className="p-5 space-y-6">
        {/* Scope Header Label & Instruction Banner */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-[12.5px] text-muted-foreground border-b border-border/70 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-400 animate-pulse" />
            <div>
              <div className="label-xs text-purple-400 font-bold tracking-wide">
                Scope: Single Vehicle (VIN 7HGB…9321): Longitudinal Multi Station Journey
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span className="flex items-center gap-1 text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              <span>Clean Pass (ST-1..13)</span>
            </span>
            <span className="flex items-center gap-1 text-rose-400">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              <span>Flagged Origin (ST-14)</span>
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              <span>Predicted Risk (ST-18, 21, 28)</span>
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              <span>Twin Core</span>
            </span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* VERTICAL BRANCHING TREE DIAGRAM */}
        {/* ================================================================= */}
        <div className="relative w-full max-w-[1240px] mx-auto py-2">
          {/* LEVEL 1: VIN Entry */}
          <div className="max-w-[500px] mx-auto">
            <FlowNode
              id="vin_entry"
              title="VIN Entry"
              subtitle="VIN 7HGB…9321 · X5 Sport"
              badge="Twin Instantiated"
              tone="signal"
              isOpen={isExpanded("vin_entry")}
              onToggle={() => toggleNode("vin_entry")}
              icon="VIN"
            >
              <div className="space-y-2 text-[11px]">
                <div className="label-xs text-purple-400 font-bold">Vehicle Ingress &amp; Twin Instantiation</div>
                <div className="rounded-lg border border-border/80 bg-background/90 p-2.5 font-mono text-[10.5px] space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>VIN Identifier:</span>
                    <span className="text-foreground font-bold">7HGB-9321-X5-2026</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Model &amp; Trim:</span>
                    <span className="text-purple-300 font-bold">BMW X5 Sport xDrive40i</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Twin Created:</span>
                    <span className="text-muted-foreground">2026-08-26 09:14:02 UTC</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Starting Station:</span>
                    <span className="text-emerald-400 font-semibold">ST-01 Underbody Load (Line Ingress)</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Chassis RFID Tag:</span>
                    <span className="text-zinc-300">0x7E3A-9321 · Carrier #08</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Takt Cycle:</span>
                    <span className="text-muted-foreground">Cycle #1093 · Shift B</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground italic pt-0.5">
                  "Twin container initialized at physical line ingress with model-specific baseline tolerances."
                </p>
              </div>
            </FlowNode>
          </div>

          {/* CONNECTOR 1: 1 → 2 */}
          <VerticalWire pulseClass={pulseClass} color="#A855F7" />

          {/* LEVEL 2: Station Record Accumulation (Clean Stations ST-1..13) */}
          <div className="max-w-[500px] mx-auto">
            <FlowNode
              id="accumulation"
              title="Station Record Accumulation"
              subtitle="13 stations passed clean"
              badge="13 Clean Passes"
              tone="neutral"
              isOpen={isExpanded("accumulation")}
              onToggle={() => toggleNode("accumulation")}
              icon="ACCUM"
            >
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center justify-between">
                  <div className="label-xs text-zinc-300 font-bold">Precursor Clean Station Telemetry Log</div>
                  <span className="text-[9.5px] font-mono text-emerald-400 font-semibold">ST-01 → ST-13 (100% In-Spec)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[9.5px]">
                  {CLEAN_PASS_STATIONS.map((st) => (
                    <div
                      key={st.id}
                      className="p-1.5 rounded bg-background/80 border border-border/70 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0" />
                        <span className="text-purple-300 font-semibold shrink-0">{st.code}</span>
                        <span className="text-foreground/80 truncate text-[9px]">{st.name}</span>
                      </div>
                      <span className="text-zinc-400 shrink-0 ml-1">{st.metric}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground italic pt-1 leading-tight">
                  "All 13 precursor stations recorded clean tolerances prior to reaching Station 14."
                </p>
              </div>
            </FlowNode>
          </div>

          {/* CONNECTOR 2: 2 → 3 */}
          <VerticalWire pulseClass={pulseClass} color="#F43F5E" />

          {/* LEVEL 3: ST-14 Flag Origin */}
          <div className="max-w-[500px] mx-auto">
            <FlowNode
              id="st14"
              title="ST-14 · Flag Origin"
              subtitle="Subframe Mount: Flagged"
              badge="51.2 Nm Torque Flag"
              tone="danger"
              isOpen={isExpanded("st14")}
              onToggle={() => toggleNode("st14")}
              hasActiveFlag
              icon="ST-14"
            >
              <div className="space-y-2 text-[11.5px]">
                <div className="label-xs text-rose-400 font-bold">Raw Telemetry &amp; Anomaly Origin (Cycle #1093)</div>
                <div className="rounded-lg border border-rose-500/40 bg-rose-950/20 p-2.5 font-mono text-[10.5px] space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subframe Torque:</span>
                    <span className="text-rose-400 font-bold">51.2 Nm (Over limit &gt;48 Nm)</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Baseline (X5 Sport):</span>
                    <span className="text-zinc-300">42–48 Nm</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Press Vibration:</span>
                    <span className="text-amber-400">+12% deviation</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Paint Booth Temp:</span>
                    <span className="text-amber-400">23.8°C (+2.4°C drift)</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Cycle Time:</span>
                    <span className="text-muted-foreground">65s (+7s drift)</span>
                  </div>
                </div>
                <div className="pt-1 text-[10.5px] text-muted-foreground space-y-0.5 font-mono">
                  <div>Tool: Nutrunner T14 (18 days unserviced, &gt;14d limit)</div>
                  <div>Part Batch: #4471 (Nord Fasteners)</div>
                  <div>Operator: A. Sharma · Shift B</div>
                  <div className="text-purple-300 italic">"Torque felt inconsistent on left mount"</div>
                </div>
              </div>
            </FlowNode>
          </div>

          {/* CONNECTOR 3: 3-WAY FORK (3 → 4a, 4b, 4c with risk-weighted speeds) */}
          <Fork3WayWire isSlow={anyExpanded} />

          {/* LEVEL 4: PROPAGATION FORK (3 Children Side-by-Side) */}
          <div className="max-w-[760px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Branch 4a: ST-18 Sealer Apply (68%) */}
              <FlowNode
                id="st18"
                title="ST-18 · Sealer Apply"
                subtitle="Gap Shift · 68% Risk"
                badge="68% Propagation"
                tone="warn"
                isOpen={isExpanded("st18")}
                onToggle={() => toggleNode("st18")}
                icon="ST-18"
              >
                <div className="space-y-2 text-[11px]">
                  <div className="label-xs text-amber-400 font-bold">Predicted Risk: Gap Shift</div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    Pre-load chassis distortion from ST-14 over-torque warps floor pan reference plane.
                  </p>
                  <div className="rounded-lg border border-amber-500/40 bg-amber-950/20 p-2 space-y-1 font-mono text-[9.5px]">
                    <div className="flex items-center justify-between text-amber-300 font-bold">
                      <span>Seam Shift:</span>
                      <span className="text-amber-400">+0.8 mm drift</span>
                    </div>
                    <div className="text-muted-foreground">Station: Robotic Cell R2</div>
                    <div className="text-muted-foreground">Impact: Sealer bead width variance</div>
                  </div>
                </div>
              </FlowNode>

              {/* Branch 4b: ST-21 Base Coat (74%) */}
              <FlowNode
                id="st21"
                title="ST-21 · Base Coat"
                subtitle="Vibration · 74% Risk"
                badge="74% Propagation"
                tone="warn"
                isOpen={isExpanded("st21")}
                onToggle={() => toggleNode("st21")}
                icon="ST-21"
              >
                <div className="space-y-2 text-[11px]">
                  <div className="label-xs text-amber-400 font-bold">Predicted Risk: Vibration</div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    Chassis mount unbalance excites conveyor harmonic resonance during 180°C bake ramp.
                  </p>
                  <div className="rounded-lg border border-amber-500/40 bg-amber-950/20 p-2 space-y-1 font-mono text-[9.5px]">
                    <div className="flex items-center justify-between text-amber-300 font-bold">
                      <span>Resonance Flag:</span>
                      <span className="text-amber-400">74% Risk</span>
                    </div>
                    <div className="text-muted-foreground">Station: Paint Line 1</div>
                    <div className="text-muted-foreground">Impact: Clearcoat micro-fractures</div>
                  </div>
                </div>
              </FlowNode>

              {/* Branch 4c: ST-28 Powertrain Marriage (82%) */}
              <FlowNode
                id="st28"
                title="ST-28 · Powertrain"
                subtitle="Mount Mismatch · 82% Risk"
                badge="82% Propagation"
                tone="danger"
                isOpen={isExpanded("st28")}
                onToggle={() => toggleNode("st28")}
                hasActiveFlag
                icon="ST-28"
              >
                <div className="space-y-2 text-[11px]">
                  <div className="label-xs text-rose-400 font-bold">Predicted Risk: Bolt Mismatch</div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    Distorted subframe hardpoints will fail automated docking with transmission casing.
                  </p>
                  <div className="rounded-lg border border-rose-500/40 bg-rose-950/25 p-2 space-y-1 font-mono text-[9.5px]">
                    <div className="flex items-center justify-between text-rose-300 font-bold">
                      <span>Alignment Error:</span>
                      <span className="text-rose-400">+2.1 mm pin error</span>
                    </div>
                    <div className="text-muted-foreground">Station: Final Line 1 (T. Becker)</div>
                    <div className="text-rose-300 font-semibold">Impact: 12-min line halt hazard</div>
                  </div>
                </div>
              </FlowNode>
            </div>
          </div>

          {/* CONNECTOR 4: 3-WAY MERGE BACK TO SINGLE LINE */}
          <Merge3WayWire pulseClass={pulseClass} isSlow={anyExpanded} />

          {/* LEVEL 5: VIN Twin Core Record */}
          <div className="max-w-[500px] mx-auto">
            <FlowNode
              id="twin_core"
              title="VIN Twin Core Record"
              subtitle="36 station records · 4 signal classes · model-trim baseline"
              badge="1 Twin : 1 VIN"
              tone="signal"
              isOpen={isExpanded("twin_core")}
              onToggle={() => toggleNode("twin_core")}
              icon="CORE"
            >
              <div className="space-y-2.5 text-[11px]">
                <div className="label-xs text-purple-400 font-bold">
                  Digital Twin Core Engine State for VIN 7HGB…9321
                </div>

                {/* 4 Signal Classes Box */}
                <div className="rounded-lg border border-purple-500/40 bg-purple-950/35 p-2.5 space-y-1.5 font-mono text-[10px]">
                  <div className="text-purple-300 font-bold uppercase tracking-wider text-[9.5px]">
                    Cumulative Multi-Station Telemetry Synthesis:
                  </div>
                  <div className="text-emerald-300 flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">Sensor Telemetry:</span>
                    <span>13 clean precursor station readings + ST-14 torque transducer reading (51.2 Nm)</span>
                  </div>
                  <div className="text-blue-300 flex items-start gap-1.5">
                    <span className="text-blue-400 font-bold shrink-0">Event Logs:</span>
                    <span>Line ingress RFID tag 0x7E3A-9321, takt cycle #1093, station gate scans</span>
                  </div>
                  <div className="text-indigo-300 flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold shrink-0">Human Observations:</span>
                    <span>Operator A. Sharma Shift B voice transcription ("Torque felt inconsistent")</span>
                  </div>
                  <div className="text-purple-300 flex items-start gap-1.5">
                    <span className="text-purple-400 font-bold shrink-0">Plant Context:</span>
                    <span>Tool T14 maintenance history (18d uncalibrated), Part Batch #4471 changeover</span>
                  </div>
                </div>

                <div className="space-y-1 text-[10.5px] leading-snug text-foreground/90 pt-0.5">
                  <div>
                    <strong className="text-purple-300">Twin Resolution:</strong> 14 of 36 stations physically captured. 3 downstream propagation risks actively monitored across Paint and Final Assembly.
                  </div>
                </div>
              </div>
            </FlowNode>
          </div>

          {/* CONNECTOR 5: 5 → 5b */}
          <VerticalWire pulseClass={pulseClass} color="#A855F7" />

          {/* LEVEL 5b: GenAI Propagation Verdict with Separate Vehicle Worker Notes Node */}
          <div className="relative w-full">
            {/* Main GenAI Node centered in the main flow */}
            <div className="max-w-[500px] mx-auto">
              <FlowNode
                id="genai_propagation_verdict"
                title="GenAI Propagation Verdict"
                subtitle="GenAI Verdict: Hold Recommended"
                badge="88% Confidence"
                tone="signal"
                isOpen={isExpanded("genai_propagation_verdict")}
                onToggle={() => toggleNode("genai_propagation_verdict")}
                icon="GENAI"
              >
                <div className="space-y-2.5 text-[11px]">
                  <div className="label-xs text-purple-400 font-bold">
                    GenAI Cross Station Propagation Verdict for VIN 7HGB…9321
                  </div>

                  {/* Explicit Inputs Synthesized Box */}
                  <div className="rounded-lg border border-purple-500/40 bg-purple-950/40 p-2.5 space-y-1.5 font-mono text-[10px]">
                    <div className="text-purple-300 font-bold uppercase tracking-wider text-[9.5px]">
                      Inputs Synthesized for VIN 7HGB…9321:
                    </div>
                    <div className="text-rose-300 flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold shrink-0">Sensor Flag (ST-14):</span>
                      <span>51.2 Nm torque on subframe mount (&gt;48 Nm safe pre-load limit)</span>
                    </div>
                    <div className="text-amber-300 flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold shrink-0">Propagation Models:</span>
                      <span>Downstream defect risk: ST-18 Sealer (68%), ST-21 Base Coat (74%), ST-28 Powertrain (82%)</span>
                    </div>
                    <div className="text-indigo-300 flex items-start gap-1.5">
                      <span className="text-indigo-400 font-bold shrink-0">Vehicle Worker Notes:</span>
                      <span>Operator voice note on VIN 7HGB…9321 ("Left subframe bolt felt tight") + ST-01 carrier log</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-[10.5px] leading-snug text-foreground/90">
                    <div className="rounded-lg border border-purple-500/30 bg-purple-950/30 p-2.5 space-y-1 font-mono text-[10px]">
                      <div className="text-purple-300 font-bold uppercase tracking-wider text-[9px]">
                        Observation:
                      </div>
                      <div className="text-foreground/90 leading-relaxed">
                        VIN 7HGB…9321 was flagged at ST-14 (subframe torque, 51.2 Nm vs 42-48 Nm limit). Propagation analysis shows rising risk at three downstream stations: Sealer Apply (68%), Base Coat (74%), and Powertrain Marriage (82%).
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-0.5">
                      <div>
                        <strong className="text-purple-300">Plain English Synthesis: </strong>
                        <span className="text-muted-foreground leading-relaxed">
                          "This vehicle's subframe bolt was over torqued, which distorts the mounting hardpoints. As this chassis continues down the line, that distortion will cause seam gap variances at sealing, harmonic stress during the paint bake ramp, and bolt alignment failure during powertrain docking."
                        </span>
                      </div>
                      <div>
                        <strong className="text-purple-300">Recommended Action: </strong>
                        <span className="text-muted-foreground leading-relaxed">
                          "Hold this vehicle before it reaches Powertrain Marriage (Station 28) and re-verify the subframe torque now at Station 21 buffer, while it's still a simple retorque: waiting until Station 28 turns this into a full line halt."
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </FlowNode>
            </div>

            {/* Horizontal signal wire from Worker Notes into GenAI on desktop */}
            <div className="hidden lg:block absolute left-[calc(50%+250px)] right-[250px] xl:right-[270px] top-7 h-[2px] pointer-events-none z-10">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <line x1="100%" y1="0" x2="0" y2="0" stroke="rgba(99,102,241,0.3)" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="100%" y1="0" x2="0" y2="0" stroke="#818CF8" strokeWidth="2.5" className={pulseClass} />
                <path d="M 6 -3.5 L 0 0 L 6 3.5" fill="none" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="100%" cy="0" r="2.5" fill="#818CF8" />
              </svg>
            </div>

            {/* Standalone Vehicle Worker Notes Node - Positioned at far right with increased distance */}
            <div className="mt-4 lg:mt-0 lg:absolute lg:right-0 lg:top-0 lg:w-[250px] xl:w-[270px]">
              <FlowNode
                id="worker_notes_vin"
                title="Worker Notes"
                subtitle="OCR & Vehicle Voice Log"
                badge="Vehicle Context"
                tone="neutral"
                isOpen={isExpanded("worker_notes_vin")}
                onToggle={() => toggleNode("worker_notes_vin")}
                icon="NOTES"
              >
                <div className="space-y-2 text-[11px]">
                  <div className="label-xs text-indigo-300 font-bold">Vehicle-Bound Multimodal Log</div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                    Qualitative operator remarks and digital checklist entries bound specifically to chassis VIN 7HGB…9321 across stations.
                  </p>
                  <div className="rounded-lg border border-indigo-500/30 bg-indigo-950/25 p-2 space-y-1 font-mono text-[9.5px]">
                    <div className="text-indigo-300">
                      <strong className="text-indigo-400">🎙 ST-14 Voice (A. Sharma):</strong> "Left subframe bolt felt tight going in on chassis 7HGB…9321."
                    </div>
                    <div className="text-purple-300">
                      <strong className="text-purple-400">📝 ST-01 Ingress Log:</strong> Carrier #08 flagged for visual inspection post-subframe
                    </div>
                    <div className="text-muted-foreground text-[8.5px] pt-0.5">
                      Binding: VIN 7HGB…9321 longitudinal passport
                    </div>
                  </div>
                </div>
              </FlowNode>
            </div>

            {/* GenAI Analytical Role Caption */}
            <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground italic px-3 leading-tight">
              "GenAI performs no calculation of its own: it synthesizes and explains what SPC, ML, and aggregation logic have already computed."
            </p>
          </div>

          {/* CONNECTOR 6: 5b → 6 */}
          <VerticalWire pulseClass={pulseClass} color="#A855F7" />

          {/* LEVEL 6: Final Disposition */}
          <div className="max-w-[500px] mx-auto">
            <FlowNode
              id="disposition"
              title="Final Disposition"
              subtitle="On Line (Buffer Hold) / Shipped (Recall Review)"
              badge={vinAction === "online" ? "Buffer Hold Active" : "Recall Liability"}
              tone={vinAction === "online" ? "signal" : "danger"}
              isOpen={isExpanded("disposition")}
              onToggle={() => toggleNode("disposition")}
              hasActiveFlag={vinAction === "shipped"}
              icon="DISP"
            >
              <div className="space-y-3 text-[11px]">
                <div className="label-xs text-purple-400 font-bold">Operational Intervention Decision</div>

                {/* Interactive Disposition Toggle */}
                <div className="flex items-center gap-2 p-1 bg-background/90 rounded-lg border border-border/80">
                  <button
                    type="button"
                    onClick={() => setVinAction("online")}
                    className={cn(
                      "flex-1 py-1.5 px-2 text-[10.5px] font-mono font-semibold rounded-md transition-all cursor-pointer",
                      vinAction === "online"
                        ? "bg-purple-500/25 text-purple-300 border border-purple-500/60 shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    On Line (Buffer Hold)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVinAction("shipped")}
                    className={cn(
                      "flex-1 py-1.5 px-2 text-[10.5px] font-mono font-semibold rounded-md transition-all cursor-pointer",
                      vinAction === "shipped"
                        ? "bg-rose-500/25 text-rose-300 border border-rose-500/60 shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Shipped (Recall Review)
                  </button>
                </div>

                {/* Details corresponding to selected disposition */}
                {vinAction === "online" ? (
                  <div className="rounded-lg border border-purple-500/40 bg-purple-950/25 p-2.5 space-y-1.5">
                    <div className="font-semibold text-purple-200 flex items-center justify-between">
                      <span>Prescribed Action: In-Process Buffer Hold</span>
                      <span className="text-emerald-400 text-[10px] font-mono font-bold">100% Contained</span>
                    </div>
                    <p className="text-[10.5px] text-muted-foreground leading-snug">
                      Hold VIN 7HGB…9321 in Station 21 buffer for re-torque verification before paint bake. Completely prevents downstream defects at ST-21, ST-28, and ST-36.
                    </p>
                    <div className="pt-1 text-[9.5px] font-mono text-purple-300 flex items-center justify-between">
                      <span>Grouped Issue: AG-1042 (10 VINs protected)</span>
                      <span className="text-emerald-400 font-bold">$42,000 Teardown Cost Avoided</span>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-rose-500/40 bg-rose-950/25 p-2.5 space-y-1.5">
                    <div className="font-semibold text-rose-200 flex items-center justify-between">
                      <span>Simulated Escape: Missed Station Flag</span>
                      <span className="text-rose-400 text-[10px] font-mono font-bold">Safety Hazard</span>
                    </div>
                    <p className="text-[10.5px] text-muted-foreground leading-snug">
                      Vehicle ships with subframe over-torque. In-field bolt fatigue leads to chassis warranty claim, dealership teardown, and potential NHTSA recall audit.
                    </p>
                    <div className="pt-1 text-[9.5px] font-mono text-rose-400 flex items-center justify-between">
                      <span>Direct Warranty Cost: $18,400 / VIN</span>
                      <span>Liability Exposure: HIGH</span>
                    </div>
                  </div>
                )}
              </div>
            </FlowNode>
          </div>
        </div>



        {/* Prompt 2 Caption */}
        <p className="text-center font-mono text-[11px] text-purple-300/90 italic pt-1 leading-relaxed px-4">
          "Same tree format as the station wise detection flow, but scoped to one vehicle's full journey: showing how a single station level flag (ST-14) branches into predicted downstream risk across multiple future stations for this specific VIN."
        </p>
      </div>
    </Panel>
  );
}

// ============================================================================
// 3. LINE-WIDE AGGREGATION FLOW (PARALLEL STATIONS & VINS → AGGREGATION ENGINE)
// ============================================================================
function LineWideAggregationFlow() {
  const [selectedOutput, setSelectedOutput] = useState<"bottleneck" | "alarms" | "dashboards">("bottleneck");
  const [isGenAiVerdictOpen, setIsGenAiVerdictOpen] = useState(true);

  return (
    <Panel className="border-border/80 shadow-md overflow-hidden">
      <PanelHead
        title="Line-Wide Aggregation Flow (Parallel Station & VIN Telemetry → Plant Engine)"
        right={
          <div className="flex items-center gap-2">
            <Chip tone="signal">36 Stations · Multi-VIN Core</Chip>
          </div>
        }
      />

      <div className="p-5 space-y-6">
        {/* TOP LEVEL: PARALLEL INPUT CLUSTERS (Stations Grid & Active VIN Stacks) */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Input Cluster: All 36 Stations */}
          <div className="p-4 rounded-2xl border border-border/80 bg-panel-raised/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>All 36 Stations — Parallel Telemetry Inputs</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">36 PLCs &amp; Edge Diodes</span>
            </div>

            {/* 36-Station Compact Matrix Grid */}
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 pt-1">
              {Array.from({ length: 36 }, (_, i) => i + 1).map((stNum) => {
                const isFlag = stNum === 14;
                const isRisk = stNum === 18 || stNum === 21 || stNum === 28;
                return (
                  <div
                    key={stNum}
                    className={cn(
                      "flex flex-col items-center justify-center p-1.5 rounded-lg border font-mono text-[9.5px] transition-all",
                      isFlag
                        ? "border-rose-500 bg-rose-950/40 text-rose-300 font-bold animate-pulse"
                        : isRisk
                        ? "border-amber-500/50 bg-amber-950/20 text-amber-300 font-semibold"
                        : "border-border/70 bg-background/80 text-muted-foreground hover:border-border"
                    )}
                    title={`Station ${stNum}: ${stationById(stNum).name}`}
                  >
                    <span>{String(stNum).padStart(2, "0")}</span>
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full mt-0.5",
                        isFlag ? "bg-rose-500" : isRisk ? "bg-amber-400" : "bg-emerald-400"
                      )}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-1">
              <span className="text-rose-400 font-semibold">• ST-14 Active Defect</span>
              <span className="text-amber-300 font-semibold">• ST-18/21/28 Propagation Risk</span>
              <span className="text-emerald-400">• 32 Nominal Stations</span>
            </div>
          </div>

          {/* Right Input Cluster: Active VIN Twins Stack */}
          <div className="p-4 rounded-2xl border border-border/80 bg-panel-raised/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[12px] font-bold text-foreground">
                <span className="h-2 w-2 rounded-full bg-purple-400" />
                <span>All Active VIN Twins — Parallel Stream Inputs</span>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">{VEHICLES.length} Online Twins</span>
            </div>

            {/* Active VIN Stack Chips */}
            <div className="space-y-1.5 pt-1">
              {VEHICLES.slice(0, 5).map((v) => (
                <div
                  key={v.vin}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-xl border text-[11px] font-mono transition-all",
                    v.status === "at-risk"
                      ? "border-rose-500/60 bg-rose-950/25 text-rose-300"
                      : v.status === "watch"
                      ? "border-amber-500/50 bg-amber-950/20 text-amber-300"
                      : "border-border/70 bg-background/80 text-muted-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        v.status === "at-risk"
                          ? "bg-rose-500"
                          : v.status === "watch"
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      )}
                    />
                    <strong className="text-foreground">{v.vin}</strong>
                    <span className="text-[10px] text-muted-foreground hidden sm:inline">({v.model} {v.trim})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>ST-{String(v.station).padStart(2, "0")}</span>
                    <span className={cn("font-bold", v.risk > 0.7 ? "text-rose-400" : "")}>
                      {Math.round(v.risk * 100)}% Risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[10px] font-mono text-muted-foreground text-right pt-1">
              + {VEHICLES.length - 5} additional vehicles transmitting continuous telemetry
            </div>
          </div>
        </div>

        {/* CONVERGING WIRES INTO CENTRAL AGGREGATION ENGINE */}
        <div className="flex justify-center items-center h-12 relative w-full max-w-[760px] mx-auto my-0.5">
          <svg viewBox="0 0 760 48" className="w-full h-12 overflow-visible">
            {/* Left and Right streams converge into center */}
            <path
              d="M 190 0 L 190 24 L 380 24 L 380 48 M 570 0 L 570 24 L 380 24"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            <path
              d="M 190 0 L 190 24 L 380 24 L 380 48 M 570 0 L 570 24 L 380 24"
              fill="none"
              stroke="#A855F7"
              strokeWidth="2.5"
              className="wire-dash-slow"
            />
            <path d="M 376 40 L 380 46 L 384 40" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
            <circle cx="190" cy="24" r="3.5" fill="#10B981" />
            <circle cx="570" cy="24" r="3.5" fill="#A855F7" />
            <circle cx="380" cy="24" r="4.5" fill="#A855F7" />
          </svg>
        </div>

        {/* CENTRAL ENGINE NODE */}
        <div className="max-w-[620px] mx-auto">
          <div className="p-4 rounded-2xl border border-purple-500 bg-purple-950/40 shadow-lg text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/50">
                CORE INTELLIGENCE
              </span>
              <h3 className="text-[16px] font-bold text-foreground">Line-Wide Aggregation Engine</h3>
            </div>
            <p className="text-[12px] text-muted-foreground max-w-[520px] mx-auto leading-relaxed">
              Synthesizes real-time sensor streams across all 36 stations and correlates failure signatures across active VIN twins to synchronize line throughput, group alarms, and publish operational dashboards.
            </p>
          </div>
        </div>

        {/* CONNECTOR: CENTRAL ENGINE → GENAI BOTTLENECK VERDICT */}
        <VerticalWire pulseClass="wire-dash-slow" color="#A855F7" />

        {/* GENAI BOTTLENECK VERDICT NODE */}
        <div className="max-w-[620px] mx-auto">
          <FlowNode
            id="genai_bottleneck_verdict"
            title="GenAI Bottleneck Verdict"
            subtitle="GenAI Verdict: Bottleneck Forming at ST-14"
            badge="HIGH SEVERITY"
            tone="danger"
            isOpen={isGenAiVerdictOpen}
            onToggle={() => setIsGenAiVerdictOpen(!isGenAiVerdictOpen)}
            hasActiveFlag
            icon="AI·VERDICT"
          >
            <div className="space-y-2.5 text-[11px]">
              <div className="label-xs text-purple-400 font-bold">
                Cross Station &amp; Multi VIN Plant Bottleneck Verdict
              </div>

              <div className="space-y-2 text-[10.5px] leading-snug text-foreground/90">
                <div className="rounded-lg border border-purple-500/30 bg-purple-950/30 p-2.5 space-y-1 font-mono text-[10px]">
                  <div className="text-purple-300 font-bold uppercase tracking-wider text-[9px]">
                    Observation:
                  </div>
                  <div className="text-foreground/90 leading-relaxed">
                    Station 14's cycle time has been trending above takt time for the last 6 vehicles, and its downstream buffer is filling faster than normal. 10 VINs currently in the line share the same root cause pattern (tool T14 drift).
                  </div>
                </div>

                <div className="space-y-1.5 pt-0.5">
                  <div>
                    <strong className="text-purple-300">Plain English Synthesis: </strong>
                    <span className="text-muted-foreground leading-relaxed">
                      "Station 14 is quietly slowing down: not enough yet to stop the line, but if this trend continues, Station 13 will start backing up within the next few vehicles, and Station 15 will start running out of work to do. This isn't a random slowdown; it's the same worn tool causing both the timing drift and the quality flags we're seeing across multiple vehicles."
                    </span>
                  </div>
                  <div>
                    <strong className="text-purple-300">Recommended Action: </strong>
                    <span className="text-muted-foreground leading-relaxed">
                      "Recalibrate Nutrunner T14 at the next shift changeover: this is a short scheduled fix now, versus an unplanned line stop later if the drift continues unaddressed. No need to stop the line immediately; this can wait for the next natural changeover window."
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FlowNode>

          <p className="mt-2 text-center font-mono text-[10px] text-muted-foreground italic px-3 leading-tight">
            "GenAI performs no calculation of its own: it synthesizes and explains what SPC, ML, and aggregation logic have already computed."
          </p>
        </div>

        {/* BRANCHING WIRES TO 3 DEDICATED OUTPUTS */}
        <div className="flex justify-center items-center h-12 relative w-full max-w-[760px] mx-auto my-0.5">
          <svg viewBox="0 0 760 48" className="w-full h-12 overflow-visible">
            {/* Center engine branches to 3 outputs (x=130, x=380, x=630) */}
            <path
              d="M 380 0 L 380 24 L 130 24 L 130 48 M 380 24 L 630 24 L 630 48 M 380 24 L 380 48"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
            />
            <path
              d="M 380 0 L 380 24 L 130 24 L 130 48 M 380 24 L 630 24 L 630 48 M 380 24 L 380 48"
              fill="none"
              stroke="#A855F7"
              strokeWidth="2.5"
              className="wire-dash-slow"
            />
            <path d="M 126 40 L 130 46 L 134 40" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
            <path d="M 376 40 L 380 46 L 384 40" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
            <path d="M 626 40 L 630 46 L 634 40" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
            <circle cx="380" cy="24" r="4" fill="#A855F7" />
          </svg>
        </div>

        {/* 3 OPERATIONAL OUTPUT CARDS */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Output 1: Bottleneck Detection */}
          <div
            onClick={() => setSelectedOutput("bottleneck")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-3",
              selectedOutput === "bottleneck"
                ? "border-amber-500 bg-amber-950/20 shadow-md ring-1 ring-amber-500/50"
                : "border-border/80 bg-panel-raised/50 hover:border-amber-500/40"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-amber-400 uppercase">Throughput</span>
              <Chip tone="warn">1 Bottleneck</Chip>
            </div>
            <h4 className="font-bold text-[14px] text-foreground">Bottleneck Detection</h4>
            <div className="space-y-2 font-mono text-[10.5px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Line Takt Time:</span>
                <span className="text-foreground font-bold">58s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-400">ST-14 Cycle Time:</span>
                <span className="text-rose-400 font-bold">65s (+7s drift)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-amber-300">ST-21 Buffer Fill:</span>
                <span className="text-amber-300 font-bold">85% (Hold Risk)</span>
              </div>
              <div className="w-full bg-background/80 h-2 rounded-full overflow-hidden border border-border/80 mt-2">
                <div className="bg-amber-400 h-full w-[85%]" />
              </div>
            </div>
          </div>

          {/* Output 2: Alarm Grouping */}
          <div
            onClick={() => setSelectedOutput("alarms")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-3",
              selectedOutput === "alarms"
                ? "border-rose-500 bg-rose-950/20 shadow-md ring-1 ring-rose-500/50"
                : "border-border/80 bg-panel-raised/50 hover:border-rose-500/40"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-rose-400 uppercase">Operations</span>
              <Chip tone="danger">10 Alarms → 1</Chip>
            </div>
            <h4 className="font-bold text-[14px] text-foreground">Alarm Grouping Engine</h4>
            <div className="space-y-1.5 font-mono text-[10.5px]">
              <div className="p-1.5 rounded bg-background/80 border border-rose-500/40 text-rose-300">
                <strong>AG-1042:</strong> Subframe Mount (10 VINs)
              </div>
              <div className="p-1.5 rounded bg-background/80 border border-border/70 text-muted-foreground">
                <strong>AG-1043:</strong> Sealer Pressure (4 VINs)
              </div>
              <div className="p-1.5 rounded bg-background/80 border border-border/70 text-muted-foreground">
                <strong>AG-1044:</strong> Paint Temp (2 VINs)
              </div>
            </div>
          </div>

          {/* Output 3: Stakeholder Dashboards */}
          <div
            onClick={() => setSelectedOutput("dashboards")}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-3",
              selectedOutput === "dashboards"
                ? "border-purple-500 bg-purple-950/20 shadow-md ring-1 ring-purple-500/50"
                : "border-border/80 bg-panel-raised/50 hover:border-purple-500/40"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-purple-400 uppercase">Reporting</span>
              <Chip tone="signal">3 Tailored Roles</Chip>
            </div>
            <h4 className="font-bold text-[14px] text-foreground">Stakeholder Views</h4>
            <div className="space-y-1.5 font-mono text-[10.5px]">
              <div className="p-1.5 rounded bg-background/80 border border-purple-500/40 text-purple-300">
                <strong>• Floor Supervisor:</strong> Real-Time Alerts
              </div>
              <div className="p-1.5 rounded bg-background/80 border border-border/70 text-muted-foreground">
                <strong>• Plant Manager:</strong> Shift &amp; OEE Trends
              </div>
              <div className="p-1.5 rounded bg-background/80 border border-border/70 text-muted-foreground">
                <strong>• Leadership:</strong> Scrap &amp; ROI Savings
              </div>
            </div>
          </div>
        </div>

        {/* Prompt 3 Line-Wide Caption */}
        <p className="text-center font-mono text-[11px] text-purple-300/90 italic pt-1 leading-relaxed px-4">
          "Aggregates every station's and every VIN's outputs across the whole line: this is where bottlenecks, grouped alarms, and stakeholder views are produced, distinct from the single-station and single-VIN flows above."
        </p>
      </div>
    </Panel>
  );
}

// Tree Wire Connector Helpers (Right-Angle / Bracket Org-Chart Styling)
function VerticalWire({ pulseClass, color = "#A855F7" }: { pulseClass: string; color?: string }) {
  return (
    <div className="flex justify-center items-center h-8 my-0.5 relative">
      <svg width="24" height="32" viewBox="0 0 24 32" className="overflow-visible">
        <line x1="12" y1="0" x2="12" y2="32" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="32"
          stroke={color}
          strokeWidth="2.5"
          className={pulseClass}
        />
        <path d="M 8 22 L 12 28 L 16 22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ForkWire({ pulseClass }: { pulseClass: string }) {
  return (
    <div className="flex justify-center items-center h-12 my-0.5 relative w-full max-w-[760px] mx-auto">
      <svg viewBox="0 0 760 48" className="w-full h-12 overflow-visible">
        {/* Right-angle tree bracket */}
        <path
          d="M 380 0 L 380 24 L 190 24 L 190 48 M 380 24 L 570 24 L 570 48"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        {/* Animated flow pulse splitting down both paths */}
        <path
          d="M 380 0 L 380 24 L 190 24 L 190 48 M 380 24 L 570 24 L 570 48"
          fill="none"
          stroke="#F43F5E"
          strokeWidth="2.5"
          className={pulseClass}
        />
        <path d="M 186 40 L 190 46 L 194 40" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
        <path d="M 566 40 L 570 46 L 574 40" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="380" cy="24" r="3.5" fill="#F43F5E" />
      </svg>
    </div>
  );
}

// 3-Way Fork Wire for VIN Propagation (ST-14 → ST-18, ST-21, ST-28)
function Fork3WayWire({ isSlow }: { isSlow?: boolean }) {
  return (
    <div className="flex justify-center items-center h-12 my-0.5 relative w-full max-w-[760px] mx-auto">
      <svg viewBox="0 0 760 48" className="w-full h-12 overflow-visible">
        {/* Right-angle bracket tracks */}
        <path
          d="M 380 0 L 380 24 L 127 24 L 127 48 M 380 0 L 380 48 M 380 24 L 633 24 L 633 48"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        {/* 4a. ST-18 Branch (68% Risk - Amber glow) */}
        <path
          d="M 380 0 L 380 24 L 127 24 L 127 48"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          className={isSlow ? "wire-dash-68-slow" : "wire-dash-68"}
        />
        {/* 4b. ST-21 Branch (74% Risk - Medium Amber-Rose glow) */}
        <path
          d="M 380 0 L 380 48"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.8"
          className={isSlow ? "wire-dash-74-slow" : "wire-dash-74"}
        />
        {/* 4c. ST-28 Branch (82% Risk - High Rose glow) */}
        <path
          d="M 380 0 L 380 24 L 633 24 L 633 48"
          fill="none"
          stroke="#F43F5E"
          strokeWidth="3.2"
          className={isSlow ? "wire-dash-82-slow" : "wire-dash-82"}
        />
        {/* Directional Arrowheads */}
        <path d="M 123 40 L 127 46 L 131 40" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M 376 40 L 380 46 L 384 40" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M 629 40 L 633 46 L 637 40" fill="none" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
        {/* Fork Split Node Point */}
        <circle cx="380" cy="24" r="3.5" fill="#F43F5E" />
      </svg>
    </div>
  );
}

// 3-Way Merge Wire for VIN Propagation (ST-18, ST-21, ST-28 → VIN Twin Core Record)
function Merge3WayWire({ pulseClass, isSlow }: { pulseClass: string; isSlow?: boolean }) {
  return (
    <div className="flex justify-center items-center h-12 my-0.5 relative w-full max-w-[760px] mx-auto">
      <svg viewBox="0 0 760 48" className="w-full h-12 overflow-visible">
        {/* Background merge tracks */}
        <path
          d="M 127 0 L 127 24 L 380 24 M 633 0 L 633 24 L 380 24 M 380 0 L 380 48"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        {/* 4a. Left incoming pulse */}
        <path
          d="M 127 0 L 127 24 L 380 24"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          className={isSlow ? "wire-dash-68-slow" : "wire-dash-68"}
        />
        {/* 4b. Center incoming pulse */}
        <path
          d="M 380 0 L 380 24"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.8"
          className={isSlow ? "wire-dash-74-slow" : "wire-dash-74"}
        />
        {/* 4c. Right incoming pulse */}
        <path
          d="M 633 0 L 633 24 L 380 24"
          fill="none"
          stroke="#F43F5E"
          strokeWidth="3.2"
          className={isSlow ? "wire-dash-82-slow" : "wire-dash-82"}
        />
        {/* Combined Unified Pulse into Node 5 */}
        <path
          d="M 380 24 L 380 48"
          fill="none"
          stroke="#A855F7"
          strokeWidth="3"
          className={pulseClass}
        />
        {/* Downward Arrowhead into Node 5 */}
        <path d="M 376 40 L 380 46 L 384 40" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
        {/* Convergence Junction Node Points */}
        <circle cx="380" cy="24" r="4.5" fill="#A855F7" />
        <circle cx="127" cy="24" r="3" fill="#F59E0B" />
        <circle cx="633" cy="24" r="3" fill="#F43F5E" />
      </svg>
    </div>
  );
}

// 3a & 3b (Tier 1) merge into 4 (Tier 2 Classical ML) AND split signal lines directly to 6 (Tier 3 GenAI)
function Tier1BranchWire({ pulseClass }: { pulseClass: string }) {
  return (
    <div className="flex justify-center items-center h-12 my-0.5 relative w-full max-w-[760px] mx-auto">
      <svg viewBox="0 0 760 48" className="w-full h-12 overflow-visible">
        {/* Background paths */}
        <path
          d="M 190 0 L 190 24 L 380 24 L 380 48 M 570 0 L 570 24 L 380 24 M 190 24 L 24 24 L 24 48 M 570 24 L 736 24 L 736 48"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        {/* Main merge flow into 4 (Classical ML) */}
        <path
          d="M 190 0 L 190 24 L 380 24 L 380 48 M 570 0 L 570 24 L 380 24"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          className={pulseClass}
        />
        {/* Direct signal line from 3a (SPC limit) down left rail to 6 */}
        <path
          d="M 190 24 L 24 24 L 24 48"
          fill="none"
          stroke="#F43F5E"
          strokeWidth="2.5"
          className={pulseClass}
        />
        {/* Direct signal line from 3b (Physics margin) down right rail to 6 */}
        <path
          d="M 570 24 L 736 24 L 736 48"
          fill="none"
          stroke="#A855F7"
          strokeWidth="2.5"
          className={pulseClass}
        />
        {/* Arrows */}
        <path d="M 376 40 L 380 46 L 384 40" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M 20 40 L 24 46 L 28 40" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
        <path d="M 732 40 L 736 46 L 740 40" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
        {/* Branch points */}
        <circle cx="380" cy="24" r="3.5" fill="#F59E0B" />
        <circle cx="190" cy="24" r="3.5" fill="#F43F5E" />
        <circle cx="570" cy="24" r="3.5" fill="#A855F7" />
      </svg>
    </div>
  );
}

// Converges (1) Left 3a signal line, (2) Center Validated ML line from 5, and (3) Right 3b signal line directly into 6 (GenAI)
function ConvergenceToGenAIWire({ pulseClass }: { pulseClass: string }) {
  return (
    <div className="flex justify-center items-center h-14 my-0.5 relative w-full max-w-[760px] mx-auto">
      <svg viewBox="0 0 760 56" className="w-full h-14 overflow-visible">
        {/* Background track */}
        <path
          d="M 380 0 L 380 56 M 24 0 L 24 28 L 380 28 M 736 0 L 736 28 L 380 28"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />

        {/* 3a Direct Signal Line entering center from left rail */}
        <path
          d="M 24 0 L 24 28 L 380 28"
          fill="none"
          stroke="#F43F5E"
          strokeWidth="2.5"
          className={pulseClass}
        />

        {/* 3b Direct Signal Line entering center from right rail */}
        <path
          d="M 736 0 L 736 28 L 380 28"
          fill="none"
          stroke="#A855F7"
          strokeWidth="2.5"
          className={pulseClass}
        />

        {/* Validated ML stream coming straight down from 5 */}
        <path
          d="M 380 0 L 380 56"
          fill="none"
          stroke="#10B981"
          strokeWidth="2.5"
          className={pulseClass}
        />

        {/* Convergence node markers */}
        <circle cx="380" cy="28" r="4.5" fill="#A855F7" />
        <circle cx="24" cy="28" r="3" fill="#F43F5E" />
        <circle cx="736" cy="28" r="3" fill="#A855F7" />

        {/* Unified arrow entering Node 6 (Tier 3 GenAI Reasoning) */}
        <path d="M 375 48 L 380 54 L 385 48" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Helper Card for Flowchart Nodes

function FlowNode({
  id,
  title,
  subtitle,
  badge,
  tone,
  isOpen,
  onToggle,
  hasActiveFlag,
  isGateCheckpoint,
  icon,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  tone: "danger" | "warn" | "ok" | "signal" | "neutral";
  isOpen: boolean;
  onToggle: () => void;
  hasActiveFlag?: boolean;
  isGateCheckpoint?: boolean;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border transition-all duration-200 text-left cursor-pointer",
        isOpen
          ? "border-purple-500 bg-panel-raised/90 shadow-md ring-1 ring-purple-500/50 scale-[1.01]"
          : isGateCheckpoint
          ? "border-emerald-500/40 bg-panel/70 hover:border-emerald-400 hover:bg-panel-raised"
          : tone === "danger"
          ? "border-rose-500/40 bg-panel/70 hover:border-rose-500/80 hover:bg-panel-raised"
          : tone === "warn"
          ? "border-amber-500/40 bg-panel/70 hover:border-amber-500/80 hover:bg-panel-raised"
          : tone === "signal"
          ? "border-purple-500/40 bg-panel/70 hover:border-purple-400 hover:bg-panel-raised"
          : "border-border/70 bg-panel/70 hover:border-border hover:bg-panel-raised"
      )}
    >
      {/* Node Header (Click to toggle) */}
      <button
        type="button"
        onClick={onToggle}
        className="p-3 w-full text-left flex flex-col justify-between space-y-2 cursor-pointer"
      >
        <div className="flex items-center justify-between w-full">
          <span
            className={cn(
              "px-1.5 py-0.5 rounded font-mono text-[9px] font-bold border",
              isGateCheckpoint
                ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                : tone === "danger"
                ? "border-rose-500/50 bg-rose-500/15 text-rose-300"
                : tone === "warn"
                ? "border-amber-500/50 bg-amber-500/15 text-amber-300"
                : tone === "signal"
                ? "border-purple-500/50 bg-purple-500/15 text-purple-300"
                : "border-zinc-500/50 bg-zinc-500/15 text-zinc-300"
            )}
          >
            {icon}
          </span>
          <span className="font-mono text-[11px] font-bold text-purple-400 ml-auto flex items-center gap-1">
            {isOpen ? "−" : "+"}
          </span>
        </div>

        <div>
          <h4 className="text-[12px] font-bold text-foreground leading-tight">{title}</h4>
          <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center justify-between w-full pt-1">
          <Chip
            tone={
              tone === "danger"
                ? "danger"
                : tone === "warn"
                ? "warn"
                : tone === "ok"
                ? "ok"
                : tone === "signal"
                ? "signal"
                : "histo"
            }
          >
            {badge}
          </Chip>
          {hasActiveFlag && (
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" title="Active Telemetry Flag" />
          )}
        </div>
      </button>

      {/* Expanded Rich Details */}
      {isOpen && (
        <div className="rise-in border-t border-border/70 p-3 bg-panel-raised/50 rounded-b-xl">
          {children}
        </div>
      )}
    </div>
  );
}



// ============================================================================
// VEHICLE DIGITAL TWIN VIEW
// ============================================================================
function VinTwin({
  vin,
  onVin,
  onSwitchToArch,
}: {
  vin: string;
  onVin: (v: string) => void;
  onSwitchToArch?: () => void;
}) {
  const vehicle = VEHICLES.find((v) => v.vin === vin) ?? VEHICLES[0]!;
  const baseline = MODEL_BASELINES.find((b) => b.model === `${vehicle.model} ${vehicle.trim}`);
  const loggedHistory = TWIN_HISTORY.filter((e) => e.station <= vehicle.station);

  // Multi-expand state: allow as many stations to be open at once as the user wants
  const [openStations, setOpenStations] = useState<Set<number>>(new Set([14, 4]));
  const [disposition, setDisposition] = useState<"online" | "shipped">("online");
  const [feedbackStatus, setFeedbackStatus] = useState<"pending" | "confirmed" | "dismissed">("pending");

  const toggleStation = (stId: number) => {
    setOpenStations((prev) => {
      const next = new Set(prev);
      if (next.has(stId)) {
        next.delete(stId);
      } else {
        next.add(stId);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenStations(new Set(loggedHistory.map((e) => e.station)));
  };

  const collapseAll = () => {
    setOpenStations(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Selection Grid */}
      <Panel className="border-border/80 shadow-sm">
        <PanelHead
          index="01"
          title="Select Vehicle Digital Twin to Inspect"
          right={
            <div className="flex items-center gap-2">
              <Chip tone="ok">{VEHICLES.length} Active VIN Twins</Chip>
            </div>
          }
        />
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {VEHICLES.map((v) => {
              const isSelected = vehicle?.vin === v.vin;
              return (
                <button
                  key={v.vin}
                  onClick={() => onVin(v.vin)}
                  className={cn(
                    "flex flex-col justify-between p-3 rounded-xl border transition-all text-left cursor-pointer min-h-[64px]",
                    isSelected
                      ? "border-purple-500 bg-purple-500/20 shadow-md ring-1 ring-purple-500/50 scale-102"
                      : "border-border/70 bg-panel/70 hover:border-purple-500/40 hover:bg-panel-raised"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-mono text-[10.5px] font-bold text-foreground">{v.short}</span>
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        v.status === "at-risk"
                          ? "bg-rose-500"
                          : v.status === "watch"
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between w-full font-mono text-[9px] text-muted-foreground mt-1">
                    <span>ST-{String(v.station).padStart(2, "0")}</span>
                    <span className={cn(v.risk > 0.7 ? "text-rose-400 font-bold" : v.risk > 0.35 ? "text-amber-400 font-bold" : "text-emerald-400")}>
                      {Math.round(v.risk * 100)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Panel>

      {/* Selected Vehicle Digital Twin Deep Dive */}
      <Panel className="border-border/80 shadow-sm">
        <PanelHead
          index="02"
          title={`Digital Twin Profile · ${vehicle.vin}`}
          right={
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* 4. DISPOSITION TOGGLE & FEEDBACK STATUS BAR */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg border border-border/80 bg-background/80">
                <button
                  type="button"
                  onClick={() => setDisposition("online")}
                  className={cn(
                    "px-2 py-1 font-mono text-[10px] font-semibold rounded transition-all cursor-pointer",
                    disposition === "online"
                      ? "bg-purple-500/25 text-purple-300 border border-purple-500/60 shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  On Line: Buffer Hold Active
                </button>
                <button
                  type="button"
                  onClick={() => setDisposition("shipped")}
                  className={cn(
                    "px-2 py-1 font-mono text-[10px] font-semibold rounded transition-all cursor-pointer",
                    disposition === "shipped"
                      ? "bg-rose-500/25 text-rose-300 border border-rose-500/60 shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Shipped: Recall Review
                </button>
              </div>

              {/* Feedback Status */}
              <div className="flex items-center gap-1.5">
                {feedbackStatus === "pending" ? (
                  <div className="flex items-center gap-1">
                    <Chip tone="warn">Awaiting Supervisor Confirmation</Chip>
                    <button
                      type="button"
                      onClick={() => setFeedbackStatus("confirmed")}
                      className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30 transition-all cursor-pointer"
                    >
                      Confirm Flag
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackStatus("dismissed")}
                      className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-zinc-500/20 text-zinc-300 border border-zinc-500/50 hover:bg-zinc-500/30 transition-all cursor-pointer"
                    >
                      Dismiss as False Alarm
                    </button>
                  </div>
                ) : feedbackStatus === "confirmed" ? (
                  <div className="flex items-center gap-1">
                    <Chip tone="ok">Confirmed TRUE by Supervisor</Chip>
                    <button
                      type="button"
                      onClick={() => setFeedbackStatus("pending")}
                      className="text-[9.5px] font-mono text-muted-foreground hover:text-foreground underline cursor-pointer ml-1"
                    >
                      Undo
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Chip tone="muted">Dismissed as False Alarm</Chip>
                    <button
                      type="button"
                      onClick={() => setFeedbackStatus("pending")}
                      className="text-[9.5px] font-mono text-muted-foreground hover:text-foreground underline cursor-pointer ml-1"
                    >
                      Undo
                    </button>
                  </div>
                )}
              </div>

              <Chip tone={vehicle.status === "at-risk" ? "danger" : vehicle.status === "watch" ? "warn" : "ok"}>
                {vehicle.status.toUpperCase()}
              </Chip>
            </div>
          }
        />
        <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="space-y-4 border-b border-border/70 p-5 lg:border-r lg:border-b-0 bg-panel-raised/20">
            <div className="relative flex flex-col items-center justify-center border border-border/80 bg-panel-raised/50 py-6 px-4 rounded-xl text-center">
              <span className="absolute inset-0 tech-grid opacity-30" />
              <div className="relative space-y-1.5">
                <span className="label-xs text-purple-400 font-bold tracking-wider">VEHICLE IDENTIFIER</span>
                <div className="font-mono text-[16px] font-bold tracking-wider text-foreground select-all">
                  {vehicle.vin}
                </div>
                <div className="text-[11.5px] font-mono text-muted-foreground">
                  {vehicle.model} · {vehicle.trim}
                </div>
              </div>
            </div>
            <div>
              <KeyVal k="VIN" v={vehicle.vin} />
              <KeyVal k="Model / Trim" v={`${vehicle.model} ${vehicle.trim}`} />
              <KeyVal k="Baseline Set" v={`${vehicle.model} ${vehicle.trim}`} />
              <KeyVal k="Torque Limits" v={baseline?.torque ?? "42-48 Nm"} />
              <KeyVal
                k="Current Station"
                v={`ST-${String(vehicle.station).padStart(2, "0")} ${stationById(vehicle.station).name}`}
              />
              <KeyVal k="Records Captured" v={`${vehicle.station} of 36 stations`} />
              <KeyVal k="Shift / Operator" v={`Shift ${vehicle.shift ?? "B"} · A. Sharma`} />
            </div>
            <Meter
              value={vehicle.risk}
              tone={vehicle.risk > 0.7 ? "danger" : vehicle.risk > 0.35 ? "warn" : "ok"}
              label="AI Twin Risk"
              right={`${Math.round(vehicle.risk * 100)}%`}
            />
          </div>

          <div className="p-5 space-y-6">
            {/* 1. GENAI VERDICT CARD */}
            <div className="rounded-xl border border-purple-500/50 bg-purple-950/25 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded font-mono text-[9px] font-bold border border-purple-500/50 bg-purple-500/15 text-purple-300">
                    GENAI
                  </span>
                  <h4 className="text-[13px] font-bold text-foreground">
                    GenAI Verdict: Hold Recommended
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  <Chip tone="signal">Confidence 88%</Chip>
                  <Chip tone="danger">Severity: Structural</Chip>
                </div>
              </div>

              <div className="space-y-2 text-[11px] leading-snug">
                <div className="rounded-lg border border-purple-500/30 bg-purple-950/40 p-2.5 space-y-1 font-mono text-[10px]">
                  <div className="text-purple-300 font-bold uppercase tracking-wider text-[9px]">
                    Observation:
                  </div>
                  <div className="text-foreground/90 leading-relaxed">
                    This vehicle was flagged at ST-14 for elevated subframe torque (51.2 Nm vs 42-48 Nm baseline).
                  </div>
                </div>

                <div className="space-y-1.5 pt-0.5 text-foreground/90">
                  <div>
                    <strong className="text-purple-300">Plain English Synthesis: </strong>
                    <span className="text-muted-foreground leading-relaxed">
                      "The subframe bolt on this vehicle was under torqued, likely due to Tool T14 being overdue for calibration (18 days since last service) combined with a new fastener batch introduced during this shift. The operator's own note confirms the torque felt inconsistent."
                    </span>
                  </div>
                  <div>
                    <strong className="text-purple-300">Recommended Action: </strong>
                    <span className="text-muted-foreground leading-relaxed">
                      "Hold this vehicle before Powertrain Marriage (ST-28) for a manual retorque check: this is a simple fix now, but becomes a full disassembly if left until ST-28."
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[10px] text-muted-foreground italic pt-1 border-t border-purple-500/20 leading-tight">
                "GenAI performs no calculation of its own: it synthesizes and explains what SPC, ML, and aggregation logic have already computed."
              </p>
            </div>

            {/* PRODUCTION JOURNEY CHRONOLOGICAL STATION LOG */}
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <div className="label-xs text-purple-400 font-semibold">Production Journey · Chronological Station Log</div>
                  <div className="text-[11.5px] text-muted-foreground mt-0.5">
                    Click any station to expand/collapse independently without closing other open stations.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="px-2.5 py-1 text-[11px] font-mono border border-border/70 rounded-md bg-panel-raised/60 hover:border-purple-500/40 text-purple-300 transition-colors cursor-pointer"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="px-2.5 py-1 text-[11px] font-mono border border-border/70 rounded-md bg-panel-raised/60 hover:border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              <ol className="relative space-y-2 border-l border-border/70 pl-5">
                {loggedHistory.map((e) => {
                  const isOpen = openStations.has(e.station);
                  return (
                    <li key={e.station} className="relative">
                      <span
                        className={cn(
                          "absolute top-3 -left-[25px] h-2 w-2 rounded-full",
                          e.status === "flag"
                            ? "bg-rose-500"
                            : e.status === "watch"
                              ? "bg-amber-400"
                              : "bg-emerald-400",
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => toggleStation(e.station)}
                        className={cn(
                          "flex w-full items-center justify-between border px-3 py-2.5 text-left transition-colors rounded-lg cursor-pointer",
                          isOpen
                            ? "border-purple-500/50 bg-purple-500/10"
                            : "border-border/70 hover:border-purple-500/40 bg-panel/60",
                        )}
                      >
                        <span className="flex items-baseline gap-3">
                          <span className="font-mono text-[11px] font-bold text-purple-300">
                            ST-{String(e.station).padStart(2, "0")}
                          </span>
                          <span className="text-[13px] font-medium text-foreground/90">{e.label}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <Chip
                            tone={
                              e.source === "sensor" ? "ok" : e.source === "proxy" ? "warn" : "histo"
                            }
                          >
                            {e.source}
                          </Chip>
                          {e.status === "flag" && <Chip tone="danger">SPC flag</Chip>}
                          {e.status === "watch" && <Chip tone="warn">watch</Chip>}
                          <span className="text-[10px] font-mono text-purple-400 ml-1">
                            {isOpen ? "▲" : "▼"}
                          </span>
                        </span>
                      </button>
                      {isOpen && (
                        <div className="rise-in mt-1 border border-t-0 border-border/70 bg-panel-raised/60 px-4 py-2.5 rounded-b-lg">
                          {e.fields.map((f) => (
                            <KeyVal key={f.k} k={f.k} v={f.v} />
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
                <li className="relative">
                  <span className="absolute top-3 -left-[25px] h-2 w-2 rounded-full bg-purple-400" />
                  <div className="border border-dashed border-purple-500/40 px-3 py-2.5 font-mono text-[11px] text-purple-300 bg-purple-500/10 rounded-lg">
                    ST-{String(vehicle.station).padStart(2, "0")} · CURRENT: twin accumulating
                  </div>
                </li>
              </ol>
            </div>

            {/* 2. PREDICTED FORWARD PATH (NOT YET OCCURRED) */}
            <div className="pt-4 border-t border-border/70 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="label-xs text-amber-400 font-semibold">Predicted Forward Path · Downstream Trajectory</div>
                  <div className="text-[11.5px] text-muted-foreground mt-0.5">
                    Predicted downstream risk for stations this VIN has not yet reached (based on ST-14 propagation model).
                  </div>
                </div>
                <Chip tone="warn">Predicted: Not Yet Measured</Chip>
              </div>

              <div className="space-y-2.5">
                {/* ST-24 Trim Fit */}
                <div className="p-3 rounded-xl border border-dashed border-border/80 bg-panel/40 opacity-85 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-zinc-300">ST-24</span>
                      <span className="text-[13px] font-semibold text-foreground">Trim Fit</span>
                      <span className="font-mono text-[10px] text-muted-foreground italic">(Predicted: Not Yet Measured)</span>
                    </div>
                    <Chip tone="ok">12% Risk · Low</Chip>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    Low risk (12%): Interior harness and acoustic pan clearance within nominal tolerance bands.
                  </p>
                </div>

                {/* ST-28 Powertrain Marriage */}
                <div className="p-3 rounded-xl border border-dashed border-rose-500/60 bg-rose-950/20 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                      <span className="font-mono text-[11px] font-bold text-rose-300">ST-28</span>
                      <span className="text-[13px] font-bold text-foreground">Powertrain Marriage</span>
                      <span className="font-mono text-[10px] text-rose-400 italic font-semibold">(Predicted: Not Yet Measured)</span>
                    </div>
                    <Chip tone="danger">82% Risk · High</Chip>
                  </div>
                  <p className="text-[11px] text-rose-200/90 leading-snug">
                    High risk (82%): mount bolt mismatch predicted. Distorted subframe hardpoints will fail automated docking with transmission casing (hazard: 12-min line stoppage).
                  </p>
                </div>

                {/* ST-33 Final Torque Check */}
                <div className="p-3 rounded-xl border border-dashed border-amber-500/60 bg-amber-950/15 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-amber-300">ST-33</span>
                      <span className="text-[13px] font-semibold text-foreground">Final Torque Check</span>
                      <span className="font-mono text-[10px] text-muted-foreground italic">(Predicted: Not Yet Measured)</span>
                    </div>
                    <Chip tone="warn">45% Risk · Moderate</Chip>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    Moderate risk (45%): dependent on ST-28 outcome. Secondary joint distortion likely if chassis bypasses buffer hold.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. BATCH EXPOSURE TRACE */}
            <div className="pt-4 border-t border-border/70 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="label-xs text-purple-400 font-semibold">Batch &amp; Tool Exposure Trace</div>
                  <div className="text-[13px] font-bold text-foreground mt-0.5">
                    Other VINs Sharing This Exposure (same Tool T14 + Batch #4471 + Shift B window)
                  </div>
                </div>
                <Chip tone="signal">Structured Historical Query</Chip>
              </div>

              <div className="space-y-2">
                {/* Ranked Item 1 */}
                <div className="p-3 rounded-xl border border-rose-500/50 bg-rose-950/20 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    <strong className="text-foreground font-bold">8XYZ…0118</strong>
                    <span className="text-rose-300 font-semibold">same tool + same batch (high match)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-rose-300 font-bold">On Line, ST-17</span>
                    <Chip tone="danger">Buffer Hold Queued</Chip>
                  </div>
                </div>

                {/* Ranked Item 2 */}
                <div className="p-3 rounded-xl border border-amber-500/40 bg-amber-950/15 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <strong className="text-foreground font-bold">2MNO…8362</strong>
                    <span className="text-amber-300">same tool only (partial match)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-amber-300 font-bold">On Line, ST-26</span>
                    <Chip tone="warn">Watch</Chip>
                  </div>
                </div>

                {/* Ranked Item 3 */}
                <div className="p-3 rounded-xl border border-border/80 bg-panel/70 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <strong className="text-foreground font-bold">9ZZT…6780</strong>
                    <span className="text-muted-foreground">same batch only (partial match)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-foreground">On Line, ST-34</span>
                    <Chip tone="ok">Nominal</Chip>
                  </div>
                </div>

                {/* Ranked Item 4 (Shipped example) */}
                <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-950/20 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <strong className="text-foreground font-bold">4KLP…1109</strong>
                    <span className="text-rose-300 font-semibold">same tool + same batch (high match)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-rose-400 font-bold">Shipped: Recall Review Flagged</span>
                    <Chip tone="danger">Recall Audit</Chip>
                  </div>
                </div>

                {/* Ranked Item 5 (Shipped partial) */}
                <div className="p-3 rounded-xl border border-amber-500/40 bg-amber-950/15 flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    <strong className="text-foreground font-bold">7WQE…5521</strong>
                    <span className="text-amber-300">same tool only (partial match)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-amber-400 font-semibold">Shipped: Recall Review Flagged</span>
                    <Chip tone="warn">Warranty Alert</Chip>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[10px] text-muted-foreground italic pt-1 text-center">
                "Instantly computed from existing twin records: not a new prediction, a structured query across station + tool + batch + shift history."
              </p>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ArchitectureDiagram({
  active,
  onPick,
  mode = "line",
}: {
  active: string;
  onPick: (k: string) => void;
  mode?: "line" | "vin";
}) {
  return (
    <div className="grid grid-cols-[1fr_120px_1fr] items-center gap-3">
      {/* 36 stations grid */}
      <div>
        <div className="label-xs mb-2">
          {mode === "vin" ? "Layer 1 · VIN 7HGB…9321 Station Journey" : "Layer 1 · Physical Stations"}
        </div>
        <div className="grid grid-cols-6 gap-1">
          {STATIONS.map((s) => {
            let colorClass = "";
            if (mode === "vin") {
              if (s.id <= 13) {
                colorClass = "border-emerald-500/40 bg-emerald-500/15 text-emerald-300";
              } else if (s.id === 14) {
                colorClass = "border-rose-500 bg-rose-950/40 text-rose-300 font-bold animate-pulse";
              } else if (s.id === 18 || s.id === 21 || s.id === 28) {
                colorClass = "border-amber-500/50 bg-amber-950/25 text-amber-300 font-semibold";
              } else {
                colorClass = "border-border/70 bg-panel/60 text-muted-foreground";
              }
            } else {
              colorClass =
                s.instrumentation === "sensor"
                  ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                  : s.instrumentation === "proxy"
                  ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                  : "border-zinc-500/40 bg-zinc-500/15 text-zinc-300";
            }

            return (
              <div
                key={s.id}
                title={`${s.code} ${s.name}${
                  mode === "vin"
                    ? s.id <= 13
                      ? " (Clean Pass & Measured)"
                      : s.id === 14
                      ? " (⚠ Flagged Origin Anomaly)"
                      : s.id === 18 || s.id === 21 || s.id === 28
                      ? " (⚡ Predicted Propagation Risk)"
                      : " (Upcoming Stage)"
                    : ""
                }`}
                className={cn(
                  "h-5 rounded border text-center font-mono text-[9px] leading-5 transition-all",
                  colorClass
                )}
              >
                {s.id}
              </div>
            );
          })}
        </div>
        <div className="label-xs mt-2 text-muted-foreground">
          {mode === "vin"
            ? "13 Clean · 1 Flagged · 3 Risks · 19 Upcoming"
            : "36 Station Nodes Across Body, Paint & Final"}
        </div>
      </div>

      {/* signal flow */}
      <div className="relative h-[230px]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          {SIGNAL_GROUPS.map((g) => (
            <path
              key={g.key}
              d={`M0 ${g.y} C 40 ${g.y}, 55 50, 100 50`}
              fill="none"
              stroke={
                g.tone === "ok"
                  ? "#10B981"
                  : g.tone === "warn"
                  ? "#F59E0B"
                  : g.tone === "human"
                  ? "#818CF8"
                  : "#A855F7"
              }
              strokeWidth={active === g.key ? 1.5 : 0.6}
              opacity={active === g.key ? 1 : 0.35}
              className="flow-line"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col justify-between py-1">
          {SIGNAL_GROUPS.map((g) => (
            <button
              key={g.key}
              onClick={() => onPick(g.key)}
              className={cn(
                "ml-0 w-fit border px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] uppercase transition-colors rounded-md cursor-pointer",
                active === g.key
                  ? "border-purple-500 bg-purple-500/15 text-purple-300 font-semibold"
                  : "border-border/70 bg-background/80 text-muted-foreground hover:text-foreground hover:border-purple-500/40"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* twin core */}
      <div className="relative">
        <div className="glow-signal border border-purple-500/40 bg-purple-950/20 p-4 rounded-xl">
          <div className="label-xs text-purple-400 font-semibold">Layer 3 · Core Engine</div>
          <div className="mt-1 text-[15px] font-bold tracking-wide text-foreground">DIGITAL TWIN</div>
          <div className="mt-3 space-y-1 font-mono text-[10px] text-muted-foreground">
            <div>1 twin : 1 VIN</div>
            <div>36 station records</div>
            <div>4 signal classes</div>
            <div>model-trim baseline</div>
          </div>
        </div>
        <div className="mt-3 border border-border/80 p-3 rounded-xl bg-panel/60">
          <div className="label-xs text-muted-foreground">Local AI Inference</div>
          <div className="mt-1.5 font-mono text-[10px] leading-relaxed text-muted-foreground">
            production data ↓<br />
            local inference ↓<br />
            low-latency alert
          </div>
        </div>
      </div>
    </div>
  );
}
