const multer = require('multer');

// Setup file uploading/downloading
// Set file destination and name scheme
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + file.originalname);
	}
});
// 5mb file
const limits = { fileSize: 1024 * 1024 * 5 };
// Filter file types
const fileFilter = (req, file, cb) => {
	// Accept only jpeg or png files
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type.'), false);
	}
};
const upload = multer({
	storage: storage,
	limits: limits,
	fileFilter: fileFilter
});

exports.upload = upload;
