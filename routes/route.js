const express = require('express');
const publicIp = require('public-ip');
const router = express.Router();

const upload = require('../services/upload-service');

router.post('/image-upload', function(req, res) {
    console.log('Get image');

    upload.uploadImage(req.body.url, req.body.entity_urn , function(err, resp) {
        if (err) {
            console.log('Error on image upload');
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        //if(req.file){
            (async () => {
                return res.send(await publicIp.v4());
            })();
        //}

        //return res.status(500).send("image not processed");
    });
});

router.get('/alive', function(req, res){
    res.send('200 ok');
});

module.exports = router;