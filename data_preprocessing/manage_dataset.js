var SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});

//in order to access spotify api
spotifyApi.setAccessToken('BQCwOxH1xUaX-rm59Rku47afb-Yjn94c5DMs8PPtBt4cAv212KRUSbJdJQnB5NX2qj60kehBpvzs7CKkYSLMI9zTWRZCWKhUDKk1_OX4hwLbopeViCQtzq4QtBa7SqkuOkrjkRTZGRhulPXjJrD_ZDfX2hZvR86wNw3-emHWAwH5_XRHuZocT7ae5sLi-UtVsa9keidXGw');

// access json data
var data = JSON.parse(fs.readFileSync("sliceOne.json"));

//for all songs, get analysis
var uri;

var uris = [];
var trackInfo = []

for (var j = 0; j < 2; j++) {
  var playlist = data.playlists[j].tracks

  for (var i = 0; i < playlist.length; i++) {
    //track uri
    var uri = playlist[i].track_uri.split(":")[2]

    uris.push(uri);
  }
}

console.log(uris);

var file_body = "";

spotifyApi.getAudioFeaturesForTracks(uris)
  .then(function(data) {
    //console.log(data.body.audio_features);
    for (var i = 0; i < data.body.audio_features.length; i++) {
      file_body += data.body.audio_features[i].danceability + "," + data.body.audio_features[0].energy + "," + data.body.audio_features[0].key + "," + data.body.audio_features[0].loudness + "," + data.body.audio_features[0].loudness +
                    "," + data.body.audio_features[0].mode + "," + data.body.audio_features[0].speechiness + "," + data.body.audio_features[0].acousticness + "," + data.body.audio_features[0].instrumentalness +
                    "," + data.body.audio_features[0].liveness + "," + data.body.audio_features[0].valence + "," + data.body.audio_features[0].tempo + "," + data.body.audio_features[0].id + "\n";
    }
    console.log(file_body);
    fs.writeFile('sliceOne.arff', file_body, (err) => {
      // In case of a error throw err.
      if (err) throw err;
    })
  }, function(err) {
    done(err);
  });
