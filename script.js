const form = document.getElementById("registrationForm");
const successMsg = document.getElementById("successMsg");

// 🔹 Replace this with your Google Apps Script Web App URL
const scriptURL = "https://script.google.com/macros/s/AKfycbyNE3t3MWShiz0AJUZV982Kw2Dxfh5ZJWHvHSGmFvRCjKoLRRXsG_L97QLC5fGCnFwJuw/exec";

form.addEventListener("submit", e => {
    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        qualification: form.qualification.value,
        course: form.course.value,
        gender: form.gender.value,
        message: form.message.value
    };

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if(data.status === "success"){
            successMsg.textContent = "Thank you! Your registration has been saved.";
            form.reset();
        } else {
            successMsg.textContent = "Error: " + data.message;
        }
    })
    .catch(error => {
        successMsg.textContent = "Error connecting to Google Sheets.";
        console.error("Error!", error.message);
    });
});
