var SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'fcecfc72172e4cd267473117a17cbd4d',
  clientSecret: 'a6338157c9bb5ac9c71924cb2940e1a7',
  redirectUri: 'http://www.example.com/callback'
});

//in order to access spotify api
spotifyApi.setAccessToken('BQCxUvV36dcXUyr-p1M8GaoFBVQT1kC0BVwWXOBtt1UNrtQr1Q_wHjaJj0TSixBCm5igv0-DZ3akSFfxJVA0wcszdqBb0PzPoonUSk7TkEwpo-VwSNZ8Yj0KuJ05QFJHl0RBcVe58t0u1eJ1WSGTWGkl1x5RWutbgkB0XOmKLer4_LKz0uI7HTJOPgGuxRVOPmtaJecUDqgPb6EvVRLrW6s');

spotifyApi.getMySavedTracks({
    limit : 50,
    offset: 100
  })
  .then(function(data1) {
    console.log(data1);
    for (var i = 0; i < data1.body.items.length; i++) {
      spotifyApi.getAudioFeaturesForTrack(data1.body.items[i].track.id)
      .then(function(data) {
        console.log(data.body.danceability + "," + data.body.energy + "," + data.body.key + "," + data.body.loudness +
                       "," + data.body.speechiness + "," + data.body.acousticness + "," + data.body.instrumentalness +
                        "," + data.body.liveness + "," + data.body.valence + "," + data.body.tempo + "," + data.body.id + "\n");
        fs.appendFile('london.arff', data.body.danceability + "," + data.body.energy + "," + data.body.key + "," + data.body.loudness +
                       "," + data.body.speechiness + "," + data.body.acousticness + "," + data.body.instrumentalness +
                        "," + data.body.liveness + "," + data.body.valence + "," + data.body.tempo + "," + data.body.id + "\n", (err) => {
          // In case of a error throw err.
          if (err) throw err;
        })
      }, function(err) {
        console.log(err);
      });
      console.log(data1.body.items[i].track.id);
    }
  }, function(err) {
    console.log('Something went wrong!', err);
  });
