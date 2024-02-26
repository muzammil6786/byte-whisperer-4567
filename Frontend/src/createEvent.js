
const createform = document.getElementById("createEventForm");
createform.addEventListener("submit", createEvent)
const createEvent = (e) => {
    e.preventDefault();
    const name = document.getElementById("name");
    const description = document.getElementById("description");
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    const location = document.getElementById("location");
    const seats = document.getElementById("seats");
    // const image = document.getElementById("image");
    const category = document.getElementById("category");

    const event = {
        name: name.value,
        description: description.value,
        date: date.value,
        time: time.value,
        location: location.value,
        seats: seats.value,
        category: category.value
    }

    fetch("http://localhost:9000/events/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
}