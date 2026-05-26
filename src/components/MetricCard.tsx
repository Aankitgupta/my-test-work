import type { Metric } from "../data/dashboardData";

type MetricCardProps = {
  metric: Metric;
};

function formatMetricValue(metric: Metric) {
  const value =
    metric.unit === "%"
      ? metric.value.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : Math.round(metric.value).toLocaleString();

  return `${value}${metric.unit === "%" ? "%" : " sec"}`;
}

function goalHealth(metric: Metric) {
  if (metric.direction === "lower") {
    return Math.min((metric.goal / metric.value) * 100, 100);
  }

  return Math.min((metric.value / metric.goal) * 100, 100);
}

export function MetricCard({ metric }: MetricCardProps) {
  const health = goalHealth(metric);

  return (
    <article className={`metric-card metric-card--${metric.status}`}>
      <div className="metric-card__topline">
        <span className="status-pill">{metric.status}</span>
        <span>{metric.summary}</span>
      </div>

      <div>
        <h3>{metric.label}</h3>
        <div className="metric-card__value">{formatMetricValue(metric)}</div>
      </div>

      <div className="metric-card__meta">
        <span>
          Goal <strong>{metric.goal}{metric.unit === "%" ? "%" : " sec"}</strong>
        </span>
        <span>
          Team <strong>{metric.teamAverage}{metric.unit === "%" ? "%" : " sec"}</strong>
        </span>
      </div>

      <div className="progress-track" aria-label={`${metric.label} goal health`}>
        <span style={{ width: `${health}%` }} />
      </div>

      <p>{metric.action}</p>
    </article>
  );
}
