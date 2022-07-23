require('dotenv').config();

const express = require('express')
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



app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/Movies', (req, res) => {

  Movie.find({}).then(doc => {res.json(doc)}).catch(err => {console.log(err)});
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
