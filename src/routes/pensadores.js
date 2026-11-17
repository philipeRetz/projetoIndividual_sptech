let express = require("express");
let router = express.Router();

let pensadorController = require("../controllers/pensadorController");

// Rota que devolve a lista de pensadores.
router.get("/listar", function (req, res) {
    pensadorController.listar(req, res);
});

module.exports = router;
