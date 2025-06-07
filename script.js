// Initialize EmailJS
(function () {
  emailjs.init("7eDg_5x0ObR1KvLoZ"); // 🔁 Replace with your EmailJS Public Key
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Send the form data using EmailJS
  emailjs.sendForm("service_mktzdl9", "template_5jpdwjg", this)
    .then(function () {
      alert("✅ Message sent successfully!");
      document.getElementById("contact-form").reset(); // Clear the form
    }, function (error) {
      alert("❌ Failed to send message.\n\nError: " + JSON.stringify(error));
    });
});
