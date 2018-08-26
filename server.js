let express = require('express');
let server = express();
let cors = require('cors');
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


server.use(cors({origin: '*'}));
server.use(bodyParser.json());
// Listen to port 8080
server.listen(8081);

// Connect to the database
db.connect((err) => {
	if(err){
		console.log("Could not connect to database");
		console.log(err.toString());
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
	let task = {description: req.body.desc};
	

	// Query to insert into the db
	db.query('INSERT INTO todo SET ?', task, (err, rows) => {
		let body;

		// If there is an error, return with a bad request status code
		if(err){

			res.status(400)
			body = {
				code: 400,
				description: "Bad Request"
			}

			res.send(body);

			console.log(err);
		}

		db.query('SELECT * FROM todo;', (err, rows) => {
			if(err){
				res.status(400);
				body = {
					code: 400,
					description: "Bad Request"
				}

				res.send(body);

				console.log(err);
			}else{
				res.status(200);

				body = rows;
				res.send(body);
			}
		});
	});

});

// DELETE items
server.delete('/api/v1/items', function(req, res){
	let id = req.body.id;

	db.query('DELETE FROM todo WHERE id = ?', id, (err, rows) => {
		if(err){
			res.status(400);
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

server.put('/api/v1/items/complete', function(req, res){
	let id = req.body.id;

	db.query('UPDATE todo SET completed=1 WHERE id = ?', id, (err, rows) => {
		if(err){
			console.log(err);
			res.status(400);
			res.send({
				code: 400,
				description: "Bad Request"
			});

			return;
		}

		res.send({
			code: 200,
			description: "Item updated"
		});
	});
});