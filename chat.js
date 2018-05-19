console.log("<-------------- Chat App -------------->");


// require('./lib/config/dbConfig');

const express = require("express");
const chatRoute = require("./lib/chatRoute");
const app = express();

app.use(express.static('public'));

var server = app.listen(3000, () => { console.log('server is running on 3000') });


chatRoute.listen(server);


