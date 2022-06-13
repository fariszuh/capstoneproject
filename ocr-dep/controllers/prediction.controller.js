const tf = require('@tensorflow/tfjs-node');
const jimp = require('jimp');
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');
const stream = require('stream');
const storage = new Storage();
const bucket = storage.bucket('atomic-wall-352504.appspot.com');
const blob = myBucket.file('image.png');

exports.makePredictions = async (req, res, next) => {
    try {
        const uploadblob = (url, callback) => {
            request.head(url, (err, res, body) => {
              request(url)
                .pipe(blob.createWriteStream())
                .on('close', callback)
            })
          }
        const loadModel = async (img) => {
            const output = {};
            const model = await tf.loadLayersModel('https://storage.googleapis.com/atomic-wall-352504.appspot.com/models.json');
            const temp = model.predict(img);
            output.predictions = temp.arraySync();
            res.statusCode = 200;
            res.json(output);
        }
        
        const buffer = await jimp.read(publicUrl);
        var buffers;
        buffer.greyscale().getBuffer(jimp.MIME_PNG, (err, buff) => {
            buffers = buff;
        });

        var imagee = tf.node.decodeImage(buffers, 1);
        imagee = imagee.toFloat().div(255);
        imagee = tf.image.resizeBilinear(imagee, [32, 32]);
        imagee = imagee.expandDims();
        await loadModel(imagee);
    } catch (error) {
        console.log(error)
    }
};