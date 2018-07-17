let express = require('express');
let server = express();
let bodyParser = require('body-parser');
let sql = require('mysql');
let fs = require('fs');

// read the parameters for the database from an external file syncronously
let dbparam = fs.readFileSync('./.serverconfig', 'utf8').toString().split(',');

// create the db connection
let db = sql.createConnection({
	host: dbparam[0],
	user: dbparam[1],
	password: dbparam[2],
	database: dbparam[3]
});



server.use(bodyParser.json());
// Listen to port 8080
server.listen(8080);

// Connect to the database
db.connect((err) => {
	if(err){
		console.log("Could not connect to database");
		return;
	}

	console.log("DB Connected");
});

// Home route
server.get('/', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('Hello');
	res.end();
});

// GET items
server.get('/api/v1/items', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	
	// Query to retrieve items from the db
	db.query('SELECT * FROM todo;', (err, rows) => {

		// If there is an error, return with a bad request status code
		if (err){
			res.status(400);
			res.send({
				code: 400,
				description: "Bad Request"
			});

			return;
		}

		res.send(rows);

	});

});

// POST items
server.post('/api/v1/items', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	let task = {description: req.body.desc};
	

	// Query to insert into the db
	db.query('INSERT INTO todo SET ?', task, (err, rows) => {

		// If there is an error, return with a bad request status code
		if(err){
			res.status(400)
			res.send({
				code: 400,
				description: "Bad Request"
			});

			return;
		}
		res.status(204);
		res.send(task);
	});

});

// DELETE items
server.delete('/api/v1/items', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	let id = req.body.id;

	db.query('DELETE FROM todo WHERE id = ?', id, (err, rows) => {
		if(err){
			res.status(400)
			res.send({
				code: 400,
				description: "Bad Request"
			});

			return;
		}

		res.send({
			code: 200,
			description: "Deleted"
		});
	});
});