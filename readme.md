# Web of Things Statisics

Collection of several statistics about web of things from Stackoverflow, Github, Npm..etc with historic data and filtering by date and tag.

**Documentation**
`api` folder contains all the functions that fetches each specific data seperated for each provider, one for stackoverflow, one for npm..etc
The `stats.js` file contains the `fetchStats` function that calls these APIs and fetches the statistics with specific parameters, new statistics can be added there. This function is called once every week using a cronjob to collect the data and store them in a mongoDB.

**API Usage**
`routers/stat.js`

1. `http://[BASE]/stats?from=[DATE]&to=[DATE]`
   This endpoint returns an array of all the statistics from a starDate to an endDate. If `to` is not passed, it returns all the statistics from startDate to the current date. `skip` optional query parameter for pagination, by default is 0 and always returns 10 documents.

2. `http://[BASE]/stats/tag?from=[DATE]&to=[DATE]`
   This endpoint returns an array of all the statistics with a specific tag from a startDate to an endDate. If `to` is not passed, it returns all the statistics with the passed tag from startDate to the current date. `skip` optional query parameter for pagination, by default is 0 and always returns 10 documents.

**Example**
![Stats Tag and Date](https://i.ibb.co/KmS4y6S/stats.png)

**Setup Instructions**

1. Place config file as in `config/default.json `
2. Run a mongodb db locally (on the port specified in the config could be `27017`)
3. `npm install` installation will fail if it doesnt meet the node & npm versions in engines package.json
4. Start using the API endpoints as in `Api Usage`
