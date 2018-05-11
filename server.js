const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const person_routes = require('./routes/person_routes')
const ApiError = require('./model/ApiError')
let app = express()

var config = require('./config/config');
const db = require('./config/db.improved')

app.set('PORT', config.webPort);
app.set('SECRET_KEY', config.secretkey);

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//
app.all('*', function(req, res, next){
    console.log( req.method + " " + req.url);
    next();
});

// Middleware statische bestanden (HTML, CSS, images)
app.use(express.static(__dirname + '/public'));

app.use('/apiv1', person_routes);
app.use('/apiv2', require('./controllers/status'));
app.use('/apiv3', require('./routes/routes_apiv3'));

// Demo route handler - print logregel voor alle /api* endpoints.
app.use('/api*', function (req, resp, next) {
    console.log('/api aangeroepen');
    next();
});

// Wanneer we hier komen bestond de gevraagde endpoint niet
app.use('*', function (req, res, next) {
	console.log('De endpoint die je zocht bestaat niet')
	next("Deze endpoint bestaat niet")
})

// catch-all error handler volgens Express documentatie
// http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	console.log('Catch-all error handler was called.')
	console.log(err.toString())

	const error = new ApiError(err.toString(), 404)

	res.status(404).json(error).end()	
})

const port = process.env.PORT || config.webPort

app.listen(port, () => {
	console.log('De server draait op port ' + port)
})

module.exports = app