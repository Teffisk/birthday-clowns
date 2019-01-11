var db = require('../models');

db.movie.create({
	title: 'Die Hard',
	year: 1988,
	genre: 'Christmas',
	runtime: 110,
	tagline: 'Yipee Ki-yay'
})
.then(function(createdMovie){
	console.log("Successfully added "+createdMovie.title+" to the database.")
})
.catch(function(err){
	console.log("Error: "+err)
})