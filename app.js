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
const hexRgb = require('hex-rgb')


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
const dashboardRouter = require('./routes/dashboard.js');

app
  .set('view engine', 'ejs')
  .use(express.static('public'))
  .use('/', indexRouter)
  .use('/account', accountRouter)
  .use('/islands', islandsRouter)
  .use('/dashboard', dashboardRouter)

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
    handleMessage(JSON.parse(message))
  })
}

function handleMessage(message) {
  // what i want message to be from junior
  // {
  //   boxId: 12345
  // }

  // what i want message to be from senior
  // {
  //   boxId: 12345,
  //   recipient: 45678,
  //   color: #009900
  // }

  const islandCollection = db.collection('islands');
  const userCollection = db.collection('users');
  // find user info based on boxId
  const boxId = JSON.stringify(message.boxId)
  userCollection.findOne({
    boxId: boxId
  }, function(err, user) {
    console.log('userrrrrr', user)
    if (user.type == 'junior') {
      // find island where user is a junior of
      islandCollection.find({}, {}).toArray(function(err, islands) {
        islands.forEach(function(island) {
          island.juniors.forEach(function(junior) {
            if (junior == user.username) {
              const senior = island.senior

              // find user info of senior of island
              userCollection.findOne({
                username: senior
              }, function(err, foundSenior) {
                console.log('going to send ' + user.color + ' and ' + foundSenior.boxId + 'to all sockets')
                console.log(hexRgb(user.color))
                ws.clients.forEach(function(client) {
                  client.send(
                    JSON.stringify({
                      color: hexRgb(user.color).join(),
                      recipient: foundSenior.boxId
                    })
                  );
                })
              });
            }
          })
        });
      })
    }
    // send response from senior to clients
    if (user.type == 'senior') {
      ws.clients.forEach(function(client) {
        client.send(
          JSON.stringify({
            color: hexRgb(message.color),
            recipient: message.recipient
          })
        );
      })
    }
  });
}