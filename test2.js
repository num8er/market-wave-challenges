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

  // reverse sorting enemies by speed, to fire speediest first
  enemies.sort(function(a,b){
    return a.speed - b.speed;
  });
}

var turn = 1;

function action() {
  var alive = enemies.length;

  while(alive > 0) {
    var madeShot = false;
    var enemyIdx;

    enemies.forEach(function(enemy, idx) {
      if(turn > 1) enemy.distance -= enemy.speed;
      if(enemy.distance <= firingRange && !madeShot) {
        console.log('Turn '+turn+': Kill '+enemy.name+' at '+enemy.distance+'m');
        madeShot = true;
        delete enemies[idx];
        alive--;
      }
    });

    turn++;
  }

  console.log('You win in '+(turn-1)+' turns');
}

function run() {
  getFiringRange();
  getEnemies();
  action();
}
