const express = require('express');
const app = express();
app.listen(process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/api/urlScrape', require('./api/v1/'))
console.log('Application running')
module.exports = app;
