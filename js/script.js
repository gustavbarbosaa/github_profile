const pesquisaBtn = document.getElementById('pesquisa-btn');
const inputPesquisa = document.getElementById('pesquisa-input');
const perfilDiv = document.getElementById('perfil');
const erroDiv = document.getElementById('erro');
const loadingDiv = document.getElementById('loading');

async function getInfoPerfilGitHub(nomeUsuario) {
  try {
    loadingDiv.classList.remove('oculto');
    perfilDiv.classList.add('oculto');
    erroDiv.classList.add('oculto');

    const response = await fetch(`https://api.github.com/users/${nomeUsuario}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Usuário não encontrado!');
      }

      throw new Error('Erro ao buscar usuário!');
    }

    const usuario = await response.json();
    showPerfil(usuario);
  } catch (error) {
    showError(error.message);
  } finally {
    loadingDiv.classList.add('oculto');
  }
}

function showPerfil(user) {
  const avatar = document.getElementById('avatar_url');
  const nome = document.getElementById('nome');
  const username = document.getElementById('username');
  const bio = document.getElementById('bio');
  const repositorios = document.getElementById('repositorios');
  const seguidores = document.getElementById('seguidores');
  const seguindo = document.getElementById('seguindo');
  const blog = document.getElementById('blog');

  avatar.src = user.avatar_url;
  nome.innerText = user.name ? user.name : "Sem nome";
  username.innerText = `@${user.login}`;
  username.href = user.url;
  bio.innerText = user.bio ? user.bio : "Não possui biografia!"
  repositorios.innerText = user.public_repos;
  seguidores.innerText = user.followers;
  seguindo.innerText = user.following;
  blog.href = user.blog ? user.blog : "#";
  blog.innerText = user.blog ? "Ver blog": "Não possui blog";

  perfilDiv.classList.remove('oculto');
}

function showError(mensagem) {
  erroDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensagem}!`;
  erroDiv.classList.remove('oculto');
}

pesquisaBtn.addEventListener('click', () => {
  const nomeUsuario = inputPesquisa.value.trim();

  if (nomeUsuario) {
    getInfoPerfilGitHub(nomeUsuario);
  }
})
