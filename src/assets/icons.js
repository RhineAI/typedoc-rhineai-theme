(function() {
    addIcons();
    function addIcons() {
        if (document.readyState === "loading") return document.addEventListener("DOMContentLoaded", addIcons);
        const svg = document.body.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
        svg.innerHTML = `
    <g id="icon-1" class="tsd-no-select">
        <rect fill="var(--color-ts-module)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">M</text>
    </g>
    <g id="icon-2" class="tsd-no-select">
        <rect fill="var(--color-ts-module)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">M</text>
    </g>
    <g id="icon-4" class="tsd-no-select">
        <rect fill="var(--color-ts-namespace)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">N</text>
    </g>
    <g id="icon-8" class="tsd-no-select">
        <rect fill="var(--color-ts-enum)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">E</text>
    </g>
    <g id="icon-16" class="tsd-no-select">
        <rect fill="var(--color-ts-property)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">P</text>
    </g>
    <g id="icon-32" class="tsd-no-select">
        <rect fill="var(--color-ts-variable)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">V</text>
    </g>
    <g id="icon-64" class="tsd-no-select">
        <rect fill="var(--color-ts-function)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">F</text>
    </g>
    <g id="icon-128" class="tsd-no-select">
        <rect fill="var(--color-ts-class)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="-0.02em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">C</text>
    </g>
    <g id="icon-256" class="tsd-no-select">
        <rect fill="var(--color-ts-interface)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">I</text>
    </g>
    <g id="icon-512" class="tsd-no-select">
        <rect fill="var(--color-ts-constructor)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="-0.02em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">C</text>
    </g>
    <g id="icon-1024" class="tsd-no-select">
        <rect fill="var(--color-ts-property)" stroke-width="0" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">P</text>
    </g>
    <g id="icon-2048" class="tsd-no-select">
        <rect fill="var(--color-ts-method)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.07em" dominant-baseline="central" text-anchor="middle">M</text>
    </g>
    <g id="icon-4096" class="tsd-no-select">
        <rect fill="var(--color-ts-function)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">F</text>
    </g>
    <g id="icon-8192" class="tsd-no-select">
        <rect fill="var(--color-ts-property)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">P</text>
    </g>
    <g id="icon-16384" class="tsd-no-select">
        <rect fill="var(--color-ts-constructor)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">C</text>
    </g>
    <g id="icon-32768" class="tsd-no-select">
        <rect fill="var(--color-ts-property)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">P</text>
    </g>
    <g id="icon-65536" class="tsd-no-select">
        <rect fill="var(--color-ts-type-alias)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">T</text>
    </g>
    <g id="icon-131072" class="tsd-no-select">
        <rect fill="var(--color-ts-type-alias)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">T</text>
    </g>
    <g id="icon-262144" class="tsd-no-select">
        <rect fill="var(--color-ts-accessor)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.07em" dominant-baseline="central" text-anchor="middle">A</text>
    </g>
    <g id="icon-524288" class="tsd-no-select">
        <rect fill="var(--color-ts-accessor)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">A</text>
    </g>
    <g id="icon-1048576" class="tsd-no-select">
        <rect fill="var(--color-ts-accessor)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">A</text>
    </g>
    <g id="icon-2097152" class="tsd-no-select">
        <rect fill="var(--color-ts-type-alias)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">T</text>
    </g>
    <g id="icon-4194304" class="tsd-no-select">
        <rect fill="var(--color-ts-reference)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <text fill="var(--color-icon-text)" x="50%" y="50%" dx="0.01em" dy="-0.06em" dominant-baseline="central" text-anchor="middle">R</text>
    </g>
    <g id="icon-8388608" class="tsd-no-select">
        <rect fill="var(--color-icon-background)" stroke="var(--color-document)" stroke-width="1.5" x="1" y="1"
              width="22" height="22" rx="12"></rect>
        <g stroke="var(--color-icon-text)" fill="none" stroke-width="1.5">
            <polygon points="6,5 6,19 18,19, 18,10 13,5"></polygon>
            <line x1="9" y1="9" x2="13" y2="9"></line>
            <line x1="9" y1="12" x2="15" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
        </g>
    </g>
`;
        svg.style.display = "none";
        updateUseElements();
    }

    function updateUseElements() {
        document.querySelectorAll("use").forEach(el => {
            if (el.getAttribute("href").includes("#icon-")) {
                el.setAttribute("href", el.getAttribute("href").replace(/.*#/, "#"));
            }
        });
    }
})()