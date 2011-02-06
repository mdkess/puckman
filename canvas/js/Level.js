function Level(level) {
  /** STATE VARIABLES **/
  this.tiles = [];
  this.image = new Image();
  this.image.src = 'gfx/tiles.png';
  this.items = [];
  this.items.image = new Image();
  this.items.image.src = 'gfx/items.png';
  loadMap(level);
  /** INITIALIZE **/
  //Create a random map for now
  /*
  for(var x=0; x<20; ++x) {
    this.tiles[x] = new Array(20);
    for(var y=0; y<20; ++y) {
      this.tiles[x][y] = Math.floor(Math.random() * 5);
      var r = Math.random();
      if(r < 0.1) {
        //Add a stabby
        this.items.push(new Item(1, x, y));
      } else if(r < 0.5) {
        //add a shiney
        this.items.push(new Item(0, x, y));
      }
    }
  }
  */

  /** EXPORT MEMBER FUNCTIONS **/
  this.draw = draw;
  this.update = update;

  /** MEMBER FUNCTIONS **/
  function update(delta) {
    alert('update');
    for(var i=0;i<this.players.length; ++i) {
      this.players[i].update(delta);
    }
    for(var i=0;i<this.ghosts.length; ++i) {
      this.ghosts[i].update(delta);
    }
  }

  function draw(context) {
    alert(this.ghosts.length + ' ' + this.players.length);
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
    /*
    for(var x=0; x<20; ++x) {
      for(var y=0; y<20; ++y) {
        context.drawImage(this.image,
          1 + this.tiles[x][y] * 33, 1, 32, 32,
          x * 32, y * 32, 32, 32
        );
      }
    }
    //Now render items
    for(var i=0; i<this.items.length; ++i) {
      context.drawImage(this.items.image,
        this.items[i].type * 32, 0, 32, 32,
        this.items[i].x *32, this.items[i].y * 32, 32, 32
      );
    }
    */
  }
  function loadMap(level) {
    //Remove any lines starting with a hash, and blank lines
    var str = level;
    str = str.replace(/#.*/g, "");
    str = str.replace(/\n\n/g,"\n");
    document.write('<pre>' + str + '</pre>');
    var lines = str.split("\n");

    //// Now for the hobo loading ////
    // Dimensions
    var n = 1; // line num
    this.width  = lines[n].split(' ')[0];
    this.height = lines[n].split(' ')[1];
    ++n;
    // Load players
    var numPlayers = lines[n];
    this.players = [];
    for(var i=0; i<numPlayers; ++i) {
      //id x y
      ++n;
      var vals = lines[n].split(' ');
      this.players.push(new ActorEntity(vals[0], vals[1], vals[2]));
    }
    ++n;
    //Load ghosts
    var numGhosts = lines[n];
    ++n;
    this.ghosts = [];
    for(var i=0; i<numGhosts; ++i) {
      //id x y
      ++n;
      var vals = lines[n].split(' ');
      this.ghosts.push(new ActorEntity(vals[0], vals[1], vals[2]));
    }
    ++n;
    //Load the board
    for(var r=0; r<this.height; ++r) {
      for(var c=0; c<this.width; ++c) {

      }
    }
  }
}
