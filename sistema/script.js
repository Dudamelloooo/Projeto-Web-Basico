let linhaEditada = null;

document.addEventListener('DOMContentLoaded', () => {
    ['tabela-profissionais', 'tabela-empresas', 'tabela-embaixadoras'].forEach(tabelaId => 
        carregarDadosSalvos(tabelaId)
    );
});

// HANDLE CADASTRO
function handleCadastro(event, tabelaId) {
    event.preventDefault();
    const form = event.target;
    const valores = Array.from(form.querySelectorAll('input')).map(input => input.value);

    switch (linhaEditada ? 'atualizar' : 'adicionar') {
        case 'atualizar':
            atualizarLinha(linhaEditada, valores);
            linhaEditada = null;
            break;
        case 'adicionar':
            adicionarLinha(tabelaId, valores);
            break;
    }

    salvarDados(tabelaId);
    form.reset();
}

// ADD LINHA
function adicionarLinha(tabelaId, valores) {
    const tabela = document.getElementById(tabelaId).querySelector('tbody');

    switch (tabela.rows.length) {
        case 1:
            if (tabela.rows[0].cells.length === 1) {
                tabela.deleteRow(0);
            }
            break;
    }

    const novaLinha = tabela.insertRow();
    valores.forEach(valor => {
        const celula = novaLinha.insertCell();
        celula.innerText = valor;
    });

    const celulaAcao = novaLinha.insertCell();
    const botaoEditar = criarBotao('Editar', () => preencherFormulario(novaLinha, tabelaId));
    const botaoDeletar = criarBotao('Excluir', () => {
        excluirLinha(novaLinha, tabela);
        salvarDados(tabelaId);
    });

    celulaAcao.appendChild(botaoEditar);
    celulaAcao.appendChild(botaoDeletar);
}

// CRIA BOTÃO
function criarBotao(texto, acao) {
    const botao = document.createElement('a');
    botao.href = '#';
    botao.innerText = texto;
    botao.style.marginRight = '10px';
    botao.addEventListener('click', (event) => {
        event.preventDefault();
        acao();
    });
    return botao;
}

// PREENCHER FORMULÁRIO
function preencherFormulario(linha, tabelaId) {
    linhaEditada = linha;
    const formId = getFormIdByTabela(tabelaId);
    const inputs = document.querySelector(`#${formId}`).querySelectorAll('input');

    Array.from(linha.cells).slice(0, -1).forEach((celula, index) => {
        inputs[index].value = celula.innerText;
    });
}

// ATUALIZAR LINHA
function atualizarLinha(linha, valores) {
    valores.forEach((valor, index) => {
        linha.cells[index].innerText = valor;
    });
}

// TIRA LINHA
function excluirLinha(linha, tabela) {
    tabela.deleteRow(linha.rowIndex - 1);

    switch (tabela.rows.length) {
        case 0:
            const novaLinha = tabela.insertRow();
            const celula = novaLinha.insertCell(0);
            celula.colSpan = linha.cells.length;
            celula.innerText = 'Nenhum registro encontrado';
            break;
    }
}

// IDENTIFICAR FORMULÁRIO
function getFormIdByTabela(tabelaId) {
    switch (tabelaId) {
        case 'tabela-profissionais':
            return 'form-produto';
        case 'tabela-empresas':
            return 'form-empresas';
        case 'tabela-embaixadoras':
            return 'form-embaixadoras';
        default:
            return '';
    }
}

// SALVAR DADOS
function salvarDados(tabelaId) {
    const tabela = document.getElementById(tabelaId).querySelector('tbody');
    const dados = Array.from(tabela.rows).map(row =>
        Array.from(row.cells).slice(0, -1).map(cell => cell.innerText)
    );
    localStorage.setItem(tabelaId, JSON.stringify(dados));
}

// CARREGAR DADOS
function carregarDadosSalvos(tabelaId) {
    const dados = JSON.parse(localStorage.getItem(tabelaId)) || [];
    dados.forEach(valores => adicionarLinha(tabelaId, valores));
}
