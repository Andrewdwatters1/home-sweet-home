const nodeZillow = require("node-zillow")
const zillow = new nodeZillow(process.env.ZILLOW_API_KEY, { https: true })

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
  // test: (req, res) => {
  //   zillow.get('METHOD_OF_INTEREST', 'REQUIRED_INFO');
  // },


  getSearchResults: (req, res) => {
    zillow.get('GetSearchResults', req.body)
      .then(result => {
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
