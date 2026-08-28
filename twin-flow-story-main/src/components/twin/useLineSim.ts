import { useEffect, useRef, useState } from "react";
import { VEHICLES, type Vehicle } from "@/lib/demo-data";

export interface LiveVehicle extends Vehicle {
  /** fractional station position, 1..36 */
  pos: number;
}

/**
 * Frontend-only line simulator. Vehicles advance one station at a time on a
 * fixed takt so the visualization feels like a moving line. No backend.
 */
export function useLineSim(running = true, taktMs = 2600) {
  const [tick, setTick] = useState(0);
  const [vehicles, setVehicles] = useState<LiveVehicle[]>(() =>
    VEHICLES.map((v) => ({ ...v, pos: v.station })),
  );
  const [pulses, setPulses] = useState<number[]>([]);
  const ref = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      ref.current += 1;
      setTick(ref.current);
      setVehicles((prev) => {
        const next = prev.map((v) => {
          const np = v.pos >= 36 ? 1 : v.pos + 1;
          return {
            ...v,
            pos: np,
            station: np,
            passedStation14: np >= 14 ? v.passedStation14 || np >= 14 : false,
          };
        });
        setPulses(next.map((v) => v.pos));
        return next;
      });
    }, taktMs);
    return () => clearInterval(id);
  }, [running, taktMs]);

  return { vehicles, pulses, tick };
}
