const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
	// Search DB for email to see if it already exists
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			// If email exists return error
			if (user.length >= 1) {
				return res.status(409).json({ message: 'Email already in use' });
			} else {
				// Create hash for encrypted password
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return response.status(500).json({
							error: err
						});
					} else {
						// Create user if successfully created password hash
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash
						});
						user
							.save()
							.then((result) => {
								console.log(result);
								res.status(201).json({ message: 'User Created' });
							})
							.catch((err) => {
								console.log(err);
								res.status(500).json({ error: err });
							});
					}
				});
			}
		});
});

router.delete('/:userId', (req, res, next) => {
	User.remove({ _id: req.params.userId })
		.exec()
		.then((result) => {
			result.status(200).json({
				message: 'User deleted'
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
});

module.exports = router;
