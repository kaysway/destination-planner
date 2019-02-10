// let youtube_Key = "08657a242a7a81b59e5d79081c3812a9a7bfa260"
let accessToken = 'pk.eyJ1Ijoia2F5c3dheSIsImEiOiJjanJ6ZHZveTUxN3hwNGJvNDFwaHhweXk3In0.Xesc_eMjC872n1L4hqNbpw'

// // Access YouTube API
// function callYoutubeAPI(valueSelected){
//     fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=where+to+eat+in+${valueSelected}+best+restaurants&maxResults=1&&safeSearch=moderate&key=${youtube_Key}`)
//     .then(youtubeResult =>
//       youtubeResult.json())
//     .then(youtubeResult => {
//       displayOtherResults(youtubeResult.items[0]);
//     })
//     .catch(error =>
//       console.log(error))
//   }



  // add map to start screen

  let map = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);