

const signupForm = document.querySelector("#signupForm")

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name")
    const email = document.querySelector("#email")
    const username = document.querySelector("#username")
    const password = document.querySelector("#password")
    const interests =[]

    fetch("http://localhost:9000/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            username: username.value,
            password: password.value,
            interests: interests
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
})