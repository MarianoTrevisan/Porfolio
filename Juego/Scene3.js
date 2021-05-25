class Scene3 extends Phaser.Scene {
    constructor() {
      super("creditos");
    }

    create() {
      this.add.image(400, 300, 'sky');
      this.add.image(400, 568, 'ground').setScale(2)
      this.add.image(400, 100, 'bomb').setScale(3)


      var puntajefinal = this.add.text(0, 0, 'Score: ' + score,  { fontFamily: 'Press Start 2P', fontSize: 70, color: 'white' });
      //scene.add.zone(x, y, width, height)
        // X Y del centro del rectangulo invisible
        // width, height del rectangulo invisible
      Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(400, 300, 800, 600));



      var restartButton = this.add.text(700, 500, 'Restart', { fontFamily: 'Press Start 2P', fontSize: 20, color: 'white' })
      .setInteractive()
      .on('pointerdown', () => this.reiniciar() );
    }

    reiniciar() {
      this.scene.start('juego');
    }

    
}
  
