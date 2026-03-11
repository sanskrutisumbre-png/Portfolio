document.addEventListener("DOMContentLoaded", loadFeedback);

document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let successMessage = document.getElementById("successMessage");

    // Validation
    if (name === "") {
        alert("Name should not be empty.");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }

    let feedback = {
        name: name,
        email: email,
        message: message
    };

    let feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];
    feedbackData.push(feedback);

    localStorage.setItem("feedbackData", JSON.stringify(feedbackData));

    successMessage.textContent = "Feedback submitted successfully!";

    document.getElementById("feedbackForm").reset();
    loadFeedback();
});

function loadFeedback() {
    let feedbackDisplay = document.getElementById("feedbackDisplay");
    feedbackDisplay.innerHTML = "";

    let feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];

    feedbackData.forEach(function(item) {
        let div = document.createElement("div");
        div.classList.add("feedback-item");
        div.innerHTML = `<strong>${item.name}</strong> (${item.email})<br>${item.message}`;
        feedbackDisplay.appendChild(div);
    });
}s