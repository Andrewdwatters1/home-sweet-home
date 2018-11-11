const axios = require('axios');
const CircularJSON = require('circular-json');

module.exports = {
  getLocationInfo: (req, res) => {
    const { lat, long } = req.body;
    axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
      .then(result => {
        res.status(200).send(result.data.results)
      })
      .catch(error => console.log(error));
  },
  getCityFromZip: (req, res) => {
    const { value } = req.body;
    axios.get(`https://api.zippopotam.us/us/${value}`)
      .then(result => {
        res.status(200).send(result.data.places[0]);
      })
      .catch(error => console.log(error));
  }
}