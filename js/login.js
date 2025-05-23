document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = usernameField.value;
    const password = passwordField.value;

    const loginData = {
      email: username,
      password: password
    };

    axios.post('http://3.212.209.122:4000/auth', loginData)
      .then(response => {
        alert('Login bem-sucedido!');

        const modalElement = document.getElementById('loginModal');
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.hide();

        // Pega o nome do usuário da resposta da API
        const userName = response.data.user.name;

        // Atualiza a seção do usuário com o nome real
        const userSection = document.getElementById('user-section');
        userSection.innerHTML = `
          <div class="user-info d-flex align-items-center">
            <img src="images/user.jpg" class="profile-pic" alt="User" />
            <span class="text-white ms-2">${userName}</span>
          </div>
        `;
      })
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      });
  });
});
