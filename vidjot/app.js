// Express of Course
const express = require('express');

// Express Handlebars
const exphbs = require('express-handlebars'); 

// Mongoose 
const mongoose = require('mongoose'); 

// Body-Parser
const bodyParser = require('body-parser'); 

// App 
const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise; 

// Connect to mongoose 
mongoose.connect('mongodb://localhost/vidjot-dev')

  .then(() => console.log('MongoDB connected...')) 
  .catch(err => console.log(err)); 

// Load IdeaSchema model
require('./models/Idea'); 
const Idea = mongoose.model('ideas'); 

// Handlebars Middleware 
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars'); 

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json()) 

// Index Route 
const title = 'Welcome'
app.get('/', (req, res) => {
	res.render('index',  { 
		title: title
	}); 
}); 

// About Route
app.get('/about', (req, res) => {
    res.render('about'); 
});

// Idea Index Page 
app.get('/ideas', (req, res) => {
	Idea.find({})
		.sort({date: 'desc'})
		.then(ideas => {
			res.render('ideas/index', {
				ideas:ideas
			}); 
		});
}); 

// Add Idea form

app.get('/ideas/add', (req, res) => {
    res.render('ideas/add'); 
});

// Process form

app.post('/ideas', (req, res) => {
	let errors = []; 

	if (!req.body.title) {
		errors.push({text: 'Please add a title'}); 
  }
	if (!req.body.details) { 
		errors.push({text: 'Please add some data'}); 
	}

	if (errors.length > 0) {
		res.render('ideas/add', {
			errors: errors, 
			title: req.body.title,
			details: req.body.details,
		}); 
	} else {
		const newUser = {
			title: req.body.title,
			details: req.body.details, 
		}
		new Idea(newUser)
		.save()
		.then(idea => {
			res.redirect('/ideas'); 
		}) 
	} 
}); 

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);

});
