// Seleciona elementos do formulário e tabela
const formProduto = document.getElementById('form-produto');
const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];

// Função para adicionar uma nova linha na tabela
function adicionarLinha(nome, servico, preco, email) {
    // Verifica se a tabela está vazia e remove a mensagem "Nenhum registro encontrado"
    if (tabela.rows.length === 1 && tabela.rows[0].cells.length === 1) {
        tabela.deleteRow(0);
    }

    // Cria uma nova linha
    const novaLinha = tabela.insertRow();

    // Cria as células para a linha
    const celulaNome = novaLinha.insertCell(0);
    const celulaServico = novaLinha.insertCell(1);
    const celulaPreco = novaLinha.insertCell(2);
    const celulaEmail = novaLinha.insertCell(3);
    const celulaAcao = novaLinha.insertCell(4);

    // Preenche as células com os valores do formulário
    celulaNome.innerText = nome;
    celulaServico.innerText = servico;
    celulaPreco.innerText = `R$ ${parseFloat(preco).toFixed(2)}`;
    celulaEmail.innerText = email;

    // Botão de deletar
    const botaoDeletar = document.createElement('a');
    botaoDeletar.href = '#';
    botaoDeletar.innerText = 'Excluir';
    botaoDeletar.classList.add('delete-btn');
    botaoDeletar.addEventListener('click', (event) => {
        event.preventDefault();
        tabela.deleteRow(novaLinha.rowIndex - 1);

        // Se a tabela ficar vazia, adiciona a mensagem "Nenhum registro encontrado"
        if (tabela.rows.length === 0) {
            const linhaVazia = tabela.insertRow();
            const celulaVazia = linhaVazia.insertCell(0);
            celulaVazia.colSpan = 5;
            celulaVazia.innerText = 'Nenhum registro encontrado';
        }
    });
    celulaAcao.appendChild(botaoDeletar);
}

// Evento de submit do formulário
formProduto.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Obtém os valores do formulário
    const nome = document.getElementById('nome').value.trim();
    const servico = document.getElementById('servico').value.trim();
    const preco = document.getElementById('preco').value.trim();
    const email = document.getElementById('email').value.trim();

    // Verifica se todos os campos estão preenchidos
    if (nome && servico && preco && email) {
        // Adiciona os valores na tabela
        adicionarLinha(nome, servico, preco, email);

        // Limpa o formulário
        formProduto.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Evento para logout
const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Você foi deslogado com sucesso!');
    window.location.href = './index.html';
});