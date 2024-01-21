
class SceneGame extends Phaser.Scene {
    constructor() {
        super("playing");
        
    }


    create () {
        this.scoring_counter = 0;
        this.point = 0;
        this.background = this.add.image(400, 300, 'background');
        this.basket = this.add.image(400, 200, 'basket');
        this.scoreboard = this.add.text(400, 100, this.point);
        //basket has 42 pixel radius --> from left to right is 84
        //and 55 below
        this.basket_collider_left = this.physics.add.image(350, 255, 'basket_collider').setCircle(4).setImmovable();
        this.basket_collider_right = this.physics.add.image(450, 255, 'basket_collider').setCircle(4).setImmovable();
        this.ball = this.physics.add.image(50, 450, 'ball').setCircle(24);
        this.ball.setCollideWorldBounds(true);
        this.ball.setGravityY(1000)
        this.ball.setBounce(1, 0.7);
        this.ball.setDamping(true);
        this.ball.setDrag(0.6, 1);
        this.ball.setInteractive();
        this.ball.setFriction(0.005);
        this.ball.setAngularVelocity(90);
        this.input.setDraggable(this.ball, true);

        

        this.point_zone_one = this.add.zone(400, 255, 84, 2);
        this.physics.add.existing(this.point_zone_one, false);
        this.point_zone_one.body.moves = false;

        this.point_zone_two = this.add.zone(400, 285, 84, 2);
        this.physics.add.existing(this.point_zone_two, false);
        this.point_zone_two.body.moves = false;

        this.point_zone_three = this.add.zone(400, 315, 200, 2);
        this.physics.add.existing(this.point_zone_three, false);
        this.point_zone_three.body.moves = false;
        
        this.bottom_basket = this.physics.add.image(400, 260, 'bottom_basket').setImmovable();
        this.bottom_basket.body.checkCollision.up = false;

        this.posArrY = [0, 0];
        this.posArrX = [0, 0];
        this.veloX = 0;
        this.veloY = 0;

        this.ball.body.onOverlap = true;
        this.basket_side_right = this.add.image(442, 255, 'basket_collider');
        this.basket_side_left = this.add.image(358, 255, 'basket_collider');
        this.physics.add.collider(this.ball, this.basket_collider_left);
        this.physics.add.collider(this.ball, this.basket_collider_right);
        this.physics.add.collider(this.ball, this.bottom_basket);


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

    updatePoints(){
        this.scoreboard.text = this.point;
    }

    checkPoints(){
        this.physics.overlap(this.ball, this.point_zone_one, (ball, point_zone_one) =>
        {
            this.scoring_counter = 1;
        });

        if (this.scoring_counter == 1){
            this.physics.overlap(this.ball, this.point_zone_two, (ball, point_zone_two) =>
        {
            this.scoring_counter = 2;
        });
        }   

        if (this.scoring_counter == 2){
            this.physics.overlap(this.ball, this.point_zone_three, (ball, point_zone_three) =>
        {
            this.scoring_counter = 3;
            this.point += 1;
            this.scoring_counter = 0;
            this.updatePoints();
        });
        // this.game.physics.arcade.collide(this.ball, this.basket);
        }
    }

    update() {
        this.updatePos(this.ball.x, this.ball.y);
        this.checkPoints();
}}