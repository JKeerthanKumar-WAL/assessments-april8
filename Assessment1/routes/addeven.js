var express = require("express");
var router = express.Router();
const testingController = require("../unittests/eventest");

router.get("/", testingController.testEven);
module.exports = router;
