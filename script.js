/*
API
https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson
https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-02
*/

/*
function initMap() {
  const carto = L.map("map").setView([37.8, -96], 4);
  L.titleLayer("https://.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(carto);
  return carto;
}



async function mainEvent() {
  const carto = initMap();

  
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
*/

/*fetching API using d3.js*/
d3.json("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-02
).then(function(data){
  console.log(data)
});

