const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

const ports = 8080;

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.status(200).send("Hello!").end();
});

const predictRouter = require('./routes/prediction.route');

app.use('/prediction', predictRouter);

app.listen(ports, () => {
    console.log(`Server Listening on Port ${ports}`);
});

module.exports = app;