const serverless = require('serverless-http');
const express = require('express');
const imageUploadRoutes = require('./routes/route')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', imageUploadRoutes);

const PORT = process.env.PORT || 5050;

/*app.listen(PORT , function() {
    console.log('App is running!');
});*/
module.exports.handler = serverless(app);