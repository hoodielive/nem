// Express of Course
const express = require('express');

// Express Handlebars
const exphbs = require('express-handlebars'); 

// Mongoose 
const mongoose = require('mongoose'); 

// App 
const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise; 

// Connect to mongoose 
mongoose.connect('mongodb://localhost/vidjot-dev', {
	useMongoClient: true
}) 

  .then(() => console.log('MongoDB connected...')) 
  .catch(err => console.log(err)); 


// Handlebars Middleware 
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars'); 

// How middleware works 

app.use(function(req, res, next) {
	console.log(Date.now()); 
	req.name = 'Larry'; 
	next(); 
}); 

// Index Route 
const title = 'Welcome'
app.get('/', (req, res) => {
	res.render('index',  { 
		title: title
	}); 
}); 

// About
app.get('/about', (req, res) => {
    res.render('about'); 
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);

});
