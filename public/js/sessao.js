// Confere se o usuario esta logado antes de abrir as paginas restritas.
function validarSessao() {
    let email = sessionStorage.EMAIL_USUARIO;
    let nome = sessionStorage.NOME_USUARIO;
    let id = sessionStorage.ID_USUARIO;

    // Se os três dados existem, a sessão é válida.
    if (email != null && nome != null && id != null) {
        return true;
    } else {
        // Sem sessão, manda o usuário para a tela de login.
        window.location = "login.html";
        return false;
    }
}
