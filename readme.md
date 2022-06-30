# Web of Things Statisics

Collection of several statistics about web of things from Stackoverflow, Github, Npm..etc with historic data and filtering by date and tag.

**Documentation**
`api` folder contains all the functions that fetches each specific data seperated for each provider, one for stackoverflow, one for npm..etc
The `stats.js` file contains the `fetchStats` function that calls these APIs and fetches the statistics with specific parameters, new statistics can be added there. This function is called once every week using a cronjob to collect the data and store them in a mongoDB.

**API Usage**
`routers/stat.js`

1. `http://[BASE]/stats/:tag`
   This endpoint returns an array of all the statistics with a specific tag.

2. `http://[BASE]/stats/date/:date`
   This endpoint returns an array of all the statistics from a specific date till now.

3. `http://[BASE]/stats/:tag/:date`
   This endpoint returns an array of all the statistics from a specific date till now with a specific tag.

**Example**
![Stats Date and Time](https://i.ibb.co/0rfMNyM/dateandtag.png)
