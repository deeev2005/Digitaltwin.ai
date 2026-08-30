# Digital Twin Navigator

Build a frontend-only interactive product demo for DigitalTwin.ai, an AI-powered Digital Twin architecture for mixed-model vehicle assembly lines.

This is NOT a real application and NOT a functional manufacturing control system.

The purpose of this prototype is to visually demonstrate how DigitalTwin.ai thinks, how data flows through the architecture, how a physical vehicle becomes a digital twin, and how the different intelligence layers work together to identify and predict production problems.

The demo should feel like a sophisticated industrial technology demonstration that could be shown to a plant manager, manufacturing engineer, CTO, or investor.

Do not build a generic SaaS dashboard.

The central visual metaphor should always be:

Physical Production Line → Signals → Digital Twin → Intelligence → Prediction → Human Decision → Learning

All data, events, AI outputs, sensor readings, vehicles, stations, alerts, and predictions can be simulated with frontend mock data.

1. TECHNOLOGY AND SCOPE

Build only the frontend.

Do NOT create:

Database

Authentication

Backend

API integrations

Real PLC connections

Real OT connections

Real sensors

Real machine control

Real AI inference

Real ML calculations

Cloud infrastructure

User accounts

Persistent storage

Everything should run locally in the browser using mock data and frontend state.

The prototype should be highly interactive.

Use animations, transitions, simulated live data, clickable nodes, expandable layers, flowing connections, highlighted vehicles, station states, and contextual panels.

The architecture and relationships are the important part.

Do not spend effort implementing actual SPC, ML, or GenAI calculations.

Instead, create believable predefined scenarios that demonstrate what those layers would do.

2. OVERALL EXPERIENCE

The experience should have several connected views rather than one dashboard.

The user starts at the physical production line.

From there they can progressively move deeper into the architecture:

Screen 1

The Physical Production Line

Show the actual mixed-model assembly line with approximately 30–50 stations.

Screen 2

The Signal / Data Architecture

When the user enters the Digital Twin architecture, transform the production line into a visual architecture showing how information flows from stations into the Digital Twin.

Screen 3

Vehicle Digital Twin

Select a vehicle/VIN and see its digital twin being assembled from the information collected throughout the line.

Screen 4

Intelligence Layers

Show how the Digital Twin passes information through:

SPC → Classical ML → GenAI Reasoning

Do not show this as three unrelated cards.

Show it as connected layers in an intelligence pipeline.

Screen 5

Prediction and Propagation

Show how a problem originating at one station can be predicted to affect downstream stations and vehicles.

Screen 6

Root Cause / Context

Show the contextual information used to explain a problem:

Operator

Shift

Supplier

Part batch

Tool / fixture

Maintenance history

Environmental conditions

Worker notes

Sensor readings

Screen 7

Batch Exposure Trace

Show how a confirmed defect on one VIN can immediately identify other VINs exposed to the same combination of conditions.

Screen 8

Human Validation + Feedback Loop

Show Shadow Mode → Backtesting → Human Confirmation → Model Improvement.

Screen 9

Operational Views

Show that the same Digital Twin data can serve:

Floor Supervisor

Plant Manager

Leadership

These are different views of the same underlying system, not separate systems.

Screen 10

Scalability + Instrumentation

Show how the architecture works with fully instrumented and sensor-poor stations and how new plants/lines can be onboarded through configuration rather than rebuilding the product.

3. SCREEN 1 — PHYSICAL PRODUCTION LINE

This should be the opening screen.

Do NOT start with KPI cards.

The hero visual should be a large horizontal or slightly angled vehicle assembly line.

Represent approximately 30–50 workstations.

For the prototype, use around 36 stations so the visualization remains readable.

Divide them into three clearly identifiable zones:

BODY CONSTRUCTION

Stations 01–14

PAINT

Stations 15–23

FINAL ASSEMBLY

Stations 24–36

Vehicles continuously move through the line.

Use approximately 6–10 vehicles simultaneously.

Different vehicles should have different trims/models/colors represented through subtle visual differences.

This is a mixed-model assembly line, so the vehicles should not all be identical.

4. VEHICLE MOVEMENT

Animate the vehicles moving from station to station.

The movement should feel like an actual production line.

Each vehicle should have:

VIN

Model/trim

Current station

Production progress

When a vehicle moves:

Its current station becomes active.

A small signal pulse should travel from the station into the architecture/data layer.

The vehicle's digital twin status updates visually.

Relevant station information becomes associated with that VIN.

The user should be able to click a vehicle.

When clicked, open a contextual panel showing:

VIN
Model / Trim
Current Station
Production Progress
Twin Status
Current Risk
Recent Signals

The selected vehicle should visually connect to the station it is currently passing through.

5. IMPORTANT — UNEVEN INSTRUMENTATION

Do NOT make every workstation look connected to sensors.

This is a critical part of the concept.

The production line has uneven sensor coverage.

Most stations in Body Construction and Paint should appear well instrumented.

Many Final Assembly stations should appear only partially instrumented or manual.

Represent this visually.

For example:

Instrumented station

Station node

↓

Sensor signals

↓

Digital Twin

Partially instrumented station

Station node

↓

Proxy signal / worker note / checklist

↓

Digital Twin

Data-poor station

Station node

↓

Historical baseline

↓

Digital Twin

Some stations should therefore have:

Sensor icon

Multiple signal lines

Green data indicator

Others should have:

Checklist icon

Worker note icon

Timestamp / Andon / scan icon

Others should have:

Historical baseline indicator

Lower confidence indicator

This difference should be obvious.

Do NOT imply that every station has a sensor.

6. FIRST MAJOR INTERACTION

The first screen should contain a prominent interaction such as:

EXPLORE DIGITAL TWIN

When clicked, transition from the physical production line into the underlying architecture.

Do not simply navigate to another generic dashboard.

The production line should visually transform into the data architecture.

For example:

The stations remain visible on the left.

Thin animated signal lines begin leaving the stations.

Those signals converge into a central Digital Twin layer.

This creates the feeling that the user is moving from:

Physical World → Digital Representation

7. SCREEN 2 — DIGITAL TWIN ARCHITECTURE

This should be the most important architecture screen.

Do NOT present this as a traditional flowchart with rectangles connected by arrows.

Create a polished interactive architecture visualization.

Structure it into layers.

LAYER 1 — PHYSICAL LINE

Show the 30–36 stations.

Each station is a node.

Some have sensor connections.

Some have proxy connections.

Some have human input.

Some rely on historical information.

LAYER 2 — SIGNALS

Signals should visually flow from stations into the system.

Represent several signal types:

Machine / sensor signals

Torque

Temperature

Pressure

Cycle time

Tool measurements

Proxy signals

Timestamp

Andon pull

Part scan

Badge swipe

Human signals

Worker handwritten note

Worker voice note

Checklist

Context

Operator

Shift

Supplier

Part batch

Tool ID

Maintenance history

Environmental conditions

These should visually converge into the Digital Twin.

8. DIGITAL TWIN CORE

The central architecture node should be:

DIGITAL TWIN

Inside it, communicate that the system creates an individual twin for every vehicle.

Example:

VIN 7HGBH41JXMN109321

The twin contains a chronological station-by-station history.

Show a vehicle progressing through:

Station 01
→ Station 02
→ Station 03
→ ...
→ Current Station

Each station contributes information to that VIN's history.

When a user clicks the Digital Twin node, zoom into the selected vehicle.

9. SCREEN 3 — VEHICLE DIGITAL TWIN

This screen should look like an interactive digital representation of one vehicle's production journey.

Center:

A visual representation of the vehicle.

Around it:

The vehicle's accumulated production history.

Create a horizontal or circular timeline:

Station 01 → Station 02 → Station 03 → ... → Current

Each station can be expanded.

When expanded, show the information captured at that station.

For example:

Station 14

Torque
Cycle time
Tool ID
Operator
Shift
Part batch
Maintenance status
Environmental conditions

The important idea:

Every piece of information belongs to a specific VIN and station.

Do not show a generic database table.

Show the information as a living digital representation of that physical vehicle.

10. MODEL / TRIM AWARENESS

Because this is a mixed-model line, the system must not assume one universal definition of normal.

Show somewhere within the Digital Twin:

Model / Trim: X5 Sport

Then indicate:

Baseline: X5 Sport

The architecture should visually communicate that SPC limits and ML baselines are evaluated according to the relevant vehicle model/trim.

This prevents legitimate model differences from appearing as false anomalies.

11. SCREEN 4 — INTELLIGENCE ARCHITECTURE

When the user clicks:

AI DIGITAL TWIN

open a deeper architecture view.

This should show three connected intelligence layers.

Do NOT present them as isolated feature cards.

Show them as a pipeline.

Layer 1 — SPC

Statistical Process Control

Purpose:

Catch obvious deviations from known normal ranges.

Example:

Torque:

Normal range: 42–48 Nm

Current:

51 Nm

Show:

SPC FLAG

The point is not to calculate the value.

The point is to demonstrate:

Raw signal → Statistical check → obvious anomaly

12. LAYER 2 — CLASSICAL ML

The SPC output flows into the ML layer.

Label it:

CLASSICAL ML

Show that this layer looks for subtler multi-variable patterns that SPC alone cannot identify.

Example visual:

Torque slightly elevated
+
Tool age increasing
+
Part batch changed
+
Cycle time drifting

↓

ML PATTERN DETECTED

Do not actually calculate the model.

Use predefined demo scenarios.

13. LAYER 3 — GENAI REASONING

The ML result flows into:

GENAI REASONING

This layer should translate technical model outputs into understandable reasoning.

Show an example explanation:

Vehicle at elevated risk

Because:

Tool ID T14 shows drift

Part batch #4471 is being used

Operator recently changed

Torque has gradually increased

Then show:

Recommended action: Inspect Station 14 tooling before the next affected vehicles progress further.

Make it clear that GenAI explains the evidence collected by the system.

It should not invent information.

14. CONFIDENCE + SEVERITY

Add a small but meaningful visualization showing:

Severity

Safety / structural
Functional
Cosmetic

Confidence

How strongly the available signals agree that the issue is real.

Combine them into:

Priority

This leads into the alert prioritization experience.

15. ALARM PRIORITIZATION

Do not show 20 individual alerts.

Show a prioritized queue.

Example:

HIGH PRIORITY

Station 14 tool drift
Affecting 10 VINs
High severity
High confidence

Then:

MEDIUM

Station 27 torque deviation
3 VINs
Medium confidence

Then:

LOW

Cycle-time variation
2 VINs
Low confidence

Group alerts sharing the same root cause.

The visual concept should be:

10 related VIN alerts → 1 grouped operational issue

This demonstrates protection against alarm fatigue.

16. SCREEN 5 — PROPAGATION PREDICTION

Create a dedicated interactive visualization for downstream propagation.

This is a critical part of the demo.

Show a problem beginning at:

Station 14

Then show the affected vehicle moving toward later stations.

Instead of waiting for final inspection, visualize a prediction line extending downstream.

For example:

Station 14
↓
Station 15
↓
Station 18
↓
Station 23
↓
Final Inspection

Show:

Predicted downstream impact

The system should visually indicate that the issue may propagate to later production stages.

Also show affected vehicles behind the current vehicle.

The message should be:

Detect near the source instead of discovering the problem after dozens of vehicles are produced.

Do not implement actual predictive calculations.

Use predefined demo states.

17. IMMEDIATE VIN ACTION

When a VIN becomes high risk:

Highlight that specific vehicle on the production line.

Show:

VIN 7HGB...

ACTION REQUIRED

Then show two possible states:

Still on line

Pull vehicle for recheck

Already shipped

Flag for service / recall review

This connects the Digital Twin prediction back to a real physical vehicle.

18. SCREEN 6 — ROOT CAUSE CONTEXT

Create an interactive root-cause view.

Center:

Confirmed anomaly

Around it, create connected evidence nodes.

For example:

Station 14

connected to:

Tool T14

connected to:

Part Batch #4471

connected to:

Operator: A. Sharma

connected to:

Shift: B

connected to:

Maintenance: 18 days ago

connected to:

Environment: 31°C

connected to:

Worker Note

The interface should visually show that defects are often caused by a combination of factors rather than one isolated sensor reading.

Clicking each node should open a small information panel.

19. WORKER NOTES

Worker notes must be treated as an actual signal source.

Create a demo interaction where a worker note enters the architecture.

Example:

Worker voice note

"Torque felt inconsistent on the left mount."

Show the GenAI layer transforming it into structured signals:

Station: 14
Part: Left mount
Symptom: Torque inconsistency

Then show it joining the vehicle's Digital Twin.

The point is:

Human observations become machine-readable production signals.

20. SCREEN 7 — BATCH EXPOSURE TRACE

Create a visually dramatic interaction.

Start with one confirmed defective VIN.

Example:

VIN 7HGB...

User clicks:

TRACE EXPOSURE

The system should visually search backward through the Digital Twin history.

Show:

Station
→ Tool
→ Part Batch
→ Operator
→ Shift
→ Time Window

Then instantly highlight other vehicles sharing exposure.

For example:

12 potentially exposed VINs

Display them on the production line.

Use different states:

Still on line

RECHECK

Completed production

HOLD / REVIEW

Shipped

SERVICE / RECALL REVIEW

Also show a simple ranking:

High exposure
Same tool + same batch + same shift

Medium exposure
Same tool + same batch

Lower exposure
Same tool

The purpose is to demonstrate backward root-cause tracing using the already collected Digital Twin history.

Do not implement an actual database query.

Simulate the result.

21. SCREEN 8 — VALIDATION / SHADOW MODE

Create a view showing how AI predictions become trusted.

Use a horizontal progression:

SHADOW MODE

↓

PREDICTION LOGGED

↓

REAL INSPECTION

↓

OUTCOME

↓

BACKTESTING

↓

VALIDATED

↓

ACTIVE ALERTING

The system should initially observe without triggering actions.

Show examples such as:

Prediction:

VIN 7HGB... high risk

Actual inspection:

Confirmed defect

Another:

Prediction:

VIN 8XYZ... high risk

Actual inspection:

False alarm

The interface should visually show both outcomes feeding back into the system.

22. HUMAN-IN-THE-LOOP

Make it explicit that the system does NOT automatically control production machinery.

For active alerts:

AI recommendation

↓

Human reviews

↓

Human confirms action

↓

Action recorded

Until the model has a strong proven track record.

This should be visible in the interaction.

23. FEEDBACK LOOP

Create an animated feedback loop:

AI Prediction

→

Human Inspection

→

Confirmed / False Alarm

→

Digital Twin Updated

→

Model Adjusted

→

Improved Prediction

→ back to AI Prediction

This should be one of the strongest architecture visuals in the demo.

24. LOCAL INFERENCE

Show a clear architectural component labeled:

LOCAL AI INFERENCE

Position it close to the plant/production architecture.

Communicate visually:

Production Data

↓

Local Inference

↓

Low-Latency Alert

Do not make the architecture dependent on cloud inference.

You can show a subtle separation between:

Plant / Local Infrastructure

and

Cloud / External Systems

The inference path should remain local.

25. OT / CYBERSECURITY ARCHITECTURE

Create a dedicated architecture overlay or section.

Show:

PLC / OT NETWORK

↓

READ-ONLY DATA PATH

↓

Digital Twin

↓

AI Inference

The arrow must be visually one-directional.

Explicitly label:

READ ONLY

and:

NO WRITE-BACK TO MACHINERY

Also visually show a security boundary between the production-control environment and the Digital Twin environment.

The concept should communicate:

The Digital Twin can observe the line but cannot control the line.

Do not implement a real cybersecurity system.

This is an architectural visualization.

26. PARTIAL INSTRUMENTATION ARCHITECTURE

Create an interactive layer showing how the system works when stations do not have complete sensor coverage.

Show three signal hierarchy levels:

1. Proxy signals

Timestamp
Andon
Part scan
Badge swipe

↓

2. Worker signals

Checklist
Handwritten note
Voice note

↓

3. Historical / statistical baseline

Historical station behavior

The visual should communicate:

The Digital Twin does not require every station to be fully instrumented.

27. INSTRUMENTATION ROADMAP

Create a small interactive visualization showing phased sensor deployment.

Stage 1

Proxy + historical data

Stage 2

Sensors added at high-risk stations

Stage 3

SPC alerts

Stage 4

ML prediction

Stage 5

Full Digital Twin intelligence

Show that physical sensors are added selectively where the data indicates the highest risk.

Also communicate:

New sensors are installed during scheduled maintenance windows.

Do not suggest that production can simply be stopped whenever the system wants.

28. THREE USER VIEWS

Create a role switcher somewhere in the prototype.

Three options:

FLOOR SUPERVISOR

Focus:

What needs attention right now?

Show:

Current station

High-priority VINs

Active alerts

Recommended inspection

Immediate production issues

PLANT MANAGER

Focus:

What is changing over time?

Show:

Weekly trends

Rolling trends

Chronically drifting stations

Defect rate by shift

Model-level patterns

LEADERSHIP

Focus:

Is the system creating business value?

Show:

Cost saved

ROI trend

Rollout progress

Lines covered

Plants covered

These must clearly feel like different lenses over the SAME Digital Twin data.

29. MODEL / TRIM BASELINES

Across the demo, whenever normal behavior is shown, make it clear that normal is model-specific.

For example:

Model A

Torque baseline:

42–48 Nm

versus

Model B

Torque baseline:

45–52 Nm

Do not use one universal threshold.

This is important because the production line is mixed-model.

30. MULTI-PLANT / SCALABILITY VIEW

Create a final architecture view showing that the system can expand.

Visual hierarchy:

Plant 01

→ Line A
→ Line B

Plant 02

→ Line A

Plant 03

→ Line A
→ Line B
→ Line C

Show that:

Station lists are configuration-driven

Sensor types are configuration-driven

Line layouts are configuration-driven

The message should be:

New line = configure, not rebuild.

31. DIFFERENT SENSOR MATURITY LEVELS

Show three plants or lines with different maturity levels.

Site A

Proxy + historical

Site B

Proxy + sensors + SPC

Site C

Sensors + SPC + ML + GenAI

All three should still use the same Digital Twin architecture.

Show that learnings from a mature plant can inform another plant.

Example:

Defect pattern discovered at Plant 01

↓

Pattern available to Plant 03

↓

Earlier detection during rollout

Do not implement cross-plant ML.

Just visually communicate the architecture.

32. GLOBAL NAVIGATION

Do not use a conventional SaaS sidebar filled with 15 dashboard pages.

Instead use a minimal architectural navigation.

Possible navigation:

PRODUCTION LINE

DIGITAL TWIN

INTELLIGENCE

TRACE

VALIDATION

OPERATIONS

SCALE

The currently selected architecture layer should be visually obvious.

Transitions between sections should feel like zooming deeper into the same system.

33. IMPORTANT VISUAL DESIGN DIRECTION

The visual style should be:

Industrial

Premium

Technical

Modern

Professional

Data-rich

Minimal

High contrast

Suitable for an enterprise manufacturing presentation

Avoid:

Generic SaaS dashboard templates

Excessive rounded cards

Huge KPI numbers everywhere

Stock illustrations

Cartoon graphics

Consumer-app styling

Excessive gradients

Fake 3D effects

Cluttered tables

Use:

Dark industrial canvas or sophisticated neutral background

Thin technical lines

Station nodes

Animated signal paths

Subtle glowing states

Structured information panels

Clean typography

Clear hierarchy

Technical diagrams

Smooth zoom transitions

The architecture should feel similar to an advanced industrial control visualization, but remember that the Digital Twin is read-only and does not control machinery.

34. INTERACTION PRINCIPLE

Every important architecture component should be clickable.

Examples:

Click:

Station 14

→ show station data.

Click:

Vehicle

→ open VIN Digital Twin.

Click:

Digital Twin

→ zoom into vehicle history.

Click:

SPC

→ show obvious deviation.

Click:

ML

→ show multi-variable pattern.

Click:

GenAI

→ show human-readable reasoning.

Click:

Propagation

→ show downstream risk.

Click:

Root Cause

→ show contextual evidence.

Click:

Trace Exposure

→ highlight exposed VINs.

Click:

Validation

→ show prediction versus actual outcome.

Click:

Feedback

→ show learning loop.

Click:

OT Security

→ show read-only architecture.

Click:

Role

→ change the same underlying data into supervisor / manager / leadership view.

35. THE MAIN DEMO STORY

The entire prototype should support one coherent story.

The user should be able to demonstrate this sequence:

STEP 1

"We start with a real mixed-model production line."

Show approximately 30–36 stations.

Vehicles move through Body, Paint, and Final Assembly.

STEP 2

"Not every station is instrumented."

Show sensor-rich stations and sensor-poor stations.

STEP 3

"But the system collects whatever signals are available."

Show sensors, proxy signals, worker notes, and historical baselines.

STEP 4

"Every vehicle gets its own Digital Twin."

Select a VIN.

STEP 5

"The twin accumulates the vehicle's history as it moves through the line."

Show station-by-station history.

STEP 6

"We first use trusted statistical checks."

Show SPC.

STEP 7

"Then ML detects subtler combinations."

Show multi-variable pattern detection.

STEP 8

"Then GenAI explains what is happening."

Show a plain-English explanation using actual collected context.

STEP 9

"We don't wait for final inspection."

Show propagation prediction from an upstream station.

STEP 10

"We can identify exactly which vehicles may be exposed."

Show Batch Exposure Trace.

STEP 11

"Alerts are prioritized instead of flooding the operator."

Show severity + confidence + grouped root causes.

STEP 12

"Humans remain in control."

Show recommendation → human confirmation.

STEP 13

"Predictions are validated before becoming active."

Show Shadow Mode → Backtesting → Active Alerting.

STEP 14

"Human outcomes improve the system."

Show the feedback loop.

STEP 15

"The architecture is safe for the plant."

Show one-way read-only OT architecture.

STEP 16

"And it works even when instrumentation is incomplete."

Show proxy + worker + historical signals.

STEP 17

"Finally, the same architecture scales."

Show multiple lines and plants.

36. DEMO STATE

Create one predefined narrative scenario that drives the interactions.

Use a simulated defect around Station 14.

Example narrative:

A tool at Station 14 begins drifting.

SPC detects an abnormal torque reading.

ML notices that the torque drift is occurring alongside:

Tool age

Part batch change

Operator/shift change

Cycle-time drift

GenAI combines these signals and explains the risk.

The Digital Twin identifies affected VINs.

Propagation logic predicts downstream impact.

The system prioritizes the alert.

The supervisor is shown a recommendation.

The user can then launch:

TRACE EXPOSURE

which highlights other VINs sharing the same exposure.

Then show:

HUMAN CONFIRMATION

and feed the result into:

MODEL FEEDBACK

This one scenario should connect the entire demo.

37. IMPORTANT: DO NOT OVERBUILD THE LOGIC

The goal is NOT to build a real Digital Twin engine.

Do not attempt to implement:

Real anomaly detection

Real SPC

Real ML

Real GenAI

Real prediction

Real database queries

Real sensor processing

Use mock data and predefined states.

The sophistication should come from:

visual architecture + interaction + animation + information hierarchy

not backend functionality.

38. FINAL QUALITY BAR

The final prototype should feel like someone has opened a window into the architecture of a real industrial AI system.

It should answer visually:

Where does the data come from?

How does it become a Digital Twin?

How does each VIN get its own history?

What happens when a station has no sensor?

How does SPC fit into the architecture?

Where does ML fit?

Where does GenAI fit?

How does the system predict downstream propagation?

How does it understand root cause?

How are worker observations used?

How does it identify other exposed vehicles?

How are alerts prioritized?

How does human validation work?

How does the model learn from outcomes?

How does the system remain read-only from the OT network?

How does it work locally with low latency?

How does it scale to additional lines and plants?

How do different users see the same Digital Twin differently?

Every one of these concepts must be represented somewhere in the interactive flow.

Again: this is a frontend simulation of the architecture, not a functional manufacturing system.

Prioritize the quality of the visual storytelling, architecture visualization, transitions, station-to-twin signal flow, VIN-level interactions, and connected demo narrative above everything else.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8d245919-1d15-4877-bd47-76de71e66a62).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
