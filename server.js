const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const person_routes = require('./routes/person_routes')
const ApiError = require('./model/ApiError')

const port = process.env.PORT || 3000

let app = express()

// bodyParser parses the body from a request
app.use(bodyParser.json())

// Instal Morgan as logger
app.use(morgan('dev'))

// Demo - preprocessing catch-all endpoint continue to next.
app.use('*', function(req, res, next){
	next()
})

// Regular endpoints
app.use('/api', person_routes)

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
	// console.log('Non-existing endpoint')
	const error = new ApiError("Deze endpoint bestaat niet", 404)
	next(error)
})

// Catch-all error handler according to Express documentation
// err should always be an ApiError! 
// http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	// console.log('Catch-all error handler was called.')

	// Optionally we could check the type of error we get, and take appropriate action.
	if (err instanceof require('assert').AssertionError) {
		// An AssertionError has no err.code, so we add it ourselves.
		// This should never happen when we throw valid ApiErrors.
		console.log('AssertionError: ' + err)
		err.code = 500
	} else if (err instanceof ApiError) {
		console.log('ApiError: ' + err)
	} else {
		console.log('Other Error: ' + err)
	}

	res.status(err.code).json(err).end()	
})

app.listen(port, () => {
	console.log('Server running on port ' + port)
})

module.exports = app