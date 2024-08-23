let map, marker;

function loadNavBar() {
  document.addEventListener("DOMContentLoaded", function () {
    var content = document.getElementById("navbar-container");
    content.innerHTML = returnNavBar(nothing);
    activeClick();
  });
}

function loadFooter() {
  const footerContainer = document.getElementById("footer-container");
  footerContainer.innerHTML = returnFooter();
}

function initMap() {
  const defaultLocation = [10.7285, 106.7151];
  map = L.map('map').setView(defaultLocation, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  marker = L.marker(defaultLocation, { draggable: true }).addTo(map);

  const locationInput = document.getElementById("location");

  marker.on('dragend', function (event) {
    const position = marker.getLatLng();
    locationInput.value = `${position.lat}, ${position.lng}`;
  });

  map.on('click', function (e) {
    marker.setLatLng(e.latlng);
    locationInput.value = `${e.latlng.lat}, ${e.latlng.lng}`;
  });
}

function updateMap(address) {
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  fetch(geocodeUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        map.setView([lat, lon], 15);
        marker.setLatLng([lat, lon]);
      } else {
        console.log("Address not found");
      }
    })
    .catch(error => console.error("Error:", error));
}

function convertDate(date, fromType, toType) {
  const momentDate = moment(date);

  if (fromType === 'solar' && toType === 'lunar') {
    const lunarDate = momentDate.subtract(1, 'days').lunar();
    return `${lunarDate.year()}-${(lunarDate.month() + 1).toString().padStart(2, '0')}-${lunarDate.date().toString().padStart(2, '0')}T${momentDate.format('HH:mm')}`;
  } else if (fromType === 'lunar' && toType === 'solar') {
    const [datePart, timePart] = date.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const solarDate = moment().year(year).month(month - 1).date(day).add(1, 'days');
    return solarDate.format('YYYY-MM-DDTHH:mm');
  }

  return date;
}

document.addEventListener("DOMContentLoaded", function () {
  loadNavBar();
  loadFooter();
  initMap();

  const form = document.querySelector('form');
  const areaInput = document.getElementById("area");
  const dateInput = document.getElementById("date");
  const dateTypeSelect = document.getElementById("dateType");
  const locationInput = document.getElementById("location");

  // Set initial date to current date
  const now = new Date();
  dateInput.value = now.toISOString().slice(0, 16);

  areaInput.addEventListener("input", function () {
    if (this.value < 0) {
      this.value = 0;
    }
  });

  dateTypeSelect.addEventListener('change', function () {
    const currentDate = dateInput.value;
    const currentType = this.value === 'lunar' ? 'solar' : 'lunar';
    const newType = this.value;

    if (currentDate) {
      const convertedDate = convertDate(currentDate, currentType, newType);
      dateInput.value = convertedDate;
    }
  });

  locationInput.addEventListener('change', function () {
    updateMap(this.value);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Convert lunar date to solar date before submitting
    if (dateTypeSelect.value === 'lunar') {
      const lunarDate = dateInput.value;
      const solarDate = convertDate(lunarDate, 'lunar', 'solar');
      dateInput.value = solarDate;
    }

    console.log("Form submitted");

  });
});
