var express = require('express');
var bodyParser = require('body-parser');
var APIKey = require('./yelpAPI.js')
// var request = require('request')
var axios = require('axios');
var app = express();
var db = require('./database-sql.js').db

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

// Due to express, when you load the page, it doesnt make a get request to '/', it simply serves up the dist folder
app.get('/search', function(req, res) {
  console.log('query:', req.query)
  axios.get('https://api.yelp.com/v3/businesses/search', {
  	headers: {
  		Authorization : `Bearer ${APIKey.yelpAPI}`
  	}, 
  	params: {
  		term: req.query.term,
  		location: req.query.location
  	}
  })
  .then((response) => {
  	res.send(response.data)
  })
})

app.post('/saved', function(req, res) {
  let restaurant = req.body
  restaurant.name = restaurant.name.replace("'", "").replace('"', "").replace('\\', '')
  restaurant.categories[0].title = restaurant.categories[0].title.replace("'", "").replace('"', "").replace('\\', '')
  // restaurant.name = restaurant.name.split("'").join('').split('"').join('').split('\\').join('')
  db.query(`INSERT IGNORE INTO restaurants (name, rating, price, phone, latitude, longitude) VALUES ("${restaurant.name}", "${restaurant.rating}", "${restaurant.price}", "${restaurant.phone}", "${restaurant.coordinates.latitude}", "${restaurant.coordinates.longitude}");`, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      db.query(`INSERT IGNORE INTO categories (name) VALUES ("${restaurant.categories[0].title}");`, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          db.query(`INSERT INTO restaurant_categories (restaurant_id, category_id) VALUES ((SELECT id from restaurants WHERE name = "${restaurant.name}"), (SELECT id from categories WHERE name = "${restaurant.categories[0].title}"));`, (err, result) => {
            if (err) {
              console.log(err)
            } else {
              res.end()
            }
          })
        }
      })
    }
  })
})

app.get('/saved', function(req, res) {
  db.query('SELECT * FROM restaurants', (err, results) => {
    // console.log(results)
    res.send(results)
  })
})


app.listen(3000, function() {
  console.log('listening on port 3000!');
});