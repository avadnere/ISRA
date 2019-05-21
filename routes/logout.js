const express = require("express");
const router = express.Router();


router.get('/logout', function (req, res) {
    res.clearCookie("authCookie");
    res.render("login", {
        title: "SSE-ISRA"
    });
});

module.exports = router;