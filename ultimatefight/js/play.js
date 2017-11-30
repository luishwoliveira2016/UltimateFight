
var playState = { 

    preload:function() {
    	game.load.image('fundo3','assets/fundo3.png');
        game.load.image('ground', 'assets/logo.png');
    	game.load.spritesheet('AndoreJr', 'assets/AndoreJr.png',77.4,132,41);
        game.load.spritesheet('roxyRev', 'assets/roxyRev.png',44.6,110,28);
        game.load.spritesheet('LifeBar', 'assets/lifebar.png',180,52,20);
        game.load.audio('punch_s', ['punch.mp3']);
        //game.load.audio('music', ['music.mp3']);
    },

    create : function() {

        function player(){
            var LifePoints;
            var corpo;
            var arm;
        };


        function lifebar(){
            var percent_life;
        };

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        p1 = new player();
        p2 = new player();

        L1 = new lifebar();
        L2 = new lifebar();

        function sound_effects(){
            punch_effect = game.add.audio('punch_s');

        }

        function active_health(){
            LP1 = game.add.sprite(30,30,'LifeBar');
            LP2 = game.add.sprite(630,30,'LifeBar');
            game.physics.arcade.enable(LP1);
            game.physics.arcade.enable(LP2);
        }
            
        function life_J1(){
            LP1.animations.add('75',[3],true);
            LP1.animations.add('50',[6],true);
            LP1.animations.add('25',[9],true);
        }

        function life_J2(){
            LP2.animations.add('75',[3],true); 
            LP2.animations.add('50',[6],true);
            LP2.animations.add('25',[9],true);
        }

        function cria_Cenario(){

            game.add.sprite(0, 0, 'fundo3');
            platforms = game.add.group();
            platforms.enableBody = true;
            var ground = platforms.create(0, game.world.height -30, 'ground');
            ground.scale.setTo(2,1);
            ground.body.immovable = true;
        }
        
        cria_Cenario();
        active_health();
        life_J1();
        life_J2();
        sound_effects();

        function cria_Jogadores(){
            
            p1 = game.add.sprite(150, game.world.height -180, 'AndoreJr');
            p2 = game.add.sprite(600, game.world.height -153, 'roxyRev');
            game.physics.arcade.enable(p1);
            game.physics.arcade.enable(p2);

            p1.arm = 0;
            p2.arm = 0;
            p1.corpo = 0;
            p2.corpo= 0;
            p2.scale.x = 1.5;
        }

        function movimento_Jogador1(){
            
            p1.animations.add('right', [9,10,9,10],8, true);
            p1.animations.add('left', [8,9,8,9], 8, true);
            p1.animations.add('up',[5]);
            p1.animations.add('down', [4]); 
            p1.animations.add('punch',[26,27]);
            p1.animations.add('rage',[1]);
        }
        function movimento_Jogador2(){
         
            p2.animations.add('right2', [11,12,13,14],8, true);//ok *
            p2.animations.add('left2', [11,12,13,14], 8, true); // ok*
            p2.animations.add('up2',[22]); //ok
            p2.animations.add('down2',[8]);  // ok 
            p2.animations.add('punch2',[16],); //ok
        }
        
        function controles(){
            game.input.keyboard.addKeyCapture(Phaser.Keyboard.Z);
            game.input.keyboard.addKeyCapture(Phaser.Keyboard.X);
            game.input.keyboard.addKeyCapture(Phaser.Keyboard.L);
            cursors = game.input.keyboard.createCursorKeys();
        }
        
        cria_Jogadores();
        movimento_Jogador1();
        movimento_Jogador2();
        controles();
        

        p1.LifePoints = 100;
        p2.LifePoints = 100;
        
    
        p1.body.gravity.y = 300;
        p1.body.collideWorldBounds = true;

        p2.body.gravity.y = 300;
        p2.body.collideWorldBounds = true;
       
        playerHealth = game.add.text(16, 16, 'Player 1 ' + p1.LifePoints, { fontSize: '32px', fill: '#999' });
        bootHealth = game.add.text(600, 16, 'Player 2  ' + p2.LifePoints, { fontSize: '32px', fill: '#999'  });

    },

    update : function() {

        function colisao(){

            game.physics.arcade.overlap(p1,null, this);
            game.physics.arcade.collide(p1, platforms);
            p1.body.velocity.x = 0;


            game.physics.arcade.overlap(p2,null, this);
            game.physics.arcade.collide(p2, platforms);
            p2.body.velocity.x = 0;


            game.physics.arcade.collide(p2,p1);
            p2.body.velocity.x = 0;

            game.physics.arcade.collide(p1,p2);
            p2.body.velocity.x = 0;
        }

        
        colisao();
        
            
        function atual_mov_jog1(){

            if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
                p1.body.velocity.x = -150;
                p1.animations.play('left');
                p1.scale.x = -1;
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
                p1.body.velocity.x = 150;
                p1.animations.play('right');
                p1.scale.x = 1;
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
                p1.animations.play('down');
            }else if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
                p1.animations.play('up');
            }
            else{
                p1.animations.stop();
                p1.frame = 10;
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.W) && p1.body.touching.down){
                p1.body.velocity.y = -350;
                p1.animations.play('up');
                p1.frame = 0;
            }

            if(game.input.keyboard.isDown(Phaser.Keyboard.Z)){
                p1.body.setSize(80,80,80,50);
                game.physics.arcade.enable(p1);
                p1.animations.play('punch');
                punch_effect.play();
                p1.arm = 1;
            }else{
                p1.body.setSize(80,80,20,50);
                p1.arm=0;
            }

            if(game.input.keyboard.isDown(Phaser.Keyboard.X)){
                p1.animations.play('rage');
            }
        }
            
        function atual_mov_jog2(){
             if (cursors.left.isDown){
                p2.body.velocity.x = -150;
                p2.animations.play('left2');
                p2.scale.x = 1.5;
             }
            else if (cursors.right.isDown){
                p2.body.velocity.x = 150;
                p2.animations.play('right2');
                p2.scale.x = -1.5 ;
            }
            else if (cursors.down.isDown){
                p2.animations.play('down2');
            }else if (cursors.up.isDown){
                p2.animations.play('up2');
            }
            else{
                p2.animations.stop();
                p2.frame = 14;
            }

            if (cursors.up.isDown && p1.body.touching.down){
                p2.body.velocity.y = -350;
                p2.animations.play('up2');
                
            }

            if(game.input.keyboard.isDown(Phaser.Keyboard.K)){
                p2.body.setSize(80,80,80,50);
                game.physics.arcade.enable(p2);
                p2.animations.play('punch2');
                punch_effect.play();
                p2.arm = 1;
            }else{
                p2.body.setSize(80,60,20,50);
                p2.arm = 0;

            }
        }
        function atualiza_danos(){

            if(game.physics.arcade.collide(p1,p2) && p1.arm == 1 && p2.corpo == 0){
                p2.LifePoints = p2.LifePoints  -0.5;
                bootHealth.text = 'Player 2 ' + p2.LifePoints;
                if(p2.LifePoints <= 75){
                    LP2.animations.play('75');
                }
                if(p2.LifePoints <= 50){
                    LP2.animations.play('50');   
                }
                if (p2.LifePoints<= 25){
                    LP2.animations.play('25');
                }
            }
            else if(game.physics.arcade.collide(p2,p1) && p2.arm == 1 && p1.corpo==0){
                p1.LifePoints = p1.LifePoints -0.5;
                playerHealth.text = 'Player 1' + p1.LifePoints;

                if(p1.LifePoints<= 75){
                    LP1.animations.play('75');
                }
                if(p1.LifePoints<= 50){
                    LP1.animations.play('50');   
                }
                if (p1.LifePoints<= 25){
                    LP1.animations.play('25');
                }
            }

            if(p2.LifePoints == 0){
                p2.kill();
                game.state.start('win');
            }
            if(p1.LifePoints == 0 ){
                p1.kill();
                game.state.start('win2');
            }
        }
        atual_mov_jog1();
        atual_mov_jog2();
        atualiza_danos();
    },
};