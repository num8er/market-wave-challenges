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
  console.log("\n");
  run();
  console.log("\n");
});

var firingRange = 0;
var enemies = [];

function getFiringRange() {
  firingRange = parseInt(lines[0]);
  console.log('Firing range is '+firingRange+'m');
}

function getEnemies() {
  for(var i = 1; i < lines.length; i++) {
    var enemy = lines[i].split(' ');
    enemy = {
      name: enemy[0],
      speed: parseInt(enemy[2]),
      distance: parseInt(enemy[1])
    };
    enemies.push(enemy);
  }
}

function action() {
  console.log(enemies);
}

function run() {
  getFiringRange();
  getEnemies();
  action();
}
