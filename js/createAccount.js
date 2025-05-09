// Aguardar o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

    // Referências aos elementos do formulário
    const loginForm = document.getElementById('loginForm');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
  
    // Quando o formulário for enviado
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar o envio padrão do formulário
  
      // Pegar os dados do formulário
      const username = usernameField.value;
      const password = passwordField.value;
  
      // Criar o objeto que será enviado
      const userData = {
        username: username,
        password: password
      };
  
      // Fazer a requisição POST para o backend
      axios.post('http://localhost:4000/user', userData)
        .then(response => {
          // Sucesso: você pode redirecionar ou exibir uma mensagem
          alert('Usuário cadastrado com sucesso!');
          // Fechar o modal após o cadastro
          const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
          modal.hide();
        })
        .catch(error => {
          // Erro: exibir mensagem de erro
          console.error('Erro ao cadastrar o usuário:', error);
          alert('Erro ao cadastrar o usuário. Tente novamente.');
        });
    });
  });