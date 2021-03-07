
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next) => {

res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Methods','POST, GET, PUT ,DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
})

const routes = require('./routes/routes.js')(app, fs);

const server = app.listen(3001, () => {
    console.log('listening on port %s...', server.address().port);
});
