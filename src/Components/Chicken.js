import chick from './Photos/chicken.png'

export class Chicken{


    constructor(gameW,gameH){
        this.gameW = gameW;
        this.gameH = gameH;
        this.width = 80;
        this.height = 100;
        this.x = gameW/2;
        this.y = gameH/1.5;
        this.speedx = 0;
        this.speedy = 0;
        this.speed = 10
        this.drawnW = gameW/25;   
        this.drawnH = gameH/10.8;
        this.colliding = false;
    }


     update = (input) =>{
        this.x += this.speedx;
        if (input.keys.indexOf('ArrowRight') > -1)
        {
            this.speedx = this.speed;
        }
        else if (input.keys.indexOf('ArrowLeft') > -1)
        {
            this.speedx = -this.speed
        }
        else
        {
            this.speedx = 0;
        }
        if (this.x<0) this.x = 0;
        else if (this.x>this.gameW-this.width) this.x = this.gameW  - this.width;

        this.y += this.speedy;
        if (input.keys.indexOf('ArrowUp') > -1)
        {
            this.speedy = -this.speed;
        }
        else if (input.keys.indexOf('ArrowDown') > -1)
        {
            this.speedy = this.speed
        }
        else
        {
            this.speedy = 0;
        }
        if (this.y<0) this.y = 0;
        else if (this.y>this.gameH-this.height) this.y = this.gameH - this.height;

    }

    draw = (ctx) => {
        const image = new Image();
        image.src = chick;
        ctx.drawImage(image,this.x,this.y, this.drawnW,this.drawnH);
    }
}




export default Chicken;