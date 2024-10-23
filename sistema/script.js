const formProduto = document.getElementById('form-produto');
const tabela = document.getElementById('tabela').getElementsByTagName('tbody')[0];


// aqui puxa os dados do localstorage
function carregarDados() {
    const dados = JSON.parse(localStorage.getItem('produtos') || '[]');
    if (dados.length > 0) {
        tabela.innerHTML = '';
        dados.forEach(produto => {
            adicionarLinha(produto.nome, produto.servico, produto.preco, produto.email);
        });
    }
}

// aqui salva no localstorage (n temos bd)
function salvarDados() {
    const produtos = []; 
    for (let i = 0; i < tabela.rows.length; i++) {
        const row = tabela.rows[i];
        const produto = {
            nome: row.cells[0].innerText,
            servico: row.cells[1].innerText,
            preco: row.cells[2].innerText.replace('R$ ', ''),
            email: row.cells[3].innerText,
        };
        produtos.push(produto);
    }
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function adicionarLinha(nome, servico, preco, email) {
    if (tabela.rows.length === 1 && tabela.rows[0].cells.length === 1) {
        tabela.deleteRow(0);
    }
    const novaLinha = tabela.insertRow();
    const celulaNome = novaLinha.insertCell(0);
    const celulaServico = novaLinha.insertCell(1);
    const celulaPreco = novaLinha.insertCell(2);
    const celulaEmail = novaLinha.insertCell(3);
    const celulaAcao = novaLinha.insertCell(4);

    celulaNome.innerText = nome;
    celulaServico.innerText = servico;
    celulaPreco.innerText = `R$ ${parseFloat(preco).toFixed(2)}`;
    celulaEmail.innerText = email;

    const botaoDeletar = document.createElement('a');
    botaoDeletar.href = '#';
    botaoDeletar.innerText = 'Excluir';
    botaoDeletar.classList.add('delete-btn');
    botaoDeletar.addEventListener('click', (event) => {
        event.preventDefault();
        tabela.deleteRow(novaLinha.rowIndex - 1);
        salvarDados(); // Salva os dados após deletar
        if (tabela.rows.length === 0) {
            const linhaVazia = tabela.insertRow();
            const celulaVazia = linhaVazia.insertCell(0);
            celulaVazia.colSpan = 5;
            celulaVazia.innerText = 'Nenhum registro encontrado';
        }
    });

    celulaAcao.appendChild(botaoDeletar);
    salvarDados(); // Salva os dados após adicionar uma nova linha
}

formProduto.addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const servico = document.getElementById('servico').value.trim();
    const preco = document.getElementById('preco').value.trim();
    const email = document.getElementById('email').value.trim();
    if (nome && servico && preco && email) {
        adicionarLinha(nome, servico, preco, email);
        formProduto.reset();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

const logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Você foi deslogado com sucesso!');
    window.location.href = './index.html'; //arrumar aqui pra ser redirecionado pro index dnv, por algum motivo eu n to puxando corretamente kkkkkk. lembrar de fazer isso ante da entrega
});

// Carrega os dados ao iniciar
carregarDados();
