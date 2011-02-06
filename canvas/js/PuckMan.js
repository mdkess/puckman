var ARGS = {};
var level;
var http;
var FRAMETIME = 100;

/*** Main game functions ***/
function init() {
  var url = window.location.toString();
  url.match(/\?(.+)$/);
  url = RegExp.$1;

  var params = url.split('&');
  for(var i=0; i<params.length; ++i) {
    var t = params[i].split('=');
    ARGS[t[0]] = t[1];
  }
  loadContest();

}

function loadContest() {
  alert('Loading contest ' + ARGS['contest_id']);

  //Eventually this'll be loaded via AJAX, just use a text file for now
  http = new XMLHttpRequest();
  http.open("GET", 'res/' + ARGS['contest_id'] + '.txt', true);
  //http.setRequestHeader("Content-Type", "text/plain");
  http.onreadystatechange = loadContest2;
  http.send(null);
}
function loadContest2() {
  if(http.readyState == 4) {
    //document.write('<pre>' + http.responseText.length + '</pre>');
    level = new Level(http.responseText);
    setInterval(draw, FRAMETIME);
  }
}

function draw() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.clearRect(0,0,800,600);
  if(level) {
    level.update(FRAMETIME);
    level.draw(context);
  }
}
