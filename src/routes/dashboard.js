let express = require("express");
let router = express.Router();

let dashboardController = require("../controllers/dashboardController");

// Devolve os números e gráficos da dashboard do usuário.
router.get("/dados/:idUsuario", function (req, res) {
    dashboardController.buscarDados(req, res);
});

module.exports = router;
