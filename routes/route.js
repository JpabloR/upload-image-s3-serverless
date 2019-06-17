const express = require('express');
const router = express.Router();

const upload = require('../services/upload-service');

const singleUpload = upload.single('image');


router.post('/image-upload', function(req, res) {
    console.log('Get image');
    singleUpload(req, res, function(err) {
        if (err) {
            console.log('Error on image upload');
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        //if(req.file){
            return res.send(req.file.location);
        //}

        //return res.status(500).send("image not processed");
    });
});

module.exports = router;