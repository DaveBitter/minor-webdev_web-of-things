const express = require('express')
const router = express.Router()

router.get('/', function(req, res) {
	if (req.session.login) {
		const userCollection = db.collection('users')
		userCollection.find({}, {}).toArray(function(err, users) {
			res.locals.data = req.session.data;
			res.locals.users = users

			res.render('islands/index')
		});
	} else {
		res.redirect('/account/login')
	}
})

router.post('/create', function(req, res) {
	const islandCollection = db.collection('islands')
	const name = req.body.name
	const description = req.body.description
	const users = req.body.users

	const islandData = {
		name: name,
		description: description,
		users: users
	}
	islandCollection.save(islandData, (err, result) => {
		if (err) return console.log(err)
		res.redirect('/')
	})
})

module.exports = router