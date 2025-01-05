console.log("Step 1 working");

// Create the tile layer for the map background
let tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
});

// Create the map object with initial settings
let map = L.map("map", {
  center: [37.0902, -95.7129],  // Starting position [latitude, longitude] (USA)
  zoom: 5,
  layers: [tileLayer],  // Adding the tile layer to the map
});

// Add the base tile layer to the map
tileLayer.addTo(map);

// Create the layers for earthquake data and tectonic plates
let earthquakes = new L.LayerGroup();
let tectonicplates = new L.LayerGroup();

// Base layers for the map
let baseMaps = {
  "OpenStreetMap": tileLayer
};

// Overlay layers for the earthquake and tectonic plates
let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicplates
};

// Add the layer control (switch between layers)
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Fetch earthquake data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // Style function to define the appearance of each earthquake
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 0.75,
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth-based color
      color: "#000000", // Border color
      radius: getRadius(feature.properties.mag), // Size based on magnitude
      weight: 0.5 // Border weight
    };
  }

  // Function to get the color based on depth
  function getColor(depth) {
    if (depth > 700) {
      return "#800026";
    } else if (depth > 500) {
      return "#BD0026";
    } else if (depth > 300) {
      return "#E31A1C";
    } else if (depth > 100) {
      return "#FC4E2A";
    } else if (depth > 50) {
      return "#FD8D3C";
    } else if (depth > 20) {
      return "#FEB24C";
    } else {
      return "#FFEDA0";
    }
  }

  // Function to get the radius based on magnitude
  function getRadius(magnitude) {
    return magnitude === 0 ? 1 : magnitude * 4;
  }

  // Adding the earthquake data to the map
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, styleInfo(feature));
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<h3>Location: ${feature.properties.place}</h3>
        <hr>
        <p>Magnitude: ${feature.properties.mag}</p>
        <p>Depth: ${feature.geometry.coordinates[2]} km</p>`
      );
    }
  }).addTo(earthquakes);

  // Add the earthquakes layer to the map
  earthquakes.addTo(map);

  // Create the legend for the map
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depths = [0, 20, 50, 100, 300, 500, 700];
    let labels = [];

    // Loop through the intervals to generate a label with a colored square for each range
    for (let i = 0; i < depths.length; i++) {
      div.innerHTML +=
        `<i style="background:${getColor(depths[i] + 1)}"></i> ${depths[i]}${depths[i + 1] ? "&ndash;" + depths[i + 1] : "+"} km<br>`;
    }

    return div;
  };

  // Add the legend to the map
  legend.addTo(map);

  // Fetch tectonic plate data
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (platedata) {
    // Add tectonic plates data to the map
    L.geoJson(platedata, {
      color: "orange",
      weight: 2
    }).addTo(tectonicplates);

    // Add tectonic plates layer to the map
    tectonicplates.addTo(map);
  });

}).catch(function (error) {
  console.error("Error fetching earthquake data: ", error);
});

console.log("Step 2 working");
