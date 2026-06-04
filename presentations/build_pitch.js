/**
 * Dental Performance Intelligence — prospect pitch deck (3 slides).
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
  pres.company = "Dental Intelligence Partners";
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
    ["FiTrendingUp", "Inconsistent productivity", "Provider output varies widely across locations"],
    ["FiCalendar", "Scheduling & hygiene gaps", "Hidden gaps in hygiene utilization"],
    ["FiPieChart", "Unclear production drivers", "Hard to see which procedures drive revenue"],
    ["FiDollarSign", "Revenue leakage", "Adjustments quietly erode collections"],
    ["FiHeart", "Passive patient engagement", "No proactive view of retention"],
    ["FiAlertTriangle", "Reactive decisions", "Issues surface too late to act"],
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
  s2.addText("We unify clinical, operational, financial, and patient data into six integrated intelligence portfolios — turning isolated metrics into connected, organization-wide intelligence.", {
    x: 0.7, y: 1.62, w: 11.6, h: 0.6, fontSize: 14, color: C.slate, fontFace: BODY, align: "left", margin: 0, lineSpacingMultiple: 1.04 });

  const portfolios = [
    ["FiActivity", "Hygiene Intelligence", "Real-time utilization, scheduling efficiency & forecasting"],
    ["FiUserCheck", "Dentist Productivity", "Links patient flow, clinical hours & true production drivers"],
    ["FiLayers", "Procedure Intelligence", "Treatment mix & clinical trends by provider and location"],
    ["FiDollarSign", "Financial Adjustment", "Transparency into production & collection adjustments"],
    ["FiHeart", "Active Patient Intelligence", "Preventive engagement & long-term patient retention"],
    ["FiZap", "Weekly Flash Monitoring", "Daily, weekly & MTD visibility for proactive control"],
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
  // SLIDE 3 — Business Impact & Partnership (light + dark CTA band)
  // =====================================================================
  let s3 = pres.addSlide();
  s3.background = { color: C.light };
  motif(s3, C.amber);
  eyebrow(s3, "WHAT YOUR BUSINESS GAINS", 0.7, 0.48, C.teal);
  s3.addText("From operational visibility to predictable, scalable growth", {
    x: 0.68, y: 0.83, w: 12.2, h: 0.66, fontSize: 28, bold: true, color: C.ink2, fontFace: HEAD, align: "left", margin: 0 });

  const stats = [
    ["100%", "Operational coverage, clinical to financial"],
    ["6", "Integrated intelligence portfolios"],
    ["15+", "Connected dashboards"],
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

  const pillars = [
    ["FiTrendingUp", "Operational Efficiency", ["Optimized chair utilization", "Faster disruption response"]],
    ["FiAward", "Provider Performance", ["Standardized benchmarking", "Less performance variability"]],
    ["FiShield", "Financial Integrity", ["Control over adjustments", "Revenue transparency"]],
    ["FiHeart", "Clinical & Patient", ["Treatment-mix visibility", "Early retention signals"]],
  ];
  {
    const x0 = 0.7, top = 3.18, cols = 4, gap = 0.3;
    const cardW = (W - 1.4 - gap * (cols - 1)) / cols;
    const cardH = 2.0;
    pillars.forEach((p, i) => {
      const cx = x0 + i * (cardW + gap);
      s3.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: top, w: cardW, h: cardH,
        fill: { color: C.white }, line: { color: C.lightLine, width: 1 }, rectRadius: 0.08, shadow: shadow() });
      iconCircle(s3, I[p[0]], cx + 0.28, top + 0.26, 0.56, C.tealDeep);
      s3.addText(p[1], { x: cx + 0.96, y: top + 0.22, w: cardW - 1.1, h: 0.6, fontSize: 13.5,
        bold: true, color: C.ink2, fontFace: BODY, align: "left", valign: "middle", margin: 0 });
      s3.addText(p[2].map((t) => ({ text: t, options: { bullet: true, breakLine: true } })),
        { x: cx + 0.3, y: top + 0.95, w: cardW - 0.55, h: 0.95, fontSize: 11, color: C.slate,
          fontFace: BODY, align: "left", margin: 0, paraSpaceAfter: 5 });
    });
  }

  // CTA band (dark)
  {
    const x = 0.7, y = 5.55, w = W - 1.4, h = 1.5;
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.ink }, rectRadius: 0.1, shadow: shadow() });
    s3.addText("PARTNER WITH US", { x: x + 0.5, y: y + 0.22, w: 7, h: 0.3, fontSize: 12, bold: true,
      color: C.mint, fontFace: BODY, charSpacing: 3, align: "left", margin: 0 });
    s3.addText("Turn your operational data into measurable, optimized, predictable performance.", {
      x: x + 0.5, y: y + 0.55, w: 8.0, h: 0.8, fontSize: 18, bold: true, color: C.white,
      fontFace: HEAD, align: "left", margin: 0, lineSpacingMultiple: 1.0 });
    const bx = x + w - 3.55, by = y + 0.46, bw = 3.05, bh = 0.6;
    s3.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: by, w: bw, h: bh, fill: { color: C.mint }, rectRadius: 0.3 });
    s3.addText("Book a discovery session  \u2192", { x: bx, y: by, w: bw, h: bh, fontSize: 13, bold: true,
      color: C.ink, fontFace: BODY, align: "center", valign: "middle", margin: 0 });
  }

  const out = "dental-intelligence-pitch.pptx";
  await pres.writeFile({ fileName: out });
  console.log("WROTE", out);
})().catch((e) => { console.error(e); process.exit(1); });
