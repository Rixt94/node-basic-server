//
// Authentication controller
//
const assert = require('assert')
const ApiError = require('../model/ApiError')
const Person = require('../model/Person')
const List = require('../model/List')
const auth = require('../util/auth/authentication')
const bcrypt = require('bcryptjs');

// Initialize the personlist 
let personlist = new List()

module.exports = {

    /**
     * Authenticate the incoming request by validating the JWT token. 
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res None. The request is passed on for further processing.
     * @param {*} next ApiError when token is invalid, or req containing logged-in user.
     */
    validateToken(req, res, next) {
        console.log('validateToken called')

        const token = (req.header('Authorization')) || '';

        auth.decodeToken(token, (err, payload) => {
            if (err) {
                console.log('Error handler: ' + err.message);
                const error = new ApiError(err.message, 401)
                next(error)
            } else {
                conslole.log('authenticated, payload = ')
                console.dir(payload)
                console.log('ADD USER TO REQ HERE!')
                next();
            }
        });
    },

    /**
     * Log a user in by validating the email and password in the request.
     * Email is supposed to be more unique than a username, so we use that for identification.
     * When the email/password combination is valid a token is returned to the client. 
     * The token provides access to the protected endpoints in subsequent requests, as long 
     * as it is valid and not expired.
     * 
     * Security issue: the password is probably typed-in by the client and sent as 
     * plain text. Anyone listening on the network could read the password. The 
     * connection should therefore be secured and encrypted.
     * 
     * @param {*} req The incoming request, should contain valid JWT token in headers.
     * @param {*} res The token, additional user information, and status 200 when valid.
     * @param {*} next ApiError when token is invalid.
     */
    login(req, res, next) {

        // Verify that we receive the expected input
        try {
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 422)
            next(error)
            return
        }

        // Verify that the email exists and that the password matches the email.
        personlist.getByEmail(req.body.email, (err, result) => {
            console.log(result)
            if(err) {
                // Email does not exist
                console.log(err)
                next(new ApiError('Invalid credentials, bye.', 401))
            } else if (bcrypt.compareSync(req.body.password.trim(), result.password)) {
                console.log('passwords match')
                const userinfo = { 
                    token: auth.encodeToken(req.body.email), 
                    email: req.body.email 
                }
                res.status(200).json(userinfo).end()
            } else {
                // Password did not match
                console.log('passwords DID NOT match')
                next(new ApiError('Invalid credentials, bye.', 401))
            }
        })
    },
    
    /**
     * Register a new user. The user should provide a firstname, lastname, emailaddress and 
     * password. The emailaddress should be unique; when it exists, an error must be thrown.
     * The password will be encrypted by the Person class and must never be stored as plain text! 
     * 
     * @param {*} req The incoming request, containing valid properties.
     * @param {*} res The created user on success, or error on invalid properties.
     * @param {*} next ApiError when supplied properties are invalid.
     */
    register(req, res, next) {

        try {
            assert(typeof (req.body.firstname) === 'string', 'firstname must be a string.')
            assert(typeof (req.body.lastname) === 'string', 'lastname must be a string.')
            assert(typeof (req.body.email) === 'string', 'email must be a string.')
            assert(typeof (req.body.password) === 'string', 'password must be a string.')
        }
        catch (ex) {
            const error = new ApiError(ex.toString(), 412)
            next(error)
            return
        }

        const person = new Person(
            req.body.firstname, 
            req.body.lastname,
            req.body.email,
            req.body.password,
        )
        
        personlist.add(person, (err, result) => {
            if(err) {
                // Duplicate email found
                const error = new ApiError(err, 412)
                next(error)
            } else {
                // Unique email; person was added to the list.
                // Options: 
                // - return status OK, user must issue separate login request
                // - return valid token, user is immediately logged in.

                const userinfo = {
                    token: auth.encodeToken(req.body.email),
                    email: req.body.email
                }
                res.status(200).json(userinfo).end();            }
        })
    }

}
