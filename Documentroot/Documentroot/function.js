const container = document.querySelector(".container");
const sitze = document.querySelectorAll(".row .sitz:not(.Besetzt)");
const zaeler = document.getElementById("zaeler");
const total = document.getElementById("total");
const filmWahl = document.getElementById("kino");

populateUI();

let ticketPreis = +filmWahl.value;

// Ausgewählten Filmindex und Preis speichern
function FilmDataSetzen(kinoIndex, kinoPrice) {
  localStorage.setItem("selectedKinoIndex", kinoIndex);
  localStorage.setItem("selectedKinoPrice", kinoPrice);
}

// Aktualiesierung der Gaesamtsumme und der Zähler
function GewaelteZaelerUpdaten() {
  const selectedsitze = document.querySelectorAll(".row .sitz.selected");

  const sitzeIndex = [...selectedsitze].map(sitz => [...sitze].indexOf(sitz));

  localStorage.setItem("selectedsitze", JSON.stringify(sitzeIndex));

  const selectedsitzezaeler = selectedsitze.length;

  zaeler.innerText = selectedsitzezaeler;
  total.innerText = selectedsitzezaeler * ticketPreis;
}

// Daten aus dem lokalen Speicher abrufen und Auffüllen der Benutzeroberfläche
function populateUI() {
  const selectedsitze = JSON.parse(localStorage.getItem("selectedsitze"));

  if (selectedsitze !== null && selectedsitze.length > 0) {
    sitze.forEach((sitz, index) => {
      if (selectedsitze.indexOf(index) > -1) {
        sitz.classList.add("selected");
      }
    });
  }

  const selectedKinoIndex = localStorage.getItem("selectedKinoIndex");

  if (selectedKinoIndex !== null) {
    filmWahl.selectedIndex = selectedKinoIndex;
  }
}

// Film wählen Ereignis
filmWahl.addEventListener("change", e => {
  ticketPreis = +e.target.value;
  FilmDataSetzen(e.target.selectedIndex, e.target.value);
  GewaelteZaelerUpdaten();
});

//Sitzklick-Ereignis
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("sitz") &&
    !e.target.classList.contains("Besetzt")
  ) {
    e.target.classList.toggle("selected");

    GewaelteZaelerUpdaten();
  }
});

// Aktualiesiert gesamte Zähler

GewaelteZaelerUpdaten();