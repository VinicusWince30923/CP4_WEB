// Definindo a base de dados de filmes
const listaDeFilmes = [
  { id: 0, titulo: 'Harry Potter', categoria: 'fantasia', ano: 2001 },
  { id: 1, titulo: 'Avatar', categoria: 'fantasia', ano: 2010 },
  { id: 2, titulo: 'O senhor dos Anéis', categoria: 'fantasia', ano: 2000 },
  { id: 3, titulo: 'Branquelas', categoria: 'comédia', ano: 2007 },
  { id: 4, titulo: 'A Lagoa Azul', categoria: 'romance', ano: 1983 }
];

// Inicializando o array de favoritos
let favoritosFilmes = [];

// Pegando os elementos HTML relevantes
const botaoAdicionar = document.querySelector('button');
const filmesContainer = document.querySelector('#listaFilmes');

// Função chamada ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
  obterFavoritos();
  exibirFilmes();
});

// Função para carregar filmes favoritos do localStorage
function obterFavoritos() {
  const favoritosGuardados = localStorage.getItem('favoritos');
  if (favoritosGuardados) {
    favoritosFilmes = JSON.parse(favoritosGuardados);
  }
}

// Função para atualizar a lista de filmes na interface
function exibirFilmes() {
  filmesContainer.innerHTML = ''; // Limpa a lista atual
  listaDeFilmes.forEach(filme => {
    const itemFilme = document.createElement('li');
    itemFilme.textContent = `Filme: ${filme.titulo}`;
    
    const iconeFavorito = document.createElement('img');
    iconeFavorito.src = favoritosFilmes.some(fav => fav.id === filme.id) ? 'img/heart-fill.svg' : 'img/heart.svg';
    iconeFavorito.style.cursor = 'pointer';
    
    iconeFavorito.onclick = () => alternarFavorito(filme, iconeFavorito);

    itemFilme.appendChild(iconeFavorito);
    filmesContainer.appendChild(itemFilme);
  });
}

// Evento de clique para adicionar um novo filme
botaoAdicionar.addEventListener('click', () => {
  const novoFilmeInput = document.querySelector('#filmeInput');
  const novoId = listaDeFilmes.length;
  listaDeFilmes.push({ id: novoId, titulo: novoFilmeInput.value, categoria: '', ano: '' });
  exibirFilmes();
  novoFilmeInput.value = ''; // Limpa o campo de input
});

// Função para alternar o estado de favorito
function alternarFavorito(filme, icone) {
  const imagemFavoritada = 'img/heart-fill.svg';
  const imagemNaoFavoritada = 'img/heart.svg';

  if (icone.src.includes(imagemNaoFavoritada)) {
    icone.src = imagemFavoritada;
    adicionarAosFavoritos(filme);
  } else {
    icone.src = imagemNaoFavoritada;
    removerDosFavoritos(filme.id);
  }
}

// Função para adicionar um filme aos favoritos e salvar no localStorage
function adicionarAosFavoritos(filme) {
  favoritosFilmes.push(filme);
  localStorage.setItem('favoritos', JSON.stringify(favoritosFilmes));
}

// Função para remover um filme dos favoritos e atualizar o localStorage
function removerDosFavoritos(idFilme) {
  favoritosFilmes = favoritosFilmes.filter(filme => filme.id !== idFilme);
  localStorage.setItem('favoritos', JSON.stringify(favoritosFilmes));
}
