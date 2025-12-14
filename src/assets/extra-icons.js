(function() {
    initializeIcon()
    function initializeIcon() {
        if (document.readyState === "loading") return document.addEventListener("DOMContentLoaded", initializeIcon);
        const interval = setInterval(() => {
            if (document.querySelector(".tsd-navigation")) {
                clearInterval(interval);
                updateUseElementsToExternal();
            }
        }, 100);
    }
    function updateUseElementsToExternal() {
        document.querySelectorAll("use").forEach(el => {
            const href = el.getAttribute("href");
            if (href && /^#icon-\d+$/.test(href)) {
                el.setAttribute("href", `../assets/icons.svg${href}`);
            }
        });
    }
})()
