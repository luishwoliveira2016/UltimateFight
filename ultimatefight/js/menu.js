var menuState = {

	update :function(){
		game.state.start('test');
		//game.state.start('playMusic');
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
			game.state.start('play');
		}
	},

};