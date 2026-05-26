const salesData = {
  quarterTarget: 4500000,
  metrics: {
    revenue: { value: 3860000, change: 12.8 },
    customers: { value: 1248, change: 8.4 },
    averageDeal: { value: 18450, change: 5.1 },
    winRate: { value: 32.6, change: -1.3 },
  },
  monthlyRevenue: [
    { month: "Jan", revenue: 245000 },
    { month: "Feb", revenue: 282000 },
    { month: "Mar", revenue: 318000 },
    { month: "Apr", revenue: 301000 },
    { month: "May", revenue: 354000 },
    { month: "Jun", revenue: 389000 },
    { month: "Jul", revenue: 421000 },
    { month: "Aug", revenue: 406000 },
    { month: "Sep", revenue: 448000 },
    { month: "Oct", revenue: 472000 },
    { month: "Nov", revenue: 508000 },
    { month: "Dec", revenue: 516000 },
  ],
  channels: [
    { name: "Enterprise direct", value: 46 },
    { name: "Partner network", value: 24 },
    { name: "Inbound marketing", value: 18 },
    { name: "Customer expansion", value: 12 },
  ],
  regions: [
    { name: "North America", revenue: 1720000, attainment: 91 },
    { name: "Europe", revenue: 980000, attainment: 84 },
    { name: "Asia Pacific", revenue: 760000, attainment: 78 },
    { name: "Latin America", revenue: 400000, attainment: 66 },
  ],
  pipeline: [
    {
      account: "Northstar Retail",
      stage: "Proposal",
      owner: "Maya Chen",
      value: 284000,
      closeDate: "Jun 14",
    },
    {
      account: "Acme Logistics",
      stage: "Negotiation",
      owner: "Sam Patel",
      value: 196000,
      closeDate: "Jun 22",
    },
    {
      account: "Vertex Health",
      stage: "Discovery",
      owner: "Jordan Lee",
      value: 148000,
      closeDate: "Jul 03",
    },
    {
      account: "Summit Finance",
      stage: "Commit",
      owner: "Riley Ford",
      value: 352000,
      closeDate: "Jul 11",
    },
  ],
  products: [
    { name: "Analytics Suite", revenue: 1320000, share: 34 },
    { name: "Workflow Pro", revenue: 980000, share: 25 },
    { name: "Automation Hub", revenue: 810000, share: 21 },
    { name: "Support Plus", revenue: 750000, share: 20 },
  ],
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const numberFormatter = new Intl.NumberFormat("en-US");

function getElement(id) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Expected element #${id} to exist.`);
  }

  return element;
}

function formatTrend(change) {
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}% vs previous quarter`;
}

function setTrend(element, change) {
  element.textContent = formatTrend(change);
  element.className = change >= 0 ? "trend-positive" : "trend-negative";
}

function renderKpis() {
  const { metrics, quarterTarget } = salesData;
  const progress = Math.round((metrics.revenue.value / quarterTarget) * 100);

  getElement("target-progress").textContent = `${progress}%`;
  getElement("target-progress-bar").style.width = `${Math.min(progress, 100)}%`;
  getElement("target-progress-detail").textContent =
    `${currencyFormatter.format(metrics.revenue.value)} of ${currencyFormatter.format(quarterTarget)} booked`;

  getElement("revenue-total").textContent = compactCurrencyFormatter.format(metrics.revenue.value);
  setTrend(getElement("revenue-change"), metrics.revenue.change);

  getElement("new-customers").textContent = numberFormatter.format(metrics.customers.value);
  setTrend(getElement("customer-change"), metrics.customers.change);

  getElement("average-deal").textContent = currencyFormatter.format(metrics.averageDeal.value);
  setTrend(getElement("average-deal-change"), metrics.averageDeal.change);

  getElement("win-rate").textContent = `${metrics.winRate.value.toFixed(1)}%`;
  setTrend(getElement("win-rate-change"), metrics.winRate.change);
}

function renderRevenueChart() {
  const chart = getElement("revenue-chart");
  const maxRevenue = Math.max(...salesData.monthlyRevenue.map((item) => item.revenue));

  chart.innerHTML = salesData.monthlyRevenue
    .map((item) => {
      const height = Math.round((item.revenue / maxRevenue) * 100);

      return `
        <div class="bar">
          <div class="bar__track" title="${item.month}: ${currencyFormatter.format(item.revenue)}">
            <span class="bar__value">${compactCurrencyFormatter.format(item.revenue)}</span>
            <span class="bar__fill" style="height: ${height}%"></span>
          </div>
          <span class="bar__label">${item.month}</span>
        </div>
      `;
    })
    .join("");
}

function renderChannels() {
  const channelList = getElement("channel-list");

  channelList.innerHTML = salesData.channels
    .map(
      (channel) => `
        <div class="channel">
          <div class="channel__row">
            <span class="channel__name">${channel.name}</span>
            <strong>${channel.value}%</strong>
          </div>
          <div class="channel__track" aria-hidden="true">
            <span class="channel__fill" style="width: ${channel.value}%"></span>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderRegions() {
  const regionList = getElement("region-list");

  regionList.innerHTML = salesData.regions
    .map(
      (region) => `
        <div class="metric-row">
          <div>
            <strong>${region.name}</strong>
            <small>${currencyFormatter.format(region.revenue)} revenue</small>
          </div>
          <strong>${region.attainment}%</strong>
          <div class="metric-row__track" aria-hidden="true">
            <span class="metric-row__fill" style="width: ${region.attainment}%"></span>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderPipeline() {
  const table = getElement("pipeline-table");

  table.innerHTML = salesData.pipeline
    .map(
      (deal) => `
        <tr>
          <td><strong>${deal.account}</strong></td>
          <td><span class="stage">${deal.stage}</span></td>
          <td>${deal.owner}</td>
          <td>${currencyFormatter.format(deal.value)}</td>
          <td>${deal.closeDate}</td>
        </tr>
      `,
    )
    .join("");
}

function renderProducts() {
  const productList = getElement("product-list");

  productList.innerHTML = salesData.products
    .map(
      (product) => `
        <div class="metric-row">
          <div>
            <strong>${product.name}</strong>
            <small>${currencyFormatter.format(product.revenue)} booked</small>
          </div>
          <strong>${product.share}%</strong>
          <div class="metric-row__track" aria-hidden="true">
            <span class="metric-row__fill" style="width: ${product.share}%"></span>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderDashboard() {
  renderKpis();
  renderRevenueChart();
  renderChannels();
  renderRegions();
  renderPipeline();
  renderProducts();
}

renderDashboard();
