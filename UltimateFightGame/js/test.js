var button;
var button2;
var background;
var music;

var test = {

 preload : function() {

    game.load.spritesheet('button', 'assets/button_play.png', 200,200);
    game.load.spritesheet('button2', 'assets/button_options.png', 200, 200);
    game.load.image('background','assets/lua.png');
    game.load.image('logo', 'assets/logo2.png');
    game.load.audio('music', ['music.mp3']);
},

actionOnclick : function () {
  
  if(button) game.state.start('play');
  else if(button2) game.state.start('options');

},

create : function() {
    music = game.add.audio('music');
    music.play();
    music.loopFull(1);

    background = game.add.tileSprite(0, 0, 1250, 1600, 'background');
    logo = game.add.tileSprite(50, 50, 750,120, 'logo');

    button = game.add.button(game.world.centerX -200, 250, 'button',this.actionOnclick, this, 2, 1, 0);
    button2 = game.add.button(game.world.centerX -200, 325, 'button2',this.actionOnclick, this, 2, 1, 0);

},

};