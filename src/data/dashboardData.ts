export type MetricDirection = "higher" | "lower";
export type MetricStatus = "healthy" | "watch" | "risk";

export type Metric = {
  id: string;
  label: string;
  value: number;
  goal: number;
  teamAverage: number;
  unit: "sec" | "%";
  direction: MetricDirection;
  status: MetricStatus;
  summary: string;
  action: string;
};

export type Insight = {
  title: string;
  metric: string;
  detail: string;
  status: MetricStatus;
};

export type ScoreRow = {
  label: string;
  category: string;
  intervalScore: string;
  teamAverage: string;
  teamRank: number;
  siteRank: number;
  vendorRank: number;
};

export type EfficiencyRow = {
  week: string;
  queue: string;
  aht: string;
  satisfaction: string;
  resolution: string;
  saveRate: string;
  closeRate: string;
  easyToUnderstand: string;
  generalCloseRate: string;
  status: MetricStatus;
};

export const filters = [
  { label: "Last data refreshed", value: "2026-05-24 13:52:44" },
  { label: "Start date", value: "2026-05-01" },
  { label: "End date", value: "2026-05-23" },
  { label: "Agent STARSS ID", value: "cat2520e" },
];

export const metrics: Metric[] = [
  {
    id: "aht",
    label: "Average Handle Time",
    value: 624,
    goal: 518,
    teamAverage: 403,
    unit: "sec",
    direction: "lower",
    status: "risk",
    summary: "+120.4% vs goal",
    action: "Reduce call wrap and repeat-contact drivers first.",
  },
  {
    id: "purchase-disclosure",
    label: "Purchase Disclosure",
    value: 93.95,
    goal: 96,
    teamAverage: 90.75,
    unit: "%",
    direction: "higher",
    status: "watch",
    summary: "2.05 pts below goal",
    action: "Keep current script discipline; small coaching gap remains.",
  },
  {
    id: "sales-close",
    label: "Sales Close Rate",
    value: 61.88,
    goal: 48.73,
    teamAverage: 57.97,
    unit: "%",
    direction: "higher",
    status: "healthy",
    summary: "+13.15 pts above goal",
    action: "Protect this strength while improving save rate.",
  },
  {
    id: "save-rate",
    label: "Save Rate",
    value: 33.3,
    goal: 72,
    teamAverage: 72.29,
    unit: "%",
    direction: "higher",
    status: "risk",
    summary: "38.7 pts below goal",
    action: "Prioritize objection handling and retention offers.",
  },
];

export const insights: Insight[] = [
  {
    title: "Biggest opportunity",
    metric: "AHT",
    detail:
      "Handle time is 221 seconds above the team average and is the clearest operational drag.",
    status: "risk",
  },
  {
    title: "Keep momentum",
    metric: "Sales close",
    detail:
      "Close rate is outperforming goal, so coaching should avoid disrupting the winning sales flow.",
    status: "healthy",
  },
  {
    title: "Coach next",
    metric: "Save rate",
    detail:
      "Retention is below both goal and peer average; link call listening to save-offer compliance.",
    status: "risk",
  },
  {
    title: "Customer signal",
    metric: "CSAT",
    detail:
      "Overall satisfaction is above interval average, but first-contact resolution needs attention.",
    status: "watch",
  },
];

export const ahtTrend = [
  { date: "May 02", actual: 603, goal: 518 },
  { date: "May 09", actual: 630, goal: 518 },
  { date: "May 16", actual: 695, goal: 518 },
  { date: "May 23", actual: 527, goal: 518 },
];

export const scoreRows: ScoreRow[] = [
  {
    label: "Overall Satisfaction - Top Four Boxes",
    category: "CSAT",
    intervalScore: "78.26%",
    teamAverage: "80.86%",
    teamRank: 75,
    siteRank: 75,
    vendorRank: 75,
  },
  {
    label: "Overall Satisfaction - Bottom Four Boxes",
    category: "CSAT",
    intervalScore: "13.04%",
    teamAverage: "12.57%",
    teamRank: 66,
    siteRank: 66,
    vendorRank: 66,
  },
  {
    label: "Agent Satisfaction - Top Four Boxes",
    category: "CSAT",
    intervalScore: "86.96%",
    teamAverage: "84.57%",
    teamRank: 42,
    siteRank: 42,
    vendorRank: 42,
  },
  {
    label: "First Contact Resolution",
    category: "CSAT",
    intervalScore: "100.00%",
    teamAverage: "90.74%",
    teamRank: 1,
    siteRank: 1,
    vendorRank: 1,
  },
];

export const efficiencyRows: EfficiencyRow[] = [
  {
    week: "2026-05-02",
    queue: "Sales",
    aht: "603 sec",
    satisfaction: "-",
    resolution: "-",
    saveRate: "-",
    closeRate: "60.02%",
    easyToUnderstand: "-",
    generalCloseRate: "-",
    status: "watch",
  },
  {
    week: "2026-05-09",
    queue: "Sales",
    aht: "630 sec",
    satisfaction: "100.00%",
    resolution: "100.00%",
    saveRate: "33.3%",
    closeRate: "62.71%",
    easyToUnderstand: "22.22%",
    generalCloseRate: "0.00%",
    status: "risk",
  },
  {
    week: "2026-05-16",
    queue: "Sales",
    aht: "695 sec",
    satisfaction: "75.00%",
    resolution: "66.67%",
    saveRate: "-",
    closeRate: "67.27%",
    easyToUnderstand: "0.00%",
    generalCloseRate: "0.00%",
    status: "risk",
  },
  {
    week: "2026-05-23",
    queue: "Sales",
    aht: "527 sec",
    satisfaction: "80.00%",
    resolution: "90.00%",
    saveRate: "-",
    closeRate: "50.88%",
    easyToUnderstand: "20.00%",
    generalCloseRate: "-",
    status: "healthy",
  },
];

export const queueMix = [
  { name: "Sales and retention", y: 52 },
  { name: "Calls handling", y: 24 },
  { name: "QA scorecard", y: 14 },
  { name: "Customer experience", y: 10 },
];
