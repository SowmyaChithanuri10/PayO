const express = require("express");

const router = express.Router();

const {markets} = require("../controllers/marketController");



router.get("/markets-dashboard", markets);



module.exports = router;