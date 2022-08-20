import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import "https://cdn.jsdelivr.net/npm/chart.js@3.8.0/dist/chart.min.js";

const url = `http://${location.hostname}:3000`;

class Stats extends LitElement {
  static properties = {
    stats: {
      type: Array,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    tag: {
      type: String,
    },
    myChart: { type: Object },
    myCharts: { type: Array },
    months: {
      type: Array,
    },
    githubSelectors: {
      type: Array,
    },
    npmSelectors: {
      type: Array,
    },
    githubFlag: {
      type: Boolean,
    },
    npmFlag: {
      type: Boolean,
    },
  };

  async fetchStats() {
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.githubSelectors = ["JS/TS", "Python", "Java", "C/C++"];
    this.npmSelectors = ["node-wot", "thing-description-playground"];
    this.githubFlag = this.npmFlag = false;
    if (this.myCharts && this.myCharts.length) {
      this.myCharts.forEach((chart) => {
        chart.destroy();
      });
    }

    if (!this.tag) this.tag = "";
    if (!this.to) this.to = "";
    if (!this.from) this.from = new Date();
    const res = await fetch(
      `${url}/stats${this.tag}?from=${this.from}${this.to}`
    );
    this.stats = await res.json();

    let commonNames = [];
    for (const stat of this.stats) {
      commonNames.push(stat.name);
    }
    commonNames = new Array(...new Set(commonNames));

    const newStats = [];
    for (const commonName of commonNames) {
      const commonStats = [];
      for (const stat of this.stats) {
        if (commonName === stat.name) commonStats.push(stat);
      }
      newStats.push(commonStats);
    }

    for (let i = 0; i < newStats.length; i += 3) {
      const slicedStats = newStats.slice(i, i + 3);
      const labels = [];
      const data = [];
      const legends = [];
      slicedStats[0].forEach((stats) =>
        labels.push(this.months[new Date(stats.createdAt).getMonth()])
      );
      slicedStats.forEach((stats) => {
        legends.push(stats[0].name);
        const dataset = [];
        stats.forEach((stat) => {
          dataset.push(stat.data);
        });
        data.push(dataset);
      });
      if (this.tag === "/npm") this.npmFlag = true;
      if (this.tag === "/github") this.githubFlag = true;
      this.renderChart(labels, data, legends, i);
    }
  }

  renderChart(labels, data, legends, id) {
    if (!this.stats.length) return;
    const ctx = this.renderRoot.querySelector(`#myChart${id}`).getContext("2d");
    if (!this.myCharts) {
      this.myCharts = [];
    }
    if (data.length === 3) {
      this.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: legends[0],
              data: data[0],
              borderColor: "#FF6384",
              backgroundColor: "#FF6384",
            },
            {
              label: legends[1],
              data: data[1],
              borderColor: "#36A2EB",
              backgroundColor: "#36A2EB",
            },
            {
              label: legends[2],
              data: data[2],
              borderColor: "#32a86f",
              backgroundColor: "#32a86f",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "#ADBAC7",
              },
            },
          },
          responsive: true,
          scales: {
            y: {
              ticks: { color: "#ADBAC7", beginAtZero: true },
            },
            x: {
              ticks: { color: "#ADBAC7", beginAtZero: true },
            },
          },
        },
      });
    } else if (data.length == 2) {
      this.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: legends[0],
              data: data[0],
              borderColor: "#FF6384",
              backgroundColor: "#FF6384",
            },
            {
              label: legends[1],
              data: data[1],
              borderColor: "#36A2EB",
              backgroundColor: "#36A2EB",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "#ADBAC7",
              },
            },
          },
          responsive: true,
          scales: {
            y: {
              ticks: { color: "#ADBAC7", beginAtZero: true },
            },
            x: {
              ticks: { color: "#ADBAC7", beginAtZero: true },
            },
          },
        },
      });
    } else {
      this.myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: legends[0],
              data: data[0],
              borderColor: "#FF6384",
              backgroundColor: "#FF6384",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "#ADBAC7",
              },
            },
          },
          responsive: true,
          scales: {
            y: {
              ticks: { color: "#ADBAC7", beginAtZero: true },
            },
            x: {
              ticks: { color: "#ADBAC7", beginAtZero: true },
            },
          },
        },
      });
    }
    this.myCharts.push(this.myChart);
  }

  fromChangeHandler(e) {
    this.from = e.target.value;
  }
  toChangeHandler(e) {
    this.to = `&to=${e.target.value}`;
  }
  tagChangeHandler(e) {
    this.githubFlag = this.npmFlag = false;
    this.tag = e.target.value;
  }
  async onClickSelectorTabHandler(e) {
    const tablinks = this.shadowRoot.querySelectorAll(".tablinks");
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    e.currentTarget.className += " active";

    if (this.myCharts && this.myCharts.length) {
      this.myCharts.forEach((chart) => {
        chart.destroy();
      });
    }
    const selectedStats = this.stats.filter((stat) =>
      stat.selectors.includes(e.target.value)
    );
    let commonNames = [];
    for (const stat of selectedStats) {
      commonNames.push(stat.name);
    }
    commonNames = new Array(...new Set(commonNames));
    const newStats = [];
    for (const commonName of commonNames) {
      const commonStats = [];
      for (const stat of selectedStats) {
        if (commonName === stat.name) commonStats.push(stat);
      }
      newStats.push(commonStats);
    }
    for (let i = 0; i < newStats.length; i += 3) {
      const slicedStats = newStats.slice(i, i + 3);
      const labels = [];
      const data = [];
      const legends = [];
      slicedStats[0].forEach((stats) =>
        labels.push(this.months[new Date(stats.createdAt).getMonth()])
      );
      slicedStats.forEach((stats) => {
        legends.push(stats[0].name);
        const dataset = [];
        stats.forEach((stat) => {
          dataset.push(stat.data);
        });
        data.push(dataset);
      });
      if (this.tag === "/npm") this.npmFlag = true;
      if (this.tag === "/github") this.githubFlag = true;
      this.renderChart(labels, data, legends, i);
    }
  }

  render() {
    return html`
      <link
        href="https://unpkg.com/@primer/css@^20.2.4/dist/primer.css"
        rel="stylesheet"
      />
      <div class="container">
        <h1 class="h1" style="margin-top: 20px">Web of Things Statistics</h1
        >
        <div class="form">
        <label for="from" class="h5">From   <input
        placeholder="Standard input"
          class="form-control"
          id="from"
          type="date"
          @change=${this.fromChangeHandler}
        /></label>
        <label for="to" class="h5">To  <input
        class="form-control"
        id="to"
        type="date"
        @change=${this.toChangeHandler}
      /></label>
       
        <label for="tag" class="h5">Tag   <select class="form-select id="tag" @change=${
          this.tagChangeHandler
        }>
        <option value="">All</option>
        <option value="/npm">Npm</option>
        <option value="/github">Github</option>
        <option value="/stackoverflow">Stackoverflow</option>
      </select></label>
        </div>
      

      
        <button class="btn btn-primary" style="margin-top: 10px;" @click=${
          this.fetchStats
        }>Get Statistics</button>
        ${
          this.githubFlag
            ? html`<p
                class="Header color-shadow-medium"
                style="margin-top: 10px; margin-bottom:-20px;"
              >
                ${this.githubSelectors.map(
                  (selector) =>
                    html`<button
                      class="Header-item Header-link"
                      value=${selector}
                      @click=${this.onClickSelectorTabHandler}
                    >
                      ${selector}
                    </button>`
                )}
              </p>`
            : html`<div></div>`
        }
        ${
          this.npmFlag
            ? html`<p
                class="Header color-shadow-medium"
                style="margin-top: 10px; margin-bottom:-20px;"
              >
                ${this.npmSelectors.map(
                  (selector) =>
                    html`<button
                      value=${selector}
                      class="Header-item Header-link"
                      @click=${this.onClickSelectorTabHandler}
                    >
                      ${selector}
                    </button>`
                )}
              </p>`
            : html`<div></div>`
        }
      </div>

      <div class="container chart">
        ${Array.from(Array(100).keys()).map(
          (i) => html`<canvas id="myChart${i}"></canvas>`
        )}
      </div>
    `;
  }
  static styles = css`
    @import url("https://fonts.googleapis.com/css2?family=ABeeZee&display=swap");
    button,
    input[type="submit"],
    input[type="reset"] {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }

    canvas {
      display: none;
      margin-top: 50px;
    }

    .container {
      font-family: "ABeeZee", sans-serif;
      display: flex;
      flex-flow: column wrap;
      justify-content: center;
      align-items: center;
    }
    .form {
      display: flex;
      flex-flow: column wrap;
      width: 50%;
    }

    label,
    input,
    select {
      margin: 5px;
    }

    .form input,
    .form label,
    .form select {
      width: 100%;
    }
    .chart {
      margin: auto;
      width: 70%;
      margin-bottom: 50px;
    }
    @media (max-width: 900px) {
      .chart {
        margin: auto;
        width: 100%;
      }
    }
  `;
}
customElements.define("wot-stats", Stats);
