var express = require('express');
var router = express.Router();

const {MongoClient} = require('mongodb');

const protocol = 'mongodb+srv'
const credentials = 'comp-206:comp-206'
const host = 'vue-express-mdb.ck6mp.mongodb.net'
const options = 'retryWrites=true&w=majority'
const url = `${protocol}://${credentials}@${host}?${options}`
console.log("Mongo Client URL: ", url)
const mongoClient = new MongoClient(url)

async function sendListing(response) {
  let connection = await mongoClient.connect();
  let listings = await connection.db('sample_airbnb').collection('listingsAndReviews');
  let result = await listings.findOne({});
  response.send(result);
}

async function renderListing(response) {
  let connection = await mongoClient.connect();
  let listings = await connection.db('sample_airbnb').collection('listingsAndReviews');
  let result = await listings.findOne({});
  response.render('airbnb', result);
}

// localhost:3000/airbnb/send
router.get('/send', (req, res) => {
  sendListing(res);
});

// localhost:3000/airbnb/render
router.get('/render', (req, res) => {
  renderListing(res);
});

module.exports = router;
