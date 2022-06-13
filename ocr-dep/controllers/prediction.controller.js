const tf = require('@tensorflow/tfjs-node');
const jimp = require('jimp');
const fs = require('fs');

exports.makePredictions = async (req, res, next) => {
    const imagePath = './images/test-image.jpg';
    try {
        const loadModel = async (img) => {
            const output = {};
            const model = await tf.loadLayersModel('https://storage.googleapis.com/atomic-wall-352504.appspot.com/models.json');
            const temp = model.predict(img);
            output.predictions = temp.arraySync();
            
            res.statusCode = 200;
            res.json(output);
        }
        const buffer = await jimp.read(imagePath);
        buffer.greyscale().write(imagePath);
        const buffers = fs.readFileSync(imagePath);
        var imagee = tf.node.decodeImage(buffers, 1);
        imagee = imagee.toFloat().div(255);
        imagee = tf.image.resizeBilinear(imagee, [32, 32]);
        imagee = imagee.expandDims();
        await loadModel(imagee);
        // delete image file
        fs.unlinkSync(imagePath, (error) => {
            if (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.log(error)
    }
};