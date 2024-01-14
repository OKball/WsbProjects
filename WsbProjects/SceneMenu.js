class SceneMenu extends Phaser.Scene{
    constructor(){
        super("menu");
    }
    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ball', 'assets/star.png');
    }
    
    create(){
        this.add.text(50,50, "Loading game...");
        this.scene.start("playing");
    }
}