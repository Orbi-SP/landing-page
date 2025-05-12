
  // Aguardar o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

    // Referências aos elementos do formulário de login
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
      const loginData = {
        email: username,
        password: password
      };
  
      // Fazer a requisição POST para o backend para autenticar o usuário
      axios.post('http://3.212.209.122:4000/auth', loginData)
        .then(response => {
          // Sucesso: exibir mensagem ou redirecionar
          alert('Login bem-sucedido!');
          
          // Aqui você pode redirecionar o usuário para uma nova página ou dashboard
          // window.location.href = '/dashboard'; // Exemplo de redirecionamento
          
          // Fechar o modal após o login bem-sucedido
          const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
          modal.hide();
        })
        .catch(error => {
          // Erro: exibir mensagem de erro
          console.error('Erro ao fazer login:', error);
          alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        });
    });
  });
  