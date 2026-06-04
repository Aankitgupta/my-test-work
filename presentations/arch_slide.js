/**
 * Lumenore platform architecture slide — faithful recreation of the
 * end-to-end flow: Data Sources -> Connectors Gateway -> Data Architecture
 * (Data Access + Pipeline/Orchestration) -> Lakehouse -> Visualization &
 * Designing -> Access Layer -> Data Consumption, wrapped by Authentication,
 * Data Security, Metadata Management, and Audit & Monitoring bands.
 *
 * Exports: async function(pres, ctx) where ctx = { FONT, W, H, iconPng }.
 */
module.exports = async function addArchitecture(pres, ctx) {
  const { FONT, W, H, iconPng } = ctx;
  const S = pres.shapes;
  const P = {
    frame: "C5CBD4", blue: "5B9BD5", lightBlue: "EAF3FB", orange: "E8915B",
    salmon: "EC8C7A", teal: "1AA8A0", green: "2FB57F", purple: "9457D6",
    yellow: "F4C20D", red: "F2647A", gray: "F2F3F5", ink: "3A4A5A",
    slate: "6B7B8B", white: "FFFFFF", dark: "33414F",
  };

  const names = ["FiFileText","FiDatabase","FiFile","FiServer","FiBox","FiGitMerge",
                 "FiSettings","FiEye","FiGrid","FiShare2","FiMessageCircle","FiActivity",
                 "FiMonitor","FiSmartphone"];
  const I = {};
  for (const n of names) I[n] = await iconPng(n, "#FFFFFF");
  const arrowR = await iconPng("FiArrowRight", "#33414F");
  const arrowL = await iconPng("FiArrowLeft", "#33414F");

  const s = pres.addSlide();
  s.background = { color: P.white };

  const chip = (icon, cx, top, d, fill, label, labelColor, labelW, sz = 8) => {
    const x = cx - d / 2;
    s.addShape(S.OVAL, { x, y: top, w: d, h: d, fill: { color: fill } });
    const id = d * 0.5;
    s.addImage({ data: icon, x: x + (d - id) / 2, y: top + (d - id) / 2, w: id, h: id });
    s.addText(label, { x: cx - labelW / 2, y: top + d + 0.03, w: labelW, h: 0.36, fontSize: sz,
      bold: true, color: labelColor, fontFace: FONT, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 0.9 });
  };
  const band = (x, y, w, h, text) => {
    s.addShape(S.RECTANGLE, { x, y, w, h, fill: { color: P.blue } });
    s.addText(text, { x, y, w, h, fontSize: 12, bold: true, color: P.white, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  };
  const vbar = (x, y, w, h, fill, text, tc) => {
    s.addShape(S.RECTANGLE, { x, y, w, h, fill: { color: fill } });
    s.addText(text, { x: x + w / 2 - h / 2, y: y + h / 2 - w / 2, w: h, h: w, rotate: 270,
      fontSize: 9, bold: true, color: tc, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  };

  // ---- outer frame ----
  s.addShape(S.ROUNDED_RECTANGLE, { x: 1.5, y: 0.12, w: 10.2, h: 7.26, rectRadius: 0.06,
    fill: { color: P.white }, line: { color: P.frame, width: 1.25 } });

  // ---- logo + tagline ----
  s.addText("LUMENORE", { x: 4.55, y: 0.2, w: 4.2, h: 0.4, fontSize: 21, bold: true,
    color: P.slate, fontFace: FONT, align: "center", charSpacing: 2, margin: 0 });
  s.addText("Netlink\u2019s Flagship AI Product", { x: 4.55, y: 0.58, w: 4.2, h: 0.18, fontSize: 7,
    color: P.slate, fontFace: FONT, align: "center", margin: 0 });

  // ---- top bands ----
  band(1.72, 0.82, 9.76, 0.32, "Authentication and Authorization");
  band(1.72, 1.2, 9.76, 0.32, "Data Security (RBAC, Row Level, Column Level, Encryption)");
  // ---- bottom bands ----
  band(1.72, 6.52, 9.76, 0.32, "Metadata Management");
  band(1.72, 6.9, 9.76, 0.32, "Audit and Monitoring");

  // ================= Data Architecture box =================
  s.addShape(S.RECTANGLE, { x: 1.9, y: 1.7, w: 5.9, h: 4.7, fill: { color: P.gray },
    line: { color: P.frame, width: 1, dashType: "dash" } });
  s.addText("Data Architecture", { x: 1.9, y: 1.78, w: 5.9, h: 0.34, fontSize: 14, color: P.teal, fontFace: FONT, align: "center", margin: 0 });

  // Connectors Gateway vertical bar
  vbar(2.0, 2.35, 0.32, 3.55, P.salmon, "Connectors Gateway", P.white);

  // Data Access box
  s.addShape(S.RECTANGLE, { x: 2.5, y: 2.3, w: 1.4, h: 3.55, fill: { color: P.white }, line: { color: P.orange, width: 1.25 } });
  s.addText("Data Access", { x: 2.5, y: 2.4, w: 1.4, h: 0.26, fontSize: 10.5, bold: true, color: P.orange, fontFace: FONT, align: "center", margin: 0 });
  chip(I.FiDatabase, 3.2, 2.78, 0.5, P.teal, "JDBC", P.ink, 1.2, 9);
  chip(I.FiFile, 3.2, 3.72, 0.5, P.teal, "Files", P.ink, 1.2, 9);
  chip(I.FiServer, 3.2, 4.66, 0.5, P.teal, "Web Services", P.ink, 1.3, 9);

  // Data Pipeline & Orchestration box
  s.addShape(S.RECTANGLE, { x: 4.05, y: 2.3, w: 2.05, h: 3.55, fill: { color: P.white }, line: { color: P.teal, width: 1.25 } });
  s.addText("Data Pipeline & Orchestration", { x: 4.1, y: 2.4, w: 1.95, h: 0.5, fontSize: 10, bold: true, color: P.teal, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.95 });
  // batch
  s.addShape(S.OVAL, { x: 4.18, y: 2.98, w: 0.42, h: 0.42, fill: { color: P.green } });
  s.addImage({ data: I.FiBox, x: 4.28, y: 3.08, w: 0.22, h: 0.22 });
  s.addText("Batch data\nprocessing", { x: 4.7, y: 2.96, w: 1.35, h: 0.46, fontSize: 9.5, bold: true, color: P.ink, fontFace: FONT, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 0.9 });
  // real time
  s.addShape(S.OVAL, { x: 4.18, y: 3.5, w: 0.42, h: 0.42, fill: { color: P.green } });
  s.addImage({ data: I.FiGitMerge, x: 4.28, y: 3.6, w: 0.22, h: 0.22 });
  s.addText("Real Time / Near\nReal Time", { x: 4.7, y: 3.48, w: 1.35, h: 0.46, fontSize: 9.5, bold: true, color: P.ink, fontFace: FONT, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 0.9 });
  // processing layer
  s.addText("Processing Layer", { x: 4.18, y: 4.08, w: 1.4, h: 0.26, fontSize: 9.5, bold: true, color: P.ink, fontFace: FONT, align: "left", margin: 0 });
  s.addShape(S.OVAL, { x: 5.5, y: 4.02, w: 0.5, h: 0.5, fill: { color: P.green } });
  s.addImage({ data: I.FiSettings, x: 5.61, y: 4.13, w: 0.28, h: 0.28 });
  const subs = ["Data Quality Check", "Data Transformations", "Data Aggregations &\nNormalizations"];
  s.addShape(S.LINE, { x: 4.26, y: 4.5, w: 0, h: 1.0, line: { color: P.green, width: 1 } });
  subs.forEach((t, i) => {
    const yy = 4.5 + i * 0.34;
    s.addShape(S.OVAL, { x: 4.21, y: yy, w: 0.1, h: 0.1, fill: { color: P.green } });
    s.addText(t, { x: 4.4, y: yy - 0.06, w: 1.65, h: 0.3, fontSize: 8.2, color: P.slate, fontFace: FONT, align: "left", valign: "top", margin: 0, lineSpacingMultiple: 0.85 });
  });

  // Lakehouse
  s.addShape(S.OVAL, { x: 6.32, y: 2.42, w: 1.4, h: 1.4, fill: { type: "none" }, line: { color: P.blue, width: 1, dashType: "dash" } });
  s.addShape(S.OVAL, { x: 6.42, y: 2.52, w: 1.2, h: 1.2, fill: { color: P.lightBlue }, line: { color: P.red, width: 1.75 } });
  s.addShape(S.OVAL, { x: 6.84, y: 2.74, w: 0.36, h: 0.36, fill: { color: "1F3C88" } });
  s.addImage({ data: I.FiDatabase, x: 6.91, y: 2.81, w: 0.22, h: 0.22 });
  for (let i = 0; i < 3; i++)
    s.addShape(S.LINE, { x: 6.62, y: 3.2 + i * 0.13, w: 0.8, h: 0, line: { color: P.blue, width: 1.5 } });
  s.addShape(S.RECTANGLE, { x: 6.12, y: 4.0, w: 1.8, h: 0.5, fill: { color: "DDE6F0" }, line: { color: P.frame, width: 0.75 } });
  s.addText("Lumenore Data\nLakehouse", { x: 6.12, y: 4.0, w: 1.8, h: 0.5, fontSize: 9.5, bold: true, color: P.ink, fontFace: FONT, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 0.9 });

  // arrows between Data Architecture and Visualization
  s.addImage({ data: arrowR, x: 7.86, y: 2.55, w: 0.32, h: 0.32 });
  s.addImage({ data: arrowL, x: 7.86, y: 3.5, w: 0.32, h: 0.32 });

  // ================= Visualization & Designing box =================
  s.addShape(S.RECTANGLE, { x: 8.45, y: 1.7, w: 2.95, h: 4.7, fill: { color: P.lightBlue }, line: { color: P.blue, width: 1 } });
  s.addText("Visualization & Designing", { x: 8.45, y: 1.78, w: 2.95, h: 0.3, fontSize: 12, color: P.blue, fontFace: FONT, align: "center", margin: 0 });
  // storytelling / dashboards
  s.addShape(S.RECTANGLE, { x: 8.62, y: 2.25, w: 2.62, h: 1.2, fill: { color: P.white }, line: { color: P.purple, width: 1.25 } });
  chip(I.FiEye, 9.28, 2.45, 0.6, P.purple, "Storytelling", P.ink, 1.4, 8.5);
  chip(I.FiGrid, 10.55, 2.45, 0.6, P.blue, "Dashboards", P.ink, 1.4, 8.5);
  // advanced analytics
  s.addShape(S.RECTANGLE, { x: 8.62, y: 3.7, w: 2.62, h: 2.55, fill: { color: P.white }, line: { color: P.frame, width: 1 } });
  s.addShape(S.ROUNDED_RECTANGLE, { x: 9.05, y: 3.82, w: 1.75, h: 0.3, rectRadius: 0.15, fill: { color: P.yellow } });
  s.addText("Advanced Analytics", { x: 9.05, y: 3.82, w: 1.75, h: 0.3, fontSize: 9.5, bold: true, color: P.dark, fontFace: FONT, align: "center", valign: "middle", margin: 0 });
  const aa = [
    ["FiShare2", P.purple, "AI Powered\nNarrative Insights"],
    ["FiMessageCircle", P.yellow, "AI based\nConversational Analytics"],
    ["FiActivity", P.blue, "Data Science Driven\nAdvanced Analytics"],
  ];
  aa.forEach((a, i) => {
    const yy = 4.32 + i * 0.62;
    s.addShape(S.OVAL, { x: 8.8, y: yy, w: 0.46, h: 0.46, fill: { color: a[1] } });
    s.addImage({ data: I[a[0]], x: 8.91, y: yy + 0.11, w: 0.24, h: 0.24 });
    s.addText(a[2], { x: 9.38, y: yy - 0.04, w: 1.85, h: 0.54, fontSize: 8.5, bold: true, color: P.ink, fontFace: FONT, align: "left", valign: "middle", margin: 0, lineSpacingMultiple: 0.88 });
  });

  // Access Layer vertical bar
  vbar(11.46, 2.0, 0.26, 4.0, P.yellow, "Access Layer", P.dark);

  // ================= Data Sources (left, outside) =================
  s.addText("Data Sources", { x: 0.28, y: 1.14, w: 1.2, h: 0.26, fontSize: 11, bold: true, color: P.ink, fontFace: FONT, align: "left", margin: 0 });
  s.addShape(S.ROUNDED_RECTANGLE, { x: 0.3, y: 1.42, w: 1.12, h: 3.75, rectRadius: 0.05, fill: { color: P.white }, line: { color: P.blue, width: 1.25 } });
  s.addShape(S.ROUNDED_RECTANGLE, { x: 0.42, y: 1.66, w: 0.88, h: 2.6, rectRadius: 0.05, fill: { color: P.white }, line: { color: P.blue, width: 1 } });
  s.addText("SFTP", { x: 0.42, y: 1.72, w: 0.88, h: 0.24, fontSize: 9, bold: true, color: P.blue, fontFace: FONT, align: "center", margin: 0 });
  chip(I.FiFileText, 0.86, 2.0, 0.46, P.blue, "Excel", P.ink, 0.86, 7.5);
  chip(I.FiFileText, 0.86, 2.74, 0.46, P.blue, "CSV", P.ink, 0.86, 7.5);
  chip(I.FiFileText, 0.86, 3.48, 0.46, P.blue, "Text Files", P.ink, 0.86, 7.5);
  chip(I.FiDatabase, 0.86, 4.36, 0.5, P.blue, "Database", P.ink, 1.0, 8.5);

  // ================= Data Consumption (right, outside) =================
  s.addText("Data Consumption", { x: 11.86, y: 1.62, w: 1.14, h: 0.4, fontSize: 8.5, bold: true, color: P.red, fontFace: FONT, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 0.9 });
  s.addShape(S.ROUNDED_RECTANGLE, { x: 11.86, y: 1.5, w: 1.14, h: 3.7, rectRadius: 0.05, fill: { color: P.white }, line: { color: P.red, width: 1.25 } });
  s.addText("Data Consumption", { x: 11.9, y: 1.64, w: 1.06, h: 0.4, fontSize: 8.5, bold: true, color: P.red, fontFace: FONT, align: "center", valign: "top", margin: 0, lineSpacingMultiple: 0.9 });
  chip(I.FiMonitor, 12.43, 2.2, 0.5, P.red, "PC", P.ink, 1.0, 8);
  chip(I.FiSmartphone, 12.43, 3.04, 0.5, P.red, "Smart Phone", P.ink, 1.05, 8);
  chip(I.FiServer, 12.43, 3.92, 0.5, P.red, "Downstream\nData System", P.ink, 1.1, 8);

  // ---- dashed flow connectors ----
  s.addShape(S.LINE, { x: 1.42, y: 3.25, w: 0.58, h: 0, line: { color: P.blue, width: 1.25, dashType: "dash" } });
  s.addShape(S.LINE, { x: 11.72, y: 3.0, w: 0.14, h: 0, line: { color: P.red, width: 1.25, dashType: "dash" } });
};
