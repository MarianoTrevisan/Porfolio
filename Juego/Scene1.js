class Scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    preload ()
    {
      this.load.image('logo', 'assets/astronaut.jpg');
      this.load.image('sky', 'assets/sky.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('ovni', 'assets/plataform3.png');
      this.load.image('star', 'assets/star.png');
      this.load.image('bomb', 'assets/bomb.png');
      this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });  
      this.load.image('star2', 'assets/star2.png');
      this.load.image('star3', 'assets/star3.png');
      this.load.image('star4', 'assets/star4.png');
      this.load.image('star5', 'assets/star5.png');
    }

    create() {

      //  Our player animations, turning, walking left and walking right.
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

      var logo = this.add.image(400, 300, 'logo').setScale(1);
      var title = this.add.text(config.width / 2, config.height / 2+250, 'Press click to start', {fontFamily: 'Press Start 2P', fontSize: '32px', fill: 'black' });
      title.setOrigin(0.5)
      logo.setInteractive()
      logo.on('pointerdown', () => this.scene.start('juego') );

      this.input.keyboard.on('keyword-F', () => {
        this.scene.restart();
     });

      // Funcion FLECHA
      // (param1, param2, …, paramN) => { sentencias }
      // (param1, param2, …, paramN) => expresion
      // Equivalente a: () => { return expresion; }
    }
}
