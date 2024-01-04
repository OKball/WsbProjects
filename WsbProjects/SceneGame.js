
class SceneGame extends Phaser.Scene {
    constructor() {
        super("playing");
    }


    create () {
        this.background = this.add.image(400, 300, 'sky');
        this.ball = this.physics.add.image(400, 100, 'ball');
        this.ball.setCollideWorldBounds(true);
        this.ball.setGravityY(1000)
        this.ball.setBounce(1, 0.4);
        this.ball.setDamping(true);
        this.ball.setDrag(0.6, 1);
        this.ball.setInteractive();
        this.input.setDraggable(this.ball, true);
        this.posArrY = [0, 0];
        this.posArrX = [0, 0];
        this.veloX = 0
        this.veloY = 0

        this.input.on('dragstart', (pointer, gameObject) =>
        {
            gameObject.body.moves = false;
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) =>
        {

            gameObject.setPosition(dragX, dragY);
        });
        
        this.input.on('dragend', (pointer, gameObject) =>
        {
            gameObject.body.moves = true
            this.calcVelocity();
        });
    }

    updatePos(X, Y){
        this.posArrX.push(X);
        this.posArrY.push(Y);
        this.posArrX.shift();
        this.posArrY.shift();
    }

    calcVelocity(){
        this.veloX = (this.posArrX[1] - this.posArrX[0]) * 100
        this.veloY = (this.posArrY[1] - this.posArrY[0]) * 100
        this.ball.setVelocity(this.veloX, this.veloY)

    }

    addDrag(){
        if (this.veloX > 1){
            this.veloX -= 200
            this.ball.setVelocity(this.veloX, this.veloY)
        }
        if (this.veloX < -1){
            this.veloX += 200
            this.ball.setVelocity(this.veloX, this.veloY)
        }
    }


    update() {
        this.updatePos(this.ball.x, this.ball.y);
    }
}