var music;

var playMusic={

preload  : function() {

    //  Firefox doesn't support mp3 files, so use ogg
    game.load.audio('music', ['music.mp3']);

},

create :function() {

    game.stage.backgroundColor = '#182d3b';
    game.input.touch.preventDefault = false;

    music = game.add.audio('music');

    music.play();
    music.loopFull(0.6);
    game.input.onDown.add(changeVolume, this);

},

changeVolume : function(pointer) {

    if (pointer.y < 100)
    {
        music.mute = false;
    }
    else if (pointer.y < 300)
    {
        music.volume += 0.1;
    }
    else
    {
        music.volume -= 0.1;
    }

},

update :function() {
  
},

render : function() {
    game.debug.soundInfo(music, 20, 32);
},

}