const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const uploadFile = require('../middleware/upload-file');

const ProductController = require('../controllers/products');

router.get('/', ProductController.products_get_all);

router.get('/:productId', ProductController.products_get_product);

router.post(
	'/',
	checkAuth,
	uploadFile.upload.single('productImage'),
	ProductController.products_create_product
);

router.patch(
	'/:productId',
	checkAuth,
	ProductController.products_update_product
);

router.delete(
	'/:productId',
	checkAuth,
	ProductController.products_delete_product
);

module.exports = router;
