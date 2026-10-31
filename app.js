
"use strict";

/* ==========================================
   EZEQUIEL REYES - PORTFOLIO WEBSITE
   JavaScript File: app.js

   Features:
   1. Mobile Navigation
   2. Project Filtering
   3. Contact Form Validation
========================================== */


/* ==========================================
   1. MOBILE NAVIGATION
========================================== */

// Select the menu button and navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

// Make sure both elements exist
if (menuButton && navigation) {

    // Listen for a click on the menu button
    menuButton.addEventListener("click", function () {

        // Add or remove the "open" class
        const isOpen = navigation.classList.toggle("open");

        // Update accessibility attributes
        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        // Change the button's accessible label
        if (isOpen) {

            menuButton.setAttribute(
                "aria-label",
                "Close navigation"
            );

        } else {

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    });

    // Close the menu after selecting a navigation link
    const navLinks = navigation.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });

}


/* ==========================================
   2. PROJECT FILTERING
========================================== */

// Select filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Select project cards
const projectCards = document.querySelectorAll(".project-card");

// Loop through each filter button
filterButtons.forEach(function (button) {

    // Listen for clicks
    button.addEventListener("click", function () {

        // Get the selected category
        const selectedCategory = button.dataset.filter;

        // Remove active styling from all buttons
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

            btn.setAttribute(
                "aria-pressed",
                "false"
            );

        });

        // Add active styling to clicked button
        button.classList.add("active");

        button.setAttribute(
            "aria-pressed",
            "true"
        );

        // Loop through project cards
        projectCards.forEach(function (card) {

            // Get the card's category
            const projectCategory = card.dataset.category;

            // Determine whether the card matches
            if (
                selectedCategory === "all" ||
                selectedCategory === projectCategory
            ) {

                // Show matching project
                card.hidden = false;

            } else {

                // Hide nonmatching project
                card.hidden = true;

            }

        });

    });

});


/* ==========================================
   3. CONTACT FORM VALIDATION
========================================== */

// Select the contact form
const contactForm = document.querySelector("#contact-form");

// Only run if the contact form exists
if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // Prevent normal form submission
        event.preventDefault();

        // Check HTML required fields and email format
        if (!contactForm.reportValidity()) {
            return;
        }

        // Get form input elements
        const nameInput = document.querySelector("#name");
        const emailInput = document.querySelector("#email");
        const messageInput = document.querySelector("#message");

        // Stop if any expected input is missing
        if (!nameInput || !emailInput || !messageInput) {
            return;
        }

        // Get the user's information
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Check for blank values
        if (name === "" || email === "" || message === "") {

            alert("Please complete all fields.");

            return;

        }

        // Replace this with your real email address
        const recipient = "YOUR_EMAIL@example.com";

        // Prevent using the placeholder address
        if (recipient === "YOUR_EMAIL@example.com") {

            alert("Contact email has not been configured yet.");

            return;

        }

        // Create the email subject
        const subject = "Portfolio Contact from " + name;

        // Create the email body
        const body =
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message;

        // Build the email link
        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        // Open the visitor's email application
        window.location.href = mailtoLink;

    });

}
