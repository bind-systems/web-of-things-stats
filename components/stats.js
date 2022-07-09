import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import "https://cdn.jsdelivr.net/npm/chart.js@3.8.0/dist/chart.min.js";
const url = "http://localhost:3000";

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
    this.tag = e.target.value;
  }

  render() {
    return html`
      <div>
        <h1>Web of Things Statistics</h1>
        <label for="from">From</label>
        <input id="from" type="date" @change=${this.fromChangeHandler} />
        <label for="to">To</label>
        <input id="to" type="date" @change=${this.toChangeHandler} />
        <label for="tag">Tag</label>
        <select id="tag" @change=${this.tagChangeHandler}>
          <option value="">All</option>
          <option value="/npm">Npm</option>
          <option value="/github">Github</option>
          <option value="/stackoverflow">Stackoverflow</option>
        </select>
        <button @click=${this.fetchStats}>Get Statistics</button>
      </div>

      <div class="chart">
        ${Array.from(Array(100).keys()).map(
          (i) => html`<canvas id="myChart${i}"></canvas>`
        )}
      </div>
    `;
  }
  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=ABeeZee&display=swap');
  h1 {
    text-align: center;
  }
  canvas {
    display: none;
    margin-top: 50px;
  }

    div {
      font-family: 'ABeeZee', sans-serif;
      display: flex;
      flex-flow: column wrap;
      justify-content:center;
      align-items:center;
    }
    .chart {
    margin: auto;
    width: 70%;
    margin-bottom:50px;
    }
    @media (max-width: 900px) {
      .chart {
        margin: auto;
        width: 100%
        }
    }
    input {
      width: 60%;
      height: 30px
    }
    select {
      width: 60.5%;
      height: 35px
    }
    label {
      margin:5px;
    }
    button {
      width: 100px;
      display: flex;
      justify-content: center;
      margin: auto;
      margin-top: 1rem;
      padding: 0.7rem;
      font-weight: bold;
      color: white;
      background-color: #32589a;
      border-radius: 3px;
      border: none;
    }
      button:hover {
        background-color: #203964;
      }
      ul {
        display: flex;
        flex-flow: column wrap;
        list-style-type: none;
        margin: 0;
        padding: 0;
        width: 95%;
        margin: auto;
      }
      li {
        background: #fff;
        color: #333;
        text-shadow: none;
        padding: 1rem;
        border-radius: 3px;
        box-shadow: -1px 2px 2px -2px rgb(0, 0, 0.43);
        font-family: "Roboto Mono", monospace;
        margin-top: 1rem;
      }
       li span {
        color: #203964;
       }
    }
  `;
}
customElements.define("wot-stats", Stats);
