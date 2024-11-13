function validateLogin() {
    const usuario = document.querySelector('#usuario').value;
    const senha = document.querySelector('#senha').value;

    if (usuario === "admin" && senha === "1234") {
        window.location.href = 'adm.html';
    } else {
        alert("Usuário ou senha incorretos!");
    }
}
document.querySelector('button').addEventListener('click', validateLogin);

// o enter q n funcionaaaaaaaaaaaaaaaaaaaaa
document.addEventListener('keypress', function(event) {
    if (event.key === "Enter") { 
        validateLogin()
    }
});