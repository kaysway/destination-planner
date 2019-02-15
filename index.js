'use strict'

let youtube_Key = "08657a242a7a81b59e5d79081c3812a9a7bfa260"
let accessToken = 'pk.eyJ1Ijoia2F5c3dheSIsImEiOiJjanJ6ZHZveTUxN3hwNGJvNDFwaHhweXk3In0.Xesc_eMjC872n1L4hqNbpw'
const GEO_SEARCH_URL = 'http://www.mapquestapi.com/geocoding/v1/address';
let lat = [];
let lng = [];


  // function 1: add map from leaflet to start screen when page loads

  function createMap(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let myMap = L.map('mapid').setView([lat, long], 13);

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: accessToken
    }).addTo(myMap);
  }

  //function 2: Get user's current location and display on map
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(createMap);
    }  
   }


//function 3/4: On Search button click, scroll page to map and display location value from input as popup on map using leafletjs

  function scrollPage () {
    $('#search-term').on('click', '.submit-button',
     function (event) {
      $('html,body').animate({
        scrollTop: $("#mapid").offset().top
      });
    })
  }

  function watchSearch() {
    $('#search-term').submit(function(event) {
      event.preventDefault();
    let query = { 
      key: Aa9wTkNOi7A4raCxp3bebhWhLL1uAvny,
      location: $('#search-term').val()
    }

    $.getJSON(GEO_SEARCH_URL, query, function(data) {
        lat = data.results[0].locations[0].latLng.lat;
        lng = data.results[0].locations[0].latLng.lng;
        $('#geo-code').val('')
    });
  })
}
  


// function 5: fetch location data from leaflet/mapbox API on click and return location results on map and in an alert popup for the user to click on


// function 6: Fetch Data from the YouTube API to display iFrame embedded video in results div

function callYoutubeAPI(valueSelected){
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=where+to+eat+in+${valueSelected}+best+restaurants&maxResults=1&&safeSearch=moderate&key=${youtube_Key}`)
    .then(youtubeResult =>
      youtubeResult.json())
    .then(youtubeResult => {
      displayOtherResults(youtubeResult.items[0]);
    })
    .catch(error =>
      console.log(error))
  }

  $(getLocation());
