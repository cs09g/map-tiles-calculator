const coordinates = document.querySelector("#coordinates");
const result = document.querySelector("#result");

coordinates.addEventListener("change", (e) => {
  const parsedCoordinates = e.target.value.split("/");
  if (parsedCoordinates.length === 2) {
    result.innerText = "";
    calculateZXY(...parsedCoordinates.map((coords) => +coords));
  }
});

function calculateZXY(lat, lon) {
  const zoom = 25;

  for (let z = 1; z <= zoom; z++) {
    const n = Math.pow(2, z);
    const x = Math.floor(n * ((lon + 180) / 360));
    const y = Math.floor(n * (1 - (Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI)) / 2);
    result.innerText += `${z}/${x}/${y}\r\n`;
  }
}

mapboxgl.accessToken = "pk.eyJ1IjoiZmFyYWRheTIiLCJhIjoiTUVHbDl5OCJ9.buFaqIdaIM3iXr1BOYKpsQ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: [127.8429, 36.5154],
  zoom: 5
});
map.showTileBoundaries = true;

map.on("click", (e) => {
  const lngLat = e.lngLat;
  coordinates.value = `${lngLat.lat.toFixed(5)}/${lngLat.lng.toFixed(5)}`;
  coordinates.dispatchEvent(new Event("change"));
});
