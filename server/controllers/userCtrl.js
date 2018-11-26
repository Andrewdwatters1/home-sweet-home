const axios = require('axios');
// const CircularJSON = require('circular-json');


// EXPRESS SESSION INFO https://www.npmjs.com/package/express-session

module.exports = {
  // getCurrentUser: (req, res) => {
  //   res.send(req.session.user);
  // },
  // logout: (req, res) => {
  //   req.session.destroy();
  //   res.sendStatus(200);
  // },
  // auth: async (req, res) => {
  //   try {
  //     const db = req.app.get('db');
  //     let users = await db.getUserById() // => SELECT * FROM users WHERE id = $1;

  //     if (users.length) req.session.user = users[0]
  //     else {
  //       let users = await db.createNewUser(userInfo)
  //       req.session.user = users[0];
  //     }
  //     console.log('User set on session');
  //   } catch (err) {
  //     console.log(err)
  //   }
  // },
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