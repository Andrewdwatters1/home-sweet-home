const express = require('express');
const bodyParser = require('body-parser');
// const massive = require('massive');
require('dotenv').config()
// const session = require('express-session');
// const path = require('path');

const userCtrl = require('./controllers/userCtrl');
const propCtrl = require('./controllers/propertyCtrl');

const serverPort = process.env.SERVER_PORT;
const app = express();
app.use(bodyParser.json());
// massive(process.env.CONNECTION_STRING).then(db => {
//   app.set('db', db)
//   console.log('Database is linked! ');
// })
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   saveUninitialized: false,
//   resave: false
// }))

// app.use(express.static(`${__dirname}/../build`));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

app.post('/api/getLocationInfo', userCtrl.getLocationInfo);
app.post('/api/getCityFromZip', userCtrl.getCityFromZip);

app.post('/api/getSinglePropertySearchResults', propCtrl.getSinglePropertySearchResults);
app.post('/api/getRegionChildren', propCtrl.getRegionChildren);
app.post('/api/testDF', propCtrl.testDF);

app.listen(serverPort, () => {
  console.log('Server listening on: ', serverPort);
})