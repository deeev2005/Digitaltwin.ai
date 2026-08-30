import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ActionButton,
  Chip,
  Panel,
  PanelHead,
  ScreenTitle,
} from "@/components/twin/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/validation")({
  head: () => ({
    meta: [
      { title: "Validation, Shadow Mode & OT Boundary: DigitalTwin" },
      {
        name: "description",
        content:
          "How AI predictions become trusted through Shadow Mode, human confirmation feedback loops, and read only OT cybersecurity safety boundaries.",
      },
      { property: "og:title", content: "Validation, Shadow Mode & OT Boundary: DigitalTwin" },
      {
        property: "og:description",
        content:
          "Shadow Mode → Backtesting → Human in the loop → Feedback Loop & One Way Read Only OT Safety.",
      },
    ],
  }),
  component: ValidationScreen,
});

function ValidationScreen() {
  // Expanded nodes state across all 3 trees
  const [openNodes, setOpenNodes] = useState<Record<string, boolean>>({
    "v-1": true,
    "v-4a": true,
    "v-5": true,
    "v-6": true,
    "ns-1": true,
    "ns-2b": true,
    "ns-3": true,
    "ns-5": true,
    "ot-2": true,
  });

  const anyExpanded = Object.values(openNodes).some(Boolean);
  const pulseClass = anyExpanded ? "wire-dash-slow" : "wire-dash";

  const ALL_NODE_IDS = [
    "v-1", "v-2", "v-3", "v-4a", "v-4b", "v-5", "v-6", "v-6b", "v-7",
    "ns-1", "ns-2a", "ns-2b", "ns-3", "ns-4", "ns-5",
    "ot-1", "ot-2", "ot-3", "ot-4",
  ];

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    ALL_NODE_IDS.forEach((id) => {
      next[id] = true;
    });
    setOpenNodes(next);
  };

  const handleCollapseAll = () => {
    setOpenNodes({});
  };

  const toggleNode = (id: string) => {
    setOpenNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isExpanded = (id: string) => !!openNodes[id];

  return (
    <div className="tech-grid">
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-8">
        <ScreenTitle
          title="Shadow Mode, Human Feedback Loop & OT Safety"
          lede="AI models must earn trust before driving floor actions. Every model starts in Shadow Mode, is backtested against physical inspection outcomes, and operates strictly via a one way, read only data diode with zero write access to machinery."
          right={
            <div className="flex items-center gap-3">
              <Link to="/digital-twin">
                <ActionButton tone="ghost">← AI Command Center</ActionButton>
              </Link>
            </div>
          }
        />

        {/* ========================================================================= */}
        {/* TREE 1 — VALIDATION LIFECYCLE */}
        {/* ========================================================================= */}
        <Panel className="border-border/80 shadow-sm">
          <PanelHead
            title="Validation Lifecycle: Shadow Mode → Backtesting → Active Alerting"
            right={
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleExpandAll}
                    className="px-2.5 py-1 text-[10px] font-mono border border-border/70 rounded-md bg-panel-raised/60 hover:border-purple-500/40 text-purple-300 transition-colors cursor-pointer"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={handleCollapseAll}
                    className="px-2.5 py-1 text-[10px] font-mono border border-border/70 rounded-md bg-panel-raised/60 hover:border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
                <Chip tone="signal">Branching Tree Architecture</Chip>
              </div>
            }
          />
          <div className="p-5 space-y-6">
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-3xl">
              Click any node in the tree below to expand details on how predictive algorithms transition from passive shadow mode to active alerting without risking false line shutdowns.
            </p>

            <div className="max-w-[760px] mx-auto py-2">
              {/* NODE 1: Shadow Mode */}
              <div className="max-w-[500px] mx-auto">
                <ValidationFlowNode
                  id="v-1"
                  title="Shadow Mode"
                  subtitle="Passive Line Telemetry Ingestion"
                  badge="Zero Line Alerts"
                  tone="neutral"
                  isOpen={isExpanded("v-1")}
                  onToggle={() => toggleNode("v-1")}
                >
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    Observes line passively with zero alerts generated. Model receives live telemetry streams in parallel with standard production without interfering with operator workflows or physical machinery.
                  </p>
                </ValidationFlowNode>
              </div>

              {/* WIRE 1 → 2 */}
              <VerticalWire pulseClass={pulseClass} color="#A855F7" />

              {/* FEEDBACK LOOP CONTAINER: Node 2 (Prediction Logged) through Node 7 (Active Alerting) */}
              <div className="relative">
                {/* Straight Feedback Return Wire with Sharp Bends: Node 7 (Active Alerting) -> Node 2 (Prediction Logged) */}
                <FeedbackLoopReturnWire pulseClass={pulseClass} />

                {/* NODE 2: Prediction Logged */}
                <div className="max-w-[500px] mx-auto">
                  <ValidationFlowNode
                    id="v-2"
                    title="Prediction Logged"
                    subtitle="Internal Digital Twin Risk Scoring"
                    badge="Internal Risk Score"
                    tone="signal"
                    isOpen={isExpanded("v-2")}
                    onToggle={() => toggleNode("v-2")}
                  >
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      Model logs risk score internally per VIN in real-time (e.g. 86% risk logged for Lead VIN 7HGB…9321 at ST-14). Predictions are stored in shadow records without triggering floor alarms.
                    </p>
                  </ValidationFlowNode>
                </div>

                {/* WIRE 2 → 3 */}
                <VerticalWire pulseClass={pulseClass} color="#A855F7" />

                {/* NODE 3: Real Inspection */}
                <div className="max-w-[500px] mx-auto">
                  <ValidationFlowNode
                    id="v-3"
                    title="Real Inspection"
                    subtitle="Physical Ground Truth Quality Check"
                    badge="Offline Quality Bay"
                    tone="warn"
                    isOpen={isExpanded("v-3")}
                    onToggle={() => toggleNode("v-3")}
                  >
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      Physical quality team inspects vehicle at station or offline inspection bay to verify physical ground truth independently of AI model predictions.
                    </p>
                  </ValidationFlowNode>
                </div>

                {/* WIRE 3 → 4 FORK (Splits into 4a True/False Positive & 4b True/False Negative) */}
                <ForkWire pulseClass={pulseClass} leftColor="#F43F5E" rightColor="#10B981" mainColor="#A855F7" />

                {/* LEVEL 4: BRANCHED NODES 4a & 4b */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[760px] mx-auto">
                  {/* BRANCH 4a: True/False Positive */}
                  <ValidationFlowNode
                    id="v-4a"
                    title="True / False Positive Log"
                    subtitle="Flagged Quality Inspection Findings"
                    badge="Confirmed & False Flags"
                    tone="danger"
                    isOpen={isExpanded("v-4a")}
                    onToggle={() => toggleNode("v-4a")}
                  >
                    <div className="space-y-2 pt-1 font-mono text-[10.5px]">
                      <div className="p-2 rounded border border-emerald-500/40 bg-emerald-950/20 space-y-0.5">
                        <div className="flex justify-between font-bold text-foreground">
                          <span>7HGB…9321</span>
                          <Chip tone="ok">True Positive</Chip>
                        </div>
                        <div className="text-emerald-300">Pred: Risk 86% · Act: Torque drift confirmed (+3.1 Nm)</div>
                      </div>

                      <div className="p-2 rounded border border-emerald-500/40 bg-emerald-950/20 space-y-0.5">
                        <div className="flex justify-between font-bold text-foreground">
                          <span>8XYZ…0118</span>
                          <Chip tone="ok">True Positive</Chip>
                        </div>
                        <div className="text-emerald-300">Pred: Risk 74% · Act: Tool T14 calibration mismatch</div>
                      </div>

                      <div className="p-2 rounded border border-amber-500/40 bg-amber-950/20 space-y-0.5">
                        <div className="flex justify-between font-bold text-foreground">
                          <span>2MNO…8362</span>
                          <Chip tone="warn">False Positive</Chip>
                        </div>
                        <div className="text-amber-300">Pred: Risk 68% · Act: Operator manual check passed</div>
                      </div>

                      <div className="p-2 rounded border border-purple-500/40 bg-purple-950/20 space-y-0.5">
                        <div className="flex justify-between font-bold text-foreground">
                          <span>9ZZT…6780</span>
                          <Chip tone="signal">Multi Factor TP</Chip>
                        </div>
                        <div className="text-purple-300">Pred: Risk 82% · Act: Tool T14 + Batch #4471 exposure</div>
                      </div>
                    </div>
                  </ValidationFlowNode>

                  {/* BRANCH 4b: True/False Negative */}
                  <ValidationFlowNode
                    id="v-4b"
                    title="True / False Negative Log"
                    subtitle="Clean Baseline Verification"
                    badge="True Negative Set"
                    tone="ok"
                    isOpen={isExpanded("v-4b")}
                    onToggle={() => toggleNode("v-4b")}
                  >
                    <div className="space-y-2 pt-1 font-mono text-[10.5px]">
                      <div className="p-2 rounded border border-emerald-500/40 bg-emerald-950/20 space-y-0.5">
                        <div className="flex justify-between font-bold text-foreground">
                          <span>3JKL…3204</span>
                          <Chip tone="ok">True Negative</Chip>
                        </div>
                        <div className="text-emerald-300">Pred: Normal · Act: Clean pass across 36 stations</div>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed pt-1">
                        Ensures model does not produce false negatives on high risk safety bolt joints.
                      </p>
                    </div>
                  </ValidationFlowNode>
                </div>

                {/* WIRE 4 MERGE → 5 */}
                <MergeWire pulseClass={pulseClass} leftColor="#F43F5E" rightColor="#10B981" mainColor="#A855F7" />

                {/* NODE 5: Backtesting */}
                <div className="max-w-[500px] mx-auto">
                  <ValidationFlowNode
                    id="v-5"
                    title="Backtesting"
                    subtitle="Aggregated Historical Evaluation"
                    badge="1,000 Cycles Evaluated"
                    tone="ok"
                    isOpen={isExpanded("v-5")}
                    onToggle={() => toggleNode("v-5")}
                  >
                    <div className="space-y-2">
                      <p className="text-[12px] text-muted-foreground leading-relaxed">
                        Precision/recall evaluated continuously over 1,000 takt cycles against confirmed physical quality logs.
                      </p>
                      <div className="p-2.5 rounded-lg border border-emerald-500/40 bg-emerald-950/20 flex items-center justify-between font-mono text-[11px]">
                        <span className="text-emerald-300 font-bold">98.4% Model Precision</span>
                        <span className="text-foreground">FPR: 1.6% (down from 4.1%)</span>
                      </div>
                    </div>
                  </ValidationFlowNode>
                </div>

                {/* WIRE 5 → 6 FORK */}
                <ForkWire pulseClass={pulseClass} leftColor="#A855F7" rightColor="#3B82F6" mainColor="#A855F7" />

                {/* LEVEL 6 MAIN & SIDE-BRANCH 6b */}
                <div className="relative max-w-[760px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* NODE 6: Validated */}
                  <ValidationFlowNode
                    id="v-6"
                    title="Validated"
                    subtitle="Production Readiness Promotion"
                    badge=">94% Threshold Met"
                    tone="signal"
                    isOpen={isExpanded("v-6")}
                    onToggle={() => toggleNode("v-6")}
                  >
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      Meets plant precision threshold (&gt;94% precision over 6 week window). Promoted from Shadow Mode to active operational alerting status.
                    </p>
                  </ValidationFlowNode>

                  {/* NODE 6b: Cross-Site Check (Side-Branch Node) */}
                  <ValidationFlowNode
                    id="v-6b"
                    title="Cross Site Check"
                    subtitle="Multi Plant Transfer Verification"
                    badge="Local Re Validation"
                    tone="info"
                    isOpen={isExpanded("v-6b")}
                    onToggle={() => toggleNode("v-6b")}
                  >
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      Patterns transferred from other plants (e.g. Ingolstadt, Pune) re-enter Shadow Mode locally and must re-validate independently on site data before live promotion.
                    </p>
                  </ValidationFlowNode>
                </div>

                {/* WIRE 6 MERGE → 7 */}
                <MergeWire pulseClass={pulseClass} leftColor="#A855F7" rightColor="#3B82F6" mainColor="#A855F7" />

                {/* NODE 7: Active Alerting */}
                <div className="max-w-[500px] mx-auto">
                  <ValidationFlowNode
                    id="v-7"
                    title="Active Alerting"
                    subtitle="Real Time Floor Action Dispatch"
                    badge="Live Recommendations"
                    tone="danger"
                    isOpen={isExpanded("v-7")}
                    onToggle={() => toggleNode("v-7")}
                  >
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      Supervisors receive real-time action directives and buffer hold recommendations on live production line for flagged vehicles.
                    </p>
                  </ValidationFlowNode>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        {/* ========================================================================= */}
        {/* TREE 2 & TREE 3 GRID */}
        {/* ========================================================================= */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* ========================================================================= */}
          {/* TREE 2 — HANDLING LOW & NO SENSOR STATIONS */}
          {/* ========================================================================= */}
          <Panel>
            <PanelHead
              title="Handling Low & No Sensor Stations"
              right={<Chip tone="signal">Bracketing & Black Box Method</Chip>}
            />
            <div className="p-5 space-y-6">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                How the Digital Twin computes defensible risk estimates at uninstrumented or sensor poor stations using direct physical bracketing from adjacent stations, proxy events, and historical baselines.
              </p>

              {/* Flowchart Layout */}
              <div className="max-w-[760px] mx-auto py-2 space-y-0">
                {/* Station Data Check */}
                <div className="max-w-[500px] mx-auto">
                  <ValidationFlowNode
                    id="ns-1"
                    title="Station Data Check"
                    subtitle="Does this station have direct sensors?"
                    badge="Sensor Audit"
                    tone="neutral"
                    isOpen={isExpanded("ns-1")}
                    onToggle={() => toggleNode("ns-1")}
                  >
                    <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                      Evaluates incoming station hardware capabilities to determine whether direct transducer telemetry or load cell sensors are present.
                    </p>
                  </ValidationFlowNode>
                </div>

                {/* Fork Wire: 1 -> 2a & 2b */}
                <ForkWire pulseClass={pulseClass} leftColor="#10B981" rightColor="#F59E0B" mainColor="#A855F7" />

                {/* 2a (YES) & 2b (NO/PARTIAL) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[760px] mx-auto">
                  {/* YES: Direct Sensor */}
                  <ValidationFlowNode
                    id="ns-2a"
                    title="YES: Direct Sensor"
                    subtitle="Full Confidence Reading"
                    badge="Measured"
                    tone="ok"
                    isOpen={isExpanded("ns-2a")}
                    onToggle={() => toggleNode("ns-2a")}
                  >
                    <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                      Full confidence reading, passes straight through to SPC/ML inference engine without synthetic estimation.
                    </p>
                  </ValidationFlowNode>

                  {/* NO / PARTIAL: Gap Detected */}
                  <ValidationFlowNode
                    id="ns-2b"
                    title="NO / PARTIAL: Gap Detected"
                    subtitle="Uninstrumented Station Gate"
                    badge="Gap Detected"
                    tone="warn"
                    isOpen={isExpanded("ns-2b")}
                    onToggle={() => toggleNode("ns-2b")}
                  >
                    <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                      Station lacks direct sensor telemetry; triggers physical bracketing protocol across surrounding instrumented nodes.
                    </p>
                  </ValidationFlowNode>
                </div>

                {/* LEVEL 3: 2 Columns — Direct Vertical Wire in Left Column (2a -> 5) & Combined Node 3 in Right Column (under 2b) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[760px] mx-auto items-stretch pt-1">
                  {/* Left Column: Perfectly centered vertical green wire spanning full height from 2a to MergeWire */}
                  <div className="hidden md:flex flex-col items-center justify-center h-full w-full pointer-events-none">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(16,185,129,0.25)" strokeWidth="2" strokeDasharray="4 6" />
                      <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#10B981" strokeWidth="2.5" className={pulseClass} />
                    </svg>
                  </div>

                  {/* Right Column: Combined Node 3 (Bracketing & Secondary Signals) */}
                  <div className="flex flex-col items-center justify-between h-full py-1">
                    <VerticalWire pulseClass={pulseClass} color="#F59E0B" height={20} />
                    <ValidationFlowNode
                      id="ns-3"
                      title="Bracketing & Secondary Signals"
                      subtitle="Black Box Method & Fallback Check"
                      badge="Black Box Inference"
                      tone="signal"
                      isOpen={isExpanded("ns-3")}
                      onToggle={() => toggleNode("ns-3")}
                      className="h-auto w-full my-1"
                    >
                      <div className="space-y-1 text-[10px] text-muted-foreground leading-tight">
                        <p>
                          Station has no direct sensor. Treats station as a "black box": using measured ingress at <span className="font-mono text-foreground font-semibold">[N-1]</span> and egress at <span className="font-mono text-foreground font-semibold">[N+1]</span> to infer internal behavior.
                        </p>
                        <div className="rounded-md border border-purple-500/30 bg-purple-950/20 p-1.5 space-y-0.5 font-mono text-[9px]">
                          <div>
                            <strong className="text-purple-300">Dwell Time:</strong> Exit at <span className="text-foreground">[N-1]</span> to entry at <span className="text-foreground">[N+1]</span> yields measured duration.
                          </div>
                          <div>
                            <strong className="text-purple-300">Defect Attribution:</strong> Good at <span className="text-foreground">[N-1]</span> + defect at <span className="text-foreground">[N+1]</span> attributes fault here.
                          </div>
                        </div>
                      </div>
                    </ValidationFlowNode>
                    <VerticalWire pulseClass={pulseClass} color="#A855F7" height={20} />
                  </div>
                </div>

                {/* Merge Wire: Left Column (2a: x=186) & Right Column (3: x=574) -> 5 */}
                <MergeWire pulseClass={pulseClass} leftColor="#10B981" rightColor="#A855F7" mainColor="#A855F7" />

                {/* Confidence-Tagged Output */}
                <div className="max-w-[500px] mx-auto">
                  <ValidationFlowNode
                    id="ns-5"
                    title="Confidence Tagged Output"
                    subtitle="Source Labeled Pipeline Ingestion"
                    badge="Tagged Output"
                    tone="signal"
                    isOpen={isExpanded("ns-5")}
                    onToggle={() => toggleNode("ns-5")}
                  >
                    <div className="space-y-2 text-[11.5px] text-muted-foreground leading-relaxed">
                      <p>
                        Passed to SPC/ML/GenAI with its source labeled: never treated as equally certain as a direct sensor reading.
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 font-mono text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">Measured</span>
                        <span className="px-2 py-0.5 rounded bg-purple-950/40 border border-purple-500/40 text-purple-300">Inferred</span>
                        <span className="px-2 py-0.5 rounded bg-blue-950/40 border border-blue-500/40 text-blue-300">Reported</span>
                        <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">Historical</span>
                      </div>
                    </div>
                  </ValidationFlowNode>
                </div>
              </div>
            </div>
          </Panel>

          {/* ========================================================================= */}
          {/* TREE 3 — OT CYBERSECURITY BOUNDARY */}
          {/* ========================================================================= */}
          <Panel>
            <PanelHead
              title="OT Cybersecurity Boundary · Strictly Read Only"
              right={<Chip tone="ok">Hardware Air Gap</Chip>}
            />
            <div className="p-5 space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-foreground">Hardware Data Diode Security Architecture</h3>
                  <div className="label-xs text-purple-400 mt-0.5">Plant OT Network ↔ AI Analytics Boundary</div>
                </div>
                <Chip tone="ok">Hardware Enforced</Chip>
              </div>

              {/* Hardware Security Guarantee Banner */}
              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="label-xs text-emerald-400 font-bold uppercase">Hardware Guarantee</span>
                </div>
                <p className="text-[12px] text-foreground/90 leading-relaxed italic">
                  "Even in a compromised or hacked scenario, no command path exists back to machinery: this is a physical/hardware guarantee, not just a software policy."
                </p>
              </div>

              {/* Vertical One-Way OT Chain */}
              <div className="space-y-0 max-w-[500px] mx-auto">
                <ValidationFlowNode
                  id="ot-1"
                  title="PLC / OT Network"
                  subtitle="Assembly Tools & Line Sensors"
                  badge="Shop Floor Machinery"
                  tone="neutral"
                  isOpen={isExpanded("ot-1")}
                  onToggle={() => toggleNode("ot-1")}
                >
                  <p className="text-[11.5px] text-muted-foreground font-mono">Modbus RTU / OPC-UA telemetry broadcast from nutrunners, presses, and line sensors.</p>
                </ValidationFlowNode>

                <VerticalWire pulseClass={pulseClass} color="#10B981" />

                <ValidationFlowNode
                  id="ot-2"
                  title="Read Only Link"
                  subtitle="100% Unidirectional Data Gate"
                  badge="Write Back BLOCKED"
                  tone="ok"
                  isOpen={isExpanded("ot-2")}
                  onToggle={() => toggleNode("ot-2")}
                >
                  <div className="space-y-1 font-mono text-[11px]">
                    <div className="text-emerald-300 font-bold">100% Unidirectional Read Stream</div>
                    <div className="text-rose-400 font-bold">Write Back: BLOCKED (0 command paths)</div>
                  </div>
                </ValidationFlowNode>

                <VerticalWire pulseClass={pulseClass} color="#10B981" />

                <ValidationFlowNode
                  id="ot-3"
                  title="Data Diode"
                  subtitle="Hardware Enforced Boundary"
                  badge="Optical Physical Gate"
                  tone="ok"
                  isOpen={isExpanded("ot-3")}
                  onToggle={() => toggleNode("ot-3")}
                >
                  <p className="text-[11.5px] text-muted-foreground">Optical fiber hardware data diode prevents electrical signal transmission back into OT network.</p>
                </ValidationFlowNode>

                <VerticalWire pulseClass={pulseClass} color="#A855F7" />

                <ValidationFlowNode
                  id="ot-4"
                  title="Digital Twin AI"
                  subtitle="Local Edge Appliance"
                  badge="Inference Latency <15ms"
                  tone="signal"
                  isOpen={isExpanded("ot-4")}
                  onToggle={() => toggleNode("ot-4")}
                >
                  <p className="text-[11.5px] text-muted-foreground font-mono">Edge server processes real-time telemetry with sub-15ms latency for immediate twin risk updates.</p>
                </ValidationFlowNode>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// HELPER COMPONENTS FOR TREES
// =========================================================================

function ValidationFlowNode({
  title,
  subtitle,
  badge,
  tone = "neutral",
  isOpen,
  onToggle,
  children,
  className,
}: {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  tone?: "neutral" | "ok" | "warn" | "danger" | "signal" | "info";
  isOpen: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
  className?: string;
}) {
  const toneClasses = {
    neutral: "border-border/80 bg-panel/80 hover:border-purple-500/40",
    ok: "border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-500/60",
    warn: "border-amber-500/40 bg-amber-950/20 hover:border-amber-500/60",
    danger: "border-rose-500/40 bg-rose-950/20 hover:border-rose-500/60",
    signal: "border-purple-500/40 bg-purple-950/20 hover:border-purple-500/60",
    info: "border-blue-500/40 bg-blue-950/20 hover:border-blue-500/60",
  };

  const badgeTones = {
    neutral: "muted" as const,
    ok: "ok" as const,
    warn: "warn" as const,
    danger: "danger" as const,
    signal: "signal" as const,
    info: "ok" as const,
  };

  return (
    <div
      onClick={onToggle}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border p-3.5 transition-all cursor-pointer shadow-sm select-none",
        className || "h-full",
        toneClasses[tone],
        isOpen && "ring-1 ring-purple-500/40 bg-panel-raised"
      )}
    >
      {/* Top and Bottom Terminal Center Pins */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-1 rounded-sm bg-purple-500/50 pointer-events-none" />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 rounded-sm bg-purple-500/50 pointer-events-none" />

      <div className="w-full">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-2 w-2 rounded-full bg-purple-400 group-hover:scale-125 transition-transform shrink-0" />
            <div className="min-w-0">
              <h4 className="text-[13px] font-bold text-foreground leading-snug">{title}</h4>
              {subtitle && <p className="text-[10.5px] text-muted-foreground leading-tight mt-0.5">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {badge && <Chip tone={badgeTones[tone]}>{badge}</Chip>}
            <span className="font-mono text-[11px] text-muted-foreground transition-transform group-hover:text-purple-300">
              {isOpen ? "▲" : "▼"}
            </span>
          </div>
        </div>

        {isOpen && children && (
          <div
            className="mt-3 pt-3 border-t border-border/60 text-[12px] space-y-2 cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

function VerticalWire({
  pulseClass = "wire-dash",
  color = "#A855F7",
  height = 32,
}: {
  pulseClass?: string;
  color?: string;
  height?: number;
}) {
  return (
    <div className="flex justify-center items-center h-8 my-0.5 relative">
      <svg width="24" height={height} viewBox="0 0 24 32" className="overflow-visible">
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

function ForkWire({
  pulseClass = "wire-dash",
  leftColor = "#F43F5E",
  rightColor = "#10B981",
  mainColor = "#A855F7",
}: {
  pulseClass?: string;
  leftColor?: string;
  rightColor?: string;
  mainColor?: string;
}) {
  return (
    <div className="flex justify-center items-center h-12 my-0.5 relative w-full max-w-[760px] mx-auto">
      <svg viewBox="0 0 760 48" className="w-full h-12 overflow-visible">
        {/* Right-angle tree bracket track */}
        <path
          d="M 380 0 L 380 24 L 186 24 L 186 48 M 380 24 L 574 24 L 574 48"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        {/* Left branch animated pulse */}
        <path
          d="M 380 0 L 380 24 L 186 24 L 186 48"
          fill="none"
          stroke={leftColor}
          strokeWidth="2.5"
          className={pulseClass}
        />
        {/* Right branch animated pulse */}
        <path
          d="M 380 24 L 574 24 L 574 48"
          fill="none"
          stroke={rightColor}
          strokeWidth="2.5"
          className={pulseClass}
        />
        {/* Directional Arrowheads */}
        <path d="M 182 40 L 186 46 L 190 40" fill="none" stroke={leftColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M 570 40 L 574 46 L 578 40" fill="none" stroke={rightColor} strokeWidth="2" strokeLinecap="round" />
        {/* Fork Split Node Point */}
        <circle cx="380" cy="24" r="3.5" fill={mainColor} />
      </svg>
    </div>
  );
}

function MergeWire({
  pulseClass = "wire-dash",
  leftColor = "#F43F5E",
  rightColor = "#10B981",
  mainColor = "#A855F7",
}: {
  pulseClass?: string;
  leftColor?: string;
  rightColor?: string;
  mainColor?: string;
}) {
  return (
    <div className="flex justify-center items-center h-12 my-0.5 relative w-full max-w-[760px] mx-auto">
      <svg viewBox="0 0 760 48" className="w-full h-12 overflow-visible">
        {/* Background merge tracks */}
        <path
          d="M 186 0 L 186 24 L 380 24 M 574 0 L 574 24 L 380 24 M 380 24 L 380 48"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
        />
        {/* Left incoming pulse */}
        <path
          d="M 186 0 L 186 24 L 380 24"
          fill="none"
          stroke={leftColor}
          strokeWidth="2.5"
          className={pulseClass}
        />
        {/* Right incoming pulse */}
        <path
          d="M 574 0 L 574 24 L 380 24"
          fill="none"
          stroke={rightColor}
          strokeWidth="2.5"
          className={pulseClass}
        />
        {/* Combined output pulse */}
        <path
          d="M 380 24 L 380 48"
          fill="none"
          stroke={mainColor}
          strokeWidth="2.5"
          className={pulseClass}
        />
        {/* Downward Arrowhead into bottom node */}
        <path d="M 376 40 L 380 46 L 384 40" fill="none" stroke={mainColor} strokeWidth="2" strokeLinecap="round" />
        {/* Convergence Junction Node Points */}
        <circle cx="380" cy="24" r="4" fill={mainColor} />
        <circle cx="186" cy="24" r="3" fill={leftColor} />
        <circle cx="574" cy="24" r="3" fill={rightColor} />
      </svg>
    </div>
  );
}



function FeedbackLoopReturnWire({ pulseClass }: { pulseClass: string }) {
  return (
    <div className="hidden md:block pointer-events-none z-10">
      {/* Top horizontal arm into Node 2 (Prediction Logged) with standard sharp arrowhead */}
      <div className="absolute right-[-24px] top-[20px] w-[154px] h-[16px]">
        <svg width="154" height="16" viewBox="0 0 154 16" className="w-full h-full overflow-visible">
          <line x1="154" y1="8" x2="0" y2="8" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <line x1="154" y1="8" x2="0" y2="8" stroke="#A855F7" strokeWidth="2.5" className={pulseClass} />
          {/* Crisp, standard sharp arrowhead identical to all other flowchart arrows */}
          <path d="M 7 4 L 1 8 L 7 12" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Vertical bypass rail running straight UP from Node 7 (bottom) to Node 2 (top) */}
      <div className="absolute right-[-24px] top-[28px] bottom-[28px] w-[2px]">
        <svg className="w-full h-full overflow-visible">
          <line x1="0" y1="100%" x2="0" y2="0%" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <line x1="0" y1="100%" x2="0" y2="0%" stroke="#A855F7" strokeWidth="2.5" className={pulseClass} />
        </svg>
      </div>

      {/* Bottom horizontal arm out of Node 7 (Active Alerting) */}
      <div className="absolute right-[-24px] bottom-[20px] w-[154px] h-[16px]">
        <svg width="154" height="16" viewBox="0 0 154 16" className="w-full h-full overflow-visible">
          <line x1="0" y1="8" x2="154" y2="8" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <line x1="0" y1="8" x2="154" y2="8" stroke="#A855F7" strokeWidth="2.5" className={pulseClass} />
          <circle cx="0" cy="8" r="3" fill="#A855F7" />
        </svg>
      </div>
    </div>
  );
}

