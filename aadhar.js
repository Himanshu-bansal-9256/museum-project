// script.js
document.getElementById('aadhaarForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const aadhaarNumber = document.getElementById('aadhaarNumber').value;
    const aadhaarImage = document.getElementById('aadhaarImage').files[0];
    
    // Check if Aadhaar number is valid
    const aadhaarPattern = /^\d{12}$/;
    if (!aadhaarPattern.test(aadhaarNumber)) {
        document.getElementById('message').textContent = "Please enter a valid 12-digit Aadhaar number.";
        return;
    }

    // Check if an image file is uploaded
    if (!aadhaarImage) {
        document.getElementById('message').textContent = "Please upload an Aadhaar image.";
        return;
    }

    // Display success message
    document.getElementById('message').textContent = "Aadhaar details submitted successfully!";
    
    // You can now upload the data to the server or process it further
    console.log('Aadhaar Number:', aadhaarNumber);
    console.log('Uploaded Image:', aadhaarImage);
    
    // If you want to upload this to a server, you'd use FormData and AJAX or Fetch API.
});
