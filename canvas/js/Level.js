function Level(level) {
  /** STATE VARIABLES **/
  this.tiles = [];
  this.image = new Image();
  this.image.src = 'gfx/tiles.png';
  this.items = [];
  this.items.image = new Image();
  this.items.image.src = 'gfx/items.png';

  this.players = [];
  this.ghosts = [];
  this.map;

  /** INITIALIZE **/

  /** EXPORT MEMBER FUNCTIONS **/
  this.draw = draw;
  this.update = update;
  this.loadMap = loadMap;

  this.loadMap(level);


  /** MEMBER FUNCTIONS **/
  function update(delta) {
    for(var i=0;i<this.players.length; ++i) {
      this.players[i].update(delta);
    }
    for(var i=0;i<this.ghosts.length; ++i) {
      this.ghosts[i].update(delta);
    }
  }

  function draw(context) {
    //Draw the map
    for(var r=0; r<this.height;++r) {
      for(var c=0; c<this.width; ++c) {
        var i = r * this.width + c;
        var type = 0;
        if(this.map[i] == '+') {
          type = 1;
        } else if(this.map[i] == '.') {
          type = 2;
        } else if(this.map[i] == ' ') {
          type = 2;
        } else {
          type = 3;
        }
        context.drawImage(this.image,
          1 + 33 * type, 1, 32, 32,
          32*c, 32*r, 32, 32);
      }
    }
    if(this.players) {
      for(var i=0;i<this.players.length; ++i) {
        this.players[i].draw(context);
      }
    }
    if(this.ghosts) {
      for(var i=0;i<this.ghosts.length; ++i) {
        this.ghosts[i].draw(context);
      }
    }
  }

  function loadMap(level) {
    //Remove any lines starting with a hash, and blank lines
    var str = level;
    str = str.replace(/#.*/g, "");
    str = str.replace(/\n\n/g,"\n");
    var lines = str.split("\n");

    //// Now for the hobo loading ////
    // Dimensions
    var n = 1; // line num
    this.width  = parseInt(lines[n].split(' ')[0]);
    this.height = parseInt(lines[n].split(' ')[1]);
    ++n;
    // Load players
    var numPlayers = parseInt(lines[n]);
    for(var i=0; i<numPlayers; ++i) {
      //id x y
      ++n;
      var vals = lines[n].split(' ');
      var ae = new ActorEntity(parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2]));
      this.players.push(ae);
    }
    ++n;
    //Load ghosts
    var numGhosts = parseInt(lines[n]);
    for(var i=0; i<numGhosts; ++i) {
      //id x y
      ++n;
      var vals = lines[n].split(' ');
      var ae = new ActorEntity(parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2]));
      this.ghosts.push(ae);
    }
    ++n;
    //Load the board
    this.map = '';
    for(var r=0; r<this.height; ++r) {
      this.map += lines[n];
      ++n;
    }
  }
}
