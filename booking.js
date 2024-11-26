document.getElementById('bookingForm').addEventListener('input', updatePriceBreakdown);
document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const { jsPDF } = window.jspdf;
    const qrCode = new QRious();

    // Getting form inputs
    const adultTickets = parseInt(document.getElementById('adultTickets').value, 10) || 0;
    const childTickets = parseInt(document.getElementById('childTickets').value, 10) || 0;
    const seniorTickets = parseInt(document.getElementById('seniorTickets').value, 10) || 0;
    const selectedNationality = document.querySelector('input[name="nationality"]:checked')?.value;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const date = document.getElementById('date').value.trim();

    // Validation
    if (!name || !email || !contact || !date || !selectedNationality) {
        alert('Please fill in all fields and select a nationality.');
        return;
    }

    const prices = {
        indian: { adult: 100, child: 50, senior: 70, currency: 'INR' },
        foreigner: { adult: 200, child: 100, senior: 140, currency: 'USD' }
    };
    const userPrices = prices[selectedNationality];
    let totalPrice = calculateTotalPrice(userPrices, adultTickets, childTickets, seniorTickets);

    // Generate PDF content
    const doc = new jsPDF();
    const title = "Welcome to Museum of India";
    const thankYouMessage = `Thank you for booking your tickets, ${name}!`;

    // Adding a header
    doc.setFontSize(18);
    doc.text(title, 10, 20);

    // Adding personal details
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 35);
    doc.text(`Contact: ${contact}`, 10, 40);
    doc.text(`Date of Visit: ${date}`, 10, 45);

    // Adding ticket details
    doc.text('Ticket Breakdown:', 10, 55);
    doc.text(document.getElementById('priceBreakdown').textContent || "No tickets selected.", 10, 65);

    // Display total price
    doc.text(`Total Price: ${formatCurrency(totalPrice, userPrices.currency)}`, 10, 90);

    // Generate QR Code
    qrCode.set({
        value: `Name: ${name}, Total Price: ${formatCurrency(totalPrice, userPrices.currency)}`,
        size: 150
    });
    const qrImage = qrCode.toDataURL();
    doc.addImage(qrImage, 'PNG', 140, 30, 50, 50);

    // Save the PDF
    doc.save('BookingConfirmation.pdf');

    // Show confirmation message and hide the form
    showConfirmationMessage(name);
});

// Function to show confirmation message
function showConfirmationMessage(name) {
    const bookingForm = document.getElementById('bookingForm');
    const confirmationDiv = document.getElementById('confirmation');

    // Hide the booking form
    bookingForm.style.display = 'none';

    // Show confirmation message
    confirmationDiv.style.display = 'block';
    confirmationDiv.innerHTML = `<h3>Thank you for booking, ${name}!</h3>
        <p>Your tickets have been confirmed. A PDF of your booking has been downloaded.</p>`;
}

// Function to update the price breakdown dynamically
function updatePriceBreakdown() {
    const adultTickets = parseInt(document.getElementById('adultTickets').value, 10) || 0;
    const childTickets = parseInt(document.getElementById('childTickets').value, 10) || 0;
    const seniorTickets = parseInt(document.getElementById('seniorTickets').value, 10) || 0;
    const selectedNationality = document.querySelector('input[name="nationality"]:checked')?.value;

    if (!selectedNationality) return; // Don't calculate if nationality not selected

    const prices = {
        indian: { adult: 100, child: 50, senior: 70 },
        foreigner: { adult: 200, child: 100, senior: 140 }
    };

    const userPrices = prices[selectedNationality];
    let totalPrice = calculateTotalPrice(userPrices, adultTickets, childTickets, seniorTickets);

    // Update breakdown display
    let breakdown = '';
    if (adultTickets > 0) breakdown += `Adult Tickets (${adultTickets}): ₹${userPrices.adult} each\n`;
    if (childTickets > 0) breakdown += `Child Tickets (${childTickets}): ₹${userPrices.child} each\n`;
    if (seniorTickets > 0) breakdown += `Senior Tickets (${seniorTickets}): ₹${userPrices.senior} each\n`;

    document.getElementById('priceBreakdown').textContent = breakdown.trim();
    document.getElementById('totalPrice').textContent = formatCurrency(totalPrice, userPrices.currency);
}

// Function to calculate total price
function calculateTotalPrice(userPrices, adultTickets, childTickets, seniorTickets) {
    return (
        adultTickets * userPrices.adult +
        childTickets * userPrices.child +
        seniorTickets * userPrices.senior
    );
}

// Function to format currency
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency === 'INR' ? 'INR' : 'USD'
    }).format(amount);
}