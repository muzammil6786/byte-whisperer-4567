const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const login = document.getElementById("login");
const register = document.getElementById("register");
login.addEventListener("click", () => {
    loginForm.style.display = "flex";
    registerForm.style.display = "none";
})
register.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "flex";
})

if(!localStorage.getItem("token")){
    loginForm.style.display = "flex";
}





//login form for users code

loginForm.addEventListener("submit", (e) => {
    const email = document.getElementById("login-email");
    const password = document.getElementById("login-password");
    e.preventDefault();
    fetch("http://localhost:9000/users/login", {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    }).then((res) => {
        return  res.json();
    }).then((data) => {
        console.log(data);
        loginForm.style.display = "none";
    }).catch((err) => {
        console.log(err);
    })
    e.target.reset();
})



//register form for users code

registerForm.addEventListener("submit", (e) => {
    const name = document.getElementById("name");
const email = document.getElementById("email");
 const file = document.getElementById("file");
const password = document.getElementById("password");
    e.preventDefault();
    fetch("http://localhost:9000/users/register", {
        
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: name.value,
            email: email.value, 
            password: password.value,
             avatar: file.value,
        })
    }).then((res) => {
        return  res.json();
    }).then((data) => {
        console.log(data);
        loginForm.style.display = "flex";
        registerForm.style.display = "none";
    }).catch((err) => {
        console.log(err);
    })
    e.target.reset();
})