// Obtém referências aos elementos do DOM para a entrada de pesquisa e os resultados
const searchInput = document.getElementById('search-input'); // Campo de entrada de pesquisa
const resultArtist = document.getElementById("result-artist"); // Seção que exibe os artistas encontrados
const resultPlaylist = document.getElementById('result-playlists'); // Seção que exibe playlists

// Função para fazer uma requisição à API local com base no termo de pesquisa
function requestApi(searchTerm) {
    // Monta a URL da requisição para buscar artistas cujo nome contenha o termo digitado
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    
    // Faz uma requisição HTTP para a API local
    fetch(url)
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((result) => displayResults(result)); // Chama a função para exibir os resultados
}

// Função para exibir os resultados da busca na interface
function displayResults(result) {
    // Oculta a seção de playlists ao exibir os artistas
    resultPlaylist.classList.add("hidden");

    // Obtém referências aos elementos que exibirão as informações do artista
    const artistName = document.getElementById('artist-name'); // Nome do artista
    const artistImage = document.getElementById('artist-img'); // Imagem do artista

    // Itera sobre os resultados e atualiza os elementos do DOM com os dados do artista encontrado
    result.forEach(element => {
        artistName.innerText = element.name; // Define o nome do artista
        artistImage.src = element.urlImg; // Define a imagem do artista
    });

    // Exibe a seção de resultados de artistas
    resultArtist.classList.remove('hidden');
}

// Adiciona um ouvinte de eventos para detectar quando o usuário digita no campo de pesquisa
document.addEventListener('input', function () {  
    const searchTerm = searchInput.value.toLowerCase(); // Obtém e converte o termo de pesquisa para minúsculas

    // Se o campo de pesquisa estiver vazio, oculta os resultados de playlists e exibe os artistas
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return;
    }
    
    // Chama a função para buscar os dados com base no termo digitado
    requestApi(searchTerm);
});
