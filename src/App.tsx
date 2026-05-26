import {
  AhtTrendChart,
  GoalAttainmentChart,
  QueueMixChart,
} from "./components/DashboardCharts";
import { MetricCard } from "./components/MetricCard";
import {
  efficiencyRows,
  filters,
  insights,
  metrics,
  scoreRows,
  type MetricStatus,
} from "./data/dashboardData";
import { applyHighchartsTheme } from "./highcharts/theme";

applyHighchartsTheme();

const statusLabel: Record<MetricStatus, string> = {
  healthy: "On track",
  watch: "Watch",
  risk: "At risk",
};

function StatusBadge({ status }: { status: MetricStatus }) {
  return <span className={`badge badge--${status}`}>{statusLabel[status]}</span>;
}

function App() {
  return (
    <main className="dashboard-shell">
      <section className="hero">
        <div className="hero__content">
          <span className="eyebrow">Agent performance workspace</span>
          <h1>Simplified customer operations dashboard</h1>
          <p>
            A focused view of the few metrics that need action now: handle time,
            retention, sales conversion, and customer experience.
          </p>
        </div>

        <div className="hero__panel">
          <span className="hero__panel-label">Overall health</span>
          <strong>2 risks</strong>
          <p>AHT and save rate should be the next coaching priorities.</p>
        </div>
      </section>

      <section className="filter-bar" aria-label="Dashboard filters">
        {filters.map((filter) => (
          <div className="filter-chip" key={filter.label}>
            <span>{filter.label}</span>
            <strong>{filter.value}</strong>
          </div>
        ))}
      </section>

      <section className="insight-strip" aria-labelledby="insight-title">
        <div>
          <span className="eyebrow">Do you know?</span>
          <h2 id="insight-title">Three things explain the week</h2>
        </div>

        <div className="insight-strip__grid">
          {insights.slice(0, 3).map((insight) => (
            <article className="insight-card" key={insight.title}>
              <StatusBadge status={insight.status} />
              <strong>{insight.metric}</strong>
              <p>{insight.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="metric-grid" aria-label="KPI summary">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="dashboard-grid dashboard-grid--charts">
        <article className="panel panel--wide">
          <AhtTrendChart />
        </article>

        <article className="panel">
          <GoalAttainmentChart />
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <div className="panel__header">
            <div>
              <span className="eyebrow">Focus next</span>
              <h2>Recommended coaching plan</h2>
            </div>
            <StatusBadge status="risk" />
          </div>

          <div className="action-list">
            <article>
              <span>01</span>
              <div>
                <strong>Cut AHT from repeatable moments</strong>
                <p>
                  Review the longest calls first and tag delays as hold time,
                  navigation, wrap, or transfer friction.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <strong>Rebuild retention confidence</strong>
                <p>
                  Pair save-rate misses with call snippets and refresh the top
                  three save offers.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <strong>Preserve strong close behavior</strong>
                <p>
                  Use the current sales flow as the baseline while coaching the
                  lower-performing retention moments.
                </p>
              </div>
            </article>
          </div>
        </article>

        <article className="panel">
          <QueueMixChart />
        </article>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Customer experience</span>
            <h2>Scorecard simplified</h2>
          </div>
          <p className="panel__hint">Rank columns remain available for drilldown.</p>
        </div>

        <div className="score-grid">
          {scoreRows.map((row) => (
            <article className="score-card" key={row.label}>
              <span>{row.category}</span>
              <h3>{row.label}</h3>
              <strong>{row.intervalScore}</strong>
              <p>Team average {row.teamAverage}</p>
              <div className="rank-row">
                <span>Team #{row.teamRank}</span>
                <span>Site #{row.siteRank}</span>
                <span>Vendor #{row.vendorRank}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <span className="eyebrow">Operational efficiency</span>
            <h2>Weekly detail</h2>
          </div>
          <p className="panel__hint">
            Detailed rows are preserved, but visual status makes scanning faster.
          </p>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Week</th>
                <th>Queue</th>
                <th>AHT</th>
                <th>CSAT</th>
                <th>Resolution</th>
                <th>Save rate</th>
                <th>Close rate</th>
                <th>Easy to understand</th>
                <th>General close</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {efficiencyRows.map((row) => (
                <tr key={row.week}>
                  <td>{row.week}</td>
                  <td>{row.queue}</td>
                  <td>{row.aht}</td>
                  <td>{row.satisfaction}</td>
                  <td>{row.resolution}</td>
                  <td>{row.saveRate}</td>
                  <td>{row.closeRate}</td>
                  <td>{row.easyToUnderstand}</td>
                  <td>{row.generalCloseRate}</td>
                  <td>
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default App;
