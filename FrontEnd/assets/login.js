let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  
  e.preventDefault();
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  const loginError = document.querySelectorAll('.error');
  const bannerEdit = document.querySelectorAll('.bannerEdit')
  const editImage = document.querySelectorAll('.editImage')
  const editTitre = document.querySelectorAll('.editTitre')
  console.log(emailValue, passwordValue)
  if (emailValue && passwordValue) {
    try {
      const response = await login(emailValue, passwordValue)
      console.log(response)
      function RedirectionJavascript(){
        document.location.href="index.html"; 
      }
      bannerEdit.classList.add('vu')
      editImage.classList.add('vu2')
      editTitre.classList.add('vu3')
    } catch (error) {
      loginError.classList.add('toto')
      /*throw new Error("Information non valide");*/
      /*document.getElementById('error').innerHTML="Information non valide";*/
      /*function validateForm()                                 
         { 
             var name = document.forms["email"]["password"];         
             if (name.value == ""){ 
                 document.getElementById('error').innerHTML="Information non valide";  
                 name.focus(); 
                 return false; 
             }else{
                 document.getElementById('error').innerHTML="";  
             }
         }*/
      console.log(error)
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

