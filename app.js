var express = require('express'),
	app = express();
	
app.route('/').get(function(req, res, next) {
	res.send('<h1>Hello World!</h1>');
});

app.listen(300, function() {
	console.log('Chatcat running on port 3000');
});