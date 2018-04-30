//
// Authentication routes
//
const routes = require('express').Router();
const AuthController = require('../controllers/authentication.controller')

// The router endpoints that we provide
routes.post('/login', AuthController.login)
routes.post('/register', AuthController.register)

module.exports = routes

// //
// // Catch all except login
// //
// router.all(new RegExp("[^(\/login)]"), function (req, res, next) {

// });


// //
// // Login with {"username":"<username>", "password":"<password>"}
// //
// router.route('/login')

//     .post(function (req, res) {

//         console.log('/login called')
//         console.dir(req.body)
//         //
//         // Get body params or ''
//         //
//         var username = req.body.username || '';
//         var password = req.body.password || '';

//         //
//         // Check in datasource for user & password combo.
//         //
//         result = users.filter(function (user) {
//             if (user.username === username && user.password === password) {
//                 return (user);
//             }
//         });

//         // Debug
//         console.log("result: " + JSON.stringify(result[0]));

//         // Generate JWT
//         if (result[0]) {
//             res.status(200).json({ "token": auth.encodeToken(username), "username": username });
//         } else {
//             res.status(401).json({ "error": "Invalid credentials, bye" })
//         }

//     });


// module.exports = router;