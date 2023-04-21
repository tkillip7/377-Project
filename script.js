/*
    Adding the earthquake database
*/

d3.json(
  "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2020-01-01&endtime=2020-01-02"
).then(function (data) {
  console.log(data);
});
