// Toggle chatbot visibility
function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'none' || chatbot.style.display === '' ? 'block' : 'none';
}

// Send message from user
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value;

    if (message.trim() === '') return;

    displayMessage(message, 'user-message');

    // Clear input field
    userInput.value = '';

    // Bot response after a short delay
    setTimeout(() => {
        botResponse(message);
    }, 500);
}

// Display message in the chat body
function displayMessage(message, className) {
    const chatBody = document.getElementById('chat-body');
    const messageElement = document.createElement('div');
    messageElement.className = className;
    messageElement.innerText = message;
    chatBody.appendChild(messageElement);

    // Scroll to the bottom of the chat
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Basic bot responses based on user input
function botResponse(message) {
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';

    let response = '';

    if (message.toLowerCase().includes('hours')) {
        response = 'We are open from 9 AM to 5 PM daily, except on public holidays.';
    } else if (message.toLowerCase().includes('ticket')) {
        response = 'The ticket prices are ₹100 for adults, ₹50 for children, and free for senior citizens.';
    } else if (message.toLowerCase().includes('location')) {
        response = 'We are located at the City Palace, Jaipur, Rajasthan.';
    } else if (message.toLowerCase().includes('hello')) {
        response = 'Hello! How can I assist you today?';
    } else {
        response = 'Sorry, I did not understand your question. Can you please ask again?';
    }

    displayMessage(response, 'bot-message');
}

