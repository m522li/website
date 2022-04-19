
import arrow from './Photos/arrows.png'
export class Arrows{
    
    constructor(gameW,gameH, chicken){
        this.gameW = gameW;
        this.gameH = gameH;
        this.width = 150;
        this.height = 155;
        this.drawnW = gameW/26.55;   
        this.drawnH = gameH/13.9;
        this.Px = new Array();
        this.Py = new Array();
        this.visibility = true;
        
        this.Px[0] = chicken.x 
        this.Py[0] = chicken.y + chicken.height
        this.Px[1] = chicken.x 
        this.Py[1] = chicken.y + chicken.height + this.drawnH
        this.Px[2] = this.Px[0] - this.drawnW
        this.Py[2] = chicken.y + chicken.height + this.drawnH
        this.Px[3] = this.Px[0] + this.drawnW
        this.Py[3] = chicken.y + chicken.height + this.drawnH -2

  
    }


     update = (input) =>{
        
        if (input.keys.indexOf('ArrowRight') > -1)
        {
            this.visibility = false;
        }
        else if (input.keys.indexOf('ArrowLeft') > -1)
        {
            this.visibility = false;
        }
        else if (input.keys.indexOf('ArrowUp') > -1)
        {
            this.visibility = false;
        }
        else if (input.keys.indexOf('ArrowDown') > -1)
        {
            this.visibility = false;
        }


    }

    draw = (ctx) => {
        const image = new Array();
        var k = [[0,0], [0,150], [150,150], [150,0]] //up down left right
        if (this.visibility === true)
        {
            for (let i = 0; i<4; i++)
            {
                image[i] = new Image();
                image[i].src = arrow;
                
            }
            
            for (let i=0; i<4; i++)
            {
                ctx.drawImage(image[i], k[i][0],k[i][1], this.width, this.height, this.Px[i],this.Py[i],this.drawnW,this.drawnH);
            }
        }
        
     
    }
}




export default Arrows;