const router = require('express').Router();
const adminAuth = require('../controllers/adminAuth');



router.get("/connect", adminAuth.getAdminPageconnect)
router.post("/inscriptionn", adminAuth.inscription)
router.post("/connect", adminAuth.connect)
router.post("/deconnect", adminAuth.deconnect)


module.exports = router;