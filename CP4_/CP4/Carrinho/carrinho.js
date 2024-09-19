// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    let produtoExistente = carrinho.find(produto => produto.id === id);
    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;  // Atualiza a quantidade se já existir
    } else {
        carrinho.push({ id, nome, valor, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();  // Atualiza a exibição do carrinho
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    carrinho = carrinho.filter(produto => produto.id !== id);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();  // Atualiza a exibição do carrinho
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    if (carrinho.length > 0) {
        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.innerHTML = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${(produto.valor * produto.quantidade).toFixed(2)} 
            <button onclick="removerProduto(${produto.id})">Remover</button>`;
            listaProdutos.appendChild(li);
        });
    } else {
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

// Função para adicionar produto ao carrinho por formulário
function adicionarProdutoForm() {
    const id = parseInt(document.getElementById('id-produto').value);
    const nome = document.getElementById('nome-produto').value;
    const quantidade = parseInt(document.getElementById('quantidade-produto').value);

    adicionarProduto(id, nome, valor, quantidade);
}

// Inicialização da aplicação
exibirCarrinho();
