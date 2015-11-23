var lines = [];

process.stdin.resume();

process.stdin.on('data', function (data) {
  data = data.toString().trim();
  if(data != '') {
    data = data.split("\n");
    data.forEach(function(line){
      line = line.toString().trim();
      lines.push(line);
    });
  }
});

process.stdin.on('end', function () {
  run();
});


var areaSize = {};
var Area = [];
var rectSize = {};
var Rect = [];

function makeArea() {
  var sizes = lines[0].split(',');

  areaSize = sizes[0].trim().split(' ');
  areaSize = {
    x: parseInt(areaSize[0]),
    y: parseInt(areaSize[1])
  }

  for(var y = 0; y < areaSize.y; y++) {
    Area[y] = [];
    for(var x = 0; x < areaSize.x; x++) {
      Area[y][x] = ' ';
    }
  }
}

function makeRect() {
  var sizes = lines[0].split(',');

  rectSize = sizes[1].trim().split(' ');
  rectSize = {
    x: parseInt(rectSize[0]),
    y: parseInt(rectSize[1])
  }

  for(var y = 0; y < rectSize.y; y++) {
    Rect[y] = [];
    for(var x = 0; x < rectSize.x; x++) {
      Rect[y][x] = ' ';
    }
  }
}

function placePoints() {
  for(var l = 1; l < lines.length; l++) {
    var point = lines[l].trim().split(' ');
    Area[point[1]][point[0]] = 'x';
  }
}

function init() {
  makeArea();
  makeRect();
  placePoints();
}

var placements = [];

function cropRectangle(offsetX, offsetY) {
  var points = [];
  for(var y = offsetY; y < offsetY + rectSize.y; y++) {
    for(var x = offsetX; x < offsetX + rectSize.x; x++) {
      if(Area[y] && Area[y][x] && Area[y][x] == 'x') {
        points.push({x: x, y: y});
      }
    }
  }

  return {x: offsetX, y: offsetY, points: points};
}

function getPossiblePlacements() {
  for(var y = 0; y < areaSize.y; y++) {
    for(var x = 0; x < areaSize.x; x++) {
      var placement = cropRectangle(x, y);
      placements.push(placement);
    }
  }
}

function findOptimalPlacement() {
  var optimalPlacement = {x: 0, y: 0, points: []};
  placements.forEach(function(placement){
    if(placement.points.length > optimalPlacement.points.length) {
      optimalPlacement = placement;
    }
  });

  console.log(areaSize.x +' '+ areaSize.y +', '+ rectSize.x +' '+ rectSize.y);
  console.log(optimalPlacement.x +' '+ optimalPlacement.y +', '+ optimalPlacement.points.length);
}

function run() {
  init();
  getPossiblePlacements();
  findOptimalPlacement();
}
