const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrenYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.use((req, res, next) => {
	var now = new Date().toString();
	log = `${now}: ${req.method} ${req.url}`;
	console.log(fs);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to log');
		}
	});
	
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Maintenance Page',
// 	});
// });

app.use(express.static(__dirname + '/public'));
	
app.get('/', (req, res) => {
	// res.send('Hello Express!!!');
	res.send({
		name: 'Triveni',
		likes: [
		'Travelling'
		]
	});
});

app.get('/about', (req, res) => {
	// res.send('Hello Express!!!');
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/home', (req, res) => {
	// res.send('Hello Express!!!');
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMsg: 'Welcome to Node Express'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'Unable to serve this request'
	})
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});