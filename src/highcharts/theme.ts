import Highcharts from "highcharts";

export const statusColors = {
  healthy: "#16a34a",
  watch: "#f59e0b",
  risk: "#ef4444",
};

export function applyHighchartsTheme() {
  Highcharts.setOptions({
    chart: {
      backgroundColor: "transparent",
      style: {
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      },
    },
    colors: ["#2563eb", "#14b8a6", "#f97316", "#8b5cf6", "#64748b"],
    credits: {
      enabled: false,
    },
    legend: {
      itemStyle: {
        color: "#475569",
        fontWeight: "600",
      },
    },
    title: {
      style: {
        color: "#0f172a",
        fontSize: "18px",
        fontWeight: "800",
      },
    },
    tooltip: {
      borderWidth: 0,
      borderRadius: 14,
      shadow: {
        color: "rgba(15, 23, 42, 0.16)",
        offsetX: 0,
        offsetY: 8,
        opacity: 0.16,
        width: 12,
      },
      style: {
        color: "#0f172a",
        fontSize: "13px",
      },
    },
    xAxis: {
      lineColor: "#e2e8f0",
      tickColor: "#e2e8f0",
      labels: {
        style: {
          color: "#64748b",
          fontSize: "12px",
        },
      },
    },
    yAxis: {
      gridLineColor: "#e2e8f0",
      labels: {
        style: {
          color: "#64748b",
          fontSize: "12px",
        },
      },
      title: {
        style: {
          color: "#64748b",
          fontWeight: "700",
        },
      },
    },
  });
}
