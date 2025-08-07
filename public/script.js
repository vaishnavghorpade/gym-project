document.addEventListener("DOMContentLoaded", () => {
  const trainerCards = document.querySelectorAll(".trainer-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("zoom-in");
        // Optional: Unobserve to trigger only once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.6 // Trigger when 30% of the card is visible
  });

  trainerCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 100}ms`; // 100ms stagger per card
  observer.observe(card);
});

});

// name change function
const names = ["Raj Malhotra", "Priya Sharma", "Jishan Patel"];
let index = 0;

function animateNames() {
  const nameSpan = document.getElementById("name-animation");
  nameSpan.classList.remove("show");
  
  setTimeout(() => {
    nameSpan.textContent = `By ${names[index]}`;
    nameSpan.classList.add("show");
    index = (index + 1) % names.length;
  }, 300);
}

setInterval(animateNames, 2500); // Every 2.5 seconds

document.getElementById('name-animation').textContent = "Fitness for Life";



