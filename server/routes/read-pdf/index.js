const express = require('express');
const readPDF = require('../../utils').readPDF;

const multer  = require('multer');
const upload = multer({});

const router = express.Router();

router.post('/read-pdf', upload.any(), (req, res) => {
	
    (async function readPdfIIFE(req, res) {
		let buffer;
		let text;
		let allPDFinput = [];
		for (let i = 0; i < req.files.length; i++ ) {
			buffer = req.files[i].buffer;
			text = await readPDF(buffer);
			allPDFinput.push(text)
		}
		res.status(200).json({ PDFtext: allPDFinput});
	})(req, res)
	
});

module.exports = router;