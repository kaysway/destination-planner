'use strict'

const youtube_Key = "08657a242a7a81b59e5d79081c3812a9a7bfa260"
const GEO_SEARCH_URL = 'http://www.mapquestapi.com/geocoding/v1/address';

let map;

//GOOD-----display map on start screen when page loads
  function createMap(position) {
   map = L.map('map', {
      center: ([position.coords.latitude, position.coords.longitude]),
      layers: MQ.mapLayer(),
      zoom: 11
    });    
    pinLocation(position.coords.latitude, position.coords.longitude);
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
      pinLocation(lat, lng);
      $('#search-term').val('')
    });
  })
} 

// GOOD----Pin your location on the map
function pinLocation(lat, lng) {
  L.marker([lat, lng]).addTo(map);
}

// INCOMPLTE----This will populate the results on the map
// function populateMap(data, map) {
//   data.results.providedLocation.location.forEach(location => {
//   let lat = data.results[0].locations[0].latLng.lat;
//   let lng = data.results[0].locations[0].latLng.lng;
//       L.mapquest.textMarker([lat, long], {
//           text: city.name,
//           type: 'marker',
//           position: 'bottom',
//           alt: city.name + 'Learn more about' + city.name + 'on YouTube',
//           icon: {
//               primaryColor: '#ffffff',
//               secondaryColor: '#333333',
//               size: 'md',
//           },
//       }).bindPopup(`${city.name} <br><a target='_blank' aria-label='Read more about ${city.name} on YouTube' href=${city.url}>YouTube</a>`).openPopup().addTo(map);
//   });
//   watchSearch();  
// };


function callYoutubeAPI(location){
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=where+to+eat+in+${location}+best+restaurants&maxResults=1&&safeSearch=moderate&key=${youtube_Key}`)
    .then(youtubeResult =>
      youtubeResult.json())
    .then(youtubeResult => {
      displayOtherResults(youtubeResult.items[0]);
    })
    .catch(error =>
      console.log(error))
  } 

//Loads the IFrame Player API code asyncrhonously
  // let tag = document.createElement('script');
  
  // tag.src = "https://www.youtube.com/iframe_api";
  // var firstScriptTag = document.getElementsByTagName('script')[0];
  // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// This function creates an <iframe> (and YouTube player) after the API code downloads.
      // var player;
      // function onYouTubeIframeAPIReady() {
      //   player = new YT.Player('player', {
      //     height: '390',
      //     width: '640',
      //     videoId: 'M7lc1UVf-VE',
      //     events: {
      //       'onReady': onPlayerReady,
      //       'onStateChange': onPlayerStateChange
      //     }
      //   });
      // }

// The API will call this function when the video player is ready.
  // function onPlayerReady(event) {
  //   event.target.playVideo();
  // }
  
//call listeners
function initializePage (){
  getLocation();
  watchSearch();
  callYoutubeAPI();
}

$(initializePage());
