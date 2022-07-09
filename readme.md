# Web of Things Statisics

Collection of several statistics about web of things from Stackoverflow, Github, Npm..etc with historic data and filtering by date and tag with chart.js data visualization.

**Documentation**
`api` folder contains all the functions that fetches each specific data seperated for each provider, one for stackoverflow, one for npm..etc
The `stats.js` file contains the `fetchStats` function that calls these APIs and fetches the statistics with specific parameters, new statistics can be added there. This function is called once every 2 weeks using a cronjob to collect the data and store them in a mongoDB.

**API Usage**
`routers/stat.js`

1. `http://[BASE]/stats?from=[DATE]&to=[DATE]`
   This endpoint returns an array of all the statistics from a starDate to an endDate. If `to` is not passed, it returns all the statistics from startDate to the current date.

2. `http://[BASE]/stats/tag?from=[DATE]&to=[DATE]`
   This endpoint returns an array of all the statistics with a specific tag from a startDate to an endDate. If `to` is not passed, it returns all the statistics with the passed tag from startDate to the current date.

**Lit Component**
components/stats.js

Reusable lit component can be used directly in html pages or in markdown files. Chart.js is used for the statistics chart.
You have to serve the component example yourself.

**Example**
![Stats Tag and Date](https://i.ibb.co/brcBXS9/dateandtag.png)
![Lit Component Form](https://i.ibb.co/X3XgFjb/lit1.png)
![Lit Component Chart](https://i.ibb.co/BBDxXs4/chart.png)

**Setup Instructions**

1. Place config file as in `config/default.json `
2. Run a mongodb db locally (on the port specified in the config could be `27017`)
3. `npm install` installation will fail if it doesnt meet the node & npm versions in engines package.json
4. Serve the components/index.html on any port and start using it. Change url in stats.js on deployment to the server url.
