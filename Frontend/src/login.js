

const loginForm = document.querySelector("#loginForm")

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.querySelector("#email")
    const password = document.querySelector("#password")

    fetch("http://localhost:9000/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: username.value,
            username: username.value,
            password: password.value,
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
        localStorage.setItem("token", data.data.accessToken)
        window.location.href = "../index.html"
    }).catch((err) => {
        console.log(err)
    })
})