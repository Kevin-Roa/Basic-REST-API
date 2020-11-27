const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/auth');

const OrdersController = require('../controllers/orders');

// Handle incoming GET requests to /orders
router.get('/', checkAuth.check_token, OrdersController.orders_get_all);

router.get(
	'/:orderId',
	checkAuth.check_token,
	OrdersController.orders_get_order
);

router.post('/', checkAuth.check_token, OrdersController.orders_create_order);

router.delete(
	'/:orderId',
	checkAuth.check_token,
	OrdersController.orders_delete_order
);

module.exports = router;
