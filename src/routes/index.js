let express = require("express");
let router = express.Router();

// Quando alguém acessa a raiz, redireciona para a página inicial.
router.get("/", function (req, res) {
    res.redirect("/index.html");
});

module.exports = router;
