// Tlačítko pro mobilní menu (hamburger)
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {
    nav.classList.toggle("open");
    menuBtn.classList.toggle("open");
});

// Tlačítko "zpět nahoru"
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 600) {
        toTop.classList.add("visible");
    } else {
        toTop.classList.remove("visible");
    }
});

toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// Seznam barev, které si může uživatel vybrat v konfigurátoru
const barvy = [
    { id: "475", nazev: "Black Sapphire metalíza", barva: "#15171a", cena: 0, obrazek: "img/BB_car.webp" },
    { id: "SPY", nazev: "São Paulo Yellow metalíza", barva: "#c7d92c", cena: 26832, obrazek: "img/SP_car.webp" },
    { id: "C68", nazev: "Fire Red metalíza", barva: "#a3141c", cena: 26832, obrazek: "img/RV_car.webp" },
    { id: "C6E", nazev: "M Zandvoort Blue (nemetalický)", barva: "#2c6db4", cena: 26832, obrazek: "img/ZB_car.webp" }
];

// Seznam kol, které si může uživatel vybrat v konfigurátoru
const kola = [
    { id: "1HX", nazev: '18" M kola 848 M Bicolour', cena: 0 },
    { id: "1HL", nazev: '19" M kola 995 M Bicolour', cena: 21684 },
    { id: "1HF", nazev: '19" M kola 995 M Jet Black', cena: 32526 }
];

// Cena za přepravu auta a předprodejní servis
const PREPRAVA = 9000;

// Co má uživatel aktuálně vybrané (na začátku je to první model, černá barva a základní kola)
let vybranyModel = "218i";
let vybranaBarva = "475";
let vybranaKola = "1HX";


// Najde v poli objekt podle jeho id
function najdi(pole, id) {
    for (let i = 0; i < pole.length; i++) {
        if (pole[i].id === id) {
            return pole[i];
        }
    }
    return pole[0];
}


// Vykreslí nabídku modelů jako tlačítka
function vykresliModely() {
    let html = "";

    for (let i = 0; i < modely.length; i++) {
        const m = modely[i];
        let trida = "choice";
        if (m.id === vybranyModel) {
            trida = "choice active";
        }

        html += '<button class="' + trida + '" data-model="' + m.id + '">';
        html += "<strong>" + m.nazev + "</strong>";
        html += "<span>" + m.palivo + " · " + m.vykon + "</span>";
        html += '<span class="choice__price">od ' + formatCena(m.cena) + "</span>";
        html += "</button>";
    }

    document.getElementById("modelChoices").innerHTML = html;
}


// Vykreslí nabídku barev jako barevná kolečka
function vykresliBarvy() {
    let html = "";

    for (let i = 0; i < barvy.length; i++) {
        const b = barvy[i];
        let trida = "color";
        if (b.id === vybranaBarva) {
            trida = "color active";
        }

        html += '<button class="' + trida + '" data-barva="' + b.id + '" title="' + b.nazev + '" ';
        html += 'style="background-color:' + b.barva + '"></button>';
    }

    document.getElementById("colorChoices").innerHTML = html;

    // pod kolečky napíšeme název vybrané barvy a její cenu
    const vybrana = najdi(barvy, vybranaBarva);
    document.getElementById("colorName").textContent = vybrana.nazev + " (+" + formatCena(vybrana.cena) + ")";
}


// Vykreslí nabídku kol jako tlačítka
function vykresliKola() {
    let html = "";

    for (let i = 0; i < kola.length; i++) {
        const k = kola[i];
        let trida = "choice";
        if (k.id === vybranaKola) {
            trida = "choice active";
        }

        html += '<button class="' + trida + '" data-kola="' + k.id + '">';
        html += "<strong>" + k.nazev + "</strong>";
        html += '<span class="choice__price">+' + formatCena(k.cena) + "</span>";
        html += "</button>";
    }

    document.getElementById("wheelChoices").innerHTML = html;
}


// Spočítá celkovou cenu a vypíše souhrn napravo
function vykresliSouhrn() {
    const model = najdi(modely, vybranyModel);
    const barva = najdi(barvy, vybranaBarva);
    const kolo = najdi(kola, vybranaKola);

    // celková cena je součet modelu, barvy, kol a přepravy
    const celkem = model.cena + barva.cena + kolo.cena + PREPRAVA;

    let html = "";
    html += "<li><span>" + model.nazev + "</span><span>" + formatCena(model.cena) + "</span></li>";
    html += "<li><span>" + barva.nazev + "</span><span>+" + formatCena(barva.cena) + "</span></li>";
    html += "<li><span>" + kolo.nazev + "</span><span>+" + formatCena(kolo.cena) + "</span></li>";
    html += "<li><span>Přeprava a předprodejní servis</span><span>+" + formatCena(PREPRAVA) + "</span></li>";

    document.getElementById("summaryList").innerHTML = html;
    document.getElementById("totalPrice").textContent = formatCena(celkem);

    // jméno modelu a fotka auta v barvě, kterou si uživatel vybral
    document.getElementById("previewName").textContent = model.nazev;
    document.getElementById("carImg").src = barva.obrazek;
    document.getElementById("carImg").alt = model.nazev + " – " + barva.nazev;
}


// Překreslí celý konfigurátor znovu (zavoláme po každé změně výběru)
function prekresliKonfigurator() {
    vykresliModely();
    vykresliBarvy();
    vykresliKola();
    vykresliSouhrn();
}


// Tahle část kódu běží jen na stránce s konfigurátorem (nabidka.html)
const konfigurator = document.querySelector(".config");

if (konfigurator) {

    // když přijdeme z hlavní stránky s odkazem typu nabidka.html?model=m240i,
    // předvybereme rovnou ten model
    const adresa = new URLSearchParams(window.location.search);
    const modelZOdkazu = adresa.get("model");
    if (modelZOdkazu) {
        vybranyModel = najdi(modely, modelZOdkazu).id;
    }

    // reakce na kliknutí na tlačítko modelu, barvy nebo kol
    konfigurator.addEventListener("click", function (e) {
        const tlacitko = e.target.closest("button");
        if (!tlacitko) {
            return;
        }

        if (tlacitko.dataset.model) {
            vybranyModel = tlacitko.dataset.model;
        }
        if (tlacitko.dataset.barva) {
            vybranaBarva = tlacitko.dataset.barva;
        }
        if (tlacitko.dataset.kola) {
            vybranaKola = tlacitko.dataset.kola;
        }

        prekresliKonfigurator();
    });

    // první vykreslení po načtení stránky
    prekresliKonfigurator();
}
