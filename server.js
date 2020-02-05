const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const http = require("http");

const app = express();

// bodyparser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Server 
const server = http.createServer(app);

// routes
app.use('/', routes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, (err) => {
    if (!err) {
        console.log('site is live');
    }
    else {
        console.log(err);
    };
});