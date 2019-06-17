const express = require('express');
const sharp = require('sharp');
const requestImageSize = require('request-image-size');
const request = require('request');
const router = express.Router();

/**
 * Image proxy endpoint
 */
router.get('/secure', (req, res) => {
    let imageUrl = req.query.url;
    //logger('info', 'Doing image to secure: ' + imageUrl);
    request(imageUrl).pipe(res);

});
router.get('/', (req, res) => {
    let imageUrl = req.query.url;
    //logger('info', 'Doing image to secure: ' + imageUrl);
    request(imageUrl).pipe(res);

});

/**
 * Image proxy endpoint
 */
router.get('/resize', (req, res) => {

    let imageUrl = req.query.url;
    //logger('info', 'Resizing image: ' + imageUrl);

    let imageSize ;
    requestImageSize(imageUrl)
        .then(size => {
            imageSize = size;
            imageSize.imageUrl = imageUrl;
            //logger('info', imageSize);
            res.set({'Content-Type':'image/' + imageSize.type});
            request(imageUrl).pipe(computeExtent(imageSize.width, imageSize.height)).pipe(res);
            //logger('info', 'Success resize image: ' + imageUrl);
        })
        .catch( err => {
            res.redirect(imageUrl);
            //logger('error', 'error resizing image: ' + imageUrl + 'with error: ' + err);
        });

});

function computeExtent(width, height) {
    const MESSENGER_WIDTH_RATIO = 1.91;
    let newWidth = width;
    let newHeight = height;
    let imageProcessor;
    let div = width / height;
    if(div < MESSENGER_WIDTH_RATIO){
        newWidth = height*MESSENGER_WIDTH_RATIO;
        const extension = Math.abs(parseInt((newWidth-width)/2));
        imageProcessor = sharp()
            .background('white')
            .extend({left:extension, right:extension, top:0, bottom:0});
    } else if(div > MESSENGER_WIDTH_RATIO){
        newHeight = width/1.90;
        const extension = Math.abs(parseInt((newHeight-height)/2));
        imageProcessor = sharp()
            .background('white')
            .extend({left:0, right:0, top:extension, bottom:extension});
    } else {
        imageProcessor = sharp()
            .background('white')
            .extend({left:0, right:0, top:0, bottom:0});
    }
    return imageProcessor;
}

module.exports = router;