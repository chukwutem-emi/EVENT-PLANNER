document.addEventListener("DOMContentLoaded", () => {
    const navBtnEl = document.querySelector(".navBtn");
    console.log(navBtnEl);
    if (navBtnEl) {
        navBtnEl.addEventListener("click", () => {
            window.history.back();
        });
    }
    
    const displayEl = document.querySelector(".displayBtn");
    if (displayEl) {
        displayEl.addEventListener("click", fetchDetails);
    }
    const downloadBtnEl = document.querySelector(".downloadBtn");
    downloadBtnEl.addEventListener("click", () => {
        const eventDivContent = document.querySelector(".eventDiv").outerHTML;
        const styledContent = `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Event Details</title>
            <style>
                .eventDiv {
                    max-width: 40rem;
                    background-color:#9ca19c;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.89);
                    color: black;
                    border-radius: 10px;
                    margin-top:4rem;
                    padding: 1rem;
                    margin:0 auto;
                }
                .eventDetails {
                    display: block;
                    list-style-type: none; 
                }
                .eventTypeDs {
                    text-align: center;
                    font-family:cursive;
                    color:darkblue;
                    margin:0 auto;
                }
                .eventFile {
                    box-sizing: border-box;
                    margin: 0 0 0 17rem;
                }
                .eventDetailsH6, .venueH3, .para {
                    text-align: center;
                    font-family: Arial, Helvetica, sans-serif;
                    margin: 0 auto;
                    color: darkblue;
                }
                .paraEl {
                    text-align: center;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 0.8rem;
                    word-wrap: break-word;
                    white-space: normal;
                    width: 50%;
                    margin: 0 auto;
                    font-weight:bold;
                }
                .invitationDisplay {
                    text-align: center;
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 0.8rem;
                    word-wrap: break-word;
                    white-space: normal;
                    width: 50%;
                    margin: 0 auto;
                }
                .receptVenue {
                    text-align: center;
                    font-size: 1rem;
                    margin: 0 auto;
                    word-wrap: break-word;
                    white-space: normal;
                    width: 70%;
                }
                .name {
                    font-size: 0.7rem;
                    color: blue; 
                }
                .phoneNum {
                    text-align: center;
                    margin: 0 auto;
                    font-weight: bold;
                }
                hr {
                    font-weight: bold;
                }
                button {
                    display:none;
                }
            </style>
        </head>
        <body>
        </body>
            ${eventDivContent}
        </html>
        `;
        const blob = new Blob([styledContent], {type:"text/html"});
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "eventDetails.html";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });
    function getReceptionVenue() {
        const getReceptionVenueEl = JSON.parse(localStorage.getItem("reception"));
        if (getReceptionVenueEl) {
            console.log("Reception venue:", getReceptionVenueEl);
            return getReceptionVenueEl;
        } else {
            console.error("No stored reception venue");
            return null;
        }
    }
    function getEventText() {
        const eventWriteUp = JSON.parse(localStorage.getItem("text"));
        if (eventWriteUp) {
            console.log("Event write up stored:", eventWriteUp);
            return eventWriteUp;
        } else {
            console.error("No stored event write up");
            return null;
        }
    }
    function getPhoneNumber() {
        const phoneEl = JSON.parse(localStorage.getItem("phone"));
        if (phoneEl) {
            console.log("Phone number:", phoneEl);
            return phoneEl;
        } else {
            console.error("No stored phone number");
            return null;
        }
    }
    function getInvitationDetails() {
        const invitationDetails = JSON.parse(localStorage.getItem("invite"));
        if (invitationDetails) {
            console.log("Invitation:", invitationDetails);
            return invitationDetails;
        } else {
            console.error("No stored invitation");
            return null;
        }
    }
    function getFile() {
        const getStoredFile = localStorage.getItem("image");
        if (getStoredFile) {
            console.log("stored file:", getStoredFile);
            return getStoredFile;
        } else {
            console.error("No stored file");
            return null;
        }
    }
    function storedEventType() {
        const getStoredEventType = localStorage.getItem("selected");
        if (getStoredEventType) {
            console.log("event type:", getStoredEventType);
            return getStoredEventType;
        } else {
            console.error("No stored event type");
            return null;
        }
    }
    function fetchDetails() {
        const displayEl = document.querySelector(".displayBtn");
        displayEl.style.cursor = "wait";
        displayEl.innerHTML = "Fetching your details, please wait"
        setTimeout(() => {
            displayEl.style.cursor = "pointer";
            displayEl.innerHTML = "Check your details"
        },2000);
        const eventDivEl = document.querySelector(".eventDiv");
        eventDivEl.classList.add("eventDiv-display");
    
        const imgElement = document.querySelector(".eventFile");
        imgElement.src = getFile();
    
        const typeOfEvent = document.querySelector(".eventTypeDs");
        typeOfEvent.innerHTML = storedEventType();

        const receptVenueEl = document.querySelector(".receptVenue");
        receptVenueEl.innerHTML = getReceptionVenue();

        const paraEl = document.querySelector(".paraEl");
        paraEl.innerHTML = getEventText();

        const phoneNum = document.querySelector(".phoneNum");
        phoneNum.innerHTML = getPhoneNumber();

        const invitationEl = document.querySelector(".invitationDisplay");
        invitationEl.innerHTML = getInvitationDetails();

        getEvents();

        window.scrollTo(0, document.body.scrollHeight);
    }
    function getEvents() {
        const getStoredEvents = JSON.parse(localStorage.getItem("event"));
        if ( getStoredEvents) {
            const eventDetailsEl = document.querySelector(".eventDetails");
            eventDetailsEl.innerHTML = "";
            getStoredEvents.forEach((oneEvent) => {
                addEventToDom(oneEvent.date, oneEvent.time, oneEvent.Name, oneEvent.venue);
            });
        } else {
            console.error("No stored events");
        }
    }
    function addEventToDom(date, time, Name, venue) {
        const eventDetailsEl = document.querySelector(".eventDetails");
        // populating the event
        const nameLi = document.createElement("li");
        nameLi.classList.add("name");
        nameLi.innerHTML = `${Name}`;
        nameLi.classList.add("name")
        eventDetailsEl.appendChild(nameLi);

        const dateLi = document.createElement("li");
        dateLi.innerHTML = `Date: &nbsp${date}`;
        eventDetailsEl.appendChild(dateLi);

        const timeLi = document.createElement("li");
        timeLi.innerHTML = `Time: &nbsp ${time}`;
        eventDetailsEl.appendChild(timeLi);

        const venueLi = document.createElement("li");
        venueLi.innerHTML = `Venue: &nbsp ${venue}`;
        eventDetailsEl.appendChild(venueLi);

        const li = document.createElement("li")
        
        const editBtn = document.createElement("button")
        editBtn.innerHTML = "Edit";
        editBtn.onclick = () => { editEvent(nameLi, dateLi, timeLi, venueLi, li)}
        li.appendChild(editBtn);


        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.onclick = () => {deleteEvents(nameLi, dateLi, timeLi, venueLi, li)}
        li.appendChild(deleteBtn);

        eventDetailsEl.appendChild(li);
    }
    function deleteEvents(date, time, Name, venue, listItem) {
        let getStoredEvents = JSON.parse(localStorage.getItem("event"));
        getStoredEvents = getStoredEvents.filter((oneEvent) => {oneEvent.date !== date || oneEvent.time !== time || oneEvent.Name !== Name || oneEvent.venue !== venue});
        localStorage.setItem("event", JSON.stringify(getStoredEvents));
        listItem.remove();
    }
    function editEvent(date, time, Name, venue, listItem, ) {
        const newName = prompt("Edit event name", Name);
        const newTime = prompt("Edit event time", time);
        const newDate = prompt("Edit event date", date);
        const newVenue = prompt("Edit event venue", venue);
        if (newName && newTime && newDate && newVenue) {
            deleteEvents(date, time, Name, venue, listItem)
            let getStoredEvents = JSON.parse(localStorage.getItem("event")) || [];
            getStoredEvents.push({date:newDate, time:newTime, Name:newName, venue:newVenue});
            localStorage.setItem("event", JSON.stringify(getStoredEvents));
            addEventToDom(date=newDate, Name=newName, time=newTime, venue=newVenue);
        }
    }
    
});
