const express = require('express');

const app = express();

const exphbs = require('express-handlebars'); 

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
