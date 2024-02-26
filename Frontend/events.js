function toggleDropdown(num) {
    var dropdown = document.getElementById("dropdown" + num);
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i] !== dropdown) {
        dropdowns[i].style.display = "none";
      }
    }
    if (dropdown.style.display === "none") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  }

  function changeButtonName(buttonId) {
    var button = document.getElementById(buttonId);
    var dropdown = button.nextElementSibling;
    var selectedItem = dropdown.querySelector(":hover").innerText;
    button.innerText = selectedItem;
    dropdown.style.display = "none";
  }

const getAllEvents = async () => {
    fetch("https://byte-whisperer-4567.onrender.com/events",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data)
        const events = data.data
        displayEvents(events)
    }).catch((err) => {
        console.log(err)
    })
}

getAllEvents()

const displayEvents =  (events) => {
    const container = document.getElementById('eventCardsContainer')
    // container.innerHTML = ''
    events.array.forEach(element => {
        const anchorwrapper = document.createElement('a')
        anchorwrapper.classList.add("cardmz")
        anchorwrapper.href = `event.html?id=${element._id}`
        const eventImage = document.createElement('img')
        eventImage.src = "image.start/event1.png"
        const eventdetails = document.createElement('div')
        eventdetails.classList.add("cardmz-content")
        const eventTitle = document.createElement('h1')
        eventTitle.innerText = element.name
        const eventDescription = document.createElement('p')
        eventDescription.innerText = element.description
        const eventDate = document.createElement('p')
        eventDate.innerText = element.date+" "+element.time
        eventDate.classList.add("datetimemz")
        eventdetails.append(eventTitle , eventDate, eventDescription)
        anchorwrapper.append(eventImage, eventdetails)
        container.append(anchorwrapper)
    });
    
}
