document.addEventListener('DOMContentLoaded', () => {
  const createAccountForm = document.getElementById('createAccountForm');
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const alertBox = document.getElementById('registerAlertBox');
  const submitBtn = document.getElementById('submitBtn');

  createAccountForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Limpa alertas anteriores
    alertBox.innerHTML = '';

    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;

    const userData = {
      username: name,
      email: email,
      password: password,
    };

    // Estado de carregamento: muda o texto do botão e desabilita
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Criando...';
    submitBtn.disabled = true;

    axios.post('https://ihrws12500.execute-api.us-east-1.amazonaws.com/default/user', userData)
      .then(response => {
        // Sucesso: exibe mensagem verde
        alertBox.innerHTML = `<div class="alert alert-success" role="alert"><i class="bi bi-check-circle-fill"></i> Conta criada com sucesso! Redirecionando...</div>`;
        
        // Aguarda 1.5 segundos para o usuário ler, depois manda pro Início/Login
        setTimeout(() => {
          window.location.href = 'index.html'; 
        }, 1500);
      })
      .catch(error => {
        console.error('Erro ao criar a conta:', error);
        
        // Restaura o botão ao estado normal
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        // Captura a mensagem de erro que vem do backend (se existir), senão usa uma genérica
        let errorMsg = 'Erro ao criar a conta. Verifique os dados e tente novamente.';
        if (error.response && error.response.data && error.response.data.error) {
          errorMsg = error.response.data.error;
        } else if (error.response && error.response.status === 409) {
          // Exemplo se o banco retornar que o e-mail já existe
          errorMsg = 'Este e-mail já está cadastrado.';
        }

        // Erro: exibe mensagem vermelha
        alertBox.innerHTML = `<div class="alert alert-danger" role="alert"><i class="bi bi-exclamation-triangle-fill"></i> ${errorMsg}</div>`;
      });
  });
});