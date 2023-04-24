/*
API
https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson
https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-02
*/

function initMap() {
  const carto = L.map("map").setView([37.8, -96], 4);
  L.titleLayer("https://.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(carto);
  return carto;
}

/*function to filter database to states in Cali?*/

async function mainEvent() {
  const carto = initMap();

  /*API request */
  fetch(
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-02"
  )
    .then((response) => response.json())
    .then((data) => {
      const caliEarthquakes = data.features.filter((feature) => {
        const place = feature.properties.place;
        return /california/i.test(place);
      });
    });
}

document.addEventListener("DOMContentLoaded", async () => mainEvent());
