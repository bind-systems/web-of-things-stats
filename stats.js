import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
class Stats extends LitElement {
  static properties = {
    stackoverflowQuestions: { type: Number },
    githubTopics: { type: Number },
    numberOfDownloadsCore: { type: Number },
    numberOfDownloadsModbus: { type: Number },
    numberOfDownloadsHttp: { type: Number },
    githubStars: { type: Number },
    redditMembers: { type: Number },
    redditOnline: { type: Number },
  };

  async fetchStats() {
    // number of questions tagged with web-of-things on stackoverflow
    const stackoverflowRes = await fetch(
      `https://api.stackexchange.com/questions?site=stackoverflow&tagged=web-of-things`
    );
    const stackoverflowData = await stackoverflowRes.json();
    this.stackoverflowQuestions = stackoverflowData.items.length;

    // number of downloads of node-wot core package on npm last week
    const npmCoreRes = await fetch(
      `https://api.npmjs.org/versions/@node-wot%2Fcore/last-week`
    );
    const npmCoreData = await npmCoreRes.json();
    this.numberOfDownloadsCore = Object.values(npmCoreData.downloads).reduce(
      (a, b) => a + b
    );

    // number of downloads of node-wot Modbus package on npm last week
    const npmModbusRes = await fetch(
      `https://api.npmjs.org/versions/@node-wot%2Fbinding-modbus/last-week`
    );
    const npmModbusData = await npmModbusRes.json();
    this.numberOfDownloadsModbus = Object.values(
      npmModbusData.downloads
    ).reduce((a, b) => a + b);

    // number of downloads of node-wot Http package on npm last week
    const npmHttpRes = await fetch(
      `https://api.npmjs.org/versions/@node-wot%2Fbinding-http/last-week`
    );
    const npmHttpData = await npmHttpRes.json();
    this.numberOfDownloadsHttp = Object.values(npmHttpData.downloads).reduce(
      (a, b) => a + b
    );

    // number of repos on github with a web-of-things topic
    const githubReposRes = await fetch(
      `https://api.github.com/search/repositories?q=topic:web-of-things`
    );
    const githubReposData = await githubReposRes.json();
    this.githubTopics = githubReposData.total_count;

    // number of github stars on the w3c wot repo
    const githubStarsRes = await fetch(`https://api.github.com/repos/w3c/wot`);
    const githubStarsData = await githubStarsRes.json();
    this.githubStars = githubStarsData.stargazers_count;

    // number of members and current active members in the IOT subreddit
    const redditRes = await fetch(`https://www.reddit.com/r/IOT/about.json`);
    const redditData = await redditRes.json();
    this.redditMembers = redditData.data.subscribers;
    this.redditOnline = redditData.data.active_user_count;
  }

  render() {
    if (
      !this.stackoverflowQuestions ||
      !this.githubTopics ||
      !this.numberOfDownloadsCore ||
      !this.numberOfDownloadsModbus ||
      !this.numberOfDownloadsHttp ||
      !this.githubStars ||
      !this.redditMembers ||
      !this.redditOnline
    ) {
      return html`
        <p class="loading" @connected="${this.fetchStats()}">Loading...</p>
      `;
    }
    return html`
      <div>
        <h1>Web of Things Statistics</h1>
        <p>
          <span>${this.stackoverflowQuestions}</span>
          Questions on StackOverFlow tagged with 'web-of-things'
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Stack_Overflow_icon.svg"
            alt="stackoverflow icon"
          />
        </p>
        <p>
          <span>${this.githubTopics}</span> Repos on Github with the topic
          'web-of-things'
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="github icon"
          />
        </p>
        <p>
          <span>${this.numberOfDownloadsCore}</span> Downloads of node-wot core
          package last week
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg"
            alt="npm icon"
          />
        </p>
        <p>
          <span>${this.numberOfDownloadsModbus}</span> Downloads of node-wot
          Modbus package last week
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg"
            alt="npm icon"
          />
        </p>
        <p>
          <span>${this.numberOfDownloadsHttp}</span> Downloads of node-wot http
          package last week
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg"
            alt="npm icon"
          />
        </p>

        <p>
          <span>${this.githubStars}</span> Stars on w3c wot repo on Github
          <img
            src="https://github.blog/wp-content/uploads/2020/09/github-stars-logo_Color.png"
            alt="github icon"
          />
        </p>
        <p>
          <span>${this.redditMembers}</span> Members in the IOT Subreddit &
          <span>${this.redditOnline}</span> Online
          <img
            src="https://www.vectorico.com/wp-content/uploads/2018/08/Reddit-logo-300x300.png"
            alt="reddit icon"
          />
        </p>
      </div>
    `;
  }
  static styles = css`
    @import url("https://fonts.googleapis.com/css2?family=ABeeZee:ital@1&display=swap");
    .loading {
      text-align: center;
    }
    div {
      font-family: "ABeeZee", sans-serif;
      font-size: 1.1rem;
      width: 70%;
      margin: auto;
    }
    div p {
      margin-top: 3rem;
      line-height: 2rem;
    }
    div p span {
      color: #015a9c;
      font-size: 1.2rem;
      border: 1px solid #015a9c;
      border-radius: 100px;
      padding: 0.3rem;
      background-color: white;
    }
    div p img {
      width: 30px;
      height: 30px;
    }
  `;
}
customElements.define("wot-stats", Stats);
