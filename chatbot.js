<!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Museum Ticket Booking Chatbot</title>
   <link rel="stylesheet" href="chatbot.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
</head>
<body>

<h1>Museum Ticket Booking Chatbot</h1>
<div id="chat"></div>
<input type="text" id="userInput" placeholder="Type your message here..." />
<button onclick="sendMessage()">Send</button>
<img id="museumImage" src="" alt="Museum Image" />

<script>
    const chatDiv = document.getElementById('chat');
    const userInput = document.getElementById('userInput');
    const museumImage = document.getElementById('museumImage');

    // Expanded museum data
    const museums = [
        { id: 1, name: "The Louvre", location: "Paris, France", price: 15, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Louvre_Museum_Wikipedia.jpg" },
        { id: 2, name: "The British Museum", location: "London, UK", price: 20, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/The_British_Museum.jpg" },
        { id: 3, name: "The Met", location: "New York, USA", price: 25, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/2/25/The_Metropolitan_Museum_of_Art.jpg" },
        { id: 4, name: "National Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/National_Museum_of_India.jpg" },
        { id: 5, name: "Indian Museum", location: "Kolkata, India", price: 15, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Indian_Museum_Kolkata.jpg" },
        { id: 6, name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya", location: "Mumbai, India", price: 20, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/CSMVS_2.jpg" },
        // Add more museums here (50 total)...
        { id: 7, name: "National Gallery of Modern Art", location: "New Delhi, India", price: 15, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/6/68/National_Gallery_of_Modern_Art.jpg" },
        { id: 8, name: "Raja Dinkar Kelkar Museum", location: "Pune, India", price: 10, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Raja_Dinkar_Kelkar_Museum.jpg" },
        { id: 9, name: "Salar Jung Museum", location: "Hyderabad, India", price: 20, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Salar_Jung_Museum.jpg" },
        { id: 10, name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya", location: "Mumbai, India", price: 15, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/CSMVS_Museum_Interior.jpg" },
        // ... Add more museums to reach 50
        { id: 11, name: "Nehru Science Centre", location: "Mumbai, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Nehru_Science_Centre.jpg" },
        { id: 12, name: "Birla Industrial & Technological Museum", location: "Kolkata, India", price: 12, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Birla_Industrial_%26_Technological_Museum.jpg" },
        { id: 13, name: "Maharaja Sawai Man Singh II Museum", location: "Jaipur, India", price: 15, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Maharaja_Sawai_Man_Singh_II_Museum.jpg" },
        { id: 14, name: "Gandhi Smriti", location: "New Delhi, India", price: 8, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Gandhi_Smrity.jpg" },
        { id: 15, name: "Vikram Sarabhai Space Centre", location: "Thiruvananthapuram, India", price: 12, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Vikram_Sarabhai_Space_Centre.jpg" },
        { id: 16, name: "Hindu Temple Museum", location: "Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hindu_Temple_Museum.jpg" },
        { id: 17, name: "Mahatma Gandhi Museum", location: "Mumbai, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Mahatma_Gandhi_Museum.jpg" },
        { id: 18, name: "Indian Air Force Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/d/db/IAF_Museum.jpg" },
        { id: 19, name: "National Museum of Natural History", location: "New Delhi, India", price: 15, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/2/28/National_Museum_of_Natural_History.jpg" },
        { id: 20, name: "Railway Museum", location: "Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Rail_Museum.jpg" },
        { id: 21, name: "Nehru Memorial Museum", location: "New Delhi, India", price: 12, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Nehru_Memorial_Museum.jpg" },
        { id: 22, name: "Bihar Museum", location: "Patna, India", price: 15, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Bihar_Museum.jpg" },
        { id: 23, name: "Nizam's Museum", location: "Hyderabad, India", price: 12, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Nizams_Museum.jpg" },
        { id: 24, name: "Shankar's International Dolls Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Shankar_Museum.jpg" },
        { id: 25, name: "Mysore Zoo", location: "Mysuru, India", price: 10, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Mysore_Zoo.jpg" },
        { id: 26, name: "Nehru Science Centre", location: "Mumbai, India", price: 12, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Nehru_Science_Centre.jpg" },
        { id: 27, name: "Vikram Sarabhai Space Centre", location: "Thiruvananthapuram, India", price: 12, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Vikram_Sarabhai_Space_Centre.jpg" },
        { id: 28, name: "Gandhi Museum", location: "Kanyakumari, India", price: 10, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Gandhi_Museum_Kanyakumari.jpg" },
        { id: 29, name: "Rajiv Gandhi Museum", location: "Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Rajiv_Gandhi_Museum.jpg" },
        { id: 30, name: "Indira Gandhi Memorial Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Indira_Gandhi_Memorial_Museum.jpg" },
        { id: 31, name: "ISKCON Museum", location: "Mumbai, India", price: 10, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/ISKCON_Museum.jpg" },
        { id: 32, name: "National Science Centre", location: "New Delhi, India", price: 12, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/4/42/National_Science_Centre.jpg" },
        { id: 33, name: "Sanskriti Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Sanskriti_Museum.jpg" },
        { id: 34, name: "Sunil's Museum", location: "Lucknow, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Sunil_Museum.jpg" },
        { id: 35, name: "Indian Museum of Film", location: "Mumbai, India", price: 15, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/1/10/Indian_Museum_of_Film.jpg" },
        { id: 36, name: "Bharat Museum", location: "Delhi, India", price: 12, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Bharat_Museum.jpg" },
        { id: 37, name: "National Gallery of Modern Art", location: "Mumbai, India", price: 15, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/7/76/National_Gallery_of_Modern_Art_Mumbai.jpg" },
        { id: 38, name: "Tihar Jail Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Tihar_Jail_Museum.jpg" },
        { id: 39, name: "Mahatma Gandhi Museum", location: "Ahmedabad, India", price: 12, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Mahatma_Gandhi_Museum_Ahmedabad.jpg" },
        { id: 40, name: "The Vintage Camera Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Vintage_Camera_Museum.jpg" },
        { id: 41, name: "Kiran Nadar Museum of Art", location: "Noida, India", price: 12, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Kiran_Nadar_Museum.jpg" },
        { id: 42, name: "National Handicrafts Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/National_Handicrafts_Museum.jpg" },
        { id: 43, name: "National Police Museum", location: "New Delhi, India", price: 12, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/1/10/National_Police_Museum.jpg" },
        { id: 44, name: "Rail Transport Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rail_Transport_Museum.jpg" },
        { id: 45, name: "Indian Museum of Technology", location: "Bangalore, India", price: 12, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Indian_Museum_of_Technology.jpg" },
        { id: 46, name: "Nehru Planetarium", location: "Mumbai, India", price: 10, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Nehru_Planetarium.jpg" },
        { id: 47, name: "Nehru Art Gallery", location: "Mumbai, India", price: 12, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Nehru_Art_Gallery.jpg" },
        { id: 48, name: "National Film Archive of India", location: "Pune, India", price: 15, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/3/35/National_Film_Archive_of_India.jpg" },
        { id: 49, name: "Visvesvaraya Industrial and Technological Museum", location: "Bangalore, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Visvesvaraya_Industrial_and_Technological_Museum.jpg" },
        { id: 50, name: "Archaeological Museum", location: "Sarnath, India", price: 15, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Archaeological_Museum_Sarnath.jpg" }
    ];

    function greet() {
        addMessage("Hello! I can help you book tickets for museums. Type the number of the museum you want to visit.");
        listMuseums();
    }

    function listMuseums() {
        let message = "Available museums:\n";
        museums.forEach(museum => {
            message += ${museum.id}: $ {museum.name}\n; // Show ID and name
        });
        addMessage(message);
    }

    function sendMessage() {
        const input = userInput.value;
        userInput.value = '';

        if (!input) return;

        addMessage(You: ${input});
        handleUserInput(input);
    }

    function handleUserInput(input) {
        const selectedMuseum = parseInt(input) - 1;
        if (!isNaN(selectedMuseum) && museums[selectedMuseum]) {
            displayMuseumImage(selectedMuseum);
            selectDate(selectedMuseum);
        } else {
            addMessage("Please select a valid museum number.");
        }
    }

    function displayMuseumImage(museumIndex) {
        const selected = museums[museumIndex];
        museumImage.src = selected.image;
        museumImage.style.display = "block";
    }

    function selectDate(museumIndex) {
        const selected = museums[museumIndex];
        let message = Available dates: ${selected.availability.join(", ")}\n;
        message += "Please select a date (format: YYYY-MM-DD): ";
        addMessage(message);
        
        // Create a date input for user to select a date
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.min = new Date().toISOString().split("T")[0]; // Disable past dates
        chatDiv.appendChild(dateInput);

        dateInput.onchange = function() {
            confirmBooking(museumIndex, dateInput.value);
        };
    }

    function confirmBooking(museumIndex, selectedDate) {
        const selected = museums[museumIndex];

        if (selected.availability.includes(selectedDate)) {
            addMessage(You've chosen a visit on ${selectedDate}. The price is $${selected.price}. Confirm? (yes/no));
            userInput.onkeypress = function(e) {
                if (e.key === 'Enter') {
                    const confirmation = userInput.value.toLowerCase();
                    if (confirmation === 'yes') {
                        createPDF(selected);
                    } else {
                        addMessage("Booking cancelled.");
                    }
                    userInput.value = ''; // Clear input
                }
            };
        } else {
            addMessage("Invalid date. Please try again.");
        }
    }

    function addMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message';
        msgDiv.textContent = message;
        chatDiv.appendChild(msgDiv);
        chatDiv.scrollTop = chatDiv.scrollHeight; // Auto-scroll
    }

    async function createPDF(selected) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text(Booking Confirmation, 10, 10);
        doc.text(Location: ${selected.location}, 10, 20);
        doc.text(Price: $${selected.price}, 10, 30);
        
        // Download the PDF
        doc.save(${selected.name}_Ticket.pdf);
        addMessage("Your booking is confirmed! The ticket PDF has been downloaded.");
    }

    greet();
</script>

</body>
</html> -->




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Museum Ticket Booking Chatbot</title>
    <link rel="stylesheet" href="chatbot.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
</head>
<body>

<h1>Museum Ticket Booking Chatbot</h1>
<div id="chat"></div>
<input type="text" id="userInput" placeholder="Type your message here..." />
<button onclick="sendMessage()">Send</button>
<img id="museumImage" src="" alt="Museum Image" style="display:none;" />

<script>
    const chatDiv = document.getElementById('chat');
    const userInput = document.getElementById('userInput');
    const museumImage = document.getElementById('museumImage');

    // Expanded museum data
    const museums = [
        { id: 1, name: "The Louvre", location: "Paris, France", price: 15, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Louvre_Museum_Wikipedia.jpg" },
        { id: 2, name: "The British Museum", location: "London, UK", price: 20, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/The_British_Museum.jpg" },
        { id: 3, name: "The Met", location: "New York, USA", price: 25, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/2/25/The_Metropolitan_Museum_of_Art.jpg" },
        { id: 4, name: "National Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/National_Museum_of_India.jpg" },
        { id: 5, name: "Indian Museum", location: "Kolkata, India", price: 15, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Indian_Museum_Kolkata.jpg" },
        // ... More museums can be added
        { id: 6, name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya", location: "Mumbai, India", price: 20, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/CSMVS_2.jpg" },
        // Add more museums here (50 total)...
        { id: 7, name: "National Gallery of Modern Art", location: "New Delhi, India", price: 15, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/6/68/National_Gallery_of_Modern_Art.jpg" },
        { id: 8, name: "Raja Dinkar Kelkar Museum", location: "Pune, India", price: 10, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Raja_Dinkar_Kelkar_Museum.jpg" },
        { id: 9, name: "Salar Jung Museum", location: "Hyderabad, India", price: 20, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Salar_Jung_Museum.jpg" },
        { id: 10, name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya", location: "Mumbai, India", price: 15, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/CSMVS_Museum_Interior.jpg" },
        // ... Add more museums to reach 50
        { id: 11, name: "Nehru Science Centre", location: "Mumbai, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Nehru_Science_Centre.jpg" },
        { id: 12, name: "Birla Industrial & Technological Museum", location: "Kolkata, India", price: 12, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/7/78/Birla_Industrial_%26_Technological_Museum.jpg" },
        { id: 13, name: "Maharaja Sawai Man Singh II Museum", location: "Jaipur, India", price: 15, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Maharaja_Sawai_Man_Singh_II_Museum.jpg" },
        { id: 14, name: "Gandhi Smriti", location: "New Delhi, India", price: 8, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Gandhi_Smrity.jpg" },
        { id: 15, name: "Vikram Sarabhai Space Centre", location: "Thiruvananthapuram, India", price: 12, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Vikram_Sarabhai_Space_Centre.jpg" },
        { id: 16, name: "Hindu Temple Museum", location: "Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Hindu_Temple_Museum.jpg" },
        { id: 17, name: "Mahatma Gandhi Museum", location: "Mumbai, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Mahatma_Gandhi_Museum.jpg" },
        { id: 18, name: "Indian Air Force Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/d/db/IAF_Museum.jpg" },
        { id: 19, name: "National Museum of Natural History", location: "New Delhi, India", price: 15, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/2/28/National_Museum_of_Natural_History.jpg" },
        { id: 20, name: "Railway Museum", location: "Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Rail_Museum.jpg" },
        { id: 21, name: "Nehru Memorial Museum", location: "New Delhi, India", price: 12, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Nehru_Memorial_Museum.jpg" },
        { id: 22, name: "Bihar Museum", location: "Patna, India", price: 15, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Bihar_Museum.jpg" },
        { id: 23, name: "Nizam's Museum", location: "Hyderabad, India", price: 12, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Nizams_Museum.jpg" },
        { id: 24, name: "Shankar's International Dolls Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Shankar_Museum.jpg" },
        { id: 25, name: "Mysore Zoo", location: "Mysuru, India", price: 10, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Mysore_Zoo.jpg" },
        { id: 26, name: "Nehru Science Centre", location: "Mumbai, India", price: 12, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Nehru_Science_Centre.jpg" },
        { id: 27, name: "Vikram Sarabhai Space Centre", location: "Thiruvananthapuram, India", price: 12, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Vikram_Sarabhai_Space_Centre.jpg" },
        { id: 28, name: "Gandhi Museum", location: "Kanyakumari, India", price: 10, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Gandhi_Museum_Kanyakumari.jpg" },
        { id: 29, name: "Rajiv Gandhi Museum", location: "Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Rajiv_Gandhi_Museum.jpg" },
        { id: 30, name: "Indira Gandhi Memorial Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Indira_Gandhi_Memorial_Museum.jpg" },
        { id: 31, name: "ISKCON Museum", location: "Mumbai, India", price: 10, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/ISKCON_Museum.jpg" },
        { id: 32, name: "National Science Centre", location: "New Delhi, India", price: 12, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/4/42/National_Science_Centre.jpg" },
        { id: 33, name: "Sanskriti Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Sanskriti_Museum.jpg" },
        { id: 34, name: "Sunil's Museum", location: "Lucknow, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Sunil_Museum.jpg" },
        { id: 35, name: "Indian Museum of Film", location: "Mumbai, India", price: 15, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/1/10/Indian_Museum_of_Film.jpg" },
        { id: 36, name: "Bharat Museum", location: "Delhi, India", price: 12, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Bharat_Museum.jpg" },
        { id: 37, name: "National Gallery of Modern Art", location: "Mumbai, India", price: 15, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/7/76/National_Gallery_of_Modern_Art_Mumbai.jpg" },
        { id: 38, name: "Tihar Jail Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Tihar_Jail_Museum.jpg" },
        { id: 39, name: "Mahatma Gandhi Museum", location: "Ahmedabad, India", price: 12, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Mahatma_Gandhi_Museum_Ahmedabad.jpg" },
        { id: 40, name: "The Vintage Camera Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/5/55/Vintage_Camera_Museum.jpg" },
        { id: 41, name: "Kiran Nadar Museum of Art", location: "Noida, India", price: 12, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/7/73/Kiran_Nadar_Museum.jpg" },
        { id: 42, name: "National Handicrafts Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/National_Handicrafts_Museum.jpg" },
        { id: 43, name: "National Police Museum", location: "New Delhi, India", price: 12, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/1/10/National_Police_Museum.jpg" },
        { id: 44, name: "Rail Transport Museum", location: "New Delhi, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Rail_Transport_Museum.jpg" },
        { id: 45, name: "Indian Museum of Technology", location: "Bangalore, India", price: 12, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Indian_Museum_of_Technology.jpg" },
        { id: 46, name: "Nehru Planetarium", location: "Mumbai, India", price: 10, availability: ["2024-09-25", "2024-09-26"], image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Nehru_Planetarium.jpg" },
        { id: 47, name: "Nehru Art Gallery", location: "Mumbai, India", price: 12, availability: ["2024-09-25", "2024-09-27"], image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Nehru_Art_Gallery.jpg" },
        { id: 48, name: "National Film Archive of India", location: "Pune, India", price: 15, availability: ["2024-09-25", "2024-09-28"], image: "https://upload.wikimedia.org/wikipedia/commons/3/35/National_Film_Archive_of_India.jpg" },
        { id: 49, name: "Visvesvaraya Industrial and Technological Museum", location: "Bangalore, India", price: 10, availability: ["2024-09-25", "2024-09-29"], image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Visvesvaraya_Industrial_and_Technological_Museum.jpg" },
        { id: 50, name: "Archaeological Museum", location: "Sarnath, India", price: 15, availability: ["2024-09-25", "2024-09-30"], image: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Archaeological_Museum_Sarnath.jpg" }
    
    ];

    function addMessage(message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        chatDiv.appendChild(messageElement);
        chatDiv.scrollTop = chatDiv.scrollHeight; // Scroll to bottom on new message
    }

    function greet() {
        addMessage("Hello! I can help you book tickets for museums. Type the number of the museum you want to visit.");
        listMuseums();
    }

    function listMuseums() {
        let message = "Available museums:\n";
        museums.forEach(museum => {
            message += `${museum.id}: ${museum.name}\n`; // Show ID and name
        });
        addMessage(message);
    }

    function sendMessage() {
        const input = userInput.value;
        userInput.value = ''; // Clear input field

        if (!input) return; // Do nothing if the input is empty

        addMessage(`You: ${input}`);
        handleUserInput(input);
    }

    function handleUserInput(input) {
        const selectedMuseum = parseInt(input) - 1;
        if (!isNaN(selectedMuseum) && museums[selectedMuseum]) {
            displayMuseumImage(selectedMuseum);
            selectDate(selectedMuseum);
        } else {
            addMessage("Please select a valid museum number.");
        }
    }

    function displayMuseumImage(museumIndex) {
        const selected = museums[museumIndex];
        museumImage.src = selected.image;
        museumImage.style.display = "block";
    }

    function selectDate(museumIndex) {
        const selected = museums[museumIndex];
        let message = `Available dates: ${selected.availability.join(", ")}\n`;
        message += "Please select a date (format: YYYY-MM-DD): ";
        addMessage(message);
        
        // Create a date input for user to select a date
        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.min = new Date().toISOString().split("T")[0]; // Disable past dates
        chatDiv.appendChild(dateInput);

        dateInput.onchange = function() {
            confirmBooking(museumIndex, dateInput.value);
            dateInput.remove(); // Remove the date input after selection
        };
    }

    function confirmBooking(museumIndex, selectedDate) {
        const selected = museums[museumIndex];
        addMessage(`You selected ${selected.name} on ${selectedDate}. The price is $${selected.price}.`);

        // Create a confirmation button
        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm Booking";
        chatDiv.appendChild(confirmButton);

        confirmButton.onclick = function() {
            addMessage("Booking confirmed! You will receive a ticket with a QR code.");
            confirmButton.remove(); // Remove button after confirmation
            generateTicket(selected, selectedDate);
        };
    }

    function generateTicket(museum, date) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text(20, 20, `Ticket for ${museum.name}`);
        doc.text(20, 30, `Location: ${museum.location}`);
        doc.text(20, 40, `Date: ${date}`);
        doc.text(20, 50, `Price: $${museum.price}`);
        doc.save('ticket.pdf');
    }

    // Start the chatbot
    greet();
</script>

</body>
</html>
