const express = require('express');
const publicIp = require('public-ip');
const router = express.Router();

const upload = require('../services/upload-service');

router.post('/image-upload', function(req, res) {
    console.log('Run /image-upload');
    console.log('Processing image: ', req.body.entity_urn);
    upload.uploadImage(req.body.url, req.body.entity_urn, function(err, resp) {
        console.log('Image were processed: ', req.body.entity_urn);
        if (err) {
            console.log('Error uploading image with urn: ', req.body.entity_urn);
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        // Return LAMBDA ip
        (async () => {
            return res.send(await publicIp.v4());
        })();
    });
});

router.post('/images-upload', function(req, res) {
    console.log('Run /images-upload');

    let arrayImages = req.body;
    console.log("ARRAY IMAGES", arrayImages.length)

    let error = "";
    let imagesProcessed = 0;
    arrayImages.forEach(image => {
        console.log("Processing image:", image.entity_urn)
        upload.uploadImage(image.url, image.entity_urn , function(err, resp) {
            imagesProcessed++;
            if (err) {
                console.log('Error uploading image with urn: ', image.entity_urn);
                error += err;
            }
            if(imagesProcessed === arrayImages.length){
                console.log("All images were processed");
                (async () => {
                    return res.send({
                        ip: await publicIp.v4(),
                        errors: error
                    })
                })();
            }
        });
    })
})

router.get('/alive', function(req, res){
    res.send('200 ok');
});

module.exports = router;