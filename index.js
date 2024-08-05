const eventTypeEl = document.getElementById("eventType");
eventTypeEl.addEventListener("change", highlightSelected);

function highlightSelected() {
    const eventTypeEl = document.getElementById("eventType");
    const selectedOption = eventTypeEl.value;
    alert("option added");
    localStorage.setItem("selected", selectedOption);
    if (selectedOption) {
        eventTypeEl.classList.add("selected-option");
    } else {
        eventTypeEl.classList.remove("selected-option");
    }
}

const eventPictureEl = document.querySelector(".eventPicture");
eventPictureEl.addEventListener("change", storeImage);

function storeImage(event) {
    const file = event.target.files[0];
    console.log(file);
    const maxSize = 70 * 1024;
    if (file && file.size > maxSize) {
        alert("file is too large.Please select a file smaller than 70KB.");
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        localStorage.setItem("image", reader.result);
        alert("file added");
    }
    if (file) {
        reader.readAsDataURL(file);
    }
}
function addEvent(Name, date, time, venue) {
    const eventData = {Name, date, time, venue}
    const events = JSON.parse(localStorage.getItem("event")) || [];
    events.push(eventData);
    localStorage.setItem("event", JSON.stringify(events));
}
document.addEventListener("DOMContentLoaded", () => {
    const eventFormEl = document.querySelector(".eventForm");
    eventFormEl.addEventListener("submit", handleInputData);
});
function handleInputData(event) {
    event.preventDefault();
    const eventFormEl = document.querySelector(".eventForm");
    const eventNameEl = eventFormEl.querySelector(".eventName").value.toUpperCase();
    const eventDateEl = eventFormEl.querySelector(".eventDate").value;
    const eventTimeEl = eventFormEl.querySelector(".eventTime").value.toUpperCase();
    const eventVenueEl = eventFormEl.querySelector(".eventVenue").value;
    const receptionVenue = eventFormEl.querySelector(".receptionVenue").value;
    localStorage.setItem("reception", JSON.stringify(receptionVenue));
    const eventTextEl = eventFormEl.querySelector(".eventText").value;
    localStorage.setItem("text", JSON.stringify(eventTextEl));
    const phoneNumber = eventFormEl.querySelector(".phoneNumber").value;
    localStorage.setItem("phone", JSON.stringify(phoneNumber));
    const invitationEl = eventFormEl.querySelector(".invitation").value;
    localStorage.setItem("invite", JSON.stringify(invitationEl));
    const eventBtnEl = eventFormEl.querySelector(".eventBtn");
    eventBtnEl.innerHTML = "Adding, please wait.....";
    eventBtnEl.style.cursor = "wait";
    setTimeout(() => {
        eventBtnEl.innerHTML = "Add event";
        eventBtnEl.style.cursor = "pointer";
    },3000);
    if (eventNameEl && eventDateEl && eventTimeEl && eventVenueEl) {
        addEvent(Name=eventNameEl, date=eventDateEl, time=eventTimeEl, venue=eventVenueEl);
        eventFormEl.querySelector(".eventName").value = "";
        eventFormEl.querySelector(".eventDate").value = "";
        eventFormEl.querySelector(".eventTime").value = "";
        eventFormEl.querySelector(".eventVenue").value = "";
        eventFormEl.querySelector(".receptionVenue").value = "";
        eventFormEl.querySelector(".eventText").value = "";
        eventFormEl.querySelector(".phoneNumber").value = "";
        eventFormEl.querySelector(".invitation").value = "";
        setTimeout(() => {
            window.location.href = "event_planner.html";
        }, 5000);
    }
    
}

const reloadPageEl = document.querySelector(".reloadPage");
reloadPageEl.addEventListener("click", pageReload);

function pageReload() {
    window.location.reload();
}