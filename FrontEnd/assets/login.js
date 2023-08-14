let loginForm = document.getElementById("loginForm");
const loginError = document.querySelector('.error');

function redirectionHomePage(){
  document.location.href="index.html"; 
}

loginForm.addEventListener("submit", async (e) => {

  e.preventDefault();
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  
  console.log(emailValue, passwordValue)
  if (emailValue && passwordValue) {
      const response = await login(emailValue, passwordValue)
      console.log("login", response)
      if (response.token){
        localStorage.setItem("token", response.token)
        redirectionHomePage()
      } else{
        loginError.classList.add('errorLog')
        console.log("tyuio", error)
      }
  }
});
const login = async (email, password) => {
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  return response.json()
}
img.addEventListener("input", toggleSubmitButton);
category.addEventListener("input", toggleSubmitButton);
function toggleSubmitButton() {
  if (usernameInput.value && passwordInput.value) {
    validImg.disabled = false;
  } else {
    validImg.disabled = true;
  }
}