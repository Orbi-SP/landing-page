// Aguardar o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

    // Referências aos elementos do formulário
    const createAccountForm = document.getElementById('createAccountForm');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const phoneField = document.getElementById('phone');
    
    // Quando o formulário for enviado
    createAccountForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Evitar o envio padrão do formulário
  
      // Pegar os dados do formulário
      const name = nameField.value;
      const email = emailField.value;
      const password = passwordField.value;
      const phone = phoneField.value
  
      // Criar o objeto que será enviado
      const userData = {
        name: name,
        email: email,
        password: password,
        phone: phone,
      };
  
      // Fazer a requisição POST para o backend
      axios.post('http://3.212.209.122:4000/user', userData)
        .then(response => {
          // Sucesso: você pode redirecionar ou exibir uma mensagem
          alert('Conta criada com sucesso!');
          window.location.href = 'index.html';  // Redireciona para a página inicial ou login
        })
        .catch(error => {
          // Erro: exibir mensagem de erro
          console.error('Erro ao criar a conta:', error);
          alert('Erro ao criar a conta. Tente novamente.');
        });
    });
  });
  