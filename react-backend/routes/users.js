var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
 // res.send("respond with a resource");
 res.json([{
   id: 1,
   username: "steve_phan"
 },
 { id: 2,
   username: "ben_xie"}
])
});

module.exports = router;
