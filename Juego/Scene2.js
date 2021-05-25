class Scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
    }

    create ()
    {
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        ovni = this.physics.add.staticImage(390, 120, 'ovni').setScale(1);

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(1.0);

        //  Input Events
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        }
            

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            
            child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
            child.x += Phaser.Math.FloatBetween(-15, 15) 
           
            switch (Phaser.Math.Between(0, 4)) {
                case 0:
                    child.score = 10;
                
                    break;
                case 1:
                    child.setTexture('star2');
                    child.score = 15;

                    break;
                case 2:
                    child.setTexture('star3');
                    child.score = 15;

                    break;
                case 3:
                    child.setTexture('star4');
                    child.score = 15;

                    break;
                default:
                    child.setTexture('star5');
                    child.score = 15;

                    break;
            }

        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', {fontFamily: 'DS-DIGI', fontSize: '32px', fill: 'chartreuse' });
 
        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(player, ovni);
        this.physics.add.collider(stars, ovni);
        this.physics.add.collider(bombs, ovni);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        // Inicializacion de variables.
        score = 0;
        gameOver = false;

        // Si no junta las estrellas en 30 segundas --> Game Over
        initialTime = 30
        //timedEvent = this.time.delayedCall(1000, this.onSecond, [], this, true);
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(600, 16, '', { fontFamily: 'DS-DIGI', fontSize: '32px', fill: 'chartreuse' });
        

        this.jumps = 0;


    }

    update ()
    {
        if (gameOver)
        {       
            return
        }
        
        
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);

        }

        ovni.y += velocityOvni; 
        ovni.refreshBody();
        if (ovni.y > 200) {
            velocityOvni *= -1;
        }

        if (ovni.y < 120) {
            velocityOvni *= -1;
        }
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        //  Add and update the score
        score += star.score //10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);
                
                switch (Phaser.Math.Between(0, 4)) {
                    case 0:
                        child.score = 10;
                    
                        break;
                    case 1:
                        child.setTexture('star2');
                        child.score = 15;
    
                        break;
                    case 2:
                        child.setTexture('star3');
                        child.score = 15;
    
                        break;
                    case 3:
                        child.setTexture('star4');
                        child.score = 15;
    
                        break;
                    default:
                        child.setTexture('star5');
                        child.score = 15;
    
                        break;
                }
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

             
            // Cada ronda se suma un nivel y se le resta un segundo al tiempo inicial
            level += 1
            initialTime = 30 - level;
        }
    }


    hitBomb (player, bomb)
    {
        this.gameOver()
    }


    gameOver() {        
        gameOver = true;
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');        

        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'DS-DIGI', fontSize: 70, color: '#ff0000' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('creditos'));
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600));    
    }
    
    onSecond() {
        if (! gameOver)
        {       
            initialTime = initialTime - 1; // One second
            timeText.setText('Countdown: ' + initialTime);
            if (initialTime == 0) {
                timedEvent.paused = true;
                this.gameOver()
            }            
        }

    }



}
