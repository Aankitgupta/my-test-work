/**
 * Lumenore — Dental Performance Intelligence for DSOs (5-slide story deck).
 * Create-from-scratch workflow per the .cursor/skills/pptx skill.
 *
 * Story: Problem -> Solution (Lumenore) -> Data Integration Framework ->
 *        KPI Coverage by Source -> Business Impact.
 *
 * Design notes:
 *  - Single font family (Calibri) for portable, distortion-free rendering in
 *    PowerPoint / Google Slides (no serif-substitution reflow).
 *  - Standard LAYOUT_WIDE (13.3 x 7.5); generous text boxes + low density.
 *
 * Requires (under /tmp/pptx-build): pptxgenjs, react, react-dom, react-icons,
 * sharp. Run with NODE_PATH=/tmp/pptx-build/node_modules.
 */
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const Fi = require("react-icons/fi");

const C = {
  ink: "0A2A33", inkPanel: "123A44", teal: "0F8A8F", tealDeep: "0B5C63",
  mint: "2DD4BF", amber: "F6B24B", light: "F2F8F9", white: "FFFFFF",
  slate: "5E777C", ink2: "0E323B", lightLine: "DDEAEC", mutedDark: "9FB6BA",
};
const FONT = "Calibri";
const W = 13.3, H = 7.5;
const shadow = () => ({ type: "outer", color: "0A2A33", blur: 8, offset: 3, angle: 135, opacity: 0.16 });

async function iconPng(name, color = "#FFFFFF", size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Fi[name], { color, size: String(size), strokeWidth: 2 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "Lumenore";
  pres.company = "Lumenore";
  pres.title = "Predict Risk. Prevent Churn. Power DSO Growth.";

  const names = ["FiTrendingDown","FiCalendar","FiPieChart","FiUsers","FiBarChart2",
                 "FiUserMinus","FiLayers","FiMessageSquare","FiAward","FiHeart","FiZap",
                 "FiActivity","FiDollarSign"];
  const I = {};
  for (const n of names) I[n] = await iconPng(n, "#FFFFFF");

  function iconCircle(slide, iconData, x, y, d, fill = C.teal) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, shadow: shadow() });
    const id = d * 0.52;
    slide.addImage({ data: iconData, x: x + (d - id) / 2, y: y + (d - id) / 2, w: id, h: id });
  }
  const motif = (slide, color) =>
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.16, h: H, fill: { color } });
  const eyebrow = (slide, text, x, y, color) =>
    slide.addText(text, { x, y, w: 11, h: 0.32, fontSize: 13, bold: true, color,
      fontFace: FONT, charSpacing: 3, align: "left", margin: 0 });

  // =====================================================================
  // SLIDE 1 — The Problem (dark)
  // =====================================================================
  let s1 = pres.addSlide();
  s1.background = { color: C.ink };
  s1.addShape(pres.shapes.OVAL, { x: 10.5, y: -1.9, w: 4.6, h: 4.6, fill: { color: C.teal, transparency: 80 } });
  s1.addShape(pres.shapes.OVAL, { x: 11.8, y: 0.55, w: 2.1, h: 2.1, fill: { color: C.mint, transparency: 86 } });
  motif(s1, C.mint);
  eyebrow(s1, "FOR MULTI-LOCATION DSOs", 0.7, 0.55, C.mint);
  s1.addText([
    { text: "It\u2019s not a data problem.", options: { breakLine: true } },
    { text: "It\u2019s a timing problem.", options: {} },
  ], { x: 0.68, y: 0.98, w: 11.5, h: 1.4, fontSize: 38, bold: true, color: C.white,
       fontFace: FONT, align: "left", lineSpacingMultiple: 1.0, margin: 0 });
  s1.addText(
    "Most DSOs don\u2019t struggle with data \u2014 they struggle with timing. KPI reports arrive days, sometimes weeks, late. By the time leadership sees the numbers, the problem has already impacted revenue.",
    { x: 0.7, y: 2.5, w: 9.7, h: 1.0, fontSize: 14.5, color: "C7D7DA", fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.08 });
  eyebrow(s1, "BY THE TIME YOU SEE IT \u2014 WAS IT\u2026", 0.7, 3.74, C.mint);
  const problems = [
    ["FiTrendingDown", "Declining case acceptance", "Conversion slipping unnoticed across providers"],
    ["FiCalendar", "Scheduling inefficiencies", "Open chairs and hygiene gaps draining capacity"],
    ["FiPieChart", "Shifts in procedure mix", "High-value production quietly trending down"],
    ["FiUsers", "Early patient churn", "At-risk patients lapsing before anyone reacts"],
  ];
  {
    const x0 = 0.7, top = 4.12, cols = 4, gap = 0.3;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 2.5;
    problems.forEach((c, i) => {
      const cx = x0 + i * (cardW + gap);
      s1.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.inkPanel }, line: { color: "1C4A55", width: 1 }, rectRadius: 0.07 });
      iconCircle(s1, I[c[0]], cx + 0.3, top + 0.34, 0.62, C.teal);
      s1.addText(c[1], { x: cx + 0.3, y: top + 1.14, w: cardW - 0.6, h: 0.6, fontSize: 14.5,
        bold: true, color: C.white, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.98 });
      s1.addText(c[2], { x: cx + 0.3, y: top + 1.74, w: cardW - 0.58, h: 0.66, fontSize: 11,
        color: C.mutedDark, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
    });
  }

  // =====================================================================
  // SLIDE 2 — The Solution: Lumenore (light)
  // =====================================================================
  let s2 = pres.addSlide();
  s2.background = { color: C.light };
  motif(s2, C.teal);
  eyebrow(s2, "LUMENORE  \u00B7  UNIFIED DENTAL BI", 0.7, 0.5, C.teal);
  s2.addText("Predict risk. Prevent churn. Power DSO growth.", {
    x: 0.68, y: 0.86, w: 12.3, h: 0.7, fontSize: 30, bold: true, color: C.ink2, fontFace: FONT, align: "left", margin: 0 });
  s2.addText("Lumenore unifies clinical, scheduling, and financial data into one BI layer \u2014 with real-time benchmarking, predictive analytics, and natural-language answers.", {
    x: 0.7, y: 1.62, w: 11.9, h: 0.6, fontSize: 14, color: C.slate, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.05 });
  const caps = [
    ["FiBarChart2", "Real-time benchmarking", "Compare dentists across locations as it happens", false],
    ["FiTrendingDown", "Conversion & engagement", "Detect declining case acceptance and engagement early", false],
    ["FiUserMinus", "Early churn signals", "Flag patients at risk of lapsing from care", false],
    ["FiPieChart", "Revenue risk forecast", "See revenue exposure before month-end", false],
    ["FiLayers", "One unified BI layer", "Clinical, scheduling & financial data in one place", false],
    ["FiMessageSquare", "Ask in plain language", "\u201CWhy did Dr. A\u2019s revenue drop last month?\u201D", true],
  ];
  {
    const x0 = 0.7, top = 2.38, cols = 3, gap = 0.34;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 2.12;
    caps.forEach((p, i) => {
      const cx = x0 + (i % cols) * (cardW + gap);
      const cy = top + Math.floor(i / cols) * (cardH + gap);
      s2.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.lightLine, width: 1 }, rectRadius: 0.09, shadow: shadow() });
      iconCircle(s2, I[p[0]], cx + 0.32, cy + 0.32, 0.72, C.teal);
      s2.addText(p[1], { x: cx + 0.32, y: cy + 1.16, w: cardW - 0.6, h: 0.4, fontSize: 15.5,
        bold: true, color: C.ink2, fontFace: FONT, align: "left", margin: 0 });
      s2.addText(p[2], { x: cx + 0.32, y: cy + 1.52, w: cardW - 0.62, h: 0.5, fontSize: 11.5,
        italic: !!p[3], color: C.slate, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.02 });
    });
  }

  // =====================================================================
  // SLIDE 3 — Enterprise Data Integration Framework (dark)
  // =====================================================================
  let s3 = pres.addSlide();
  s3.background = { color: C.ink };
  s3.addShape(pres.shapes.OVAL, { x: 10.7, y: -2.0, w: 4.6, h: 4.6, fill: { color: C.teal, transparency: 82 } });
  motif(s3, C.mint);
  eyebrow(s3, "ENTERPRISE DATA INTEGRATION & INTELLIGENCE FRAMEWORK", 0.7, 0.5, C.mint);
  s3.addText("Powering dental intelligence through unified data integration", {
    x: 0.68, y: 0.86, w: 12.0, h: 0.7, fontSize: 29, bold: true, color: C.white, fontFace: FONT, align: "left", margin: 0 });
  s3.addText("Clinical, workforce, and financial systems integrated into one centralized intelligence ecosystem \u2014 a single source of truth across operations, providers, patients, workforce, and finance.", {
    x: 0.7, y: 1.66, w: 11.6, h: 0.7, fontSize: 14, color: "C7D7DA", fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.06 });
  const sources = [
    ["FiActivity", "Denticon", "CLINICAL & PRACTICE MANAGEMENT", "Patient activity, provider productivity, scheduling, procedures, and production performance across every location."],
    ["FiUsers", "Paylocity", "WORKFORCE & LABOR", "Employee scheduling, payroll, attendance, and staffing utilization unified into the operational view."],
    ["FiDollarSign", "Sage Intacct", "FINANCIAL & ACCOUNTING", "Operational profitability, expense structure, and EBITDA performance across the organization."],
  ];
  {
    const x0 = 0.7, top = 2.62, cols = 3, gap = 0.4;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 3.35;
    sources.forEach((s, i) => {
      const cx = x0 + i * (cardW + gap);
      s3.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.inkPanel }, line: { color: "1C4A55", width: 1 }, rectRadius: 0.08 });
      iconCircle(s3, I[s[0]], cx + 0.42, top + 0.42, 0.82, C.teal);
      s3.addText(s[1], { x: cx + 0.42, y: top + 1.42, w: cardW - 0.8, h: 0.5, fontSize: 20,
        bold: true, color: C.white, fontFace: FONT, align: "left", margin: 0 });
      s3.addText(s[2], { x: cx + 0.42, y: top + 1.94, w: cardW - 0.8, h: 0.3, fontSize: 11,
        bold: true, color: C.mint, fontFace: FONT, charSpacing: 1, align: "left", margin: 0 });
      s3.addText(s[3], { x: cx + 0.42, y: top + 2.34, w: cardW - 0.82, h: 0.9, fontSize: 12,
        color: C.mutedDark, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.06 });
    });
  }
  s3.addText("Denticon  +  Paylocity  +  Sage Intacct  \u2192  one centralized intelligence ecosystem", {
    x: 0.7, y: 6.42, w: W - 1.4, h: 0.4, fontSize: 13.5, bold: true, color: C.mint,
    fontFace: FONT, align: "center", margin: 0 });

  // =====================================================================
  // SLIDE 4 — Key KPIs & Intelligence Areas (light)
  // =====================================================================
  let s4 = pres.addSlide();
  s4.background = { color: C.light };
  motif(s4, C.teal);
  eyebrow(s4, "KEY KPIs & INTELLIGENCE AREAS", 0.7, 0.5, C.teal);
  s4.addText("Connected metrics across every operational dimension", {
    x: 0.68, y: 0.86, w: 12.3, h: 0.66, fontSize: 28, bold: true, color: C.ink2, fontFace: FONT, align: "left", margin: 0 });
  s4.addText("From clinical production to labor cost to EBITDA \u2014 every KPI measured and connected in one intelligence layer.", {
    x: 0.7, y: 1.62, w: 11.9, h: 0.5, fontSize: 14, color: C.slate, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.04 });
  const kpis = [
    ["FiActivity", "Denticon", "Clinical & Practice Management",
      ["Gross & Net Production", "Hygiene Utilization", "Provider Productivity", "Appointment & Scheduling Trends", "Procedure Mix Analysis", "Patient Visit Volume"]],
    ["FiUsers", "Paylocity", "Workforce & Labor",
      ["Employee Hours Tracking", "Labor Cost Analysis", "Productivity vs. Hours Analysis", "Attendance Trends"]],
    ["FiDollarSign", "Sage Intacct", "Financial & Accounting",
      ["Non-Doctor Labor %", "Lab %", "Supplies %", "EBITDA", "EBITDA %", "Revenue & Financial Trend Analysis"]],
  ];
  {
    const x0 = 0.7, top = 2.3, cols = 3, gap = 0.4;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 4.5;
    kpis.forEach((k, i) => {
      const cx = x0 + i * (cardW + gap);
      s4.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.lightLine, width: 1 }, rectRadius: 0.08, shadow: shadow() });
      iconCircle(s4, I[k[0]], cx + 0.34, top + 0.34, 0.62, C.teal);
      s4.addText(k[1], { x: cx + 1.1, y: top + 0.36, w: cardW - 1.3, h: 0.38, fontSize: 17,
        bold: true, color: C.ink2, fontFace: FONT, align: "left", margin: 0 });
      s4.addText(k[2].toUpperCase(), { x: cx + 1.1, y: top + 0.76, w: cardW - 1.3, h: 0.3, fontSize: 9.5,
        bold: true, color: C.teal, fontFace: FONT, charSpacing: 1, align: "left", margin: 0 });
      s4.addShape(pres.shapes.RECTANGLE, { x: cx + 0.34, y: top + 1.2, w: cardW - 0.68, h: 0.012, fill: { color: C.lightLine } });
      s4.addText(k[3].map((t) => ({ text: t, options: { bullet: { code: "2022", indent: 14 }, breakLine: true } })),
        { x: cx + 0.4, y: top + 1.38, w: cardW - 0.74, h: cardH - 1.6, fontSize: 12.5,
          color: C.ink2, fontFace: FONT, align: "left", valign: "top", margin: 0, paraSpaceAfter: 8 });
    });
  }

  // =====================================================================
  // SLIDE 5 — The Impact (light + outcome band)
  // =====================================================================
  let s5 = pres.addSlide();
  s5.background = { color: C.light };
  motif(s5, C.amber);
  eyebrow(s5, "THE IMPACT", 0.7, 0.48, C.teal);
  s5.addText("From static reports to predictive control", {
    x: 0.68, y: 0.83, w: 12.3, h: 0.66, fontSize: 28, bold: true, color: C.ink2, fontFace: FONT, align: "left", margin: 0 });
  s5.addText("A multi-location dental network replaced static KPI reports with interactive dashboards and predictive analytics \u2014 and now sees risk before it spreads network-wide.", {
    x: 0.7, y: 1.58, w: 11.9, h: 0.6, fontSize: 14, color: C.slate, fontFace: FONT, align: "left", margin: 0, lineSpacingMultiple: 1.05 });
  const pillars = [
    ["FiAward", "Provider-level risk, early", "Leadership spots risky performance patterns by provider"],
    ["FiHeart", "Churn caught upstream", "Engagement drops flagged before network-wide impact"],
    ["FiZap", "Real-time visibility", "Live dashboards replace days-late KPI reports"],
    ["FiPieChart", "Revenue protected", "Revenue risk forecast before the month-end close"],
  ];
  {
    const x0 = 0.7, top = 2.5, cols = 4, gap = 0.3;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 2.5;
    pillars.forEach((p, i) => {
      const cx = x0 + i * (cardW + gap);
      s5.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.lightLine, width: 1 }, rectRadius: 0.08, shadow: shadow() });
      iconCircle(s5, I[p[0]], cx + 0.3, top + 0.34, 0.62, C.tealDeep);
      s5.addText(p[1], { x: cx + 0.3, y: top + 1.14, w: cardW - 0.58, h: 0.6, fontSize: 14,
        bold: true, color: C.ink2, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.98 });
      s5.addText(p[2], { x: cx + 0.3, y: top + 1.74, w: cardW - 0.58, h: 0.66, fontSize: 11,
        color: C.slate, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 1.04 });
    });
  }
  {
    const x = 0.7, y = 5.45, w = W - 1.4, h = 1.42;
    s5.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.ink }, rectRadius: 0.1, shadow: shadow() });
    s5.addText("WITH LUMENORE", { x, y: y + 0.22, w, h: 0.28, fontSize: 12, bold: true,
      color: C.mint, fontFace: FONT, charSpacing: 3, align: "center", margin: 0 });
    s5.addText("Predict Risk.  Prevent Churn.  Power DSO Growth.", {
      x: x + 0.6, y: y + 0.56, w: w - 1.2, h: 0.6, fontSize: 22, bold: true, color: C.white,
      fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  }

  const out = "dental-intelligence-pitch.pptx";
  await pres.writeFile({ fileName: out });
  console.log("WROTE", out);
})().catch((e) => { console.error(e); process.exit(1); });
