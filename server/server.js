const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config()
// const path = require('path');

const userCtrl = require('./controllers/userCtrl');
const propCtrl = require('./controllers/propertyCtrl');

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database is linked! ');
})

app.use(session({
  cookie: { secure: true, maxAge: 360000 },
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  // saveUninitialized: false,
  resave: false
}))

// app.use(express.static(`${__dirname}/../build`));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

app.get('/api/retrieveUser', userCtrl.retrieveUser);
app.post('/api/userLogin', userCtrl.userLogin);
app.post('/api/getLocationInfo', userCtrl.getLocationInfo);
app.post('/api/getCityFromZip', userCtrl.getCityFromZip);

app.post('/api/getSearchResults', propCtrl.getSearchResults);
app.post('/api/getSinglePropertySearchResults', propCtrl.getSinglePropertySearchResults);
app.post('/api/getRegionChildren', propCtrl.getRegionChildren);


app.listen(process.env.SERVER_PORT, () => {
  console.log('Server listening on: ', process.env.SERVER_PORT);
})