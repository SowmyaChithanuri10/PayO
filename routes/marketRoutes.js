const express = require("express");

const router = express.Router();

const {markets, singlePrice} = require("../controllers/marketController");



router.get("/markets-dashboard", markets);
router.get("/price/:symbol", singlePrice);



module.exports = router;