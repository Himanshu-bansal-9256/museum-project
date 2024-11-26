document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;
    const rating = document.querySelector('input[name="rating"]:checked') 
        ? document.querySelector('input[name="rating"]:checked').value 
        : 'No rating';

    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Feedback: ${feedback}`);
    console.log(`Rating: ${rating}`);

    alert("Thank you for your feedback!");

    // Clear the form
    document.getElementById('feedbackForm').reset();
});
