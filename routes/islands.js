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

module.exports = router