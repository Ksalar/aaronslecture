const mysql = require('mysql')

let db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'yelp'
})

db.connect((err)=> {
	if (err) {
		throw(err)
	} else {
		console.log('db connected')
	}
})

module.exports = {
	db : db
}