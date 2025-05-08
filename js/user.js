
function login() {
  const userSection = document.getElementById('user-section');
  userSection.innerHTML = `
    <div class="user-info d-flex align-items-center">
      <img src="images/user.jpg" class="profile-pic" alt="User" />
      <span class="text-white ms-2">Usuário</span>
    </div>
  `;
}
