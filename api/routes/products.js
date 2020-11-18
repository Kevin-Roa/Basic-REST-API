const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handle get requests to /products'
	});
});

router.post('/', (req, res, next) => {
	const product = {
		name: req.body.name,
		price: req.body.price
	}
	res.status(201).json({
		message: 'handle post request to /products',
		createdProduct: product
	});
});

router.get('/:productId', (req, res, next) => {
	const id = req.params.productId;
	if (id === 'special') {
		res.status(200).json({
			message:'wow',
			id: id
		});
	}
	else {
		res.status(200).json({
			message:'wrong'
		});
	}
});

router.patch('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'updated product'
	});
});

router.delete('/:productId', (req, res, next) => {
	res.status(200).json({
		message: 'deleted product'
	});
});

module.exports = router;