// Toggle menu for mobile view
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('nav-active');
}

// Slideshow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Change slides when clicking on arrows
function changeSlides(n) {
    slideIndex += n;
    let slides = document.getElementsByClassName("slides");
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}
// Data about the museums
const museums = {
    "national museum": {
        about: "The National Museum in Delhi showcases India's rich cultural heritage, with artifacts from prehistory to modern times.",
        timings: "10 AM - 6 PM (Closed on Mondays)",
        price: "₹20 for Indians, ₹650 for foreigners."
    },
    "indian museum": {
        about: "Located in Kolkata, the Indian Museum is the largest and oldest museum in India, featuring a vast range of artifacts.",
        timings: "10 AM - 5 PM (Closed on Sundays)",
        price: "₹50 for Indians, ₹500 for foreigners."
    },
    "chhatrapati shivaji maharaj vastu sangrahalaya": {
        about: "This museum in Mumbai has a fine collection of ancient Indian art and artifacts, covering various periods and dynasties.",
        timings: "10:15 AM - 6 PM",
        price: "₹85 for Indians, ₹500 for foreigners."
    },
    // Add more museums as required
};

// Toggle chatbox
function toggleChat() {
    const chatbot = document.getElementById("chatbot");
    chatbot.style.display = chatbot.style.display === "none" ? "flex" : "none";
}

// Handle message sending
function sendMessage() {
    const userInput = document.getElementById("userMessage").value.trim().toLowerCase();
    if (userInput === "") return;

    displayMessage(userInput, "user-message");
    document.getElementById("userMessage").value = "";  // Clear input

    setTimeout(() => {
        const response = getMuseumInfo(userInput);
        displayMessage(response, "bot-message");
    }, 1000);
}

// Get museum info based on user input
function getMuseumInfo(query) {
    for (let museum in museums) {
        if (query.includes(museum)) {
            const info = museums[museum];
            return `About: ${info.about}\nTimings: ${info.timings}\nPrice: ${info.price}`;
        }
    }
    return "Sorry, I couldn't find information about that museum.";
}

// Display message in chat
function displayMessage(message, className) {
    const chatBody = document.getElementById("chatBody");
    const messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.innerText = message;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;  // Auto-scroll to bottom
}

// CSS for user and bot messages
const style = document.createElement("style");
style.innerHTML = `
    .user-message {
        background-color: #007bff;
        color: white;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        text-align: right;
    }
    .bot-message {
        background-color: #f1f1f1;
        color: black;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        text-align: left;
    }
`;
document.head.appendChild(style);
