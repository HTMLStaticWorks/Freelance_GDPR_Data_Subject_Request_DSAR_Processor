document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if(mobileToggle && navMenu) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // Theme Toggle (Dark / Light)
    const themeBtn = document.getElementById("theme-btn");
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    if(themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
            }
            localStorage.setItem("theme", theme);
        });
    }

    // RTL Toggle
    const rtlBtn = document.getElementById("rtl-btn");
    const currentDir = localStorage.getItem("dir") || "ltr";
    document.documentElement.setAttribute("dir", currentDir);
    
    if(rtlBtn) {
        rtlBtn.addEventListener("click", () => {
            const newDir = document.documentElement.getAttribute("dir") === "ltr" ? "rtl" : "ltr";
            document.documentElement.setAttribute("dir", newDir);
            localStorage.setItem("dir", newDir);
        });
    }

    // Scroll Animations
    const reveals = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        let windowHeight = window.innerHeight;
        let elementVisible = 150;
        for (let i = 0; i < reveals.length; i++) {
            let elementTop = reveals[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    };
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Sticky Navbar
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "var(--shadow-sm)";
                navbar.style.padding = "0";
            } else {
                navbar.style.boxShadow = "none";
            }
        });
    }

    // FAQ Accordion
    const faqs = document.querySelectorAll(".faq-item");
    faqs.forEach(faq => {
        const question = faq.querySelector(".faq-question");
        if(question) {
            question.addEventListener("click", () => {
                faq.classList.toggle("active");
                const answer = faq.querySelector(".faq-answer");
                if (faq.classList.contains("active")) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });

    // Counters Animation
    const counters = document.querySelectorAll(".counter");
    if(counters.length > 0) {
        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText;
                const speed = 200;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(animateCounters, 10);
                } else {
                    counter.innerText = target;
                }
            });
        };
        
        let counterSection = document.querySelector(".statistics-section");
        let animated = false;
        if(counterSection) {
            window.addEventListener("scroll", () => {
                let sectionTop = counterSection.getBoundingClientRect().top;
                if(sectionTop < window.innerHeight - 100 && !animated) {
                    animateCounters();
                    animated = true;
                }
            });
        }
    }
});
