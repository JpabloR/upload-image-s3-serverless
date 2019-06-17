const express = require('express');
const imageUploadRoutes = require('../routes/route');
const statusRoutes = require('../routes/status-router');
const proxyRoutes = require('../routes/proxy-router')
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', imageUploadRoutes);
app.use('/status',statusRoutes);
app.use('/proxy/v1', proxyRoutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT , function() {
    console.log('App is running!');
});