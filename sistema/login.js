function validarUsuario(usuario, senha) {
    const usuarioValido = "adm";
    const senhaValida = "12345";

    return usuario === usuarioValido && senha === senhaValida;
}

document.querySelector('button').addEventListener('click', function() {
    const usuario = document.querySelector('#usuario').value;
    const senha = document.querySelector('#senha').value;

    if (validarUsuario(usuario, senha)) {
        alert('Login successful');
    } else {
        alert('Invalid username or password');
    }
});
