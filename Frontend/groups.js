
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


const getAllGroups = async () => {
    fetch("http://localhost:9000/groups",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then((res) => {
        return res.json();
    }).then((data) => {
        console.log(data)
        const groups = data.data
        displayGroups(groups.OwnerGroups)
        displayGroups(groups.MemberGroups)
    }).catch((err) => {
        console.log(err)
    })
}

getAllGroups()


const displayGroups = (groups) => {
    const groupsContainer = document.getElementById("groupCardsContainer")
    // groupsContainer.innerHTML = ""
    groups.forEach(element => {
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
        eventDate.innerText =element.interests.join(" ")
        eventDate.classList.add("datetimemz")
        eventdetails.append(eventTitle , eventDate, eventDescription)
        anchorwrapper.append(eventImage, eventdetails)
        groupsContainer.append(anchorwrapper)
    })
}