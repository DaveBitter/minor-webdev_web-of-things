/* LOAD ALL DEPENDENCIES
----------------------------------------- */
//google calander api key AIzaSyB12EjnA2KlxqiDxHzXfmwzcz7bz8nLO4U
const express = require('express')
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const WebSocket = require('ws')
const http = require('http')

require('dotenv').config();
const port = process.env.PORT || 3000;

/* MONGODB CONFIGURATION
----------------------------------------- */
const MongoClient = require("mongodb").MongoClient;
const dbConfig = process.env.MONGODB_URI;

MongoClient.connect(dbConfig, (err, database) => {
  if (err) return console.log(err)
  db = database
});



/* SESSIONS CONFIGURATION
----------------------------------------- */
app.use(session({
  secret: "JA1d82JHYF9?nsdfDF635MuHe#ksd",
  resave: false,
  saveUninitialized: true
}));

/* BODY-PARSER FOR READING POST REQUESTS
----------------------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/* Routes
----------------------------------------- */
const indexRouter = require('./routes/index.js')
const accountRouter = require('./routes/account.js')
const islandsRouter = require('./routes/islands.js')

app
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .use('/', indexRouter)
  .use('/account', accountRouter)
  .use('/islands', islandsRouter);

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/', indexRouter)
app.use('/account', accountRouter)


const server = http.createServer(app);
const ws = new WebSocket.Server({
  server
});
ws.on('connection', socketConnectionMade);

server.listen(port, () => {
  console.log('Started server on http://localhost:' + port)
})

function socketConnectionMade(socket) {
  socket.on('message', function(message) {
    ws.clients.forEach(function(client) {
      client.send(message);
    })
    console.log(message);
    getSenior(message)
  })
}

function getSenior(senderId) {
  console.log(senderId)
  const islandCollection = db.collection('islands');
  const userCollection = db.collection('users');
  // find user info based on boxId
  userCollection.findOne({
    boxId: senderId
  }, function(err, user) {
    console.log('message from: ', user)

    // find island where user is a junior of
    islandCollection.find({}, {}).toArray(function(err, islands) {
      islands.forEach(function(island) {
        island.juniors.forEach(function(junior) {
          console.log(junior, user.username)
          if (junior == user.username) {
            console.log("user is in this island!")
            console.log('senior is', island.senior)
            const senior = island.senior

            // find user info of senior of island
            userCollection.findOne({
              username: senior
            }, function(err, senior) {
              console.log('emitting the color' + user.color + ' to senior ' + senior.boxId)
              // emitZooi(senior.boxId, user.color)
            });
          }
        })
      });
    })
  });
}