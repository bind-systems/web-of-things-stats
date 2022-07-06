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
    skip: {
      type: Number,
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
  };

  async fetchStats() {
    if (!this.tag) this.tag = "";
    if (!this.to) this.to = "";
    if (!this.from) this.from = new Date();
    this.skip = 0;
    const res = await fetch(
      `${url}/stats${this.tag}?from=${this.from}${this.to}`
    );
    this.stats = await res.json();
    const statsNumbers = [];
    this.stats.forEach((stat) => statsNumbers.push(stat.data));
    const names = [];
    this.stats.forEach((stat) => names.push(stat.name));
    this.renderChart(statsNumbers, names);
  }
  async fetchMore() {
    this.skip += 5;
    const res = await fetch(
      `${url}/stats${this.tag}?from=${this.from}${this.to}&skip=${this.skip}`
    );
    const stats = await res.json();
    this.stats = [...this.stats, ...stats];

    const statsNumbers = [];
    for (const stat of this.stats) {
      statsNumbers.push(stat.data);
      if (statsNumbers.length === 50) break;
    }
    const names = [];

    for (const stat of this.stats) {
      names.push(stat.name);
      if (names.length === 50) break;
    }
    this.renderChart(statsNumbers, names);
  }
  renderChart(statsNumbers, names) {
    if (!this.stats.length) return;
    if (this.myChart) this.myChart.destroy();
    const ctx = this.renderRoot.querySelector("#myChart").getContext("2d");
    this.myChart = new Chart(ctx, {
      type: "bar",
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      data: {
        labels: names,
        datasets: [
          {
            label: "",
            data: statsNumbers,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
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
        <canvas id="myChart"></canvas>
      </div>
      ${this.stats && this.stats.length
        ? html`<button @click="${this.fetchMore}">MORE</button>`
        : html`<div></div>`}
      <ul>
        ${this.stats &&
        this.stats.map(
          (stat) => html`<li><span>${stat.data}</span> ${stat.desc}</li>`
        )}
      </ul>
    `;
  }
  static styles = css`
  @import url('https://fonts.googleapis.com/css2?family=ABeeZee&display=swap');
  h1 {
    text-align: center;
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
    width: 70%
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
