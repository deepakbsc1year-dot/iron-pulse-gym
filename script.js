// ==============================
// 1. MOBILE NAVIGATION
// ==============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute("aria-expanded", isOpen);
    menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close the mobile menu after clicking a navigation link.

const navigationItems = navLinks.querySelectorAll("a");

navigationItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");
    });
});

// ==============================
// 2. AUTOMATIC FOOTER YEAR
// ==============================

const yearElement = document.getElementById("year");

yearElement.textContent = new Date().getFullYear();

// ==============================
// 3. CONTACT FORM
// ==============================

// This demo does not have a backend.
// It prepares an email in the visitor's email application.

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const interest = document.getElementById("interest").value;
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(
        "Gym Enquiry - " + interest
    );

    const body = encodeURIComponent(
        "Hello Iron Pulse Fitness,\n\n" +
        "My name is: " + name + "\n" +
        "My email: " + email + "\n" +
        "Interested in: " + interest + "\n\n" +
        "Message:\n" + (message || "I would like to know more.") +
        "\n\nThank you."
    );

    // Replace this demo email with the real gym email
    // before using the website for an actual client.

    const gymEmail = "hello@example.com";

    window.location.href =
        "mailto:" + gymEmail +
        "?subject=" + subject +
        "&body=" + body;
});

// ==============================
// 4. SCROLL REVEAL ANIMATIONS
// ==============================

const revealElements = document.querySelectorAll(
    ".about-content, .about-image, .service-card, " +
    ".plan-card, .contact-content, .contact-form, " +
    ".section-header"
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {

    revealElements.forEach(function (element) {
        element.classList.add("js-reveal");
    });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}

// ==============================
// 5. HIGHLIGHT ACTIVE NAV LINK
// ==============================

const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navigationItems.forEach(function (link) {

                        const matches =
                            link.getAttribute("href") === "#" + currentId;

                        link.classList.toggle("active", matches);

                    });

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}

