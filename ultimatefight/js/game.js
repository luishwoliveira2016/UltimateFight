
var game = new Phaser.Game(850,440, Phaser.AUTO,'gameDiv');

game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
//game.state.add('playMusic',playMusic);
game.state.add('win',winstate);
game.state.add('play',playState);
game.state.add('test',test);
game.state.start('boot');
