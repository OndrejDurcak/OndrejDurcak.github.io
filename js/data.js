const modely = [
    { id: "218i", nazev: "BMW 218i Coupé", palivo: "Benzín", vykon: "115 kW (156 k)", cena: 1149200 },
    { id: "220i", nazev: "BMW 220i Coupé", palivo: "Benzín", vykon: "135 kW (184 k)", cena: 1237600 },
    { id: "230i", nazev: "BMW 230i Coupé", palivo: "Benzín", vykon: "180 kW (245 k)", cena: 1354600 },
    { id: "220d", nazev: "BMW 220d Coupé", palivo: "Diesel", vykon: "140 kW (190 k)", cena: 1320800 },
    { id: "m240i", nazev: "BMW M240i xDrive Coupé", palivo: "Benzín", vykon: "288 kW (392 k)", cena: 1561300 }
];

function formatCena(cislo) {
    return Math.round(cislo).toLocaleString("cs-CZ") + " Kč";
}
