// Admin Route creates an instance of the Express.js framework and imports the registerAdmin and loginAdmin controller functions from the adminController module.
// It then defines a router object and registers the registerAdmin and loginAdmin functions as handlers for HTTP POST requests on the /registerAdmin and /loginAdmin routes respectively.
// Finally, it exports the router object for use in other parts of the application.

const express = require('express')
const {
    registerAdmin,
    loginAdmin
} = require('../controllers/adminController');

let router = express.Router()

router.post('/registerAdmin', registerAdmin)
router.post('/loginAdmin', loginAdmin)

module.exports = router