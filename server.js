// ===============================
// DEPENDENCIES
// ===============================
const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// ===============================
// EXPRESS CONFIG
// ===============================
const app = express();
const PORT = process.env.PORT || 3000;
// HTML directory
app.use(express.static('public'))
// Express app data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===============================
// ROUTING
// ===============================
/* require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

module.exports = function(app) {
}
 */
const postPosts = () => {
	
	axios
		.post('/api/notes')
		.then((response) => { console.log(response) })
		.catch((error) => { console.error(error) });
	
	axios
		.get("/api/notes")
		.then((response) => { console.log(response) })
		.catch((error) => { console.error(error) });

	axios
		.get("/api/notes/:id", function(req, res) {
		var id = req.params.id;
		notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))
		const updatedNotes = notes.filter(note => note.id != id);
		fs.writeFile(__dirname + '/db/db.json', updatedNotes, function (err) {
			if (err) return console.log(err);
			console.log('Removed ID '+id+' from db.json');
		});
		console.log('Return remaining notes (No ID '+id+')');
		})
		.then(({ data: { updatedNotes } }) => res.json(updatedNotes))
		.catch((error) => { console.error(error) });
	
	axios
		.get('/notes', function(req, res){
			res.sendFile('notes.html');
		})
		.catch((error) => { console.error(error) });

	axios
		.get('/', function(req, res){
			res.sendFile('index.html');
		})
		.catch((error) => { console.error(error) });

	axios
		.get("*", function(req, res) {
			res.sendFile('index.html');
		})
		.catch((error) => { console.error(error) });
}
postPosts();

// ===============================
// DATA
// ===============================
var notes = JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))

// ===============================
// FUNCTIONS & CLASSES
// ===============================
function uniqueID(){
	let uniqueArray = []
	for (let index = 0; index < notes.length; index++) {
		uniqueArray.push(notes[index].id)
	}
	let sortArray = []
	sortArray = uniqueArray.sort(function(a, b){return b-a})
	let nextID = ++sortArray[0]
	return parseInt(nextID)
}
function Note(id, title, description, order) {
	this.id = id;
	this.title = title;
	this.description = description;
	this.order = order;
}
// ===============================
// LISTENER
// ===============================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
