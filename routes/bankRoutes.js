const express = require("express");
const router = express.Router();
const bankController = require("../controllers/bankController");
const auth = require("../middleware/auth");

router.post("/add-bank", auth, bankController.addBank);
router.post("/set-tpin",auth,bankController.createTpin);
router.post("/verify-tpin", auth, bankController.verifyTpin);
router.get("/all-banks", auth,bankController.getMyBank);

module.exports = router;