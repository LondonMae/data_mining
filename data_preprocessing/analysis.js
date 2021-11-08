//process attribute data into datatype

const fs = require("fs");

var data = fs.readFileSync('london.arff').toString()
var arr = data.substring(data.indexOf("@data")+6, data.length-1).split("\n");

var map = {"danceability":[], "energy":[], "loudness":[], "speechiness":[], "acousticness":[], "instramentalness":[], "liveness":[], "valence":[], "tempo":[]}
var attr;
for (var i = 0; i < arr.length; i++) {
  attr = arr[i].split(",");
  map.danceability.push(attr[0]);
  map.energy.push(attr[1]);
  map.loudness.push(attr[3]);
  map.speechiness.push(attr[4]);
  map.acousticness.push(attr[5]);
  map.instramentalness.push(attr[6]);
  map.liveness.push(attr[7]);
  map.valence.push(attr[8]);
  map.tempo.push(attr[9]);
}


//console.log(map);

var test = ["danceability", "energy", "loudness", "speechiness", "acousticness", "instramentalness", "liveness", "valence", "tempo"];

var combos = [];
getCombinations(test);
function getCombinations(attributes) {
  for (var i = 0; i < test.length; i++) {
    for (var j = i+1; j < test.length; j++) {
      combos.push([test[i], test[j]]);
    }
  }
}

//console.log(combos);

//array of attributes


//generate all possible combinations

//run correlation on all numbers in lists of attributes
for (var i = 0; i < combos.length; i++) {
  console.log(combos[i][0], " ", combos[i][1], " ", correlationCoefficient(map[combos[i][0]].map(Number), map[combos[i][1]].map(Number), map[combos[i][0]].length));
}



function correlationCoefficient(X, Y, n) {
  let sum_X = 0, sum_Y = 0, sum_XY = 0;
  let squareSum_X = 0, squareSum_Y = 0;

  for (let i = 0; i < n; i++) {
    sum_X = sum_X + X[i];

    sum_Y = sum_Y + Y[i];

    sum_XY = sum_XY + X[i] * Y[i];
  }

  let corr = (n * sum_XY - sum_X * sum_Y) / (Math.sqrt((n * squareSum_X - sum_X * sum_X) * (n * squareSum_Y - sum_Y * sum_Y)));
  return corr;
}

//compare correlation and return in ranked order
