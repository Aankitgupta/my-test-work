/**
 * Lumenore — Dental Operations Intelligence (5-slide deck).
 * Theme: white background, navy Title-Case headlines, cyan letter-spaced
 * eyebrows, multi-color circle icons, colored card top-bars / header-bars,
 * quote box, dark stat band, arrow-bullet lists.
 *
 * Single font family (Calibri) for portable, distortion-free rendering in
 * PowerPoint / Google Slides. Standard LAYOUT_WIDE (13.3 x 7.5).
 *
 * Requires (under /tmp/pptx-build): pptxgenjs, react, react-dom, react-icons,
 * sharp. Run with NODE_PATH=/tmp/pptx-build/node_modules.
 */
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const Fi = require("react-icons/fi");
const addArchitecture = require("./arch_slide");

const C = {
  navy: "1F3C88", navyDark: "13265F", cyan: "0EA5C4", ink: "1E293B",
  slate: "64748B", white: "FFFFFF", bg: "FFFFFF", border: "E6EAF1",
  cardSoft: "F7F9FC",
  red: "EF4444", teal: "0EA5B8", orange: "F2922E", pink: "EC4899",
  purple: "7C3AED", green: "10B981",
};
const FONT = "Calibri";
const W = 13.3, H = 7.5;
const shadow = () => ({ type: "outer", color: "1F3C88", blur: 7, offset: 2, angle: 90, opacity: 0.1 });

async function iconPng(name, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Fi[name], { color, size: String(size), strokeWidth: 2.2 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "Lumenore";
  pres.company = "Lumenore";
  pres.title = "Dental Operations Intelligence";

  const iconNames = ["FiTrendingDown","FiCalendar","FiSettings","FiUsers","FiBarChart2",
                     "FiDollarSign","FiShield","FiZap","FiActivity","FiCpu"];
  const I = {};
  for (const n of iconNames) I[n] = await iconPng(n, "#FFFFFF");

  const iconCircle = (slide, data, x, y, d, fill) => {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill } });
    const id = d * 0.5;
    slide.addImage({ data, x: x + (d - id) / 2, y: y + (d - id) / 2, w: id, h: id });
  };
  const eyebrow = (slide, text, x, y, size = 12) =>
    slide.addText(text, { x, y, w: 9, h: 0.3, fontSize: size, bold: true, color: C.cyan,
      fontFace: FONT, charSpacing: 3, align: "left", margin: 0 });
  const headline = (slide, runs, x, y, w, size) =>
    slide.addText(runs, { x, y, w, h: 2.2, fontSize: size, bold: true, color: C.navy,
      fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.02 });

  // =====================================================================
  // SLIDE 1 — THE PROBLEM
  // =====================================================================
  let s1 = pres.addSlide();
  s1.background = { color: C.bg };
  eyebrow(s1, "DENTAL OPERATIONS INTELLIGENCE", 0.55, 0.4);
  eyebrow(s1, "THE PROBLEM", 0.55, 0.68);
  headline(s1, [
    { text: "Most DSOs Don\u2019t", options: { breakLine: true } },
    { text: "Struggle With Data.", options: { breakLine: true } },
    { text: "They Struggle", options: { breakLine: true } },
    { text: "With Timing.", options: {} },
  ], 0.53, 1.2, 5.6, 33);
  s1.addText("KPI reports arrive days \u2014 sometimes weeks \u2014 late. By the time leadership sees the numbers, the problem has already impacted revenue.",
    { x: 0.55, y: 3.5, w: 5.3, h: 0.9, fontSize: 13, color: C.slate, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.1 });
  // quote card
  s1.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 4.75, w: 5.45, h: 2.0,
    fill: { color: C.cardSoft }, line: { color: C.border, width: 1 }, shadow: shadow() });
  s1.addText("\u201D", { x: 0.7, y: 4.7, w: 0.8, h: 0.8, fontSize: 48, bold: true, color: C.cyan, fontFace: FONT, align: "left", valign: "top", margin: 0 });
  s1.addText("By the time leadership sees the numbers, the problem has already impacted revenue.",
    { x: 1.25, y: 5.0, w: 4.55, h: 0.9, fontSize: 14, italic: true, bold: true, color: C.navy, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.05 });
  s1.addText("\u2014 Real pattern observed across multi-location DSOs",
    { x: 1.25, y: 6.05, w: 4.55, h: 0.4, fontSize: 10.5, italic: true, color: C.slate, fontFace: FONT, align: "left", margin: 0 });

  const probs = [
    [C.red, "FiTrendingDown", "Declining Case Acceptance", "Treatment acceptance quietly drops location by location \u2014 invisible until the monthly report is already too late."],
    [C.teal, "FiCalendar", "Scheduling Inefficiencies", "Empty hygiene slots bleed time-bound revenue every single day \u2014 and no one sees the pattern until end of month."],
    [C.orange, "FiSettings", "Procedure Mix Shifts", "Gradual drifts in clinical activity erode margins before anyone flags the change in reporting."],
    [C.pink, "FiUsers", "Early Patient Churn Signals", "Patients disengage weeks before they go inactive \u2014 but static KPIs never surface the early warning signs."],
    [C.purple, "FiBarChart2", "Provider Performance Gaps", "Without real-time benchmarks, high and low performers look the same until revenue variance becomes impossible to ignore."],
    [C.green, "FiDollarSign", "Revenue Risk Blind Spots", "Forecast gaps go undetected mid-month \u2014 leaving leadership with no room to course-correct before the period closes."],
  ];
  {
    const x0 = 6.3, top = 0.5, cols = 2, gapX = 0.28, gapY = 0.26;
    const cardW = (W - x0 - 0.3 - gapX) / cols, cardH = 2.0;
    probs.forEach((p, i) => {
      const cx = x0 + (i % cols) * (cardW + gapX);
      const cy = top + Math.floor(i / cols) * (cardH + gapY);
      s1.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
      iconCircle(s1, I[p[1]], cx + 0.28, cy + 0.28, 0.62, p[0]);
      s1.addText(p[2], { x: cx + 1.05, y: cy + 0.28, w: cardW - 1.25, h: 0.62, fontSize: 12.5,
        bold: true, color: C.ink, fontFace: FONT, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 0.95 });
      s1.addText(p[3], { x: cx + 0.3, y: cy + 1.02, w: cardW - 0.55, h: 0.9, fontSize: 10,
        color: C.slate, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.03 });
    });
  }

  // =====================================================================
  // SLIDE 2 — THE SOLUTION
  // =====================================================================
  let s2 = pres.addSlide();
  s2.background = { color: C.bg };
  eyebrow(s2, "THE SOLUTION", 0.55, 0.42);
  s2.addText("Predict Risk. Prevent Churn. Power DSO Growth.", {
    x: 0.53, y: 0.74, w: 12.4, h: 0.7, fontSize: 30, bold: true, color: C.navy, fontFace: FONT, align: "left", margin: 0 });
  const sol = [
    [C.teal, "FiShield", "Hygiene Intelligence", "Stop losing time-bound revenue.", "Real-time chair utilization and scheduling gap alerts \u2014 because every idle hygiene slot is revenue that can never be recovered after the day ends."],
    [C.purple, "FiUsers", "Dentist Productivity", "Know why revenue dropped \u2014 not just that it did.", "Connects exam conversion, case mix, and clinical hours to production so you can answer: \u2018Why did Dr. A\u2019s revenue drop last month?\u2019 \u2014 instantly."],
    [C.green, "FiSettings", "Procedure Intelligence", "Detect dangerous mix shifts before they compound.", "Full treatment-mix visibility across restorative, preventive, and specialty \u2014 with trailing 12-month trends that surface slow-moving clinical drift early."],
    [C.orange, "FiDollarSign", "Financial Adjustments", "Close the gap between produced and collected.", "Separates operational vs. discretionary adjustments and flags rising patterns by location \u2014 turning an accounting task into active revenue control."],
    [C.pink, "FiUsers", "Active Patient Portfolio", "Catch churn signals weeks before patients go inactive.", "Tracks preventive care frequency and engagement across locations \u2014 surfacing early patient disengagement long before it impacts hygiene production."],
    [C.green, "FiZap", "Weekly Flash", "Course-correct now \u2014 not after month-end.", "Daily, weekly & MTD run-rate monitoring with projected end-of-month outcomes \u2014 so leadership can intervene while there\u2019s still time to change the result."],
  ];
  {
    const x0 = 0.6, top = 1.55, cols = 3, gapX = 0.3, gapY = 0.28;
    const cardW = (W - 1.2 - gapX * (cols - 1)) / cols, cardH = 2.4;
    sol.forEach((p, i) => {
      const cx = x0 + (i % cols) * (cardW + gapX);
      const cy = top + Math.floor(i / cols) * (cardH + gapY);
      s2.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
      s2.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: cardW, h: 0.09, fill: { color: p[0] } });
      iconCircle(s2, I[p[1]], cx + 0.3, cy + 0.32, 0.56, p[0]);
      s2.addText(p[2], { x: cx + 0.98, y: cy + 0.34, w: cardW - 1.15, h: 0.52, fontSize: 14,
        bold: true, color: C.ink, fontFace: FONT, align: "left", valign: "middle", margin: 0 });
      s2.addText(p[3], { x: cx + 0.3, y: cy + 1.0, w: cardW - 0.55, h: 0.45, fontSize: 10.5,
        italic: true, bold: true, color: p[0], fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.98 });
      s2.addText(p[4], { x: cx + 0.3, y: cy + 1.46, w: cardW - 0.55, h: 0.86, fontSize: 9.5,
        color: C.slate, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.02 });
    });
  }
  // stat band
  {
    const x = 0.6, y = 6.66, w = W - 1.2, h = 0.72, n = 5;
    s2.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.navyDark } });
    const colW = w / n;
    const stats = [["100+", "KPIs Tracked"], ["50+", "Analytical Dimensions"], ["8+", "Intelligence Portfolios"], ["15+", "Connected Dashboards"], ["Near Real-Time", "Execution Monitoring"]];
    stats.forEach((s, i) => {
      const cx = x + i * colW;
      if (i > 0) s2.addShape(pres.shapes.LINE, { x: cx, y: y + 0.14, w: 0, h: h - 0.28, line: { color: "FFFFFF", width: 0.75, transparency: 70 } });
      s2.addText(s[0], { x: cx, y: y + 0.08, w: colW, h: 0.36, fontSize: i === 4 ? 13 : 18, bold: true, color: C.cyan, fontFace: FONT, align: "center", valign: "middle", margin: 0, wrap: false });
      s2.addText(s[1], { x: cx, y: y + 0.44, w: colW, h: 0.24, fontSize: 9, color: "D7E0EC", fontFace: FONT, align: "center", valign: "middle", margin: 0 });
    });
  }

  // =====================================================================
  // SLIDE 3 — ENTERPRISE DATA INTEGRATION (new theme)
  // =====================================================================
  let s3 = pres.addSlide();
  s3.background = { color: C.bg };
  eyebrow(s3, "ENTERPRISE DATA INTEGRATION", 0.55, 0.42);
  s3.addText("Powering Dental Intelligence Through Unified Data Integration", {
    x: 0.53, y: 0.74, w: 12.4, h: 0.7, fontSize: 27, bold: true, color: C.navy, fontFace: FONT, align: "left", margin: 0 });
  s3.addText("Clinical, workforce, and financial systems integrated into one centralized intelligence ecosystem \u2014 a single source of truth across operations, providers, patients, workforce, and finance.", {
    x: 0.55, y: 1.62, w: 12.0, h: 0.6, fontSize: 13, color: C.slate, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.06 });
  const sources = [
    [C.teal, "FiActivity", "Denticon", "CLINICAL & PRACTICE MANAGEMENT", "Patient activity, provider productivity, scheduling, procedures, and production performance across every location."],
    [C.purple, "FiUsers", "Paylocity", "WORKFORCE & LABOR", "Employee scheduling, payroll, attendance, and staffing utilization unified into the operational view."],
    [C.orange, "FiDollarSign", "Sage Intacct", "FINANCIAL & ACCOUNTING", "Operational profitability, expense structure, and EBITDA performance across the organization."],
  ];
  {
    const x0 = 0.6, top = 2.6, cols = 3, gapX = 0.4;
    const cardW = (W - 1.2 - gapX * (cols - 1)) / cols, cardH = 3.25;
    sources.forEach((s, i) => {
      const cx = x0 + i * (cardW + gapX);
      s3.addShape(pres.shapes.RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
      s3.addShape(pres.shapes.RECTANGLE, { x: cx, y: top, w: cardW, h: 0.1, fill: { color: s[0] } });
      iconCircle(s3, I[s[1]], cx + 0.42, top + 0.42, 0.8, s[0]);
      s3.addText(s[2], { x: cx + 0.42, y: top + 1.4, w: cardW - 0.8, h: 0.5, fontSize: 20,
        bold: true, color: C.ink, fontFace: FONT, align: "left", margin: 0 });
      s3.addText(s[3], { x: cx + 0.42, y: top + 1.92, w: cardW - 0.8, h: 0.3, fontSize: 10.5,
        bold: true, color: s[0], fontFace: FONT, charSpacing: 1, align: "left", margin: 0 });
      s3.addText(s[4], { x: cx + 0.42, y: top + 2.3, w: cardW - 0.82, h: 0.85, fontSize: 11.5,
        color: C.slate, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.05 });
    });
  }
  s3.addText([
    { text: "Denticon  +  Paylocity  +  Sage Intacct  ", options: { color: C.navy, bold: true } },
    { text: "\u2192  one centralized intelligence ecosystem", options: { color: C.cyan, bold: true } },
  ], { x: 0.6, y: 6.35, w: W - 1.2, h: 0.4, fontSize: 14, fontFace: FONT, align: "center", margin: 0 });

  // ---- Platform Architecture (inserted as slide 4) ----
  await addArchitecture(pres, { FONT, W, H, iconPng });

  // =====================================================================
  // SLIDE 4 — KEY KPIs & INTELLIGENCE AREAS (new theme)
  // =====================================================================
  let s4 = pres.addSlide();
  s4.background = { color: C.bg };
  eyebrow(s4, "KEY KPIs & INTELLIGENCE AREAS", 0.55, 0.42);
  s4.addText("Connected Metrics Across Every Operational Dimension", {
    x: 0.53, y: 0.74, w: 12.4, h: 0.7, fontSize: 27, bold: true, color: C.navy, fontFace: FONT, align: "left", margin: 0 });
  s4.addText("From clinical production to labor cost to EBITDA \u2014 every KPI measured and connected in one intelligence layer.", {
    x: 0.55, y: 1.6, w: 12.0, h: 0.5, fontSize: 13, color: C.slate, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.05 });
  const kpis = [
    [C.teal, "FiActivity", "Denticon", "CLINICAL & PRACTICE MGMT", ["Gross & Net Production", "Hygiene Utilization", "Provider Productivity", "Appointment & Scheduling Trends", "Procedure Mix Analysis", "Patient Visit Volume"]],
    [C.purple, "FiUsers", "Paylocity", "WORKFORCE & LABOR", ["Employee Hours Tracking", "Labor Cost Analysis", "Productivity vs. Hours Analysis", "Attendance Trends"]],
    [C.orange, "FiDollarSign", "Sage Intacct", "FINANCIAL & ACCOUNTING", ["Non-Doctor Labor %", "Lab %", "Supplies %", "EBITDA", "EBITDA %", "Revenue & Financial Trend Analysis"]],
  ];
  {
    const x0 = 0.6, top = 2.3, cols = 3, gapX = 0.4;
    const cardW = (W - 1.2 - gapX * (cols - 1)) / cols, cardH = 4.5;
    kpis.forEach((k, i) => {
      const cx = x0 + i * (cardW + gapX);
      s4.addShape(pres.shapes.RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.border, width: 1 }, shadow: shadow() });
      s4.addShape(pres.shapes.RECTANGLE, { x: cx, y: top, w: cardW, h: 0.1, fill: { color: k[0] } });
      iconCircle(s4, I[k[1]], cx + 0.34, top + 0.36, 0.6, k[0]);
      s4.addText(k[2], { x: cx + 1.08, y: top + 0.36, w: cardW - 1.3, h: 0.36, fontSize: 17, bold: true, color: C.ink, fontFace: FONT, align: "left", margin: 0 });
      s4.addText(k[3], { x: cx + 1.08, y: top + 0.74, w: cardW - 1.3, h: 0.28, fontSize: 9, bold: true, color: k[0], fontFace: FONT, charSpacing: 1, align: "left", margin: 0 });
      s4.addShape(pres.shapes.RECTANGLE, { x: cx + 0.34, y: top + 1.22, w: cardW - 0.68, h: 0.014, fill: { color: C.border } });
      k[4].forEach((t, j) => {
        const iy = top + 1.45 + j * 0.5;
        s4.addShape(pres.shapes.OVAL, { x: cx + 0.4, y: iy + 0.07, w: 0.12, h: 0.12, fill: { color: k[0] } });
        s4.addText(t, { x: cx + 0.66, y: iy, w: cardW - 1.0, h: 0.46, fontSize: 12, color: C.ink, fontFace: FONT, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 0.95 });
      });
    });
  }

  // =====================================================================
  // SLIDE 5 — BUSINESS OUTCOMES
  // =====================================================================
  let s5 = pres.addSlide();
  s5.background = { color: C.bg };
  eyebrow(s5, "BUSINESS OUTCOMES", 0.55, 0.45);
  headline(s5, [
    { text: "What Changes", options: { breakLine: true } },
    { text: "For Your DSO", options: {} },
  ], 0.53, 0.85, 5.0, 32);
  s5.addText("One multi-location dental network replaced static KPI reports with interactive dashboards and predictive analytics.", {
    x: 0.55, y: 2.5, w: 4.7, h: 0.9, fontSize: 13, color: C.slate, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.1 });
  // leadership card
  s5.addShape(pres.shapes.RECTANGLE, { x: 0.55, y: 3.55, w: 4.85, h: 3.4,
    fill: { color: C.cardSoft }, line: { color: C.border, width: 1 }, shadow: shadow() });
  s5.addText("Leadership now:", { x: 0.85, y: 3.82, w: 4.3, h: 0.4, fontSize: 14, bold: true, color: C.navy, fontFace: FONT, align: "left", margin: 0 });
  const lead = [
    "Spots provider-level risk patterns early",
    "Detects patient engagement drops in real time",
    "Forecasts revenue risk before month-end closes",
    "Advance Analytical data insights",
    "AI Driven Q&A with data facilitated by chat engine",
  ];
  s5.addText(lead.flatMap((t) => ([
    { text: "\u2192  ", options: { color: C.cyan, bold: true } },
    { text: t, options: { color: C.ink, breakLine: true } },
  ])), { x: 0.85, y: 4.35, w: 4.35, h: 2.5, fontSize: 11.5, fontFace: FONT, align: "left", valign: "top", margin: 0, paraSpaceAfter: 9, lineSpacingMultiple: 1.0 });

  const outcomes = [
    [C.teal, "FiBarChart2", "Operational Efficiency", [
      ["Optimized chair utilization", "Fill scheduling gaps before the day starts \u2014 not after the revenue window has already closed."],
      ["Real-time disruption detection", "Identify production shortfalls within 24 hours so managers can respond \u2014 not react weeks later."],
      ["Consistent multi-site output", "Reduce location-to-location variance with shared benchmarks and daily operational accountability."]]],
    [C.purple, "FiUsers", "Provider Performance", [
      ["Benchmark dentists in real time", "Compare every provider on normalized metrics \u2014 production per hour, per visit, and per exam."],
      ["Detect declining conversion early", "Catch drops in case acceptance and exam conversion before they silently erode monthly targets."],
      ["Reduced performance variability", "Bring underperforming providers up with coaching backed by objective, location-benchmarked data."]]],
    [C.pink, "FiUsers", "Patient & Revenue Risk", [
      ["Early patient churn signals", "Detect declining preventive engagement weeks before patients go inactive \u2014 and act while you still can."],
      ["Forecast revenue risk mid-month", "MTD run-rate projections tell you what month-end will look like while there\u2019s still time to change it."],
      ["Unify clinical + financial data", "One BI layer connecting Denticon and Paylocity \u2014 so every question has a complete, cross-system answer."]]],
    [C.orange, "FiCpu", "Strategic Intelligence", [
      ["AI-narrative insights", "Conversational analytics translate KPIs into plain-language guidance \u2014 for every stakeholder level."],
      ["Ask \u2018Why did revenue drop?\u2019", "Interactive dashboards let leadership drill into any anomaly instantly, without waiting for analyst reports."],
      ["Trend-driven growth planning", "12-month trailing data aligns future hiring, capacity, and investment decisions with real demand signals."]]],
  ];
  {
    const x0 = 5.7, top = 0.5, cols = 2, gapX = 0.3, gapY = 0.3;
    const cardW = (W - x0 - 0.3 - gapX) / cols, cardH = 3.15, headH = 0.5;
    outcomes.forEach((o, i) => {
      const cx = x0 + (i % cols) * (cardW + gapX);
      const cy = top + Math.floor(i / cols) * (cardH + gapY);
      s5.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH,
        fill: { color: C.cardSoft }, line: { color: C.border, width: 1 }, shadow: shadow() });
      s5.addShape(pres.shapes.RECTANGLE, { x: cx, y: cy, w: cardW, h: headH, fill: { color: o[0] } });
      s5.addImage({ data: I[o[1]], x: cx + 0.22, y: cy + 0.13, w: 0.24, h: 0.24 });
      s5.addText(o[2], { x: cx + 0.58, y: cy, w: cardW - 0.7, h: headH, fontSize: 12.5, bold: true, color: C.white, fontFace: FONT, align: "left", valign: "middle", margin: 0 });
      o[3].forEach((it, j) => {
        const iy = cy + headH + 0.16 + j * 0.83;
        s5.addShape(pres.shapes.OVAL, { x: cx + 0.24, y: iy + 0.05, w: 0.12, h: 0.12, fill: { color: o[0] } });
        s5.addText(it[0], { x: cx + 0.46, y: iy - 0.02, w: cardW - 0.62, h: 0.26, fontSize: 10.5, bold: true, color: C.ink, fontFace: FONT, align: "left", margin: 0 });
        s5.addText(it[1], { x: cx + 0.46, y: iy + 0.24, w: cardW - 0.64, h: 0.52, fontSize: 8.6, color: C.slate, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.98 });
      });
    });
  }

  const out = "dental-intelligence-pitch.pptx";
  await pres.writeFile({ fileName: out });
  console.log("WROTE", out);
})().catch((e) => { console.error(e); process.exit(1); });
