/**
 * Dental Performance Intelligence — solution story deck (3 slides).
 * Create-from-scratch workflow per the .cursor/skills/pptx skill.
 *
 * Requires (installed under /tmp/pptx-build): pptxgenjs, react, react-dom,
 * react-icons, sharp. Run with NODE_PATH=/tmp/pptx-build/node_modules.
 */
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const Fi = require("react-icons/fi");

// ---- palette (hex WITHOUT '#', per pptxgenjs) ----
const C = {
  ink: "0A2A33",        // dark background
  inkPanel: "123A44",   // card on dark
  teal: "0F8A8F",       // primary
  tealDeep: "0B5C63",
  mint: "2DD4BF",       // bright accent
  amber: "F6B24B",      // pop accent
  light: "F2F8F9",      // light background
  white: "FFFFFF",
  slate: "5E777C",      // muted body on light
  ink2: "0E323B",       // dark text on light
  lightLine: "DDEAEC",
};

const HEAD = "Georgia";
const BODY = "Calibri";
const W = 13.33, H = 7.5;

const shadow = () => ({ type: "outer", color: "0A2A33", blur: 8, offset: 3, angle: 135, opacity: 0.16 });

async function iconPng(name, color = "#FFFFFF", size = 256) {
  const Comp = Fi[name];
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color, size: String(size), strokeWidth: 2 })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.defineLayout({ name: "WIDE", width: W, height: H });
  pres.layout = "WIDE";
  pres.author = "Performance Intelligence";
  pres.company = "Dental Performance Intelligence";
  pres.title = "Dental Performance Intelligence";

  const names = ["FiTrendingUp","FiCalendar","FiPieChart","FiDollarSign","FiHeart","FiAlertTriangle",
                 "FiActivity","FiUserCheck","FiLayers","FiZap","FiAward","FiShield"];
  const I = {};
  for (const n of names) I[n] = await iconPng(n, "#FFFFFF");

  function iconCircle(slide, iconData, x, y, d, fill = C.teal) {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, shadow: shadow() });
    const id = d * 0.52;
    slide.addImage({ data: iconData, x: x + (d - id) / 2, y: y + (d - id) / 2, w: id, h: id });
  }
  function motif(slide, color = C.teal) {
    slide.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.16, h: H, fill: { color } });
  }
  function eyebrow(slide, text, x, y, color) {
    slide.addText(text, { x, y, w: 9, h: 0.32, fontSize: 13, bold: true, color,
      fontFace: BODY, charSpacing: 3, align: "left", margin: 0 });
  }

  // =====================================================================
  // SLIDE 1 — The Business Challenge (dark)
  // =====================================================================
  let s1 = pres.addSlide();
  s1.background = { color: C.ink };
  s1.addShape(pres.shapes.OVAL, { x: 10.6, y: -1.9, w: 4.6, h: 4.6, fill: { color: C.teal, transparency: 80 } });
  s1.addShape(pres.shapes.OVAL, { x: 11.9, y: 0.5, w: 2.2, h: 2.2, fill: { color: C.mint, transparency: 86 } });
  motif(s1, C.mint);

  eyebrow(s1, "FOR MULTI-LOCATION DENTAL GROUPS", 0.7, 0.55, C.mint);
  s1.addText([
    { text: "Drowning in data.", options: { breakLine: true } },
    { text: "Starving for decisions.", options: {} },
  ], { x: 0.68, y: 0.95, w: 9.4, h: 1.45, fontSize: 40, bold: true, color: C.white,
       fontFace: HEAD, align: "left", lineSpacingMultiple: 0.98, margin: 0 });

  s1.addText(
    "A growing dental organization had massive operational data across clinical delivery, provider productivity, patient engagement, and finance — but no unified view across locations. Decisions stayed reactive, and the real drivers of production and profitability stayed hidden.",
    { x: 0.7, y: 2.55, w: 9.1, h: 1.0, fontSize: 14.5, color: "C7D7DA", fontFace: BODY, align: "left", margin: 0, lineSpacingMultiple: 1.05 });

  eyebrow(s1, "KEY CHALLENGES WE SEE EVERY DAY", 0.7, 3.72, C.mint);

  const challenges = [
    ["FiTrendingUp", "Inconsistent productivity", "Provider output swings widely from location to location"],
    ["FiCalendar", "Scheduling & hygiene gaps", "Unused hygiene capacity and open chairs go unnoticed"],
    ["FiPieChart", "Unclear production drivers", "Hard to see which procedures actually drive revenue"],
    ["FiDollarSign", "Revenue leakage", "Adjustments and write-offs quietly erode collections"],
    ["FiHeart", "Passive patient engagement", "No early view of patients lapsing from preventive care"],
    ["FiAlertTriangle", "Reactive decisions", "Performance issues surface weeks too late to act on"],
  ];
  {
    const x0 = 0.7, top = 4.12, cols = 3, gap = 0.28;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 1.42;
    challenges.forEach((c, i) => {
      const cx = x0 + (i % cols) * (cardW + gap);
      const cy = top + Math.floor(i / cols) * (cardH + gap);
      s1.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH,
        fill: { color: C.inkPanel }, line: { color: "1C4A55", width: 1 }, rectRadius: 0.07 });
      iconCircle(s1, I[c[0]], cx + 0.26, cy + 0.27, 0.5, C.teal);
      s1.addText(c[1], { x: cx + 0.92, y: cy + 0.24, w: cardW - 1.1, h: 0.55, fontSize: 13.5,
        bold: true, color: C.white, fontFace: BODY, align: "left", valign: "middle", margin: 0 });
      s1.addText(c[2], { x: cx + 0.28, y: cy + 0.82, w: cardW - 0.5, h: 0.5, fontSize: 10.5,
        color: "9FB6BA", fontFace: BODY, align: "left", margin: 0, lineSpacingMultiple: 1.0 });
    });
  }

  // =====================================================================
  // SLIDE 2 — The Intelligence Transformation (light)
  // =====================================================================
  let s2 = pres.addSlide();
  s2.background = { color: C.light };
  motif(s2, C.teal);
  eyebrow(s2, "THE SOLUTION", 0.7, 0.5, C.teal);
  s2.addText("One connected dental performance intelligence ecosystem", {
    x: 0.68, y: 0.86, w: 12.2, h: 0.7, fontSize: 30, bold: true, color: C.ink2, fontFace: HEAD, align: "left", margin: 0 });
  s2.addText("Six integrated portfolios unify clinical, operational, financial, and patient data — turning isolated metrics into connected, organization-wide intelligence.", {
    x: 0.7, y: 1.62, w: 11.6, h: 0.6, fontSize: 14, color: C.slate, fontFace: BODY, align: "left", margin: 0, lineSpacingMultiple: 1.04 });

  const portfolios = [
    ["FiActivity", "Hygiene Intelligence", "Real-time hygiene utilization, scheduling efficiency, and forecasting"],
    ["FiUserCheck", "Dentist Productivity", "Connects patient flow, clinical hours, and true production drivers"],
    ["FiLayers", "Procedure Intelligence", "Treatment mix and procedure trends by provider and location"],
    ["FiDollarSign", "Financial Adjustment", "Transparency into production and collection adjustment behavior"],
    ["FiHeart", "Active Patient Intelligence", "Preventive engagement tracking and long-term patient retention"],
    ["FiZap", "Weekly Flash Monitoring", "Daily, weekly, and month-to-date visibility for proactive control"],
  ];
  {
    const x0 = 0.7, top = 2.4, cols = 3, gap = 0.34;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 2.12;
    portfolios.forEach((p, i) => {
      const cx = x0 + (i % cols) * (cardW + gap);
      const cy = top + Math.floor(i / cols) * (cardH + gap);
      s2.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.lightLine, width: 1 }, rectRadius: 0.09, shadow: shadow() });
      iconCircle(s2, I[p[0]], cx + 0.32, cy + 0.32, 0.72, C.teal);
      s2.addText(p[1], { x: cx + 0.32, y: cy + 1.18, w: cardW - 0.6, h: 0.4, fontSize: 15.5,
        bold: true, color: C.ink2, fontFace: BODY, align: "left", margin: 0 });
      s2.addText(p[2], { x: cx + 0.32, y: cy + 1.55, w: cardW - 0.62, h: 0.5, fontSize: 11.5,
        color: C.slate, fontFace: BODY, align: "left", margin: 0, lineSpacingMultiple: 1.02 });
    });
  }

  // =====================================================================
  // SLIDE 3 — Business Impact & Strategic Value (light + outcome band)
  // =====================================================================
  let s3 = pres.addSlide();
  s3.background = { color: C.light };
  motif(s3, C.amber);
  eyebrow(s3, "BUSINESS IMPACT & STRATEGIC VALUE", 0.7, 0.48, C.teal);
  s3.addText("From operational visibility to predictable, scalable growth", {
    x: 0.68, y: 0.83, w: 12.2, h: 0.66, fontSize: 28, bold: true, color: C.ink2, fontFace: HEAD, align: "left", margin: 0 });

  const stats = [
    ["100%", "Operational coverage, clinical to financial"],
    ["6", "Integrated intelligence portfolios"],
    ["15+", "Connected performance dashboards"],
    ["3", "Levels of decision intelligence"],
  ];
  {
    const x0 = 0.7, top = 1.62, cols = 4, gap = 0.3;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 1.28;
    stats.forEach((st, i) => {
      const cx = x0 + i * (cardW + gap);
      s3.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.lightLine, width: 1 }, rectRadius: 0.08, shadow: shadow() });
      s3.addText(st[0], { x: cx + 0.1, y: top + 0.12, w: cardW - 0.2, h: 0.62, fontSize: 38,
        bold: true, color: C.teal, fontFace: HEAD, align: "center", valign: "middle", margin: 0 });
      s3.addText(st[1], { x: cx + 0.16, y: top + 0.78, w: cardW - 0.32, h: 0.42, fontSize: 10.5,
        color: C.slate, fontFace: BODY, align: "center", margin: 0, lineSpacingMultiple: 0.98 });
    });
  }

  // outcome pillars — each with a one-line description
  const pillars = [
    ["FiTrendingUp", "Operational Efficiency", "Higher chair utilization, optimized schedules, and faster response to operational disruptions."],
    ["FiAward", "Provider Performance", "Standardized benchmarking that reduces provider variability and clarifies efficiency vs. workload."],
    ["FiShield", "Financial Integrity", "Tighter control of adjustment trends with full transparency into revenue-impacting activity."],
    ["FiHeart", "Clinical & Patient", "Visibility into treatment mix, with early signals of declining preventive engagement."],
  ];
  {
    const x0 = 0.7, top = 3.12, cols = 4, gap = 0.3;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 2.42;
    pillars.forEach((p, i) => {
      const cx = x0 + i * (cardW + gap);
      s3.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.lightLine, width: 1 }, rectRadius: 0.08, shadow: shadow() });
      iconCircle(s3, I[p[0]], cx + 0.3, top + 0.3, 0.58, C.tealDeep);
      s3.addText(p[1], { x: cx + 1.0, y: top + 0.3, w: cardW - 1.18, h: 0.58, fontSize: 13.5,
        bold: true, color: C.ink2, fontFace: BODY, align: "left", valign: "middle", margin: 0 });
      s3.addText(p[2], { x: cx + 0.3, y: top + 1.06, w: cardW - 0.58, h: 1.2, fontSize: 11,
        color: C.slate, fontFace: BODY, align: "left", margin: 0, lineSpacingMultiple: 1.06 });
    });
  }

  // closing outcome band (dark) — summary statement, no CTA
  {
    const x = 0.7, y = 5.82, w = W - 1.4, h = 1.22;
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.ink }, rectRadius: 0.1, shadow: shadow() });
    s3.addText("THE OUTCOME", { x, y: y + 0.18, w, h: 0.28, fontSize: 12, bold: true,
      color: C.mint, fontFace: BODY, charSpacing: 3, align: "center", margin: 0 });
    s3.addText("A scalable operational intelligence framework that makes dental operations measurable, optimized, and predictable.", {
      x: x + 0.8, y: y + 0.5, w: w - 1.6, h: 0.6, fontSize: 17, bold: true, color: C.white,
      fontFace: HEAD, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.0 });
  }

  const out = "dental-intelligence-pitch.pptx";
  await pres.writeFile({ fileName: out });
  console.log("WROTE", out);
})().catch((e) => { console.error(e); process.exit(1); });
