const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// Connect to MongoDB
mongoose.connect(
	//' + process.env.MONGO_ATLAS_PW + '
	'mongodb+srv://testuser:' + process.env.MONGO_ATLAS_PW + '@test-node-api.irooh.mongodb.net/testDB?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);
mongoose.Promise = global.Promise;

// Report requests in server
app.use(morgan('dev'));

// Easily parse data via body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Add header to prevent CORS errors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});

// API Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Handle errors
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

// Handle errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;