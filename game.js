var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
    scene: [SceneBoot, SceneGame],
    scale: {
        parent: 'Game_div',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        // arcade: {
        //     debug: true
        // }
    }
};

var game = new Phaser.Game(config);