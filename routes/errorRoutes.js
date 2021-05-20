const router = require("express").Router(),
  errorHandler = require("../controllers/errorHandler");

router.use(errorHandler.err404, errorHandler.err500);

module.exports = router;
