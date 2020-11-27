const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/auth');

const UserController = require('../controllers/user');

router.get(
	'/',
	checkAuth.check_token,
	checkAuth.check_role(checkAuth.ROLE.ADMIN),
	UserController.user_get_all
);

router.post('/signup', UserController.user_signup);

router.post('/adminsignup', UserController.user_signup_admin);

router.post('/login', UserController.user_login);

router.delete('/:userId', checkAuth.check_token, UserController.user_delete);

router.patch('/:userId', checkAuth.check_token, UserController.user_update);

module.exports = router;
