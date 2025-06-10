const map = L.map('map').setView([41.0082, 28.9784], 12);
let startMarker = null;
let startCoords = null;
let layerGroup = L.layerGroup().addTo(map);
let polylineGroup = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap katkıda bulunanlar'
}).addTo(map);

const categoryColors = {
  tarihi: "#e74c3c",
  muze: "#8e44ad",
  dini: "#2ecc71",
  manzara: "#3498db",
  kafe: "#f39c12",
  galeri: "#1abc9c",
  stadyum: "#c0392b",
  park: "#27ae60",
  meydan: "#e67e22",
  cadde: "#9b59b6"
};
const places = [
  // === TARİHİ YERLER ===
  { name: "Ayasofya", coords: [41.008600, 28.980200], category: "tarihi" },
  { name: "Topkapı Sarayı", coords: [41.011500, 28.983400], category: "tarihi" },
  { name: "Yerebatan Sarnıcı", coords: [41.008400, 28.977900], category: "tarihi" },
  { name: "Rumeli Hisarı", coords: [41.084400, 29.053700], category: "tarihi" },
  { name: "Kız Kulesi", coords: [41.021100, 29.004800], category: "tarihi" },
  { name: "Anadolu Hisarı", coords: [41.088500, 29.068100], category: "tarihi" },
  { name: "Galata Kulesi", coords: [41.025600, 28.974400], category: "tarihi" },
  { name: "İshak Paşa Çeşmesi", coords: [41.008700, 28.976200], category: "tarihi" },
  { name: "Tarihi Sirkeci Garı", coords: [41.016600, 28.976400], category: "tarihi" },
  { name: "Haydarpaşa Garı", coords: [41.001500, 29.013100], category: "tarihi" },
  { name: "Dolmabahçe Sarayı", coords: [41.039100, 29.000800], category: "tarihi" },
  { name: "Beylerbeyi Sarayı", coords: [41.042600, 29.043000], category: "tarihi" },
  { name: "Çırağan Sarayı", coords: [41.044900, 29.004800], category: "tarihi" },
  { name: "Zeyrekhane", coords: [41.017200, 28.958500], category: "tarihi" },
  { name: "Valens Su Kemeri", coords: [41.016900, 28.952800], category: "tarihi" },

  // === MÜZELER ===
  { name: "İstanbul Arkeoloji Müzesi", coords: [41.011300, 28.981700], category: "muze" },
  { name: "Pera Müzesi", coords: [41.032900, 28.976900], category: "muze" },
  { name: "Rahmi Koç Müzesi", coords: [41.041000, 28.948600], category: "muze" },
  { name: "İstanbul Modern", coords: [41.028200, 28.971700], category: "muze" },
  { name: "Türk ve İslam Eserleri Müzesi", coords: [41.005700, 28.976100], category: "muze" },
  { name: "Sabancı Müzesi", coords: [41.105500, 29.053400], category: "muze" },
  { name: "Panorama 1453 Tarih Müzesi", coords: [41.008600, 28.930200], category: "muze" },
  { name: "Sadberk Hanım Müzesi", coords: [41.174200, 29.063800], category: "muze" },
  { name: "İstanbul Oyuncak Müzesi", coords: [40.976100, 29.084600], category: "muze" },
  { name: "Masumiyet Müzesi", coords: [41.032500, 28.976300], category: "muze" },

  // === DİNİ YAPILAR ===
  { name: "Sultanahmet Camii", coords: [41.005400, 28.976800], category: "dini" },
  { name: "Süleymaniye Camii", coords: [41.016500, 28.963100], category: "dini" },
  { name: "Yeni Camii", coords: [41.016900, 28.970600], category: "dini" },
  { name: "Fatih Camii", coords: [41.019000, 28.949600], category: "dini" },
  { name: "Eyüp Sultan Camii", coords: [41.048100, 28.933400], category: "dini" },
  { name: "Ortaköy Camii", coords: [41.047200, 29.027500], category: "dini" },
  { name: "Kariye Camii", coords: [41.031000, 28.939800], category: "dini" },
  { name: "Aya Triada Rum Ortodoks Kilisesi", coords: [41.036600, 28.985900], category: "dini" },
  { name: "Fener Rum Patrikhanesi", coords: [41.032100, 28.949700], category: "dini" },

  // === MANZARA BÖLGELERİ ===
  { name: "Pierre Loti Tepesi", coords: [41.053100, 28.933600], category: "manzara" },
  { name: "Çamlıca Tepesi", coords: [41.024600, 29.080400], category: "manzara" },
  { name: "Galata Kulesi", coords: [41.025600, 28.974400], category: "manzara" },
  { name: "Sahil Yolu - Caddebostan", coords: [40.964600, 29.070700], category: "manzara" },
  { name: "Moda Sahili", coords: [40.981300, 29.028000], category: "manzara" },
  { name: "Otağtepe Fatih Korusu", coords: [41.093300, 29.071200], category: "manzara" },
  { name: "Ulus Parkı", coords: [41.070400, 29.020500], category: "manzara" },

  // === KAFELER ===
  { name: "Mandabatmaz", coords: [41.035300, 28.983400], category: "kafe" },
  { name: "Kronotrop Cihangir", coords: [41.031500, 28.988900], category: "kafe" },
  { name: "Bebek Kahve", coords: [41.075600, 29.043200], category: "kafe" },
  { name: "Petra Roasting", coords: [41.065300, 29.013200], category: "kafe" },
  { name: "Fazıl Bey'in Türk Kahvesi", coords: [40.985500, 29.025800], category: "kafe" },
  { name: "Pierre Loti Kahvesi", coords: [41.053300, 28.933400], category: "kafe" },
  { name: "Nevmekan Bağlarbaşı", coords: [41.003600, 29.048700], category: "kafe" },

  // === SANAT GALERİLERİ ===
  { name: "Arter", coords: [41.038100, 28.985100], category: "galeri" },
  { name: "Salt Beyoğlu", coords: [41.033200, 28.983800], category: "galeri" },
  { name: "Mixer", coords: [41.038900, 28.982100], category: "galeri" },
  { name: "İstanbul Modern", coords: [41.028200, 28.971700], category: "galeri" },
  { name: "Borusan Contemporary", coords: [41.074700, 29.043800], category: "galeri" },
  { name: "Zilberman Gallery", coords: [41.032600, 28.976100], category: "galeri" },
  { name: "x-ist", coords: [41.053500, 28.982200], category: "galeri" },

  // === STADYUMLAR ===
  { name: "Vodafone Park", coords: [41.039100, 28.994800], category: "stadyum" },
  { name: "Nef Stadyumu", coords: [41.103100, 28.990200], category: "stadyum" },
  { name: "Ülker Stadyumu", coords: [40.983200, 29.037200], category: "stadyum" },
  { name: "Vefa Stadı", coords: [41.020800, 28.949900], category: "stadyum" },
  { name: "Atatürk Olimpiyat Stadyumu", coords: [41.078100, 28.766000], category: "stadyum" },
  { name: "Recep Tayyip Erdoğan Stadyumu", coords: [41.040500, 28.961100], category: "stadyum" },

  // === PARKLAR ===
  { name: "Bebek Parkı", coords: [41.075800, 29.043600], category: "park" },
  { name: "Gülhane Parkı", coords: [41.012200, 28.981400], category: "park" },
  { name: "Maçka Parkı", coords: [41.044700, 28.994200], category: "park" },
  { name: "Yıldız Parkı", coords: [41.048600, 29.008400], category: "park" },
  { name: "Fenerbahçe Parkı", coords: [40.976600, 29.043100], category: "park" },
  { name: "Emirgan Korusu", coords: [41.109500, 29.056500], category: "park" },
  { name: "Fethi Paşa Korusu", coords: [41.033200, 29.023400], category: "park" },
  { name: "Belgrad Ormanı", coords: [41.193400, 28.989100], category: "park" },

  // === MEYDANLAR ===
  { name: "Taksim Meydanı", coords: [41.036900, 28.985000], category: "meydan" },
  { name: "Sultanahmet Meydanı", coords: [41.006000, 28.976800], category: "meydan" },
  { name: "Kadıköy Rıhtım Meydanı", coords: [40.987900, 29.027200], category: "meydan" },
  { name: "Beşiktaş Meydanı", coords: [41.041700, 29.007700], category: "meydan" },
  { name: "Eminönü Meydanı", coords: [41.016900, 28.970100], category: "meydan" },
  { name: "Üsküdar Meydanı", coords: [41.023700, 29.015200], category: "meydan" },

  // === ÜNLÜ CADDELER ===
  { name: "İstiklal Caddesi", coords: [41.036200, 28.985400], category: "cadde" },
  { name: "Bağdat Caddesi", coords: [40.964400, 29.073300], category: "cadde" },
  { name: "Nişantaşı Abdi İpekçi Caddesi", coords: [41.047200, 28.991800], category: "cadde" },
  { name: "Ortaköy Caddesi", coords: [41.045600, 29.027000], category: "cadde" },
  { name: "Nuruosmaniye Caddesi", coords: [41.008300, 28.978300], category: "cadde" },
  { name: "Divan Yolu Caddesi", coords: [41.008800, 28.976500], category: "cadde" }
];

// Masaüstü: sağ tıklamayla konum seç
map.on('contextmenu', function (e) {
  setStartPoint(e.latlng);
});

// Mobil: uzun dokunuşla konum seç
let touchStartTime;
map.getContainer().addEventListener("touchstart", (e) => {
  touchStartTime = Date.now();
});
map.getContainer().addEventListener("touchend", (e) => {
  const duration = Date.now() - touchStartTime;
  if (duration > 600) {
    const touch = e.changedTouches[0];
    const point = map.mouseEventToContainerPoint(touch);
    const latlng = map.containerPointToLatLng(point);
    setStartPoint(latlng);
  }
});

function setStartPoint(latlng) {
  if (startMarker) map.removeLayer(startMarker);
  startMarker = L.marker(latlng).addTo(map).bindPopup("Başlangıç").openPopup();
  startCoords = [latlng.lat, latlng.lng];
  map.setView(latlng, 14);
}

function useGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const latlng = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      setStartPoint(latlng);
    });
  } else {
    alert("Tarayıcınız konum desteklemiyor.");
  }
}

async function searchAddress() {
  const input = document.getElementById('addressInput').value.trim();
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = "";

  if (input.length < 3) return;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&addressdetails=1&limit=10`;

  try {
    const res = await fetch(url, {
      headers: { 'Accept-Language': 'tr' }
    });
    const results = await res.json();

    const istanbulResults = results.filter(r =>
      r.address && (r.address.city === "İstanbul" || r.address.county === "İstanbul" || r.display_name.includes("İstanbul"))
    ).slice(0, 5);

    istanbulResults.forEach(result => {
      const div = document.createElement('div');
      div.textContent = result.display_name;
      div.style.padding = "6px";
      div.style.cursor = "pointer";
      div.style.borderBottom = "1px solid #eee";
      div.onmouseenter = () => div.style.backgroundColor = "#f0f0f0";
      div.onmouseleave = () => div.style.backgroundColor = "#fff";
      div.onclick = () => {
        const latlng = { lat: parseFloat(result.lat), lng: parseFloat(result.lon) };
        setStartPoint(latlng);
        suggestionsDiv.innerHTML = "";
        document.getElementById('addressInput').value = result.display_name;
      };
      suggestionsDiv.appendChild(div);
    });

    if (istanbulResults.length === 0) {
      suggestionsDiv.innerHTML = `<div style="padding:6px; color:#777;">İstanbul içinde sonuç bulunamadı.</div>`;
    }
  } catch (err) {
    console.error("Adres arama hatası:", err);
    suggestionsDiv.innerHTML = `<div style="padding:6px; color:red;">Arama sırasında hata oluştu.</div>`;
  }
}

function getSelectedCategories() {
  const checkboxes = document.querySelectorAll("#categoryMenu input[type='checkbox']");
  const selected = [];
  checkboxes.forEach(cb => {
    if (cb.checked) selected.push(cb.value);
  });
  return selected;
}

let stepCircleMarker = null;

async function createRoute() {
  const instructionList = document.getElementById("instructionList");
  instructionList.innerHTML = "";

  if (!startCoords) {
    alert("Başlangıç noktası seçilmedi.");
    return;
  }

  const selectedCategories = getSelectedCategories();
  if (selectedCategories.length === 0) {
    alert("Kategori seçiniz.");
    return;
  }

  const maxPlaces = parseInt(document.getElementById("placeCount").value);
  layerGroup.clearLayers();
  polylineGroup.clearLayers();

  const filtered = places
    .filter(p => selectedCategories.includes(p.category))
    .map(p => {
      const distance = map.distance(startCoords, p.coords);
      return { ...p, distance };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxPlaces);

  let lastPoint = startCoords;
  let routeIndex = 1;
  let routeDrawn = false;

  for (let i = 0; i < filtered.length; i++) {
    const place = filtered[i];
    const color = categoryColors[place.category] || "#000";

    const url = `https://router.project-osrm.org/route/v1/driving/${lastPoint[1]},${lastPoint[0]};${place.coords[1]},${place.coords[0]}?overview=full&geometries=geojson&steps=true&annotations=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!data.routes || data.routes.length === 0) continue;
      const route = data.routes[0];
      const steps = route.legs[0].steps;
      if (!steps || steps.length === 0) continue;

      const routeCoords = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
      L.polyline(routeCoords, {
        color: color,
        dashArray: "5, 10",
        weight: 3
      }).addTo(polylineGroup);

      L.circleMarker(place.coords, {
        radius: 14,
        fillColor: color,
        fillOpacity: 0.8,
        color: "#fff",
        weight: 2
      }).addTo(layerGroup);

      const label = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="color:white;font-weight:bold;text-align:center">${routeIndex}</div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      L.marker(place.coords, { icon: label }).addTo(layerGroup);

      const titleLi = document.createElement("li");
      titleLi.innerHTML = `<strong>${routeIndex}. ${place.name}</strong>`;
      instructionList.appendChild(titleLi);

      steps.forEach((step, index) => {
        const li = document.createElement("li");
        const instruction = step.maneuver.instruction || `Adım ${index + 1}`;
        const road = step.name ? ` (${step.name})` : "";
        const distance = (step.distance / 1000).toFixed(2);
        li.innerHTML = `${instruction}${road} - <em>${distance} km</em>`;
        li.style.marginLeft = "15px";
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
          const lat = step.maneuver.location[1];
          const lng = step.maneuver.location[0];
          map.setView([lat, lng], 17);
          if (stepCircleMarker) map.removeLayer(stepCircleMarker);
          stepCircleMarker = L.circleMarker([lat, lng], {
            radius: 8,
            fillColor: "#ff0000",
            fillOpacity: 0.8,
            color: "#fff",
            weight: 2
          }).addTo(map);
        });

        instructionList.appendChild(li);
      });

      routeIndex++;
      lastPoint = place.coords;
      routeDrawn = true;

    } catch (err) {
      console.error("Rota alınamadı:", err);
      continue;
    }
  }

  if (routeDrawn) {
    const instructionBox = document.getElementById("routeInstructions");
    instructionBox.style.display = "block";
    instructionBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}
