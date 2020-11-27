const jwt = require('jsonwebtoken');

const Role = require('../models/role');

function check_token(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_KEY);
		req.userData = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Auth failed' });
	}
}

function check_role(role) {
	return (req, res, next) => {
		if (req.userData.role !== role) {
			return res.status(401).json({ message: 'Auth failed' });
		}
		next();
	};
}

module.exports = { check_token, check_role, ROLE: Role.ROLE };
