// Frontend-only mock data driving the DigitalTwin architecture demo.
// Nothing here talks to a backend, PLC, sensor or model — all values are
// predefined narrative states for the Station 14 tool-drift scenario.

export type Zone = "BODY" | "PAINT" | "FINAL";
export type Instrumentation = "sensor" | "proxy" | "historical";

export interface Station {
  id: number;
  code: string;
  name: string;
  zone: Zone;
  instrumentation: Instrumentation;
  signals: string[];
  confidence: number;
}

const BODY_NAMES = [
  "Underbody Load",
  "Floor Pan Weld",
  "Rear Rail Set",
  "Front Rail Set",
  "Body Side L",
  "Body Side R",
  "Roof Framing",
  "Respot Weld A",
  "Respot Weld B",
  "Door Hang",
  "Hood / Deck Fit",
  "Fender Set",
  "Geometry Gate",
  "Subframe Mount",
];
const PAINT_NAMES = [
  "Pre-Treatment",
  "E-Coat Dip",
  "E-Coat Bake",
  "Sealer Apply",
  "Primer Booth",
  "Primer Bake",
  "Base Coat",
  "Clear Coat",
  "Paint Inspect",
];
const FINAL_NAMES = [
  "Trim Line 1",
  "Harness Route",
  "Cockpit Install",
  "Glass Set",
  "Powertrain Marriage",
  "Suspension Bolt",
  "Brake Line",
  "Fluid Fill",
  "Seat Install",
  "Door Re-Hang",
  "Wheel Fit",
  "Electrical Test",
  "Final Inspection",
];

function make(
  id: number,
  name: string,
  zone: Zone,
  instrumentation: Instrumentation,
  signals: string[],
  confidence: number,
): Station {
  return {
    id,
    code: `ST-${String(id).padStart(2, "0")}`,
    name,
    zone,
    instrumentation,
    signals,
    confidence,
  };
}

const SENSOR_SIGNALS = ["Torque", "Cycle time", "Temperature", "Tool position"];
const PROXY_SIGNALS = ["Part scan", "Andon pull", "Badge swipe", "Timestamp"];
const HISTO_SIGNALS = ["Station baseline", "Model-trim history"];

export const STATIONS: Station[] = [
  ...BODY_NAMES.map((n, i) => {
    const id = i + 1;
    const inst: Instrumentation = id === 4 || id === 8 ? "historical" : id === 13 ? "proxy" : "sensor";
    return make(
      id,
      n,
      "BODY",
      inst,
      inst === "sensor" ? SENSOR_SIGNALS : inst === "proxy" ? PROXY_SIGNALS : HISTO_SIGNALS,
      inst === "sensor" ? 0.94 : inst === "proxy" ? 0.71 : 0.42,
    );
  }),
  ...PAINT_NAMES.map((n, i) => {
    const id = i + 15;
    const inst: Instrumentation = id === 16 ? "historical" : id === 23 ? "proxy" : "sensor";
    return make(
      id,
      n,
      "PAINT",
      inst,
      inst === "sensor"
        ? ["Booth temp", "Humidity", "Film thickness", "Cycle time"]
        : inst === "proxy"
          ? ["Visual checklist", "Part scan"]
          : HISTO_SIGNALS,
      inst === "sensor" ? 0.91 : inst === "proxy" ? 0.68 : 0.42,
    );
  }),
  ...FINAL_NAMES.map((n, i) => {
    const id = i + 24;
    const inst: Instrumentation =
      id === 28 || id === 29 || id === 35 || id === 36
        ? "sensor"
        : id === 31 || id === 33 || id === 26
          ? "historical"
          : "proxy";
    return make(
      id,
      n,
      "FINAL",
      inst,
      inst === "sensor"
        ? ["Torque", "Cycle time", "Fixture ID"]
        : inst === "proxy"
          ? ["Checklist", "Worker note", "Part scan"]
          : HISTO_SIGNALS,
      inst === "sensor" ? 0.9 : inst === "proxy" ? 0.64 : 0.42,
    );
  }),
];

// Station 14 is fully instrumented — it is the scenario origin.
STATIONS[13] = make(
  14,
  "Subframe Mount",
  "BODY",
  "sensor",
  ["Torque", "Tool angle", "Cycle time", "Fixture load"],
  0.96,
);

export const ZONES: { key: Zone; label: string; range: string }[] = [
  { key: "BODY", label: "Body Construction", range: "01–14" },
  { key: "PAINT", label: "Paint", range: "15–23" },
  { key: "FINAL", label: "Final Assembly", range: "24–36" },
];

export type TwinStatus = "nominal" | "watch" | "at-risk" | "confirmed";

export interface Vehicle {
  vin: string;
  short: string;
  model: string;
  trim: string;
  color: string;
  station: number;
  status: TwinStatus;
  risk: number;
  exposure?: "high" | "medium" | "low";
  disposition?: "on-line" | "completed" | "shipped";
  passedStation14: boolean;
  tool?: string;
  batch?: string;
  shift?: "A" | "B" | "C";
}

export const VEHICLES: Vehicle[] = [
  {
    vin: "7HGBH41JXMN109321",
    short: "7HGB…9321",
    model: "X5",
    trim: "Sport",
    color: "oklch(0.72 0.13 30)",
    station: 21,
    status: "at-risk",
    risk: 0.86,
    exposure: "high",
    disposition: "on-line",
    passedStation14: true,
    tool: "T14",
    batch: "#4471",
    shift: "B",
  },
  {
    vin: "8XYZK22LTPN440118",
    short: "8XYZ…0118",
    model: "X5",
    trim: "Base",
    color: "oklch(0.7 0.02 250)",
    station: 17,
    status: "watch",
    risk: 0.52,
    exposure: "medium",
    disposition: "on-line",
    passedStation14: true,
    tool: "T14",
    batch: "#4471",
    shift: "C",
  },
  {
    vin: "3JKLM88QRWX773204",
    short: "3JKL…3204",
    model: "C3",
    trim: "Touring",
    color: "oklch(0.62 0.11 250)",
    station: 30,
    status: "nominal",
    risk: 0.14,
    exposure: "low",
    disposition: "on-line",
    passedStation14: true,
    tool: "T14",
    batch: "#4468",
    shift: "A",
  },
  {
    vin: "5PQRS10ABCD992017",
    short: "5PQR…2017",
    model: "X5",
    trim: "Sport",
    color: "oklch(0.8 0.13 95)",
    station: 12,
    status: "nominal",
    risk: 0.08,
    disposition: "on-line",
    passedStation14: false,
    shift: "B",
  },
  {
    vin: "1AABB77EFGH330941",
    short: "1AAB…0941",
    model: "C3",
    trim: "Base",
    color: "oklch(0.55 0.09 160)",
    station: 6,
    status: "nominal",
    risk: 0.05,
    disposition: "on-line",
    passedStation14: false,
    shift: "B",
  },
  {
    vin: "9ZZTT34IJKL556780",
    short: "9ZZT…6780",
    model: "R2",
    trim: "Utility",
    color: "oklch(0.45 0.02 250)",
    station: 34,
    status: "watch",
    risk: 0.41,
    exposure: "medium",
    disposition: "on-line",
    passedStation14: true,
    tool: "T14",
    batch: "#4471",
    shift: "B",
  },
  {
    vin: "2MNOP55UVWX118362",
    short: "2MNO…8362",
    model: "X5",
    trim: "Sport",
    color: "oklch(0.85 0.02 250)",
    station: 26,
    status: "at-risk",
    risk: 0.74,
    exposure: "high",
    disposition: "on-line",
    passedStation14: true,
    tool: "T14",
    batch: "#4471",
    shift: "B",
  },
  {
    vin: "6DEFG99YZAB674255",
    short: "6DEF…4255",
    model: "R2",
    trim: "Utility",
    color: "oklch(0.68 0.09 60)",
    station: 3,
    status: "nominal",
    risk: 0.03,
    disposition: "on-line",
    passedStation14: false,
    shift: "C",
  },
];

// Vehicles already off the line, surfaced by the exposure trace.
export const OFF_LINE_VEHICLES: Vehicle[] = [
  {
    vin: "4TUVW11CDEF203998",
    short: "4TUV…3998",
    model: "X5",
    trim: "Sport",
    color: "oklch(0.7 0.02 250)",
    station: 36,
    status: "at-risk",
    risk: 0.79,
    exposure: "high",
    disposition: "completed",
    passedStation14: true,
    tool: "T14",
    batch: "#4471",
    shift: "B",
  },
  {
    vin: "0QRST66GHIJ884120",
    short: "0QRS…4120",
    model: "C3",
    trim: "Touring",
    color: "oklch(0.62 0.11 250)",
    station: 36,
    status: "watch",
    risk: 0.48,
    exposure: "medium",
    disposition: "completed",
    passedStation14: true,
    tool: "T14",
    batch: "#4471",
    shift: "C",
  },
  {
    vin: "7HGBH41JXMN108772",
    short: "7HGB…8772",
    model: "X5",
    trim: "Base",
    color: "oklch(0.8 0.13 95)",
    station: 36,
    status: "confirmed",
    risk: 0.91,
    exposure: "high",
    disposition: "shipped",
    passedStation14: true,
    tool: "T14",
    batch: "#4471",
    shift: "B",
  },
  {
    vin: "5LMNO22PQRS551037",
    short: "5LMN…1037",
    model: "R2",
    trim: "Utility",
    color: "oklch(0.45 0.02 250)",
    station: 36,
    status: "watch",
    risk: 0.36,
    exposure: "low",
    disposition: "shipped",
    passedStation14: true,
    tool: "T14",
    batch: "#4469",
    shift: "A",
  },
];

export const MODEL_BASELINES = [
  { model: "X5 Sport", torque: "42-48 Nm", cycle: "58-64 s", note: "Aluminium subframe, 6 bolts" },
  { model: "X5 Base", torque: "44-49 Nm", cycle: "55-61 s", note: "Steel subframe, 6 bolts" },
  { model: "C3 Touring", torque: "45-52 Nm", cycle: "62-70 s", note: "Extended rail, 8 bolts" },
  { model: "R2 Utility", torque: "50-58 Nm", cycle: "66-74 s", note: "Heavy-duty mount, 8 bolts" },
];

export interface TwinEvent {
  station: number;
  label: string;
  status: "ok" | "watch" | "flag";
  source: Instrumentation;
  fields: { k: string; v: string }[];
}

export const TWIN_HISTORY: TwinEvent[] = [
  {
    station: 1,
    label: "Underbody Load",
    status: "ok",
    source: "sensor",
    fields: [
      { k: "Fixture load", v: "12.4 kN" },
      { k: "Cycle time", v: "59 s" },
      { k: "Operator", v: "M. Okafor" },
      { k: "Shift", v: "B" },
    ],
  },
  {
    station: 4,
    label: "Front Rail Set",
    status: "ok",
    source: "sensor",
    fields: [
      { k: "Weld current", v: "9.1 kA" },
      { k: "Nugget check", v: "Pass" },
      { k: "Tool ID", v: "W04-C" },
      { k: "Part batch", v: "#4470" },
    ],
  },
  {
    station: 10,
    label: "Door Hang",
    status: "ok",
    source: "sensor",
    fields: [
      { k: "Gap L", v: "3.8 mm" },
      { k: "Gap R", v: "3.9 mm" },
      { k: "Operator", v: "R. Vasquez" },
      { k: "Shift", v: "B" },
    ],
  },
  {
    station: 13,
    label: "Geometry Gate",
    status: "ok",
    source: "proxy",
    fields: [
      { k: "Scan", v: "Pass" },
      { k: "Andon", v: "None" },
      { k: "Confidence", v: "0.71 (proxy)" },
    ],
  },
  {
    station: 14,
    label: "Subframe Mount",
    status: "flag",
    source: "sensor",
    fields: [
      { k: "Torque", v: "51.2 Nm" },
      { k: "Baseline (X5 Sport)", v: "42-48 Nm" },
      { k: "Cycle time", v: "66 s (drifting)" },
      { k: "Tool ID", v: "T14: 18 days since service" },
      { k: "Part batch", v: "#4471" },
      { k: "Operator", v: "A. Sharma" },
      { k: "Shift", v: "B" },
      { k: "Ambient", v: "31 °C / 58 % RH" },
      { k: "Worker note", v: "\"Torque felt inconsistent on the left mount.\"" },
    ],
  },
  {
    station: 18,
    label: "Sealer Apply",
    status: "watch",
    source: "sensor",
    fields: [
      { k: "Bead width", v: "6.2 mm" },
      { k: "Booth temp", v: "24.5 °C" },
      { k: "Note", v: "Downstream of flagged mount" },
    ],
  },
  {
    station: 21,
    label: "Base Coat",
    status: "watch",
    source: "sensor",
    fields: [
      { k: "Film thickness", v: "18 µm" },
      { k: "Humidity", v: "58 %" },
      { k: "Twin status", v: "Carrying ST-14 flag" },
    ],
  },
];

export interface AlertGroup {
  id: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  title: string;
  station: number;
  vins: number;
  severity: "Safety / structural" | "Functional" | "Cosmetic";
  severityScore: number;
  confidence: number;
  rootCause: string;
  collapsed: string[];
}

export const ALERT_GROUPS: AlertGroup[] = [
  {
    id: "AG-1042",
    priority: "HIGH",
    title: "Station 14 — tool T14 torque drift",
    station: 14,
    vins: 10,
    severity: "Safety / structural",
    severityScore: 0.92,
    confidence: 0.88,
    rootCause: "Tool T14 wear + part batch #4471",
    collapsed: [
      "ST-14 torque high — 7HGB…9321",
      "ST-14 torque high — 2MNO…8362",
      "ST-14 cycle drift — 8XYZ…0118",
      "ST-14 torque high — 4TUV…3998",
      "+6 further VIN-level alerts",
    ],
  },
  {
    id: "AG-1043",
    priority: "MEDIUM",
    title: "Station 27 — brake line torque deviation",
    station: 27,
    vins: 3,
    severity: "Functional",
    severityScore: 0.6,
    confidence: 0.54,
    rootCause: "Fixture F27-B seating variance",
    collapsed: ["ST-27 torque low — 9ZZT…6780", "ST-27 rework flag — 0QRS…4120"],
  },
  {
    id: "AG-1044",
    priority: "LOW",
    title: "Station 31 — cycle-time variation",
    station: 31,
    vins: 2,
    severity: "Cosmetic",
    severityScore: 0.25,
    confidence: 0.31,
    rootCause: "Historical baseline only — low confidence",
    collapsed: ["ST-31 slow cycle — 3JKL…3204"],
  },
];

export const ROOT_CAUSE_NODES = [
  {
    id: "station",
    label: "Station 14",
    sub: "Subframe Mount",
    detail:
      "Origin of the confirmed anomaly. Fully instrumented: torque, tool angle, cycle time, fixture load.",
    weight: 0.95,
  },
  {
    id: "tool",
    label: "Tool T14",
    sub: "Nutrunner",
    detail:
      "Torque output drifted +3.1 Nm over 340 cycles. Calibration certificate expires in 4 days.",
    weight: 0.89,
  },
  {
    id: "batch",
    label: "Part batch #4471",
    sub: "Supplier: Nord Fasteners",
    detail:
      "Bolt lot introduced 06:10 on shift B. Slightly higher thread friction than lot #4468.",
    weight: 0.77,
  },
  {
    id: "operator",
    label: "A. Sharma",
    sub: "Operator",
    detail: "Reassigned to ST-14 three shifts ago. Certified; ramp-up variance expected.",
    weight: 0.44,
  },
  {
    id: "shift",
    label: "Shift B",
    sub: "06:00 - 14:00",
    detail: "84 % of flagged VINs produced during shift B in the last 5 days.",
    weight: 0.62,
  },
  {
    id: "maint",
    label: "Maintenance",
    sub: "18 days ago",
    detail: "Last T14 service 18 days ago; recommended interval is 14 days.",
    weight: 0.71,
  },
  {
    id: "env",
    label: "31 °C / 58 % RH",
    sub: "Environment",
    detail: "Bay temperature 4 °C above 30 day mean: affects lubricant viscosity.",
    weight: 0.35,
  },
  {
    id: "note",
    label: "Worker note",
    sub: "Voice, 07:42",
    detail: "\"Torque felt inconsistent on the left mount.\" Structured by the GenAI layer.",
    weight: 0.58,
  },
];

export const VALIDATION_CASES = [
  {
    vin: "7HGB…9321",
    predicted: "High risk — subframe torque",
    actual: "Confirmed defect",
    outcome: "true-positive" as const,
    delta: "Caught 11 stations before Final Inspection",
  },
  {
    vin: "8XYZ…0118",
    predicted: "High risk — subframe torque",
    actual: "No defect found",
    outcome: "false-positive" as const,
    delta: "Threshold for C-shift baseline widened",
  },
  {
    vin: "2MNO…8362",
    predicted: "Elevated risk — cycle drift",
    actual: "Confirmed rework",
    outcome: "true-positive" as const,
    delta: "Pattern weight for tool-age feature increased",
  },
  {
    vin: "3JKL…3204",
    predicted: "Nominal",
    actual: "Nominal",
    outcome: "true-negative" as const,
    delta: "Model-trim baseline held (C3 Touring)",
  },
];

export const PLANTS = [
  {
    id: "P01",
    name: "Plant 01: Ingolstadt",
    lines: ["Line A", "Line B"],
    maturity: "Sensors + SPC + ML + GenAI",
    level: 3,
    stations: 72,
  },
  {
    id: "P02",
    name: "Plant 02: Pune",
    lines: ["Line A"],
    maturity: "Proxy + sensors + SPC",
    level: 2,
    stations: 34,
  },
  {
    id: "P03",
    name: "Plant 03: Puebla",
    lines: ["Line A", "Line B", "Line C"],
    maturity: "Proxy + historical baseline",
    level: 1,
    stations: 96,
  },
];

export const ROADMAP = [
  {
    stage: "Stage 1",
    title: "Proxy + historical",
    body: "Scans, Andon, badge swipes and station baselines. Zero hardware change.",
  },
  {
    stage: "Stage 2",
    title: "Targeted sensors",
    body: "Sensors added only where exposure data shows the highest risk (see maintenance window policy below).",
  },
  { stage: "Stage 3", title: "SPC alerts", body: "Model trim specific control limits go live." },
  {
    stage: "Stage 4",
    title: "ML prediction",
    body: "Multi variable drift patterns run in shadow mode, then backtested.",
  },
  {
    stage: "Stage 5",
    title: "Full twin intelligence",
    body: "GenAI reasoning, propagation prediction and exposure tracing.",
  },
];

export function stationById(id: number) {
  return STATIONS.find((s) => s.id === id)!;
}

export const ALL_VEHICLES = [...VEHICLES, ...OFF_LINE_VEHICLES];
