function criarPessoa(nome, dataNascimento, telefone, email) {
    return { nome, dataNascimento, telefone, email };
  }
  
  const storageKey = 'cadastroPessoas';
  
  function obterPessoas() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  }
  
  function salvarPessoa(pessoa) {
    const pessoas = obterPessoas();
    pessoas.push(pessoa);
    localStorage.setItem(storageKey, JSON.stringify(pessoas));
  }
  
  function removerPessoa(email) {
    const pessoas = obterPessoas().filter(p => p.email !== email);
    localStorage.setItem(storageKey, JSON.stringify(pessoas));
  }
  
  const form = document.getElementById('cadastroForm');
  const listaCadastro = document.getElementById('listaCadastro');
  
  function mostrarLista() {
    const pessoas = obterPessoas();
    listaCadastro.innerHTML = pessoas.map(p => `
      <li>
        ${p.nome} - ${p.email}
        <button onclick="removerPessoa('${p.email}'); mostrarLista();">Deletar</button>
      </li>
    `).join('');
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
  
    salvarPessoa(criarPessoa(nome, dataNascimento, telefone, email));
    form.reset();
    mostrarLista();
  });
  
  mostrarLista();
  