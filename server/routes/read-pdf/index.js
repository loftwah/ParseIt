const express = require('express');
const readPDF = require('../../utils').readPDF;

const multer  = require('multer');
const upload = multer({});

const router = express.Router();

router.post('/read-pdf', upload.any(), (req, res) => {
	
    (async function readPdfIIFE(req, res) {
		const buffer = req.files[0].buffer;
		const text = await readPDF(buffer);
		res.status(200).json({ data: text});
	})(req, res)
	
});

module.exports = router;