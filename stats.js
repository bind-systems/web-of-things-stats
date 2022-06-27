import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";
import fetchStackoverflowQuestions from "./api/stackoverflow.js";
import fetchGithubRepos from "./api/githubRepos.js";
import fetchNpmDownloads from "./api/npm.js";
import fetchGithubStars from "./api/githubStars.js";

class Stats extends LitElement {
  static properties = {
    stackoverflowQuestions: { type: Number },
    githubTopics: { type: Number },
    numberOfDownloadsCore: { type: Number },
    numberOfDownloadsModbus: { type: Number },
    numberOfDownloadsHttp: { type: Number },
    githubStars: { type: Number },
  };

  async fetchStats() {
    this.stackoverflowQuestions = await fetchStackoverflowQuestions(
      "web-of-things"
    );

    this.githubTopics = await fetchGithubRepos("web-of-things");

    // this.githubTopics = 69;
    // this.stackoverflowQuestions = 69;

    this.numberOfDownloadsCore = await fetchNpmDownloads("@node-wot", "core");

    this.numberOfDownloadsModbus = await fetchNpmDownloads(
      "@node-wot",
      "binding-modbus"
    );

    this.numberOfDownloadsHttp = await fetchNpmDownloads(
      "@node-wot",
      "binding-http"
    );

    this.githubStars = await fetchGithubStars("w3c", "wot");
  }

  render() {
    if (
      !this.stackoverflowQuestions ||
      !this.githubTopics ||
      !this.numberOfDownloadsCore ||
      !this.numberOfDownloadsModbus ||
      !this.numberOfDownloadsHttp ||
      !this.githubStars
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
        <p></p>
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
