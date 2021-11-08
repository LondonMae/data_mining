var SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});

//in order to access spotify api
spotifyApi.setAccessToken('BQBuiSJQzf7k5OSIw3jXJyuQGKaChcfnV0ufygM5BiFqDs6S3YxNHEDiS4uRDlKWs6SG1zr2EqUGK7iwFRnUgoLLo21bBpoT86Al5fJAA3wIJhm9XK28ZQqtAgsmIJYjjX03Pm-U3yU147WoQHRXUtbAWjCaW0cvk2m3ZceUwhvJRHiRve1vZGjrUmiIuAa_0LMfsU_MaQ');

// access json data
var data = JSON.parse(fs.readFileSync("sliceOne.json"));
//for all songs, get analysis
var uri;

var uris = [];
var playlists = [];
for (var j = 0; j < 2; j++) {
  var playlist = data.playlists[j].tracks
  for (var i = 0; i < playlist.length; i++) {
    //track uri
    var uri = playlist[i].track_uri.split(":")[2]
    uris.push(uri);
    playlists.push(j);
  }
}

console.log(uris);


var file_body = "";
console.log(uris[0]);
console.log(playlists[0]);
for (var i = 0; i < uris.length; i++) {
  testing_call(uris[i], playlists[i]);
}

var file_body = "";
function testing_call (uri, playlist) {
  console.log(uri);
    spotifyApi.getAudioFeaturesForTrack(uri)
    .then(function(data) {
      file_body += data.body.danceability + "," + data.body.energy + "," + data.body.key + "," + data.body.loudness +
                     "," + data.body.speechiness + "," + data.body.acousticness + "," + data.body.instrumentalness +
                      "," + data.body.liveness + "," + data.body.valence + "," + data.body.tempo + "," + ("playlist_" + playlist) + "," + data.body.id + "\n";
      // console.log(file_body);
      fs.writeFile('sliceOne.arff', file_body, (err) => {
        // In case of a error throw err.
        if (err) throw err;
      })
    }, function(err) {
      console.log(err);
    });
  }
  // console.log(file_body);
