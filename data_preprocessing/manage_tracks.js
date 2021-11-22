const fs = require("fs");

var data = fs.readFileSync('tracks_features.csv').toString()
// var arr = data.split("\n");
var a = [];
var b = [];
var dataset = [];


function csvToArray(text) {
    let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
    for (l of text) {
        if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
        } else if (',' === l && s) l = row[++i] = '';
        else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = '']; i = 0;
        } else row[i] += l;
        p = l;
    }
    return ret;
};

dataset = csvToArray(data);
var new_data = [];
for (let i = 0; i < dataset.length-1; i++) {
  b = [];
  b.push(dataset[i][0]);
  for (let j = 9; j < 20; j++) {
    b.push(dataset[i][j]);
  }
  new_data.push(b);
}

console.log(new_data);

a = [];
b = [];
arr = [];
dataset = [];

var data_string = "";
for (let i = 0; i < new_data.length; i++) {
  for (let j = 0; j < new_data[i].length; j++) {
    data_string += new_data[i][j]
    if (j < new_data[i].length-1) {
      data_string += ",";
    }
  }
  data_string+="\n";
}

fs.appendFile('tracks_features.arff', data_string, (err) => {
  // In case of a error throw err.
  if (err) throw err;
})

console.log("SUCCESS");
