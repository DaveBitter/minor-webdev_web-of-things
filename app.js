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

const server = http.createServer(app);
const wss = new WebSocket.Server({server})

const port = process.env.PORT || 3000;

/* MONGODB CONFIGURATION
----------------------------------------- */
const MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const dbConfig = process.env.MONGODB_URI;

MongoClient.connect(dbConfig, (err, database) => {
  if (err) return console.log(err)
  db = database
});

wss.on('connection', test);

function test() {
  console.log('test')
}

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
app.use(bodyParser.urlencoded({extended: true}));

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
	.use('/islands', islandsRouter)
	.listen(port, () => {
		console.log('Started server on http://localhost:' + port)
	})