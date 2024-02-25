





const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const login = document.getElementById("login");
const register = document.getElementById("register");

const token = JSON.parse(localStorage.getItem("token"))
console.log(token);
if(!token){
    loginForm.classList.remove("hidden");
    loginForm.classList.add("flex");
}



login.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    loginForm.classList.add("flex");
    registerForm.classList.add("hidden");
    registerForm.classList.remove("flex");
})
register.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    loginForm.classList.remove("flex");
    registerForm.classList.remove("hidden");
    registerForm.classList.add("flex");
})

if(!localStorage.getItem("token")){
    loginForm.classList.remove("hidden");
    loginForm.classList.add("flex");
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
        loginForm.classList.add("hidden");
        loginForm.classList.remove("flex");
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
            interests:[]
             //avatar: file.value,
        })
    }).then((res) => {
        return  res.json();
    }).then((data) => {
        console.log(data);
        loginForm.classList.add("flex");
        loginForm.classList.remove("hidden");
        registerForm.classList.remove("flex");
        registerForm.classList.add("hidden");
        
    }).catch((err) => {
        console.log(err);
    })
    e.target.reset();
})


let str ="flex flex-col h-fit p-5 m-5 shadow-md rounded-md w-1/2 shadow-accent-light dark:shadow-accent-dark bg-Secondary-light dark:bg-Secondary-dark"
let arr = str.split(" ");
