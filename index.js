'use strict'
//style dropdown, validation for search input so that it can't be blank and for the dropdown must have a selection

const youtube_Key = "AIzaSyBIMGSvhmScS5Mjtuhbo2n8QtPAxqBjgmQ"
const GEO_SEARCH_URL = 'http://www.mapquestapi.com/geocoding/v1/address';

let map;
let results;

//GOOD-----display map on start screen when page loads
  function createMap(position) {
   map = L.map('map', {
      center: ([position.coords.latitude, position.coords.longitude]),
      layers: MQ.mapLayer(),
      zoom: 9
    });    
    populateMapWithoutPopup(position.coords.latitude, position.coords.longitude);
}
  
//GOOD-----Get user's current location and display on map
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(createMap);
  }  
 }

//GOOD-----On Search button click, scroll page to map 
function watchSearch() {
  $('#search-form').submit(function(event) {
    event.preventDefault();
    $('html,body').animate({scrollTop: $("#map").offset().top});
    
    let query = { 
      key: 'R0OL2YLpWtAiZpcpqDU6MPkjAu58HLOp',
      location: $('#search-term').val(),
    }

    $.getJSON(GEO_SEARCH_URL, query, function(data) {
      let lat = data.results[0].locations[0].latLng.lat;
      let lng = data.results[0].locations[0].latLng.lng;
      //call YouTube API here so the map results populate with marker from populateMap function below and a link to the YouTube search results
      callYoutubeAPI()
      data.results.forEach(result => {
        result.locations.forEach(location => {populateMap(location, result.providedLocation.location)});
      });
      $('#search-form').trigger("reset");
    });
  })
}

// INCOMPLTE----This will populate the results on the map and add markers
function populateMap(location, locationText) {
  let city = $('#search-term').val();
  let state = $('#state option:selected').val();
  let ytURL = `https://www.youtube.com/results?search_query=best+place+to+eat+in+${city}+${state}`;
  L.marker([location.latLng.lat, location.latLng.lng], {
          text: locationText,
          type: 'marker',
          position: 'bottom',
          alt: locationText + 'Learn more about' + locationText + 'on YouTube',
          // icon: {
          //     primaryColor: '#ffffff',
          //     secondaryColor: '#333333',
          //     size: 'md',
          // },
      }).bindPopup(`${locationText} <br><a class="markerPopup" target='_blank' aria-label='Read more about <span class="cityName">${locationText}</span> on YouTube' href=${ytURL}>YouTube</a>`).openPopup().addTo(map);
};

//create a function that includes an event handler that passes locationText to call Youtube API
function populateMapWithoutPopup(lat, lng) {
  L.marker([lat, lng], {
    text: 'Current Location',
    type: 'marker',
    position: 'bottom',
    // icon: {
    //     primaryColor: '#ffffff',
    //     secondaryColor: '#333333',
    //     size: 'md'
    // },
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
