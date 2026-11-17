let express = require("express");
let router = express.Router();

// Quando alguém acessa a raiz, redireciona para a página inicial.
router.get("/", function (req, res) {
    res.redirect("/html/index.html");
});

// Páginas soltas na raiz (ex.: /index.html, /dashboard.html) vão para /html/.
router.get("/:pagina.html", function (req, res) {
    res.redirect(301, "/html/" + req.params.pagina + ".html");
});

module.exports = router;
