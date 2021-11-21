var SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});

//in order to access spotify api
spotifyApi.setAccessToken('BQAQEi17yALL8Ka2uN_OF3jusonNUgDFxjazTqjiXMzwUm-Yw66ba8VRA3T8S4CU6v3ELREmYE8ghGg3kWYWV3ZCViYRHPsOxbyf1Ol2EsjPUFJ-00BVOQl311tBW_Na-5GzTwTSCt1SOLKb95fQMQ7SZ53RwP4_UMWxpG5SqGSB8BGXSbot3ujdTu5vS2rdzjVL1ALk3Q4bsTTwddTzUEkZIf7p');

// access json data
var data = JSON.parse(fs.readFileSync("sliceOne.json"));
//for all songs, get analysis
var uri;

var uris = [];
var playlists = [];
for (var j = 0; j < 900; j++) {
  var playlist = data.playlists[j].tracks
  for (var i = 0; i < playlist.length; i++) {
    //track uri
    var uri = playlist[i].track_uri.split(":")[2]
    uris.push(uri);
    playlists.push(j);
  }
}

const timer = ms => new Promise(res => setTimeout(res, ms));

var file_body = "";

// const start = async function(uri, playlist) {
//   testing_call(uri, playlist);
//   await timer(100); // then the created Promise can be awaited
// }
// for (var i = 0; i < uris.length; i++) {
//   start(uris[i], playlists[i]);
// }

testing_call(uris[0], playlists[0], 0);

var file_body = "";
function testing_call (uri, playlist, i) {
  console.log(uri);
    spotifyApi.getAudioFeaturesForTrack(uri)
    .then(function(data) {
      file_body = data.body.danceability + "," + data.body.energy + "," + data.body.key + "," + data.body.loudness +
                     "," + data.body.speechiness + "," + data.body.acousticness + "," + data.body.instrumentalness +
                      "," + data.body.liveness + "," + data.body.valence + "," + data.body.tempo + "," + ("playlist_" + playlist) + "," + data.body.id + "\n";
      // console.log(file_body);
      fs.appendFile('test.arff', file_body, (err) => {
        // In case of a error throw err.
        if (err) throw err;
      })

    setTimeout(testing_call, 300, uris[i+1], playlists[i+1], i+1); //recursive call
    }, function(err) {
      console.log(err);
    });
  }
  // console.log(file_body);
