const express = require('express');
const app = express();
const port = 3002;
const db = require('../database/db_config.js');
const {recentReviews} = require('../database/db_config.js');
const {helpfulReviews} = require('../database/db_config.js');
const {allReviews} = require('../database/db_config.js')
app.use(express.json({urlencoded: true}));
app.use(express.static('./dist'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/product/reviews/recent', (req, res) => {
  console.log('in server', req.query.sku);
  recentReviews(req.query.sku, (err, data) => {
    if(err) {
      console.error(error);
    } else {
      res.send(data.rows);
    }
  })
});
app.get('/product/reviews/helpful', (req, res) => {
  helpfulReviews(req.query.sku, (err, data) => {
    if(err) {
      console.error(error);
    } else {
      res.send(data.rows);
    }
  })
});
app.get('/product/reviews/all', (req, res) => {
  allReviews(req.query.sku, (err, data) => {
    if(err) {
      console.error(error);
    } else {
      res.send(data.rows);
    }
  })
});


app.listen(port, () => { console.log('Clean up on aisle ', port) });