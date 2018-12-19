const request = require('request');
const nodeZillow = require("node-zillow")
const zillow = new nodeZillow(process.env.ZILLOW_API_KEY, { https: true })

const sampleData = require('../sampleDFData');
const propertySearch = require('../middleware/propertySearch');

// DF API options
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

  getSearchResults: async (req, res) => {
    const { body } = req;
    res.status(200).send(sampleData);
    
    const query = await propertySearch.formatQuery(body)
    console.log('FINAL QUERY TO BE SENT', query)
    
    // const dataFinitiOptions = {
    //   url: "https://api.datafiniti.co/v4/properties/search",
    //   method: "POST",
    //   json: {
    //     "query": query,
    //     "format": "JSON",
    //     "num_records": 1,
    //     "download": false
    //   },
    //   headers: {
    //     'Authorization': 'Bearer ' + process.env.DATAFINITI_API_KEY,
    //     "Content-Type": "application/json"
    //   }
    // }
    
    // request(dataFinitiOptions, (error, response, body) => {
    //   if (error) {
    //     res.send(500).send("Error: " + error, "RES: " + response)
    //     console.log("Error: " + error, "RES: " + response);
    //   } else {
    //     res.status(200).send(body);
    //     console.log(body);
    //   }
    // })
  },

  getSinglePropertySearchResults: (req, res) => {
    zillow.get('GetSearchResults', req.body)
      .then(result => {
        // console.log(result)
        res.status(200).send(result.response.results.result)
      })
      .catch(error => console.log(error))
  },

  getRegionChildren: (req, res) => {
    console.log(zillow)
    zillow.get('GetRegionChildren', req.body)
      .then(result => {
        // console.log(result)
        res.status(200).send(result);
      })
      .catch(error => console.log(error));
  }
}
