require('dotenv').config();

var express = require('express');
var app = express();
var test = require('./controllers/testcontroller');
var authTest = require('./controllers/authtestcontroller');

var user = require('./controllers/usercontroller');
var sequelize = require('./db');
var bodyParser = require("body-parser");
var lists = require('./controllers/listscontroller');


sequelize.sync()
app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.use('/test', test);
app.use('/wag/user', user)

app.use(require('./middleware/validate-session'));
app.use("/user/list", lists);


app.use('/authtest', authTest);

app.listen(3500, function(){
    console.log('App is listening on 3500');
})