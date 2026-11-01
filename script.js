
// ===== GET SAVED DATA =====

let trips = JSON.parse(localStorage.getItem("trips")) || [];

let items = JSON.parse(localStorage.getItem("packingItems")) || [
    "Clothes",
    "Toothbrush",
    "Mobile Charger",
    "Wallet",
    "Identity Card",
    "Headphones"
];


// ===== CREATE TRIP =====

const tripForm = document.getElementById("tripForm");

if (tripForm) {

    tripForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let trip = {
            name: document.getElementById("tripName").value,
            destination: document.getElementById("destination").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            type: document.getElementById("travelType").value,
            notes: document.getElementById("notes").value
        };

        if (trip.endDate < trip.startDate) {
            alert("End date cannot be before start date!");
            return;
        }

        trips.push(trip);

        localStorage.setItem("trips", JSON.stringify(trips));

        alert("Your trip has been created successfully!");

        window.location.href = "mytrips.html";

    });

}


// ===== PACKING CHECKLIST =====

const itemList = document.getElementById("itemList");

function displayItems() {

    if (!itemList) return;

    itemList.innerHTML = "";

    items.forEach(function(item, index) {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        let span = document.createElement("span");
        span.textContent = item.name;

        checkbox.checked = item.packed;

        if (item.packed) {
            span.style.textDecoration = "line-through";
        }

        checkbox.addEventListener("change", function() {

            items[index].packed = checkbox.checked;

            localStorage.setItem(
                "packingItems",
                JSON.stringify(items)
            );

            displayItems();

        });

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";

        deleteButton.addEventListener("click", function() {

            items.splice(index, 1);

            localStorage.setItem(
                "packingItems",
                JSON.stringify(items)
            );

            displayItems();

        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        itemList.appendChild(li);

    });

    updateProgress();

}


// ===== ADD NEW ITEM =====

const addButton = document.getElementById("addButton");

if (addButton) {

    addButton.addEventListener("click", function() {

        const itemInput = document.getElementById("itemInput");

        let itemName = itemInput.value.trim();

        if (itemName === "") {
            alert("Please enter an item!");
            return;
        }

        items.push({
            name: itemName,
            packed: false
        });

        localStorage.setItem(
            "packingItems",
            JSON.stringify(items)
        );

        itemInput.value = "";

        displayItems();

    });

}


// ===== UPDATE PROGRESS =====

function updateProgress() {

    const progressBar = document.getElementById("packingProgress");
    const progressText = document.getElementById("progressText");

    if (!progressBar || !progressText) return;

    let packedItems = items.filter(function(item) {
        return item.packed;
    }).length;

    let percentage = items.length === 0
        ? 0
        : Math.round((packedItems / items.length) * 100);

    progressBar.value = percentage;

    progressText.textContent = percentage + "% Completed";

}


// ===== DISPLAY SAVED TRIPS =====

const tripContainer = document.getElementById("tripContainer");

if (tripContainer) {

    const emptyMessage = document.getElementById("emptyMessage");

    if (trips.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

        trips.forEach(function(trip) {

            let card = document.createElement("div");

            card.className = "feature-card";

            let heading = document.createElement("h3");
            heading.textContent = trip.name;

            let destination = document.createElement("p");
            destination.textContent = "Destination: " + trip.destination;

            let type = document.createElement("p");
            type.textContent = "Trip Type: " + trip.type;

            let date = document.createElement("p");
            date.textContent = trip.startDate + " to " + trip.endDate;

            card.appendChild(heading);
            card.appendChild(destination);
            card.appendChild(type);
            card.appendChild(date);

            tripContainer.appendChild(card);

        });

    }

}


// ===== INITIALIZE CHECKLIST =====

if (itemList) {

    items = items.map(function(item) {

        if (typeof item === "string") {
            return {
                name: item,
                packed: false
            };
        }

        return item;

    });

    localStorage.setItem(
        "packingItems",
        JSON.stringify(items)
    );

    displayItems();

}
