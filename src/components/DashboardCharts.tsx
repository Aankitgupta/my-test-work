import Highcharts from "highcharts";
import { HighchartsReact } from "highcharts-react-official";
import { ahtTrend, metrics, queueMix } from "../data/dashboardData";
import { statusColors } from "../highcharts/theme";

function metricGoalAttainment(metricId: string) {
  const metric = metrics.find((item) => item.id === metricId);

  if (!metric) {
    return 0;
  }

  if (metric.direction === "lower") {
    return (metric.goal / metric.value) * 100;
  }

  return (metric.value / metric.goal) * 100;
}

export function AhtTrendChart() {
  const options: Highcharts.Options = {
    chart: {
      height: 320,
      type: "area",
    },
    title: {
      text: "AHT recovered late in the month, but still sits above goal",
      align: "left",
    },
    subtitle: {
      text: "Weekly trend for cat2520e vs target",
      align: "left",
      style: {
        color: "#64748b",
      },
    },
    xAxis: {
      categories: ahtTrend.map((point) => point.date),
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "Seconds",
      },
      min: 450,
    },
    tooltip: {
      shared: true,
      valueSuffix: " sec",
    },
    plotOptions: {
      area: {
        marker: {
          enabled: true,
          radius: 5,
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(37, 99, 235, 0.28)"],
            [1, "rgba(37, 99, 235, 0.02)"],
          ],
        },
      },
      series: {
        lineWidth: 3,
      },
    },
    series: [
      {
        type: "area",
        name: "Actual AHT",
        data: ahtTrend.map((point) => point.actual),
        color: "#2563eb",
      },
      {
        type: "line",
        name: "Goal",
        data: ahtTrend.map((point) => point.goal),
        color: "#ef4444",
        dashStyle: "ShortDash",
        marker: {
          enabled: false,
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export function GoalAttainmentChart() {
  const options: Highcharts.Options = {
    chart: {
      height: 320,
      type: "column",
    },
    title: {
      text: "Goal attainment by KPI",
      align: "left",
    },
    subtitle: {
      text: "100% means the metric is meeting target",
      align: "left",
      style: {
        color: "#64748b",
      },
    },
    xAxis: {
      categories: ["AHT", "Disclosure", "Close", "Save"],
    },
    yAxis: {
      title: {
        text: "Goal attainment",
      },
      labels: {
        format: "{value}%",
      },
      plotLines: [
        {
          value: 100,
          color: "#0f172a",
          dashStyle: "Dash",
          width: 2,
          label: {
            text: "Goal",
            style: {
              color: "#0f172a",
              fontWeight: "700",
            },
          },
        },
      ],
    },
    tooltip: {
      pointFormat: "<b>{point.y:.1f}%</b> of goal",
    },
    plotOptions: {
      column: {
        borderRadius: 12,
        pointPadding: 0.14,
      },
    },
    series: [
      {
        type: "column",
        name: "Goal attainment",
        data: metrics.map((metric) => ({
          name: metric.label,
          y: Number(metricGoalAttainment(metric.id).toFixed(1)),
          color: statusColors[metric.status],
        })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export function QueueMixChart() {
  const options: Highcharts.Options = {
    chart: {
      height: 274,
      type: "pie",
    },
    title: {
      text: "Workload focus",
      align: "left",
    },
    subtitle: {
      text: "Current insight groups",
      align: "left",
      style: {
        color: "#64748b",
      },
    },
    tooltip: {
      pointFormat: "<b>{point.percentage:.0f}%</b>",
    },
    plotOptions: {
      pie: {
        innerSize: "68%",
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          distance: 18,
          format: "{point.name}: {point.percentage:.0f}%",
          style: {
            color: "#334155",
            fontSize: "12px",
            fontWeight: "700",
            textOutline: "none",
          },
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Workload focus",
        data: queueMix,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
