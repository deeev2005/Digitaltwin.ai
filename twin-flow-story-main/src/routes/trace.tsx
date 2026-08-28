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
import { ALL_VEHICLES, ROOT_CAUSE_NODES, VEHICLES, OFF_LINE_VEHICLES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trace")({
  head: () => ({
    meta: [
      { title: "Root Cause & Exposure Trace — DigitalTwin" },
      {
        name: "description",
        content:
          "Multi-variable root cause context graph and backward batch exposure tracing from confirmed vehicle defects to the entire affected fleet.",
      },
      { property: "og:title", content: "Root Cause & Exposure Trace — DigitalTwin" },
      {
        property: "og:description",
        content: "Trace backward from 1 confirmed defect to 10+ exposed VINs across the fleet.",
      },
    ],
  }),
  component: TraceScreen,
});

function TraceScreen() {
  const [selectedNode, setSelectedNode] = useState<string>("tool");
  const [isTracing, setIsTracing] = useState<boolean>(true);
  const [filterExposure, setFilterExposure] = useState<"all" | "high" | "medium" | "low">("all");

  const node = ROOT_CAUSE_NODES.find((n) => n.id === selectedNode) ?? ROOT_CAUSE_NODES[0]!;

  const exposedVehicles = ALL_VEHICLES.filter((v) => {
    if (!v.passedStation14) return false;
    if (filterExposure === "all") return true;
    return v.exposure === filterExposure;
  });

  return (
    <div className="tech-grid">
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-8">
        <ScreenTitle
          title="Multidimensional Context & Batch Exposure Trace"
          lede="Defects are rarely caused by a single isolated sensor spike. The Digital Twin correlates machine, tool, batch, human, and environmental context—allowing backward root-cause tracing from one confirmed defect to every exposed vehicle in the fleet."
          right={
            <div className="flex items-center gap-3">
              <Link to="/digital-twin">
                <ActionButton tone="ghost">← AI Command Center</ActionButton>
              </Link>
            </div>
          }
        />

        {/* ========================================================================= */}
        {/* SECTION 1: ROOT CAUSE MULTIDIMENSIONAL CONTEXT GRAPH */}
        {/* ========================================================================= */}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Panel className="border-border/80 shadow-sm">
            <PanelHead
              index="01"
              title="Multidimensional Root-Cause Evidence Graph"
              right={<Chip tone="signal">ST-14 Subframe Mount Anomaly</Chip>}
            />
            <div className="p-5 space-y-5">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                Click any evidence node to inspect its correlation weight with the Station 14 subframe torque deviation.
              </p>

              {/* Interactive Visual Graph Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {ROOT_CAUSE_NODES.map((n) => {
                  const isSel = n.id === selectedNode;
                  return (
                    <button
                      key={n.id}
                      onClick={() => setSelectedNode(n.id)}
                      className={cn(
                        "flex flex-col p-3 rounded-xl border text-left transition-all cursor-pointer",
                        isSel
                          ? "border-purple-500 bg-purple-500/20 shadow-md ring-1 ring-purple-500/50 scale-102"
                          : "border-border/70 bg-panel/70 hover:border-purple-500/40 hover:bg-panel-raised"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="label-xs text-purple-400 font-bold">{n.sub}</span>
                        <span className="font-mono text-[9.5px] text-purple-300">
                          {Math.round(n.weight * 100)}%
                        </span>
                      </div>
                      <div className="text-[13px] font-semibold text-foreground truncate">{n.label}</div>
                      <div className="mt-2 h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-400 rounded-full"
                          style={{ width: `${n.weight * 100}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Worker Voice Note Structured Ingestion */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="label-xs text-indigo-300 font-bold">Worker Observation Ingested as Machine-Readable Signal</span>
                  </div>
                  <Chip tone="human">Shift B · 07:42</Chip>
                </div>
                <div className="text-[12.5px] text-foreground font-mono bg-background/80 p-2.5 rounded-lg border border-border/80">
                  "Torque felt inconsistent on the left mount."
                </div>
                <div className="flex items-center gap-3 text-[11.5px] text-muted-foreground pt-1">
                  <span>GenAI Entity Extraction:</span>
                  <span className="font-mono text-indigo-300">Station: 14</span>
                  <span>•</span>
                  <span className="font-mono text-indigo-300">Part: Left Subframe Mount</span>
                  <span>•</span>
                  <span className="font-mono text-indigo-300">Symptom: Torque Variance</span>
                </div>
              </div>
            </div>
          </Panel>

          {/* Selected Evidence Node Detail Panel */}
          <Panel>
            <PanelHead index="02" title={`Evidence Detail · ${node.label}`} />
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between border-b border-border/60 pb-3">
                <div>
                  <h3 className="text-[16px] font-semibold text-foreground">{node.label}</h3>
                  <div className="label-xs text-purple-400 mt-0.5">{node.sub} Context Layer</div>
                </div>
                <Chip tone="signal">Weight {node.weight.toFixed(2)}</Chip>
              </div>

              <div className="text-[13px] leading-relaxed text-foreground/90 bg-panel-raised/50 p-4 rounded-xl border border-border/70">
                {node.detail}
              </div>

              <div className="space-y-1 text-[12px]">
                <KeyVal k="Factor Category" v={node.sub} />
                <KeyVal k="Correlation with Defect" v={`${Math.round(node.weight * 100)}% Confidence`} />
                <KeyVal k="Contributing Origin" v="Station 14 Subframe Cell" />
                <KeyVal k="Time Alignment" v="Shift B (06:00 – 14:00)" />
              </div>

              <Meter
                value={node.weight}
                tone="signal"
                label="Correlation Factor Weight"
                right={`${Math.round(node.weight * 100)}%`}
              />
            </div>
          </Panel>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: BATCH EXPOSURE TRACE (BACKWARD SEARCH ACROSS FLEET) */}
        {/* ========================================================================= */}
        <Panel>
          <PanelHead
            index="03"
            title="Batch Exposure Trace (Backward History Search from VIN 7HGB…9321)"
            right={
              <div className="flex items-center gap-2">
                <Chip tone="danger">12 Exposed VINs Identified</Chip>
                <ActionButton
                  tone="signal"
                  onClick={() => setIsTracing(!isTracing)}
                  className="cursor-pointer"
                >
                  {isTracing ? "⚡ Re-Run Fleet Trace" : "Execute Trace"}
                </ActionButton>
              </div>
            }
          />
          <div className="p-5 space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h4 className="text-[15px] font-semibold text-foreground">
                  Backward Provenance Search: Station 14 → Tool T14 → Part Batch #4471 → Shift B
                </h4>
                <p className="text-[12.5px] text-muted-foreground mt-1 max-w-3xl leading-relaxed">
                  When one VIN is confirmed defective at Station 14, the Digital Twin immediately queries the accumulated production history to locate all other vehicles produced under the identical parameter envelope.
                </p>
              </div>

              {/* Exposure Filter Tabs */}
              <div className="flex gap-1.5">
                {(["all", "high", "medium", "low"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFilterExposure(lvl)}
                    className={cn(
                      "px-3 py-1 font-mono text-[10.5px] uppercase rounded-md border transition-all cursor-pointer",
                      filterExposure === lvl
                        ? "border-purple-500 bg-purple-500/20 text-purple-300 font-semibold"
                        : "border-border/70 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Exposed Vehicles Table / Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {exposedVehicles.map((v) => {
                const isOrigin = v.vin === "7HGBH41JXMN109321";
                return (
                  <div
                    key={v.vin}
                    className={cn(
                      "p-4 rounded-xl border transition-all space-y-3",
                      isOrigin
                        ? "border-rose-500/70 bg-rose-950/20 shadow-md ring-1 ring-rose-500/50"
                        : v.exposure === "high"
                        ? "border-purple-500/50 bg-purple-950/20"
                        : "border-border/70 bg-panel/70"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11.5px] font-bold text-foreground">{v.short}</span>
                        {isOrigin && <Chip tone="danger">Confirmed Origin</Chip>}
                      </div>
                      <Chip
                        tone={
                          v.exposure === "high"
                            ? "danger"
                            : v.exposure === "medium"
                            ? "warn"
                            : "histo"
                        }
                      >
                        {v.exposure} exposure
                      </Chip>
                    </div>

                    <div className="space-y-1 font-mono text-[11px] text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Model:</span>
                        <span className="text-foreground">{v.model} {v.trim}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Disposition:</span>
                        <span
                          className={cn(
                            "font-bold uppercase",
                            v.disposition === "on-line"
                              ? "text-purple-300"
                              : v.disposition === "completed"
                              ? "text-amber-300"
                              : "text-rose-400"
                          )}
                        >
                          {v.disposition === "on-line"
                            ? `On Line (ST-${String(v.station).padStart(2, "0")})`
                            : v.disposition === "completed"
                            ? "Completed Line"
                            : "Shipped Fleet"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shared Envelope:</span>
                        <span className="text-purple-400">{v.tool} · {v.batch} · Shift {v.shift}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                      <span className="label-xs text-muted-foreground">Action Directive:</span>
                      <span className="font-mono text-[10.5px] font-bold text-purple-300">
                        {v.disposition === "on-line"
                          ? "Recheck at Buffer"
                          : v.disposition === "completed"
                          ? "Hold in Yard"
                          : "Service Recall"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
