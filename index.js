let youtube_Key = "08657a242a7a81b59e5d79081c3812a9a7bfa260"
let accessToken = 'pk.eyJ1Ijoia2F5c3dheSIsImEiOiJjanJ6ZHZveTUxN3hwNGJvNDFwaHhweXk3In0.Xesc_eMjC872n1L4hqNbpw'

  // function 1: add map to start screen when page loads

  let map = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2F5c3dheSIsImEiOiJjanJ6ZHZveTUxN3hwNGJvNDFwaHhweXk3In0.Xesc_eMjC872n1L4hqNbpw'
}).addTo(mapid);


//function 2: On Search button click, hide the startDisplay div and reveal the results div
function getCityData() {
  let city = $('.search-query').val();
   
}


// function 3: fetch location data from leaflet/mapbox API on click and return location results on map and in an alert popup for the user to click on


// function 4: Fetch Data from the YouTube API to display iFrame embedded video in results div

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
