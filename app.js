require('dotenv').config();

const express = require('express')
let bodyParser = require('body-parser')
const app = express()
const port = 3000

const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let movieSchema = new mongoose.Schema({
  title: String,
  rating: String,
  timings: [{time: Date, seats: Number}]
});

const Movie = mongoose.model('Movie', movieSchema);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/Movies', (req, res) => {

  Movie.find({}).then(doc => {res.json(doc)}).catch(err => {console.log(err)});
})

app.post('/Book', (req, res) => {
  Movie.updateOne({title: req.body.movie, "timings.time": req.body.time, "timings.seats": req.body.seats}, {$set: {"timings.$.seats": req.body.seats - req.body.bookedSeats}}).then(doc => {
    console.log(req.body.time)
    console.log(doc)
  }).catch(err => {console.log(err)});

  res.send('ok');
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
