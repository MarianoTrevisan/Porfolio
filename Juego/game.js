var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 250 },
            debug: false
        }
    },
    backgroundColor: '#92C4FF',
    audio: {
        disableWebAudio: true
    },
    scene: [Scene1, Scene2, Scene3]
};

var game = new Phaser.Game(config);

var score;
var gameOver;

var player;
var stars;
var bombs;
var platforms;
var cursors;
var scoreText;
var ovni;
var velocityOvni = 0.4;

var timedEvent;
var initialTime;
var timeText;

var level = 0;