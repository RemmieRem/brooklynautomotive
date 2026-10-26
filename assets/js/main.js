/* ==========================================================================
   Brooklyn Automotive – scripts
   - iconen, mobiel menu, openingstijden
   - occasions laden uit data/autos.json (uitgelicht op home, volledig met filter op occasions.html)
   - reviews laden uit data/reviews.json en tonen in een carousel
   ========================================================================== */

/* ---------- Instellingen ---------- */

// VOORBEELDTIJDEN – pas hier de echte openingstijden aan (24-uursnotatie, null = gesloten).
const OPENINGSTIJDEN = [
  { dag: "Maandag", open: "08:00", dicht: "17:30" },
  { dag: "Dinsdag", open: "08:00", dicht: "17:30" },
  { dag: "Woensdag", open: "08:00", dicht: "17:30" },
  { dag: "Donderdag", open: "08:00", dicht: "17:30" },
  { dag: "Vrijdag", open: "08:00", dicht: "17:30" },
  { dag: "Zaterdag", open: "09:00", dicht: "13:00" },
  { dag: "Zondag", open: null, dicht: null },
];

const DATA_AUTOS = "data/autos.json";
const DATA_REVIEWS = "data/reviews.json";

// Contactgegevens voor links die het script zelf maakt (bellen/WhatsApp vanaf de detailpagina).
// WhatsApp-nummer internationaal zonder + of 0, bijv. 31612345678.
const TELEFOON = "[TELEFOON]";
const WHATSAPP_NUMMER = "[WHATSAPP-NUMMER]";

const detailUrl = (auto) => `auto.html?id=${encodeURIComponent(auto.id)}`;

/* ---------- Iconen (SVG-sprite, één keer in de pagina gezet) ---------- */

const ICONEN = {
  telefoon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  klok: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pijl: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  links: '<path d="m15 18-6-6 6-6"/>',
  rechts: '<path d="m9 18 6-6-6-6"/>',
  vink: '<path d="M20 6 9 17l-5-5"/>',
  kalender: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  teller: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  brandstof: '<path d="M3 22h12"/><path d="M4 9h10"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  versnelling: '<circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><path d="M5 7v10M12 7v10M19 7v4a1 1 0 0 1-1 1H5"/>',
  auto: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  moersleutel: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  schild: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  mensen: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  praat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  klembord: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  druppel: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/>',
  band: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v6M12 16v6M2 12h6M16 12h6"/>',
  sneeuw: '<path d="M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>',
  hartslag: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  foto: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  sluit: '<path d="M18 6 6 18M6 6l12 12"/>',
  extern: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
};
const ICONEN_VOL = {
  ster: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  whatsapp: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41z"/>',
};

function plaatsIconen() {
  const symbolen = Object.entries(ICONEN)
    .map(([naam, pad]) => `<symbol id="i-${naam}" viewBox="0 0 24 24">${pad}</symbol>`)
    .concat(Object.entries(ICONEN_VOL).map(([naam, pad]) => `<symbol id="i-${naam}" viewBox="0 0 24 24">${pad}</symbol>`))
    .join("");
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">${symbolen}</svg>`
  );
}

function icoon(naam, extraKlasse = "") {
  const vol = naam in ICONEN_VOL ? " icon-vol" : "";
  return `<svg class="icon${vol} ${extraKlasse}" aria-hidden="true"><use href="#i-${naam}"></use></svg>`;
}

/* ---------- Hulpfuncties ---------- */

const euro = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const getal = new Intl.NumberFormat("nl-NL");

function esc(waarde) {
  return String(waarde ?? "").replace(/[&<>"']/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]);
}

async function laadJson(pad) {
  const antwoord = await fetch(pad, { cache: "no-cache" });
  if (!antwoord.ok) throw new Error(`${pad}: HTTP ${antwoord.status}`);
  return antwoord.json();
}

function foutmelding(fout) {
  console.error(fout);
  if (location.protocol === "file:") {
    return `De gegevens konden niet worden geladen omdat de pagina direct als bestand is geopend.<br>
      Start de demo via <code>start-demo.ps1</code> (of een andere lokale webserver) en open <code>http://localhost:8080</code>.`;
  }
  return "Het aanbod kon op dit moment niet worden geladen. Probeer het later opnieuw of neem contact met ons op.";
}

/* ---------- Mobiel menu ---------- */

function initMenu() {
  const menu = document.getElementById("mobiel-menu");
  const openKnop = document.querySelector("[data-menu-open]");
  if (!menu || !openKnop) return;
  const sluitKnop = menu.querySelector("[data-menu-sluit]");

  const zet = (open) => {
    menu.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    openKnop.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    if (open) sluitKnop.focus();
    else openKnop.focus({ preventScroll: true });
  };

  openKnop.addEventListener("click", () => zet(true));
  sluitKnop.addEventListener("click", () => zet(false));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => zet(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) zet(false);
  });
}

/* ---------- Openingstijden ---------- */

function naarMinuten(tijd) {
  const [u, m] = tijd.split(":").map(Number);
  return u * 60 + m;
}

function initOpeningstijden() {
  const nu = new Date();
  const vandaagIndex = (nu.getDay() + 6) % 7; // maandag = 0
  const tijdTekst = (d) => (d.open ? `${d.open} – ${d.dicht}` : "Gesloten");

  document.querySelectorAll("[data-openingstijden]").forEach((tbody) => {
    tbody.innerHTML = OPENINGSTIJDEN.map(
      (d, i) => `<tr${i === vandaagIndex ? ' class="vandaag"' : ""}><td>${d.dag}</td><td>${tijdTekst(d)}</td></tr>`
    ).join("");
  });

  document.querySelectorAll("[data-openingstijden-kort]").forEach((ul) => {
    ul.innerHTML = `
      <li><span>Ma – vr</span><span>${tijdTekst(OPENINGSTIJDEN[0])}</span></li>
      <li><span>Zaterdag</span><span>${tijdTekst(OPENINGSTIJDEN[5])}</span></li>
      <li><span>Zondag</span><span>${tijdTekst(OPENINGSTIJDEN[6])}</span></li>`;
  });

  // Status "Nu geopend" / "Gesloten"
  const vandaag = OPENINGSTIJDEN[vandaagIndex];
  const minuten = nu.getHours() * 60 + nu.getMinutes();
  let tekst;
  let open = false;
  if (vandaag.open && minuten >= naarMinuten(vandaag.open) && minuten < naarMinuten(vandaag.dicht)) {
    open = true;
    tekst = `Nu geopend tot ${vandaag.dicht}`;
  } else if (vandaag.open && minuten < naarMinuten(vandaag.open)) {
    tekst = `Gesloten · vandaag open vanaf ${vandaag.open}`;
  } else {
    for (let stap = 1; stap <= 7; stap++) {
      const volgende = OPENINGSTIJDEN[(vandaagIndex + stap) % 7];
      if (volgende.open) {
        const dagNaam = stap === 1 ? "morgen" : volgende.dag.toLowerCase();
        tekst = `Gesloten · ${dagNaam} open vanaf ${volgende.open}`;
        break;
      }
    }
  }
  document.querySelectorAll("[data-open-status]").forEach((el) => {
    el.innerHTML = `<span class="status-stip ${open ? "open" : "dicht"}"></span>${esc(tekst)}`;
  });
}

/* ---------- Occasions ---------- */

function fotoCredits(fotos) {
  const credits = fotos.filter((f) => f.credit && f.credit.naam);
  if (!credits.length) return "";
  const eerste = credits[0].credit;
  return `<p class="foto-credit">Foto's: <a href="${esc(eerste.url)}" target="_blank" rel="noopener">${esc(eerste.naam)}</a>, Wikimedia Commons (${esc(eerste.licentie)})</p>`;
}

function autoKaart(auto) {
  const titel = `${auto.merk} ${auto.model}`;
  const fotos = auto.fotos?.length ? auto.fotos : [{ src: "assets/img/logo-icoon.png", alt: titel }];
  const meerdere = fotos.length > 1;
  const verkocht = auto.status === "verkocht";
  const url = detailUrl(auto);
  const label =
    verkocht ? lintVerkocht()
    : auto.status === "gereserveerd" ? '<span class="auto-badge gereserveerd">Gereserveerd</span>'
    : "";

  return `
    <article class="auto-kaart klikbaar verschijn${verkocht ? " is-verkocht" : ""}" aria-label="${esc(titel)}" data-href="${esc(url)}">
      <div class="galerij" data-galerij>
        ${label}
        <div class="galerij-track" tabindex="0" aria-label="Foto's van de ${esc(titel)}">
          ${fotos.map((f, i) => `<img src="${esc(f.src)}" alt="${esc(f.alt || titel)}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" width="1200" height="800">`).join("")}
        </div>
        ${meerdere ? `
          <button class="galerij-knop vorige" type="button" aria-label="Vorige foto" disabled>${icoon("links")}</button>
          <button class="galerij-knop volgende" type="button" aria-label="Volgende foto">${icoon("rechts")}</button>
          <span class="galerij-teller">${icoon("foto")}<span><span data-teller>1</span>/${fotos.length}</span></span>` : ""}
      </div>
      <div class="auto-body">
        <div class="auto-merk">${esc(auto.merk)}</div>
        <h3 class="auto-titel"><a href="${esc(url)}">${esc(auto.model)}</a></h3>
        <p class="auto-uitvoering">${esc(auto.uitvoering)}</p>
        <ul class="specs">
          <li>${icoon("kalender")}<span class="spec-label">Bouwjaar:</span>${esc(auto.bouwjaar)}</li>
          <li>${icoon("teller")}<span class="spec-label">Kilometerstand:</span>${getal.format(auto.kilometerstand)} km</li>
          <li>${icoon("brandstof")}<span class="spec-label">Brandstof:</span>${esc(auto.brandstof)}</li>
          <li>${icoon("versnelling")}<span class="spec-label">Transmissie:</span>${esc(auto.transmissie)}</li>
        </ul>
        <div class="auto-prijs">
          <span class="prijs">${euro.format(auto.prijs)}</span>
          <span class="prijs-noot">${verkocht ? "Verkocht" : "Rijklaar"}</span>
        </div>
        <span class="auto-meer" aria-hidden="true">Bekijk details ${icoon("pijl")}</span>
        ${fotoCredits(fotos)}
      </div>
    </article>`;
}

function lintVerkocht(extraKlasse = "") {
  return `<div class="lint-verkocht ${extraKlasse}"><span>Verkocht</span></div>`;
}

// Klik ergens op de kaart = naar de detailpagina (behalve op de fotopijltjes en links)
function maakKaartenKlikbaar(container) {
  container.querySelectorAll(".auto-kaart.klikbaar").forEach((kaart) => {
    kaart.addEventListener("click", (e) => {
      if (e.target.closest("a, button") || window.getSelection().toString()) return;
      location.href = kaart.dataset.href;
    });
  });
}

function initGalerijen(container) {
  container.querySelectorAll("[data-galerij]").forEach((galerij) => {
    const track = galerij.querySelector(".galerij-track");
    const vorige = galerij.querySelector(".vorige");
    const volgende = galerij.querySelector(".volgende");
    const teller = galerij.querySelector("[data-teller]");
    if (!vorige) return;
    const aantal = track.children.length;

    const index = () => Math.round(track.scrollLeft / track.clientWidth);
    const ga = (i) => track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    const update = () => {
      const i = index();
      if (teller) teller.textContent = i + 1;
      vorige.disabled = i <= 0;
      volgende.disabled = i >= aantal - 1;
      galerij.dispatchEvent(new CustomEvent("fotowissel", { detail: i }));
    };
    galerij.gaNaarFoto = ga;

    vorige.addEventListener("click", () => ga(index() - 1));
    volgende.addEventListener("click", () => ga(index() + 1));
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); ga(index() + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); ga(index() - 1); }
    });
  });
}

/* ---------- Mobiele swipe-carousels (diensten en uitgelichte occasions) ---------- */

// Op mobiel maakt CSS van [data-swipe] een horizontale rij; hier komen de stipjes eronder.
// Op desktop zijn de stipjes verborgen en is de rij gewoon een grid.
function initSwipe(track) {
  const kaarten = [...track.children].filter((k) => !k.matches(".lijst-fout, .lijst-leeg"));
  let stippen = track.nextElementSibling;
  if (!stippen?.classList.contains("swipe-stippen")) {
    stippen = document.createElement("div");
    stippen.className = "swipe-stippen";
    track.after(stippen);
    track.addEventListener("scroll", () => requestAnimationFrame(() => markeerSwipe(track)), { passive: true });
    window.addEventListener("resize", () => markeerSwipe(track));
  }
  if (kaarten.length < 2) {
    stippen.innerHTML = "";
    return;
  }
  const naam = track.getAttribute("aria-label") || "kaart";
  stippen.innerHTML = kaarten.map((_, i) =>
    `<button type="button" aria-label="${esc(naam)}: ${i + 1} van ${kaarten.length}"></button>`).join("");
  stippen.querySelectorAll("button").forEach((knop, i) => knop.addEventListener("click", () => {
    track.scrollTo({ left: kaarten[i].offsetLeft - kaarten[0].offsetLeft, behavior: "smooth" });
  }));
  markeerSwipe(track);
}

function markeerSwipe(track) {
  const knoppen = track.nextElementSibling?.querySelectorAll("button");
  if (!knoppen?.length) return;
  const eerste = track.children[0];
  const stap = track.children[1] ? track.children[1].offsetLeft - eerste.offsetLeft : track.clientWidth;
  const opEinde = track.scrollLeft > 0 && track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  const actief = opEinde ? knoppen.length - 1 : Math.round(track.scrollLeft / stap);
  knoppen.forEach((k, i) => k.setAttribute("aria-current", String(i === actief)));
}

function toonAutos(container, autos) {
  container.innerHTML = autos.map(autoKaart).join("");
  initGalerijen(container);
  maakKaartenKlikbaar(container);
  if (container.hasAttribute("data-swipe")) initSwipe(container);
  initVerschijnen(container);
}

function skeletKaarten(aantal) {
  return Array.from({ length: aantal }, () => `
    <div class="auto-kaart" aria-hidden="true">
      <div class="galerij skelet" style="border-radius:0"></div>
      <div class="auto-body">
        <div class="skelet" style="height:14px;width:30%;margin-bottom:10px"></div>
        <div class="skelet" style="height:26px;width:60%;margin-bottom:10px"></div>
        <div class="skelet" style="height:16px;width:45%;margin-bottom:22px"></div>
        <div class="skelet" style="height:70px;margin-bottom:18px"></div>
        <div class="skelet" style="height:46px"></div>
      </div>
    </div>`).join("");
}

const nieuwsteEerst = (a, b) => String(b.toegevoegd).localeCompare(String(a.toegevoegd));

// Home: uitgelichte auto's
async function initUitgelicht() {
  const container = document.querySelector("[data-uitgelicht]");
  if (!container) return;
  container.innerHTML = skeletKaarten(3);
  try {
    const { autos } = await laadJson(DATA_AUTOS);
    const beschikbaar = autos.filter((a) => a.status !== "verkocht").sort(nieuwsteEerst);
    const uitgelicht = beschikbaar.filter((a) => a.uitgelicht);
    const selectie = (uitgelicht.length ? uitgelicht : beschikbaar).slice(0, 3);
    toonAutos(container, selectie);
    document.querySelectorAll("[data-aantal-autos]").forEach((el) => (el.textContent = beschikbaar.length));
  } catch (fout) {
    container.innerHTML = `<p class="lijst-fout">${foutmelding(fout)}</p>`;
  }
}

// Occasions-pagina: volledig overzicht met filter
async function initOccasions() {
  const container = document.getElementById("occasions-lijst");
  if (!container) return;
  const merkSelect = document.getElementById("filter-merk");
  const prijsSelect = document.getElementById("filter-prijs");
  const sorteerSelect = document.getElementById("sorteer");
  const resetKnop = document.getElementById("filter-reset");
  const aantalEl = document.getElementById("resultaat-aantal");

  container.innerHTML = skeletKaarten(6);
  let autos;
  try {
    ({ autos } = await laadJson(DATA_AUTOS));
  } catch (fout) {
    container.innerHTML = `<p class="lijst-fout">${foutmelding(fout)}</p>`;
    aantalEl.textContent = "0";
    return;
  }

  // Merken vullen vanuit de data
  const merken = [...new Set(autos.map((a) => a.merk))].sort((a, b) => a.localeCompare(b, "nl"));
  merkSelect.insertAdjacentHTML("beforeend", merken.map((m) => `<option value="${esc(m)}">${esc(m)}</option>`).join(""));

  // Filters uit de URL overnemen (bv. occasions.html?merk=Volkswagen)
  const params = new URLSearchParams(location.search);
  if (params.get("merk") && merken.includes(params.get("merk"))) merkSelect.value = params.get("merk");
  if (params.get("max") && [...prijsSelect.options].some((o) => o.value === params.get("max"))) prijsSelect.value = params.get("max");
  if (params.get("sorteer") && [...sorteerSelect.options].some((o) => o.value === params.get("sorteer"))) sorteerSelect.value = params.get("sorteer");

  const sorteerders = {
    nieuwste: nieuwsteEerst,
    "prijs-laag": (a, b) => a.prijs - b.prijs,
    "prijs-hoog": (a, b) => b.prijs - a.prijs,
    "km-laag": (a, b) => a.kilometerstand - b.kilometerstand,
    "jaar-nieuw": (a, b) => b.bouwjaar - a.bouwjaar,
  };

  const pasToe = () => {
    const merk = merkSelect.value;
    const max = Number(prijsSelect.value) || Infinity;
    const resultaat = autos
      .filter((a) => (!merk || a.merk === merk) && a.prijs <= max)
      .sort((a, b) => (a.status === "verkocht") - (b.status === "verkocht")
        || (sorteerders[sorteerSelect.value] || nieuwsteEerst)(a, b)); // verkochte auto's achteraan

    aantalEl.textContent = resultaat.length;
    resetKnop.hidden = !merk && !prijsSelect.value;

    if (resultaat.length) {
      toonAutos(container, resultaat);
    } else {
      container.innerHTML = `<div class="lijst-leeg"><p><strong>Geen occasions gevonden met deze filters.</strong></p>
        <p>Pas de filters aan of laat ons weten waar u naar zoekt; we kijken graag met u mee.</p>
        <button class="btn btn-omlijnd btn-klein" type="button" data-wis>Filters wissen</button></div>`;
      container.querySelector("[data-wis]").addEventListener("click", wis);
    }

    const nieuweParams = new URLSearchParams();
    if (merk) nieuweParams.set("merk", merk);
    if (prijsSelect.value) nieuweParams.set("max", prijsSelect.value);
    if (sorteerSelect.value !== "nieuwste") nieuweParams.set("sorteer", sorteerSelect.value);
    const qs = nieuweParams.toString();
    history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
  };

  const wis = () => {
    merkSelect.value = "";
    prijsSelect.value = "";
    pasToe();
  };

  [merkSelect, prijsSelect, sorteerSelect].forEach((s) => s.addEventListener("change", pasToe));
  resetKnop.addEventListener("click", wis);
  pasToe();
}

/* ---------- Detailpagina (auto.html?id=...) ---------- */

// Rijen in de tabel "Specificaties". Lege waarden worden overgeslagen.
// Later uitbreiden met RDW-velden is één regel per veld, bijv. ["APK geldig tot", (a) => a.rdw?.apk].
const SPECIFICATIES = [
  ["Merk", (a) => a.merk],
  ["Model", (a) => a.model],
  ["Uitvoering", (a) => a.uitvoering],
  ["Bouwjaar", (a) => a.bouwjaar],
  ["Kilometerstand", (a) => a.kilometerstand != null && `${getal.format(a.kilometerstand)} km`],
  ["Brandstof", (a) => a.brandstof],
  ["Transmissie", (a) => a.transmissie],
  ["Carrosserie", (a) => a.carrosserie],
  ["Kleur", (a) => a.kleur],
  ["Vermogen", (a) => a.vermogen_pk && `${a.vermogen_pk} pk`],
  ["Aantal deuren", (a) => a.deuren],
];

function whatsappLink(auto) {
  const naam = `${auto.merk} ${auto.model} ${auto.uitvoering}`.trim();
  const vraag = auto.status === "verkocht"
    ? "Ik zie dat deze verkocht is. Hebben jullie iets vergelijkbaars?"
    : "Is deze auto nog beschikbaar?";
  const tekst = `Hallo Brooklyn Automotive, ik heb een vraag over de ${naam} (${auto.bouwjaar}, ${euro.format(auto.prijs)}). ${vraag}\n${location.href}`;
  return `https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(tekst)}`;
}

function detailHtml(auto) {
  const titel = `${auto.merk} ${auto.model}`;
  const fotos = auto.fotos?.length ? auto.fotos : [{ src: "assets/img/logo-icoon.png", alt: titel }];
  const verkocht = auto.status === "verkocht";
  const meerdere = fotos.length > 1;
  const specRijen = SPECIFICATIES
    .map(([label, waarde]) => [label, waarde(auto)])
    .filter(([, w]) => w !== undefined && w !== null && w !== false && w !== "")
    .map(([label, w]) => `<tr><th scope="row">${esc(label)}</th><td>${esc(w)}</td></tr>`).join("");

  return `
    <div class="detail-grid">
      <div>
        <div class="galerij detail-galerij" data-galerij>
          ${verkocht ? lintVerkocht("groot") : auto.status === "gereserveerd" ? '<span class="auto-badge gereserveerd">Gereserveerd</span>' : ""}
          <div class="galerij-track" tabindex="0" aria-label="Foto's van de ${esc(titel)}">
            ${fotos.map((f, i) => `<img src="${esc(f.src)}" alt="${esc(f.alt || titel)}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" width="1200" height="800">`).join("")}
          </div>
          ${meerdere ? `
            <button class="galerij-knop vorige" type="button" aria-label="Vorige foto" disabled>${icoon("links")}</button>
            <button class="galerij-knop volgende" type="button" aria-label="Volgende foto">${icoon("rechts")}</button>
            <span class="galerij-teller">${icoon("foto")}<span><span data-teller>1</span>/${fotos.length}</span></span>` : ""}
        </div>
        ${meerdere ? `<div class="duimnagels" aria-label="Kies een foto">
          ${fotos.map((f, i) => `<button type="button" aria-label="Foto ${i + 1}" aria-current="${i === 0}"><img src="${esc(f.src)}" alt="" loading="lazy"></button>`).join("")}
        </div>` : ""}
        ${fotoCredits(fotos)}
      </div>

      <aside class="detail-paneel" aria-label="Samenvatting">
        <div class="auto-merk">${esc(auto.merk)}</div>
        <h1>${esc(auto.model)}</h1>
        <p class="auto-uitvoering">${esc(auto.uitvoering)}</p>
        ${verkocht ? '<p class="detail-status-verkocht"><strong>Deze auto is verkocht.</strong> Op zoek naar iets vergelijkbaars? We denken graag met u mee.</p>' : ""}
        <ul class="specs">
          <li>${icoon("kalender")}<span class="spec-label">Bouwjaar:</span>${esc(auto.bouwjaar)}</li>
          <li>${icoon("teller")}<span class="spec-label">Kilometerstand:</span>${getal.format(auto.kilometerstand)} km</li>
          <li>${icoon("brandstof")}<span class="spec-label">Brandstof:</span>${esc(auto.brandstof)}</li>
          <li>${icoon("versnelling")}<span class="spec-label">Transmissie:</span>${esc(auto.transmissie)}</li>
        </ul>
        <div class="detail-prijs${verkocht ? " verkocht" : ""}">
          <span class="prijs">${euro.format(auto.prijs)}</span>
          <span class="prijs-noot">${verkocht ? "Verkocht" : "Rijklaar"}</span>
        </div>
        <div class="detail-contact">
          <p>${verkocht ? "Interesse in een vergelijkbare auto?" : "Vragen of een proefrit plannen?"}</p>
          <a class="btn btn-rood" href="tel:${esc(TELEFOON)}">${icoon("telefoon")}Bel ${esc(TELEFOON)}</a>
          <a class="btn btn-whatsapp" href="${esc(whatsappLink(auto))}" target="_blank" rel="noopener">${icoon("whatsapp")}WhatsApp over deze auto</a>
        </div>
        <a class="detail-terug" href="occasions.html">${icoon("links")}Terug naar het aanbod</a>
      </aside>
    </div>

    <div class="detail-blokken">
      <div>
        ${auto.beschrijving ? `<section class="detail-blok"><h2>Beschrijving</h2><p>${esc(auto.beschrijving)}</p></section>` : ""}
        ${auto.opties?.length ? `<section class="detail-blok"><h2>Uitrusting</h2>
          <ul class="opties">${auto.opties.map((o) => `<li>${icoon("vink")}${esc(o)}</li>`).join("")}</ul></section>` : ""}
      </div>
      <div>
        <section class="detail-blok"><h2>Specificaties</h2><table class="spec-tabel"><tbody>${specRijen}</tbody></table></section>
        <!-- Plek voor RDW-gegevens (APK, eerste toelating, ...); gevuld door toonRdwGegevens() zodra die gekoppeld is -->
        <section class="detail-blok" id="rdw-gegevens" hidden></section>
      </div>
    </div>`;
}

// Uitbreidingspunt voor de RDW-koppeling. Vul in autos.json het veld 'kenteken' en haal hier de
// gegevens op uit de open data van de RDW, bijv.:
//   https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=AB123C   (hoofdletters, zonder streepjes)
// en toon ze in #rdw-gegevens. Zolang er geen kenteken is, blijft het blok verborgen.
function toonRdwGegevens(auto) {
  if (!auto.kenteken) return;
}

async function initDetail() {
  const container = document.getElementById("auto-detail");
  if (!container) return;
  const id = new URLSearchParams(location.search).get("id");

  let autos;
  try {
    ({ autos } = await laadJson(DATA_AUTOS));
  } catch (fout) {
    container.innerHTML = `<p class="lijst-fout">${foutmelding(fout)}</p>`;
    return;
  }

  const auto = autos.find((a) => a.id === id);
  if (!auto) {
    container.innerHTML = `<div class="lijst-leeg"><p><strong>Deze occasion kon niet worden gevonden.</strong></p>
      <p>Mogelijk staat hij niet meer in ons aanbod.</p>
      <a class="btn btn-omlijnd btn-klein" href="occasions.html">Bekijk het actuele aanbod</a></div>`;
    return;
  }

  const naam = `${auto.merk} ${auto.model}`;
  document.title = `${naam} ${auto.uitvoering} | Brooklyn Automotive Breukelen`;
  document.querySelectorAll("[data-kruimel-auto]").forEach((el) => (el.textContent = naam));
  container.innerHTML = detailHtml(auto);
  initGalerijen(container);

  // Duimnagels gekoppeld aan de grote foto
  const galerij = container.querySelector("[data-galerij]");
  const duimen = [...container.querySelectorAll(".duimnagels button")];
  duimen.forEach((knop, i) => knop.addEventListener("click", () => galerij.gaNaarFoto?.(i)));
  galerij.addEventListener("fotowissel", (e) => {
    duimen.forEach((knop, i) => knop.setAttribute("aria-current", String(i === e.detail)));
  });

  // De vaste mobiele balk stuurt een WhatsApp-bericht over deze auto
  document.querySelectorAll("[data-whatsapp-auto]").forEach((a) => (a.href = whatsappLink(auto)));

  toonRdwGegevens(auto);

  // Andere beschikbare occasions
  const meer = document.querySelector("[data-meer]");
  const lijst = document.querySelector("[data-meer-lijst]");
  const anderen = autos.filter((a) => a.id !== auto.id && a.status !== "verkocht").sort(nieuwsteEerst).slice(0, 3);
  if (meer && lijst && anderen.length) {
    meer.hidden = false;
    toonAutos(lijst, anderen);
  }
}

/* ---------- Reviews ---------- */

function sterren(aantal) {
  return Array.from({ length: 5 }, (_, i) => icoon("ster", i < aantal ? "" : "ster-leeg")).join("");
}

function initiaal(naam) {
  return esc(String(naam).trim().charAt(0).toUpperCase());
}

async function initReviews() {
  const sectie = document.querySelector("[data-reviews]");
  if (!sectie) return;
  const track = sectie.querySelector(".carousel-track");

  let data;
  try {
    data = await laadJson(DATA_REVIEWS);
  } catch (fout) {
    track.innerHTML = `<p class="lijst-fout" style="flex:1">${foutmelding(fout)}</p>`;
    return;
  }

  sectie.querySelector("[data-score]").textContent = String(data.score).replace(".", ",");
  sectie.querySelector("[data-score-sterren]").innerHTML = sterren(Math.round(data.score));
  sectie.querySelector("[data-score-aantal]").textContent = data.aantal;
  sectie.querySelectorAll("[data-google-link]").forEach((a) => (a.href = data.googleUrl || "#"));

  track.innerHTML = data.reviews.map((r) => `
    <article class="review">
      <div class="review-kop">
        <div class="score-sterren" role="img" aria-label="${r.sterren} van 5 sterren">${sterren(r.sterren)}</div>
        ${data.voorbeeld ? '<span class="demo-label">Voorbeeld</span>' : ""}
      </div>
      <blockquote>“${esc(r.tekst)}”</blockquote>
      <div class="review-voet">
        <span class="avatar" aria-hidden="true">${initiaal(r.naam)}</span>
        <div>
          <div class="review-naam">${esc(r.naam)}</div>
          <div class="review-wanneer">${esc(r.wanneer)} · Google</div>
        </div>
      </div>
    </article>`).join("");

  initCarousel(sectie);
}

function initCarousel(sectie) {
  const track = sectie.querySelector(".carousel-track");
  const stippen = sectie.querySelector(".carousel-stippen");
  const vorige = sectie.querySelector("[data-carousel-vorige]");
  const volgende = sectie.querySelector("[data-carousel-volgende]");
  const kaarten = [...track.children];
  if (!kaarten.length) return;

  let perPagina = 1;
  let paginas = 1;
  const stap = () => kaarten[1] ? kaarten[1].offsetLeft - kaarten[0].offsetLeft : track.clientWidth;
  const maxScroll = () => track.scrollWidth - track.clientWidth;
  const huidige = () => (track.scrollLeft >= maxScroll() - 4 ? paginas - 1 : Math.round(track.scrollLeft / (stap() * perPagina)));
  const ga = (p) => {
    const doel = ((p % paginas) + paginas) % paginas;
    track.scrollTo({ left: Math.min(doel * perPagina * stap(), maxScroll()) });
  };

  const bouwStippen = () => {
    perPagina = Math.max(1, Math.round(track.clientWidth / stap()));
    paginas = Math.max(1, Math.ceil(kaarten.length / perPagina));
    stippen.innerHTML = Array.from({ length: paginas }, (_, i) =>
      `<button type="button" aria-label="Ga naar reviews ${i + 1} van ${paginas}"></button>`).join("");
    stippen.querySelectorAll("button").forEach((b, i) => b.addEventListener("click", () => { stopAuto(); ga(i); }));
    markeer();
  };
  const markeer = () => {
    const p = huidige();
    stippen.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-current", String(i === p)));
  };

  vorige?.addEventListener("click", () => { stopAuto(); ga(huidige() - 1); });
  volgende?.addEventListener("click", () => { stopAuto(); ga(huidige() + 1); });
  track.addEventListener("scroll", () => requestAnimationFrame(markeer), { passive: true });
  let resizeTimer;
  window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(bouwStippen, 150); });
  bouwStippen();

  // Automatisch doorschuiven: alleen in beeld, pauze bij hover/focus, stopt na interactie
  const rustig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timer = null;
  let gestopt = rustig;
  let inBeeld = false;
  let pauze = false;
  const plan = () => {
    clearInterval(timer);
    if (!gestopt && inBeeld && !pauze) timer = setInterval(() => ga(huidige() + 1), 6000);
  };
  function stopAuto() { gestopt = true; clearInterval(timer); }
  track.addEventListener("pointerdown", stopAuto, { passive: true });
  sectie.addEventListener("mouseenter", () => { pauze = true; plan(); });
  sectie.addEventListener("mouseleave", () => { pauze = false; plan(); });
  sectie.addEventListener("focusin", () => { pauze = true; plan(); });
  sectie.addEventListener("focusout", () => { pauze = false; plan(); });
  new IntersectionObserver(([e]) => { inBeeld = e.isIntersecting; plan(); }, { threshold: 0.3 }).observe(track);
}

/* ---------- Verschijn-animatie bij scrollen ---------- */

let verschijnObserver;
function initVerschijnen(binnen = document) {
  const elementen = binnen.querySelectorAll(".verschijn:not(.zichtbaar)");
  if (!("IntersectionObserver" in window)) {
    elementen.forEach((el) => el.classList.add("zichtbaar"));
    return;
  }
  verschijnObserver ??= new IntersectionObserver(
    (items) => items.forEach((item) => {
      if (item.isIntersecting) {
        item.target.classList.add("zichtbaar");
        verschijnObserver.unobserve(item.target);
      }
    }),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  elementen.forEach((el) => verschijnObserver.observe(el));
}

/* ---------- Actief menu-item (scroll-spy op de homepage) ---------- */

// Onderstreept het menu-item van de sectie die in beeld is. Een link hoort bij een sectie via
// zijn #anker, of via data-spy als hij naar een andere pagina gaat (zoals Occasions).
function initScrollSpy() {
  const links = [...document.querySelectorAll(".hoofdnav a")]
    .map((link) => ({ link, sectie: document.getElementById(link.dataset.spy || link.hash.slice(1)) }))
    .filter((item) => item.sectie && (item.link.dataset.spy || item.link.getAttribute("href").startsWith("#")));
  if (!links.length) return;

  const zetActief = (actieveLink) => {
    links.forEach(({ link }) => {
      const actief = link === actieveLink;
      link.classList.toggle("actief", actief);
      if (actief) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const bepaal = () => {
    const lijn = window.innerHeight * 0.35;
    const opBodem = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    let huidige = links[0];
    for (const item of links) {
      if (item.sectie.getBoundingClientRect().top <= lijn) huidige = item;
    }
    if (opBodem) huidige = links.reduce((a, b) => (b.sectie.offsetTop > a.sectie.offsetTop ? b : a));
    zetActief(huidige.link);
  };

  // Na een klik meteen het aangeklikte item tonen en niet meeflitsen met tussenliggende secties.
  // Vrijgeven zodra het scrollen 150 ms stilstaat (of na 1 s als er niet gescrold hoeft te worden).
  let vergrendeld = false;
  let ontgrendelTimer;
  const ontgrendel = () => { vergrendeld = false; bepaal(); };
  links.forEach(({ link }) => link.addEventListener("click", () => {
    if (!link.getAttribute("href").startsWith("#")) return;
    zetActief(link);
    vergrendeld = true;
    clearTimeout(ontgrendelTimer);
    ontgrendelTimer = setTimeout(ontgrendel, 1000);
  }));

  let gepland = false;
  window.addEventListener("scroll", () => {
    if (vergrendeld) {
      clearTimeout(ontgrendelTimer);
      ontgrendelTimer = setTimeout(ontgrendel, 150);
      return;
    }
    if (gepland) return;
    gepland = true;
    requestAnimationFrame(() => { gepland = false; bepaal(); });
  }, { passive: true });
  window.addEventListener("resize", bepaal);
  bepaal();
}

/* ---------- Start ---------- */

plaatsIconen();
initMenu();
initOpeningstijden();
initVerschijnen();
initScrollSpy();
document.querySelectorAll("[data-swipe]:not([data-uitgelicht])").forEach(initSwipe);
initUitgelicht();
initOccasions();
initDetail();
initReviews();
document.querySelectorAll("[data-jaar]").forEach((el) => (el.textContent = new Date().getFullYear()));
