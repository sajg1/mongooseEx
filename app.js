var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model.js');
var port = 8080;

var db = 'mongodb://localhost/example';

mongoose.connect(db);

app.get("/", function(req,res) {
  res.send("happy to be here");
});

app.get("/books", function(req,res) {
  console.log("getting all the books");
  Book.find({

  })
  .exec(function(err,books){
    if(err) {
      res.send('error has occured')
    } else {
      console.log(books);
      res.json(books);
    }
  })
});

app.get("/books/:id", function(req,res) {
  console.log("getting one book");
  Book.findOne({
    // using body-parser below to get id
    _id:req.params.id
  })
  .exec(function(err, book){
    if(err){
      res.send("error occured")
    } else {
      console.log(book);
      res.json(book);
    }
  })
})


app.listen(port, function() {
  console.log('app listening on port ' + port);
});
