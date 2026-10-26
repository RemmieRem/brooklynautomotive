# Brooklyn Automotive – demo-website

Demo-website voor Brooklyn Automotive (garage en occasions in Breukelen). Gewone HTML, CSS en JavaScript, zonder build-stap.

## Demo bekijken

Dubbelklik op **`start-demo.bat`**. De site opent dan op <http://localhost:8080>. Stoppen doe je door het zwarte venster te sluiten.

> De occasions en reviews worden uit JSON-bestanden geladen. Daarvoor is een (lokale) webserver nodig. Als je `index.html` direct opent door erop te dubbelklikken, verschijnt er een melding in plaats van de auto's. Online, bijvoorbeeld via GitHub Pages of Netlify, werkt alles zonder extra stappen.

## Structuur

```
index.html            Home: hero, diensten, uitgelichte occasions, over ons, reviews, contact
occasions.html        Volledig aanbod met filter op merk en prijs (+ sorteren)
auto.html             Detailpagina per auto (auto.html?id=vw-golf-2021), gevuld vanuit autos.json
data/autos.json       Het occasion-aanbod (hier later het beheerportaal aan koppelen)
data/reviews.json     Reviews en totaalscore (VOORBEELDEN)
assets/css/style.css  Alle opmaak (kleuren staan bovenaan als variabelen)
assets/js/main.js     Menu, openingstijden, laden van auto's/reviews, filter, carousel
assets/img/           Logo, sfeerfoto's en autofoto's
```

## Nog in te vullen (placeholders)

Zoek en vervang in **alle bestanden** (`index.html`, `occasions.html`, `auto.html` en `assets/js/main.js`; in VS Code met Ctrl+Shift+H):

| Placeholder          | Wat                                                                  |
|----------------------|----------------------------------------------------------------------|
| `[TELEFOON]`         | Telefoonnummer, bijv. `0346-123456` (ook in de `tel:`-links)         |
| `[WHATSAPP-NUMMER]`  | Internationaal zonder + of 0, bijv. `31612345678`                     |
| `[ADRES]`            | Straat en huisnummer                                                 |
| `[POSTCODE]`         | Postcode                                                             |
| `[E-MAIL]`           | E-mailadres                                                          |
| `[KVK-NUMMER]`       | KvK-nummer (footer)                                                  |
| `[NAAM EIGENAAR]`    | Naam van de eigenaar (sectie Over ons, alleen in `index.html`)       |

Verder:
- **Openingstijden**: dit zijn voorbeeldtijden. Pas ze aan bovenaan `assets/js/main.js` (`OPENINGSTIJDEN`). De tabel, de footer en de melding "Nu geopend" worden daaruit opgebouwd.
- **Kaart**: in `index.html` bij de `<iframe>` het woord `Breukelen` vervangen door het volledige adres. Doe hetzelfde bij de link "Route plannen".
- **Reviews**: `data/reviews.json` bevat verzonnen voorbeeldreviews. Zet `"voorbeeld": false` zodra er echte reviews in staan; dan verdwijnen de labels "Voorbeeld" bij de reviews. Vul ook `aantal` en `googleUrl` in, en haal het label "Voorbeeldreviews" en de "(voorbeeld)" in de topbalk uit de HTML.
- **Demo-balk**: de gele balk bovenaan elke pagina (`demo-balk`) verwijderen bij livegang.
- **Privacyverklaring / Algemene voorwaarden**: de links in de footer wijzen nog naar `#`.

## Auto's beheren (`data/autos.json`)

Elke auto is één object in de lijst `autos`:

| Veld             | Voorbeeld                         | Toelichting                                       |
|------------------|-----------------------------------|---------------------------------------------------|
| `id`             | `"vw-golf-2021"`                  | Uniek, zonder spaties                             |
| `merk`, `model`  | `"Volkswagen"`, `"Golf"`          | `merk` vult automatisch het merkfilter            |
| `uitvoering`     | `"1.0 eTSI Life"`                 |                                                   |
| `bouwjaar`       | `2021`                            | Getal                                             |
| `kilometerstand` | `68450`                           | Getal, zonder punten                              |
| `prijs`          | `21950`                           | Getal in euro's, zonder punten                    |
| `brandstof`      | `"Benzine"`                       | Benzine, Diesel, Hybride, Elektrisch…             |
| `transmissie`    | `"Automaat"`                      | Automaat of Handgeschakeld                        |
| `status`         | `"beschikbaar"`                   | `beschikbaar`, `gereserveerd` of `verkocht`       |
| `uitgelicht`     | `true`                            | Maximaal 3 uitgelichte auto's verschijnen op de homepage |
| `toegevoegd`     | `"2026-10-20"`                    | Voor sorteren op "Nieuwste aanbod"                |
| `fotos`          | `[{ "src": "...", "alt": "..." }]` | Eerste foto = hoofdfoto; `credit` is optioneel   |
| `beschrijving`   | `"Nette Volkswagen Golf…"`        | Tekst op de detailpagina                          |
| `opties`         | `["Navigatie", "Trekhaak"]`       | Lijst "Uitrusting" op de detailpagina             |
| `carrosserie`, `kleur`, `vermogen_pk`, `deuren` | `"SUV"`, `"Grijs"`, `141`, `5` | Tabel "Specificaties" op de detailpagina |
| `kenteken`       | `""`                              | Voor de latere RDW-koppeling (zie hieronder)      |

Een auto met status `verkocht` krijgt een rood "VERKOCHT"-lint op de kaart en op de detailpagina. In het overzicht staat hij achteraan, en hij verschijnt niet bij de uitgelichte occasions.

## Detailpagina en RDW-gegevens (later)

Elke kaart linkt naar `auto.html?id=<id>`. Daar staan grote foto's, de beschrijving, de uitrusting, een specificatietabel en contactknoppen. De WhatsApp-knop opent een vooraf ingevuld bericht over die auto.

Voorbereid voor de RDW-koppeling:
- In `autos.json` heeft elke auto een (nu leeg) veld `kenteken`.
- In `assets/js/main.js` staat `toonRdwGegevens(auto)` als uitbreidingspunt, met de link naar de open data van de RDW (`opendata.rdw.nl`, gratis en zonder sleutel). Op de pagina is het blok `#rdw-gegevens` er al; het blijft verborgen tot het gevuld wordt.
- Extra regels in de specificatietabel voeg je toe in de lijst `SPECIFICATIES` in `main.js`.

## Fotoverantwoording

- **Autofoto's**: Wikimedia Commons, licentie [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), van Alexander Migl / Alexander-93. De naam van de fotograaf en de bronlink staan per foto in `data/autos.json` en worden onder elke auto getoond (dat vereist de licentie). Bij eigen foto's kan `credit` weg.
- **Sfeerfoto's** (hero, diensten, over ons): [Unsplash](https://unsplash.com/license), vrij te gebruiken zonder naamsvermelding.
- **Iconen**: getekend in de stijl van Lucide (ISC-licentie). Het WhatsApp-icoon is het merkteken van WhatsApp.
