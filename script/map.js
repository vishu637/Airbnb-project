document.addEventListener("DOMContentLoaded", function () {
  const mapDiv = document.getElementById("map");

  // 👉 If no map on page, do nothing
  if (!mapDiv) return;

  // Default location (Pune)
  const defaultLat = 18.5204;
  const defaultLng = 73.8567;

  const latInput = document.getElementById("latitude");
  const lngInput = document.getElementById("longitude");

  const map = L.map('map').setView([defaultLat, defaultLng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  let marker;

  // If already has values (edit page case)
  if (latInput && lngInput && latInput.value && lngInput.value) {
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);

    marker = L.marker([lat, lng]).addTo(map)
      .bindPopup("Saved Location")
      .openPopup();

    map.setView([lat, lng], 13);
  }

  // Click to select location
  map.on("click", function (e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;

    if (marker) {
      map.removeLayer(marker);
    }

    marker = L.marker([lat, lng]).addTo(map)
      .bindPopup("Selected Location")
      .openPopup();
  });
});