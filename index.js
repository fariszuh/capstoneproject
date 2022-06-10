const express = require('express');
const tf = require('@tensorflow/tfjs-node')

const ports = process.env.PORT | 8080;

async function run(){
    const model = await tf.loadLayersModel('https://jsonkeeper.com/b/375B');
    const app = express();

    app.use(express.json);

    app.post('/prediction', (req, res) => {
        model.classify([req.body.sentence]).then((predictions) =>{
            res.json({
                predictions,
            });
        });
    });

    app.listen(ports, () => {
        console.log(`Server Listening on Port ${ports}`)
    });
}

run();