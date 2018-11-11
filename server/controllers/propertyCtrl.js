const request = require('request');
const nodeZillow = require("node-zillow")
const zillow = new nodeZillow(process.env.ZILLOW_API_KEY, { https: true })
const sampleData = require('../sampleDFData');

// DF API options
const API_token = process.env.DATAFINITI_API_KEY;
const format = "JSON";
const query = "country:US";
const num_records = 1;
const download = false;
const dfOptions = {
  url: "https://api.datafiniti.co/v4/properties/search",
  method: "POST",
  json: {
    "query": query,
    "format": format,
    "num_records": num_records,
    "download": download
  },
  headers: {
    'Authorization': 'Bearer ' + API_token,
    "Content-Type": "application/json"
  }
}
// ex multi field query w/ AND: query": "city:Austin AND numBathroom:2"
//    note: can also use OR
// ex city "query": "city:(Austin OR Houston OR Dallas)"
// ex query to ensure all values have price: "query": "prices:*"
// ex query to search date range: "query": "dateAdded:[2017-01-01 TO 2017-02-01]"
// ex query to search unbounded date range: "query": "dateAdded:[2017-01-01 TO *]"


// http://wern-ancheta.com/blog/2014/03/20/getting-started-with-zillow-api/
// GetSearchResults API - returns info for a specified address
// address
// citystatezip
// GetZestimate API - returns zestimate info for specified address
// zpid
// GetChart API - returns a URL to an image with historical zestimates
// zpid
// unit-type
// height
// width
// GetRegionChildren API - returns a list of sub-regions w/ type, id, name, lat/long
// regionid

module.exports = {
  testDF: (req, res) => {
    res.send(sampleData);
    // request(dfOptions, (error, response, body) => {
    //   if (error) res.send(500).send("Error:" + error, "RES:" + response)
    //   else res.status(200).send(body);
    // })
  },
  getSearchResults: (req, res) => {
    zillow.get('GetSearchResults', req.body)
      .then(result => {
        console.log(result)
        res.status(200).send(result.response.results.result)
      })
      .catch(error => console.log(error))
  },
  getRegionChildren: (req, res) => {
    console.log(zillow)
    zillow.get('GetRegionChildren', req.body)
      .then(result => {
        console.log(result)
        res.status(200).send(result);
      })
      .catch(error => console.log(error));
  }
}
