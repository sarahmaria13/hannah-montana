document.addEventListener("DOMContentLoaded", () => {

// =========================================================
// ELEMENTE AUS DER HTML-DATEI
// =========================================================

const map = document.getElementById("europe-map");

const austriaDetail = document.getElementById("austria-detail");
const austriaMap = document.getElementById("austria-map");

const closeAustria = document.getElementById("close-austria");

const tooltip = document.getElementById("map-tooltip");
const tooltipTitle = document.getElementById("tooltip-title");
const tooltipText = document.getElementById("tooltip-text");


// =========================================================
// ZURÜCK ZUR EUROPA-KARTE
// =========================================================

closeAustria.addEventListener("click", () => {

    austriaDetail.classList.remove("active");
    tooltip.style.display = "none";

});


// =========================================================
// EUROPA-KARTE
// =========================================================

map.addEventListener("load", () => {

    const svg = map.contentDocument;

    if (!svg) {
        console.log("Europa-SVG nicht gefunden");
        return;
    }


    // Länder, in denen wir bereits waren
    const countries = {

        AT: {
            title: "Österreich",
            text: "2017–2023 · mehrere Reisen",
            visited: true
        },

        BA: {
            title: "Bosnien und Herzegowina",
            text: "2024 · Cazin",
            visited: true
        },

        CZ: {
            title: "Tschechien",
            text: "2025 · Lipno-Stausee",
            visited: true
        },

        SI: {
            title: "Slowenien",
            text: "2026 · Soča-Tal",
            visited: true
        }

    };


    // =====================================================
    // LÄNDER EINRICHTEN
    // =====================================================

    Object.entries(countries).forEach(([id, countryData]) => {

        const country = svg.getElementById(id);

        if (!country) {
            console.log(id + " nicht gefunden");
            return;
        }


        // Grundfarbe
        if (countryData.visited) {
            country.style.fill = "#9a563d";
        } else {
            country.style.fill = "#f1e9da";
        }

        country.style.cursor = "pointer";


        // =================================================
        // HOVER
        // =================================================

        country.addEventListener("mouseenter", (event) => {

            country.style.fill = "#59614b";

            tooltipTitle.textContent = countryData.title;
            tooltipText.textContent = countryData.text;

            tooltip.style.display = "block";

            moveTooltip(event);

        });


        // =================================================
        // TOOLTIP FOLGT DER MAUS
        // =================================================

        country.addEventListener("mousemove", (event) => {

            moveTooltip(event);

        });


        // =================================================
        // MOUSELEAVE
        // =================================================

        country.addEventListener("mouseleave", () => {

            if (countryData.visited) {
                country.style.fill = "#9a563d";
            } else {
                country.style.fill = "#f1e9da";
            }

            tooltip.style.display = "none";

        });


        // =================================================
        // ÖSTERREICH ÖFFNEN
        // =================================================

        if (id === "AT") {

            country.addEventListener("click", () => {

                austriaDetail.classList.add("active");

                tooltip.style.display = "none";

            });

        }

    });


    // =====================================================
    // TOOLTIP POSITION
    // =====================================================

    function moveTooltip(event) {

        const offset = 15;

        let x = event.clientX + offset;
        let y = event.clientY + offset;

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;


        if (x + tooltipWidth > window.innerWidth) {
            x = event.clientX - tooltipWidth - offset;
        }


        if (y + tooltipHeight > window.innerHeight) {
            y = event.clientY - tooltipHeight - offset;
        }


        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;

    }

});


// =========================================================
// ÖSTERREICH-KARTE
// =========================================================

austriaMap.addEventListener("load", () => {

    const svg = austriaMap.contentDocument;

    if (!svg) {
        console.log("Österreich-SVG nicht gefunden");
        return;
    }


    // =====================================================
    // BUNDESLÄNDER
    // =====================================================

    const states = {

        AT1: {
            title: "Burgenland",
            text: "2019 · Neusiedler See - Podersdorf",
            visited: true
        },

        AT2: {
            title: "Kärnten",
            text: "2018 · Wörthersee - Klagenfurt<br>2020 · Ossiacher See - Ossiach",
            visited: true
        },

        AT3: {
            title: "Niederösterreich",
            text: "2021 · Ottensteiner Stausee - Lichtenfels<br>2022 · Ottensteiner Stausee - Lichtenfels",
            visited: true
        },

        AT4: {
            title: "Oberösterreich",
            text: "2023 · Grabensee - Perwang",
            visited: true
        },

        AT5: {
            title: "Salzburg",
            text: "Noch keine Reise",
            visited: false
        },

        AT6: {
            title: "Steiermark",
            text: "2017 · Leoben",
            visited: true
        },

        AT7: {
            title: "Tirol",
            text: "Noch keine Reise",
            visited: false
        },

        AT8: {
            title: "Vorarlberg",
            text: "Noch keine Reise",
            visited: false
        },

        AT9: {
            title: "Wien",
            text: "Noch keine Reise",
            visited: false
        }

    };


    // =====================================================
    // BUNDESLÄNDER EINRICHTEN
    // =====================================================

    Object.entries(states).forEach(([id, stateData]) => {

        const state = svg.getElementById(id);

        if (!state) {
            console.log(id + " nicht gefunden");
            return;
        }


        // =================================================
        // GRUNDFARBE
        // =================================================

        if (stateData.visited) {
            state.style.setProperty("fill", "#9a563d", "important");
        } else {
            state.style.setProperty("fill", "#ffffff", "important");
        }

        state.style.cursor = "pointer";


        // =================================================
        // HOVER
        // =================================================

        state.addEventListener("mouseenter", (event) => {

            state.style.setProperty("fill", "#59614b", "important");

            tooltipTitle.textContent = stateData.title;
            tooltipText.innerHTML = stateData.text;

            tooltip.style.display = "block";

            moveAustriaTooltip(event);

        });


        // =================================================
        // TOOLTIP FOLGT DER MAUS
        // =================================================

        state.addEventListener("mousemove", (event) => {

            moveAustriaTooltip(event);

        });


        // =================================================
        // MOUSELEAVE
        // =================================================

        state.addEventListener("mouseleave", () => {

            if (stateData.visited) {
                state.style.setProperty("fill", "#9a563d", "important");
            } else {
                state.style.setProperty("fill", "#ffffff", "important");
            }

            tooltip.style.display = "none";

        });


        // =================================================
        // BUNDESLAND ANKLICKEN
        // =================================================

        state.addEventListener("click", () => {

            console.log(stateData.title + " wurde angeklickt");

        });

    });


    // =====================================================
    // TOOLTIP POSITION FÜR ÖSTERREICH
    // =====================================================

    function moveAustriaTooltip(event) {

        const offset = 15;

        let x = event.clientX + offset;
        let y = event.clientY + offset;

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;


        if (x + tooltipWidth > window.innerWidth) {
            x = event.clientX - tooltipWidth - offset;
        }


        if (y + tooltipHeight > window.innerHeight) {
            y = event.clientY - tooltipHeight - offset;
        }


        tooltip.style.left = `${x}px`;
        tooltip.style.top = `${y}px`;

    }

});

});


    // =====================================================
    // Lore
    // =====================================================
function toggleInsider() {
    const list = document.getElementById("insiderList");

    list.classList.toggle("active");
}


    // =====================================================
    // Sidequests
    // =====================================================
function toggleSidequests() {
    const list = document.getElementById("sidequestList");

    list.classList.toggle("active");
}