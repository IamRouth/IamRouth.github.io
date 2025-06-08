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
const text = `👋 Hi, I am Radheshyam Routh, a passionate and driven postgraduate student of Big Data Analytics (Data Science) at Ramakrishna Mission Vivekananda Educational and Research Institute (RKMVERI), Belur.

My key areas of interest include Deep Learning, Computer Vision, Natural Language Processing (NLP), Time Series Analysis, and Large Language Models (LLMs).`;

let index = 0;
let isTyping = false;
let intervalId = null;

function typeWriter() {
  if (isTyping) return;
  isTyping = true;

  const target = document.getElementById("typewriter-text");
  const cursor = document.querySelector(".cursor");
  target.innerHTML = ""; // clear before typing
  index = 0;

  intervalId = setInterval(() => {
    if (index < text.length) {
      target.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(intervalId);
      isTyping = false;
      setTimeout(() => {
        target.innerHTML = ""; // clear before typing again
        index = 0;
        typeWriter(); // restart
      }, 30000); // 30 seconds pause
    }
  }, 30);

  // blinking cursor effect
  setInterval(() => {
    if (cursor) cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
  }, 500);
}

// start typing on page load (instead of waiting for scroll)
window.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("typewriter-text");
  if (el) typeWriter();
});


 