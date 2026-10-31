document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const alertBox = document.getElementById('loginAlertBox'); // Caixa para as mensagens

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = emailField.value;
    const password = passwordField.value;

    const loginData = {
      email: email,
      password: password
    };

    axios.post('https://mlbx155o84.execute-api.us-east-1.amazonaws.com/v1/backend-page/auth', loginData)
      .then(response => {
        // Exibe mensagem bonita de sucesso (verde)
        alertBox.innerHTML = `<div class="alert alert-success" role="alert">Login realizado com sucesso!</div>`;

        // Espera 1 segundo para o usuário ler a mensagem antes de fechar a janela
        setTimeout(() => {
          const modalElement = document.getElementById('loginModal');
          const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
          modal.hide();

          // Limpar o form e o alerta para a próxima vez
          loginForm.reset();
          alertBox.innerHTML = '';

          const userName = response.data.profile.username;
          const userSection = document.getElementById('user-section');

          // Atualiza a seção do usuário com um DROPDOWN MENU do Bootstrap
          userSection.innerHTML = `
            <div class="dropdown">
              <button class="btn btn-outline-light dropdown-toggle d-flex align-items-center border-0 bg-transparent" type="button" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="images/user.jpg" class="profile-pic" alt="User" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />
                <span class="ms-2 fw-bold text-white">${userName}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="userMenu">
                <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right"></i> Sair</a></li>
              </ul>
            </div>
          `;
        }, 1000);
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        // Exibe mensagem bonita de erro (vermelho)
        alertBox.innerHTML = `<div class="alert alert-danger" role="alert">E-mail ou senha inválidos. Tente novamente.</div>`;
      });
  });

  // Lógica para deslogar do sistema
  // Usamos delegação de eventos no "user-section" para capturar o clique no botão "Sair" que é gerado dinamicamente
  document.getElementById('user-section').addEventListener('click', function (e) {
    // Se o usuário clicou no link com ID logoutBtn ou no ícone dentro dele
    if (e.target && (e.target.id === 'logoutBtn' || e.target.closest('#logoutBtn'))) {
      e.preventDefault();
      
      // Aqui você poderia limpar tokens no localStorage, se estivesse usando:
      // localStorage.removeItem('token');

      // Restaura o botão de Login original
      const userSection = document.getElementById('user-section');
      userSection.innerHTML = `<button class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>`;
    }
  });
});