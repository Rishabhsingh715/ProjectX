var express = require('express');
var port = 8000;

const app = express();

app.get('/',function(req, res){
    console.log('gotcha');

    return res.end('Gotcha');
});

app.listen(port,function(err){
    if(err){
        console.log('error in running the server on the port:',port);
        }
    console.log(`Server is running on port ${port}`);
});