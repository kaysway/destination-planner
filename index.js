'use strict'

const youtube_Key = "AIzaSyBIMGSvhmScS5Mjtuhbo2n8QtPAxqBjgmQ"
const GEO_SEARCH_URL = 'https://www.mapquestapi.com/geocoding/v1/address';

let map;
let results;

//Display map on start screen when page loads
  function createMap(position) {
   map = L.map('map', {
      center: ([position.coords.latitude, position.coords.longitude]),
      layers: MQ.mapLayer(),
      zoom: 9
    });    
    populateMapWithoutPopup(position.coords.latitude, position.coords.longitude);
}
  
//Get user's current location and display on map
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createMap);
  }  
 }

//On Search button click, scroll page to map 
//Create function using panTo method from Leaflet to move map view over results from search
function watchSearch() {
  $('#search-form').submit(function(event) {
    event.preventDefault();
    $('html,body').animate({scrollTop: $("#map").offset().top});

    let city = $('#search-term').val();
    let state = $('#state option:selected').val();

    let query = { 
      key: 'R0OL2YLpWtAiZpcpqDU6MPkjAu58HLOp',
      location: city.toUpperCase() + ', ' + state.toUpperCase()
    }

    $.getJSON(GEO_SEARCH_URL, query, function(data) {
      let location = data.results[0].locations[0];
      let result = data.results[0];

      //call YouTube API here so the map results populate with marker from populateMap function below and a link to the YouTube search results
      callYoutubeAPI()
        populateMap(location, result.providedLocation.location);
      $('#search-form').trigger("reset");
    });
  });
}

// This will populate the results on the map and add markers
function populateMap(location, locationText) {
  let city = $('#search-term').val();
  let state = $('#state option:selected').val();
  let ytURL = encodeURI(`https://www.youtube.com/results?search_query=best+place+to+eat+in+${city.toUpperCase()}+${state.toUpperCase()}`);
  L.marker([location.latLng.lat, location.latLng.lng], {
          text: locationText,
          type: 'marker',
          position: 'bottom',
          alt: locationText + 'Learn more about' + locationText + 'on YouTube',
      }).bindPopup(`${locationText} <br><a class="markerPopup" target='_blank' aria-label='Read more about <span class="cityName">${locationText}</span> on YouTube' href=${ytURL}>YouTube</a>`).openPopup().addTo(map);
      map.panTo([location.latLng.lat, location.latLng.lng]);
};


//create a function that includes an event handler that passes locationText to call Youtube API
function populateMapWithoutPopup(lat, lng) {
  L.marker([lat, lng], {
    text: 'Current Location',
    type: 'marker',
    position: 'bottom',
}).addTo(map);

}

function callYoutubeAPI(location){
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=where+to+eat+in+${location}+best+restaurants&maxResults=1&&safeSearch=moderate&key=${youtube_Key}`)
    .then(youtubeResult =>
      youtubeResult.json())
    };

//call listeners
function initializePage(){
  getLocation();
  watchSearch();
  callYoutubeAPI();
}

$(initializePage());
