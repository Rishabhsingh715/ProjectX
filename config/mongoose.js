// Two lines are just to connect the mongoose to the database. We are going 
//to import this file into the index.js thus making mongoose connect to the database.

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/projectx_db');


// these 3 lines are just to check the connection, no impact even if we comment them.
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open', function(){
    console.log('successfully connected to the database.!!');
});          