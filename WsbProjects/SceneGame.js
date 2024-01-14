
class SceneGame extends Phaser.Scene {
    constructor() {
        super("playing");
    }


    create () {
        this.background = this.add.image(400, 300, 'background');
        this.basket = this.add.image(400, 128, 'basket');
        this.basket_collider_left = this.physics.add.image(358, 183, 'basket_collider').setCircle(5).setImmovable();
        this.basket_collider_right = this.physics.add.image(443, 183, 'basket_collider').setCircle(5).setImmovable();
        
        this.ball = this.physics.add.image(50, 450, 'ball').setCircle(24);
        this.ball.setCollideWorldBounds(true);
        this.ball.setGravityY(1000)
        this.ball.setBounce(1, 0.7);
        this.ball.setDamping(true);
        this.ball.setDrag(0.6, 1);
        this.ball.setInteractive();
        this.input.setDraggable(this.ball, true);

        this.posArrY = [0, 0];
        this.posArrX = [0, 0];
        this.veloX = 0;
        this.veloY = 0;
        this.movementTimer = 0;
        
        this.physics.add.collider(this.ball, this.basket_collider_left);
        this.physics.add.collider(this.ball, this.basket_collider_right);
        


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

    update() {
        this.updatePos(this.ball.x, this.ball.y);
        // this.game.physics.arcade.collide(this.ball, this.basket);
    }
}