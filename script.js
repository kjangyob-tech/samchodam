document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    const form = document.querySelector(".contact-form");
    const fadeTargets = document.querySelectorAll(".fade-up, .fade-in");

    const syncHeader = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    const closeMenu = () => {
        if (!menuToggle || !nav) {
            return;
        }

        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    };

    const openMenu = () => {
        if (!menuToggle || !nav) {
            return;
        }

        menuToggle.setAttribute("aria-expanded", "true");
        nav.classList.add("is-open");
        document.body.classList.add("menu-open");
    };

    syncHeader();
    window.addEventListener("scroll", syncHeader);

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";

            if (expanded) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 960) {
                    closeMenu();
                }
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 960) {
                closeMenu();
            }
        });
    }

    if (fadeTargets.length) {
        const observer = new IntersectionObserver((entries, revealObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.18
        });

        fadeTargets.forEach((target) => observer.observe(target));
    }

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const isEnglish = document.documentElement.lang === "en";
            const message = isEnglish
                ? "This demo form does not send data yet. Connect it to your backend or form service next."
                : "현재는 데모 폼이어서 실제 전송은 되지 않습니다. 다음 단계에서 백엔드나 폼 서비스와 연결하면 됩니다.";

            window.alert(message);
        });
    }
});
