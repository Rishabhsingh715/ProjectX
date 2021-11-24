var express = require('express');
var port = 8000;

const app = express();

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');

//middleware     
app.use(express.urlencoded());

app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log('error in running the server on the port:',port);
        }
    console.log(`Server is running on port ${port}`);
});