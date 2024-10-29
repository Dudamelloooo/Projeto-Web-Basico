let linhaEditada = null;

function handleCadastro(event, tabelaId) {
    event.preventDefault(); // Impede o recarregamento da página
    const form = event.target;
    const valores = Array.from(form.querySelectorAll('input')).map(input => input.value); // Extrai os valores dos inputs

    if (linhaEditada) {
        atualizarLinha(linhaEditada, valores); // Atualiza a linha se estiver em edição
        linhaEditada = null;
    } else {
        adicionarLinha(tabelaId, valores); // Adiciona nova linha na tabela correspondente
    }

    form.reset(); // Limpa o formulário
}

function adicionarLinha(tabelaId, valores) {
    const tabela = document.getElementById(tabelaId).querySelector('tbody');
    
    if (tabela.rows.length === 1 && tabela.rows[0].cells.length === 1) {
        tabela.deleteRow(0); // Remove a mensagem "Nenhum registro encontrado"
    }

    const novaLinha = tabela.insertRow(); // Cria uma nova linha
    valores.forEach(valor => {
        const celula = novaLinha.insertCell(); // Adiciona células para cada valor
        celula.innerText = valor;
    });

    const celulaAcao = novaLinha.insertCell(); // Adiciona célula para botões de ação
    const botaoEditar = criarBotao('Editar', () => preencherFormulario(novaLinha, tabelaId));
    const botaoDeletar = criarBotao('Excluir', () => excluirLinha(novaLinha, tabela));

    celulaAcao.appendChild(botaoEditar);
    celulaAcao.appendChild(botaoDeletar);
}

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

function preencherFormulario(linha, tabelaId) {
    linhaEditada = linha; // Guarda a linha em edição
    const formId = getFormIdByTabela(tabelaId); // Obtém o formulário correspondente à tabela
    const inputs = document.querySelector(`#${formId}`).querySelectorAll('input'); // Seleciona os inputs do formulário
    Array.from(linha.cells).slice(0, -1).forEach((celula, index) => {
        inputs[index].value = celula.innerText; // Preenche os inputs com os valores da linha
    });
}

function atualizarLinha(linha, valores) {
    valores.forEach((valor, index) => {
        linha.cells[index].innerText = valor; // Atualiza as células com novos valores
    });
}

function excluirLinha(linha, tabela) {
    tabela.deleteRow(linha.rowIndex - 1); // Remove a linha
    if (tabela.rows.length === 0) {
        const novaLinha = tabela.insertRow(); // Adiciona mensagem se não houver mais linhas
        const celula = novaLinha.insertCell(0);
        celula.colSpan = linha.cells.length;
        celula.innerText = 'Nenhum registro encontrado';
    }
}

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
