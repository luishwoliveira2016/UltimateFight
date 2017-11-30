var optState={
	
	preload :function(){

	    game.load.image('background','assets/lua.png');
	    game.load.image('logo', 'assets/logo2.png');
	    game.load.audio('music', ['music.mp3']);
	},	

	create:function(){
		background = game.add.tileSprite(0, 0, 1250, 1600, 'background');

		volume = game.add.text(100, 100, 'Volume ', { fontSize: '32px', fill: 'red' });

		sound = game.add.text(100, 200, 'Sound', { fontSize: '32px', fill: 'red' });
	},
}