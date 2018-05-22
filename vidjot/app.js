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
app.get('/', (req, res) => {
		console.log(req.name); 
    res.send('INDEX')
}); 

// About
app.get('/about', (req, res) => {
    res.send('ABOUT')
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);

});
