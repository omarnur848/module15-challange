// We create the tile layer that will be the background of our map.
console.log("Step 1 working");

// We create the tile layer that will be the background of our map.


// We create the map object with options.


// Then we add our 'basemap' tile layer to the map.


// Here we make an AJAX call that retrieves our earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.

  

  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(depth) {

  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {

  }

  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.


    // We set the style for each circleMarker using our styleInfo function.

    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled

  }).addTo(map);

  // Here we create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend


    // Looping through our intervals to generate a label with a colored square for each interval.



  // Finally, we our legend to the map.

});