class SceneBoot extends Phaser.Scene{
    constructor(){
        super("booting");
    }

    create(){
        this.add.text(50,50, "Loading game...");
        this.scene.start("playing");
    }
}