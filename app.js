var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model.js');
var port = 8080;

var db = 'mongodb://localhost/example';

mongoose.connect(db);

app.use(bodyParser.json());

// READ
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

// CREATE
app.post('/book',  function(req,res){
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save(function(err, book) {
    if(err){
      res.send("error occured")
    } else {
      console.log(book);
      res.send(book);
    }
  })
})
// This is the way to do it as described on the mongoose website of queries.
app.post("/book2", function(req,res){
  Book.create(req.body, function(err,book){
    if(err){
      res.send("error occured")
    } else {
      console.log(book);
      res.send(book);
    }
  })
})

// UPDATE

app.put('/book/:id', function(req, res) {
  Book.findOneAndUpdate({
    _id:req.params.id
    },
    { $set:
    {title: req.body.title, author: req.body.author, category: req.body.category}},
    // upsert means if the object does not already exist then to insert it
    {upsert:true},
    function(err, newBook) {
      if(err){
        res.send("error occured")
      } else {
        console.log(newBook);
        res.send(newBook);
      }
    });
});

// DELETE
app.delete('/book/:id', function(req,res){
  Book.findOneAndRemove({
    _id:req.params.id
  }, function(err,book){
      if(err) {
        res.send('error occured');
      } else {
        console.log(book);
        res.status(204);
      }
  })
})

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
