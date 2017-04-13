//google calander api key AIzaSyB12EjnA2KlxqiDxHzXfmwzcz7bz8nLO4U
const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 8080;

const indexRouter = require('./routes/index.js')

app
	.set('view engine', 'ejs')
	.use(express.static('public'))
	.use('/', indexRouter)
	.listen(port, () => {
		console.log('Started server on http://localhost:' + port)
	})
