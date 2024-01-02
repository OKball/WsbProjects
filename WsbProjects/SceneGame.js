
class SceneGame extends Phaser.Scene {
    constructor(){
        super("playing");
    }
    preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ball', 'assets/star.png');
    }

    create ()
    {
        this.add.image(400, 300, 'sky');
        const logo = this.physics.add.image(400, 100, 'ball');
    }
}