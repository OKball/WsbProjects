class SceneBoot extends Phaser.Scene{
    constructor(){
        super("booting");
    }
    preload(){
        this.load.image('background', 'assets/background.png');
        // this.load.image('ball', 'assets/star.png');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('basket', 'assets/basket.png');
        this.load.image('basket_collider', 'assets/basket_collider.png');
        this.load.image('bottom_basket', 'assets/bottom_basket.png');
    }
    
    create(){
        this.add.text(50,50, "Loading game...");
        this.scene.start("playing");
    }
}