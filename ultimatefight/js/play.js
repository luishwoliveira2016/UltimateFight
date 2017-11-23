var playerLP = 100;
var bootLP = 100;
var playerHealth;
var bootHealth;

var playState = { 

    preload:function() {
    	game.load.image('fundo3','assets/fundo3.png');
    
        game.load.image('ground', 'assets/logo.png');
    	game.load.spritesheet('AndoreJr', 'assets/AndoreJr.png',77.4,132);
        game.load.spritesheet('Lash', 'assets/LashU.png',85,100);
    },

    create : function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0, 0, 'fundo3');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = game.add.group();

        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height -30, 'ground');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2,1);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        this.lifebar = game.add.sprite(450, game.world.height  -800, 'lifebar');    

        // The player and its settings
        this.player = game.add.sprite(150, game.world.height -180, 'AndoreJr');
        this.boot = game.add.sprite(450, game.world.height -150, 'Lash');

        //  We need to enable physics on the player
        game.physics.arcade.enable(this.player);
        game.physics.arcade.enable(this.boot);
        
    
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;

        this.boot.body.gravity.y = 300;
        this.boot.body.collideWorldBounds = true;

        this.player.animations.add('right', [9,10,9,10],8, true);
        this.player.animations.add('left', [10,9,10,9], 8, true);
        this.player.animations.add('up',[5]);
        this.player.animations.add('down', [4]); 
        this.player.animations.add('punch',[26,27]);
        this.player.animations.add('rage',[1]);

        game.input.keyboard.addKeyCapture(Phaser.Keyboard.Z);
        game.input.keyboard.addKeyCapture(Phaser.Keyboard.X);
        
        cursors = game.input.keyboard.createCursorKeys();
       
        playerHealth = game.add.text(16, 16, 'Player 1 ' + playerLP, { fontSize: '32px', fill: '#999' });
        bootHealth = game.add.text(600, 16, 'Player 2  ' + bootLP, { fontSize: '32px', fill: '#999'  });

    },

    update : function() {

        //game.physics.arcade.overlap(this.player,null, this);
        game.physics.arcade.collide(this.player, platforms);
        this.player.body.velocity.x = 0;


        //game.physics.arcade.overlap(this.boot,null, this)
        game.physics.arcade.collide(this.boot, platforms);
        this.boot.body.velocity.x = 0;


        game.physics.arcade.collide(this.boot,this.player);
        this.boot.body.velocity.x = 0;

        game.physics.arcade.collide(this.player,this.boot);
        //this.boot.body.velocity.x = 0;


        if (cursors.left.isDown){
            //  Move to the left
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        }
        else if (cursors.right.isDown){
            //  Move to the right
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else if (cursors.down.isDown){
            this.player.animations.play('down');
        }else if (cursors.up.isDown){
            this.player.animations.play('up');
        }
        else{
            //  Stand still
            this.player.animations.stop();
            this.boot.frame = 10;
            this.player.frame = 11;
            this.seguePlayer();
        }
        
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -350;
            this.player.animations.play('up');
            this.player.frame = 0;
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.Z)){
            this.player.body.setSize(80,80,80,50);
            game.physics.arcade.enable(this.player);
            this.player.animations.play('punch');
        }else{
        	this.player.body.setSize(80,80,30,50);
        }

        if(game.input.keyboard.isDown(Phaser.Keyboard.X)){
            this.player.animations.play('rage');
        }

        if(game.physics.arcade.collide(this.player,this.boot)){
            bootLP  = bootLP - 0.1;
            bootHealth.text= 'Player 2 ' + bootLP;
            if(bootLP <= 0){
                this.boot.kill();
                game.state.start('win');
            }
            if(playerLP <= 0 ){
            	this.player.kill();
            	game.state.start('game over');
            }
        }

        if(bootLP == 0 || playerLP == 0){

            game.state.start('boot');
        }
    },

    seguePlayer :function(){
    if (this.boot.position.x < this.player.body.position.x){
        // faz ele ir para direita
        this.boot.body.velocity.x += 50;
        //boot.animations.play('right');
    }else{
        // Senão, faz ele ir para esquerda
        this.boot.body.velocity.x -= 50;
        //this.boot.animations.play('left');
    }
    }

};