require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { ROLE } = require('../models/role');
const user = require('../models/user');

exports.user_get_all = (req, res, next) => {
	User.find()
		.select('_id email role')
		.exec()
		.then((docs) => {
			const response = {
				count: docs.length,
				users: docs.map((doc) => {
					return {
						_id: doc._id,
						email: doc.email,
						role: doc.role
					};
				})
			};
			if (docs.length >= 0) res.status(200).json(response);
			// Not a 404 because a DB can be empty.
			// Display no entries found instead of blank
			else res.status(200).json({ message: 'No entries found.' });
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.user_signup = (req, res, next) => {
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
};

exports.user_login = (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				return res.status(401).json({
					message: 'Auth failed'
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Auth failed'
					});
				}
				if (result) {
					const token = generateToken(user[0]);
					return res.status(200).json({
						message: 'Auth successful',
						token: token
					});
				}
				res.status(401).json({
					message: 'Auth failed'
				});
			});
		})
		.catch((err) => {
			res.status(500).json({
				error: err
			});
		});
};

exports.user_update = (req, res, next) => {
	const id = req.params.userId;
	const updateOps = {};
	// Create object with new values that are to be changed
	for (const ops of req.body) {
		// temporary solution for testing
		if (ops.propName !== 'role') {
			updateOps[ops.propName] = ops.value;
		} else {
			if (ops.value === 'admin') {
				updateOps['role'] = ROLE.ADMIN;
			} else {
				updateOps['role'] = ROLE.USER;
			}
		}
	}
	User.updateOne({ _id: id }, { $set: updateOps })
		.exec()
		.then((result) => {
			User.find({ _id: id })
				.exec()
				.then((user) => {
					console.log(user);
					const token = generateToken(user[0]);
					return res.status(200).json({
						message: 'Updated user',
						token: token
					});
				});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
};

exports.user_delete = (req, res, next) => {
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
};

function generateToken(user) {
	return jwt.sign(
		{
			email: user.email,
			userId: user._id,
			role: user.role
		},
		process.env.JWT_KEY,
		{
			expiresIn: '1h'
		}
	);
}
