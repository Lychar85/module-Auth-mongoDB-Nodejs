const router = require('express').Router();
const homeController = require('../controllers/homeController')

// GET - Index Page
router.get("/", homeController.getHome)

module.exports = router;