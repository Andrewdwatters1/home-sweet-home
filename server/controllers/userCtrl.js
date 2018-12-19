const axios = require('axios');
// EXPRESS SESSION INFO https://www.npmjs.com/package/express-session

module.exports = {

  userLogin: (req, res) => {
    const { first, last, email, state } = req.body;
    const db = req.app.get('db');
    db.auth.get_user_by_email(email)
      .then(result => {
        if (result.length) {
          req.session.user = result[0];
          res.status(200).send(req.session.user);
        } else {
          db.auth.register_user([first, last, email, state])
            .then(result => {
              req.session.user = result[0];
              res.status(200).send(req.session.user);
            })
        }
      })
  },

  retrieveUser: (req, res) => {
    res.status(200).send(req.session);
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200);
  },

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