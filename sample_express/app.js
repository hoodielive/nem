const express = require('express'); 
const app = express(); 


app.get('/', (req, res) => {
	res.send('Howdy partner'); 
}); 

const PORT = 5000; 

app.listen(PORT, () => {
	console.log("Listening on port: " + PORT) 
});  

app.listen(PORT, function() {
	console.log("Listening on port: " + PORT) 
});  
