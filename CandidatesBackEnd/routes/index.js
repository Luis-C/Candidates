var express = require('express');
var router = express.Router();
const _app_folder = 'dist/Candidates';

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("getting /");
  res.status(200).sendFile(`/`, {root: _app_folder})
});

module.exports = router;
