const mongoose = require('mongoose');
const multer = require('multer');

const Attachment = require('../../../models/attachment');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
    const fileType = file.mimetype.split('/')[1];
		cb(null, `${file.fieldname}-${Date.now()}.${fileType}`);
	}
});

const fileFilter = (req, file, cb) => {
	const filetypes = /png|jpg|jpeg|gif/;
	const mimetype = filetypes.test(file.mimetype);
	if (mimetype) {
		cb(null, true);
	} else {
		//reject a file
		cb(
			new Error(
				"File upload only supports the following filetypes - "
				+ filetypes
			), false);
	}
};

exports.upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5 //up to 5 megabytes
	},
	fileFilter: fileFilter
});

exports.savePhoto = (req, res, next) => {
  console.log('here: ', req.file)
  const file = new Attachment({
    _id: new mongoose.Types.ObjectId(),
		title: req.file.originalname,
		fileUrl: req.file.path,
  });
  file
    .save()
    .then((file) => {
      res.status(200).json({
        message: 'File has been successfully uploaded.',
        file,
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

exports.getAttachmentById = (req, res, next) => {
  Attachment.findById(req.params.id)
		.exec()
		.then(data => {
			res.status(200).json({
        data,
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
};