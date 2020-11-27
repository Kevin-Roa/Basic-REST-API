const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/auth');
const { upload } = require('../middleware/upload-file');

const ProductController = require('../controllers/products');

router.get('/', ProductController.products_get_all);

router.get('/:productId', ProductController.products_get_product);

router.post(
	'/',
	checkAuth.check_token,
	checkAuth.check_role(checkAuth.ROLE.ADMIN),
	upload.single('productImage'),
	ProductController.products_create_product
);

router.patch(
	'/:productId',
	checkAuth.check_token,
	checkAuth.check_role(checkAuth.ROLE.ADMIN),
	ProductController.products_update_product
);

router.delete(
	'/:productId',
	checkAuth.check_token,
	checkAuth.check_role(checkAuth.ROLE.ADMIN),
	ProductController.products_delete_product
);

module.exports = router;
