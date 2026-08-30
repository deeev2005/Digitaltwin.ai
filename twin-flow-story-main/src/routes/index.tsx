import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ProductionLine } from "@/components/twin/ProductionLine";
import { useLineSim } from "@/components/twin/useLineSim";
import {
  Chip,
  Panel,
  PanelHead,
} from "@/components/twin/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DigitalTwin — Station Line & AI Center Twin Flow" },
      {
        name: "description",
        content:
          "Interactive 36-station mixed-model vehicle assembly line connected directly to the Main AI Center, aggregating live vehicle Digital Twins and telemetry data.",
      },
      { property: "og:title", content: "DigitalTwin — Station Line & AI Center Twin Flow" },
      {
        property: "og:description",
        content:
          "Connected Stations → Section Wire Harnesses → Main AI Center Hub → Per-VIN Digital Twin Data Matrix.",
      },
    ],
  }),
  component: LineScreen,
});

function LineScreen() {
  const navigate = useNavigate();
  const { vehicles } = useLineSim(true);
  const [vin, setVin] = useState<string | null>("7HGBH41JXMN109321");
  const [stationId, setStationId] = useState<number | null>(14);

  const handleOpenAiCenter = (targetVin?: string) => {
    navigate({
      to: "/digital-twin",
      search: targetVin ? { vin: targetVin, tab: "vin" } : {},
    });
  };

  return (
    <div className="tech-grid">
      <div className="mx-auto max-w-[1600px] space-y-8 px-5 py-8">
        <header className="flex flex-col items-center justify-center text-center border-b border-border/70 pb-6 pt-2">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-normal pb-2 bg-gradient-to-r from-foreground via-purple-300 to-purple-500 bg-clip-text text-transparent">
            DigitalTwin.ai
          </h1>
        </header>

        {/* Hero Connected Line & Central AI Center Visualizer */}
        <Panel className="border-border/80 shadow-sm">
          <PanelHead
            title="Line A · 36 Station Assembly Line & Main AI Center Link"
            right={
              <div className="flex items-center gap-3">
                <Chip tone="ok">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Live Takt Running
                </Chip>
                <Chip tone="signal">{vehicles.length} Vehicles Active</Chip>
              </div>
            }
          />
          <div className="p-4">
            <ProductionLine
              vehicles={vehicles}
              selectedVin={vin}
              onSelectVehicle={(selectedVin) => {
                setVin(selectedVin);
                handleOpenAiCenter(selectedVin);
              }}
              selectedStation={stationId}
              onSelectStation={(id) => setStationId(id)}
              dangerStations={[14]}
              onOpenAiCenter={() => handleOpenAiCenter()}
              isAiCenterActive={false}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}
