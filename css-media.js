window.addEventListener("DOMContentLoaded", function () {
    const mediaQueries = {
        "_": ["screen", "print"],
        "any-hover": ["hover", "none"],
        "any-pointer": ["none", "coarse", "fine"],
        "display-mode": ["fullscreen", "standalone", "minimal-ui", "browser"],
        "forced-colors": ["none", "active"],
        "grid": ["0", "1"],
        "hover": ["hover", "none"],
        "inverted-colors": ["none", "inverted"],
        "orientation": ["portrait", "landscape"],
        "overflow-block": ["none", "scroll", "optional-paged", "paged"],
        "overflow-inline": ["none", "scroll"],
        "pointer": ["none", "coarse", "fine"],
        "prefers-color-scheme": ["light", "dark"],
        "prefers-contrast": ["no-preference", "more", "less", "custom"],
        "prefers-reduced-motion": ["no-preference", "reduce"],
        "scripting": ["none", "initial-only", "enabled"],
        "update": ["none", "slow", "fast"]
    };

    const cssData = [];
    const htmlData = ["<table>"];


    for (let query in mediaQueries) {

        htmlData.push("<tr><th>");
        if (query === "_") {
            htmlData.push("<a href='https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_types'>Media type</a>");
        } else {
            htmlData.push(`<a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/${query}" title="${query}">${query}</a>`);
        }
        htmlData.push(":</th><td>");

        htmlData.push(`<span class='default' id='${query}-ns'>(not supported/&#8203;unknown)</span>`);
        for (let opt of mediaQueries[query]) {
            htmlData.push(` <span class="opt" id="${query}-opt-${opt}">${opt}</span>`);

            let mediaFullQuery = query === "_" ? opt : `(${query}: ${opt})`;

            cssData.push(`@media ${mediaFullQuery} {`);
            cssData.push(`#${query}-ns { display: none; }`);
            cssData.push(`#${query}-opt-${opt} { display: inline; }`);
            cssData.push("}");
        }
        htmlData.push("</td></tr>");
    }

    htmlData.push("</table>");
    document.querySelector("main").insertAdjacentHTML("beforeend", htmlData.join(""));

    const styleTag = document.createElement("style");
    styleTag.textContent = cssData.join("\n");
    document.head.appendChild(styleTag);
});
