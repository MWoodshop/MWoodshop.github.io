'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
}

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay = revealDelayElements[i].dataset.revealDelay;
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/**
 * SMOOTH SCROLL FOR NAV LINKS
 */
const navLinks = document.querySelectorAll('.navbar-link[href^="#"]'); // Select nav links

const smoothScroll = function (event) {
  const targetId = event.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);

  if (targetSection) {
    event.preventDefault(); // Prevent default anchor click behavior
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // If navbar is active (e.g., on mobile), close it after clicking
    if (navbar.classList.contains('active')) {
      toggleNavbar();
    }
  }
}

addEventOnElements(navLinks, 'click', smoothScroll);

/**
 * Formspree Form Submission with AJAX
 */
document.addEventListener("DOMContentLoaded", function() {
  // Get the form element
  var form = document.getElementById("contactForm");

  // Add an event listener for form submission
  form.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent the default form submission

      var formData = new FormData(form);

      // Send the form data to Formspree using Fetch API
      fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
              'Accept': 'application/json' // Expect a JSON response
          },
      }).then(response => {
          if (response.ok) {
              // Show your success message or popup here
              alert('Thanks! Your message has been sent successfully.');
              form.reset(); // Reset the form fields
          } else {
              // Show an error message or popup if something went wrong
              alert('Oops! There was a problem with your submission.');
          }
      }).catch(error => {
          // Handle any other errors
          console.error('Error:', error);
          alert('Oops! There was a problem with your submission.');
      });
  });
});
