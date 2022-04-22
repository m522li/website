export class InterObj{
    
    constructor(gameW,gameH, image, x, y, drawnW, drawnH, page){
        this.gameW = gameW;
        this.gameH = gameH;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.friction = 0.96;
        this.drawnW = drawnW;   
        this.drawnH = drawnH;
        this.speedx = 0;
        this.speedy = 0;
        this.colliding = false;
        this.visibility = true;
        this.page = page;
        this.Px = x;
        this.Py = y;
        this.wordW = this.drawnW;
        this.image = image;
    }


     update = (player, allWords) =>{
         this.visibility = player.wordVisibility;
         if ((this.visibility===true)&&(this.page===1))
         {
            const dx = player.x - this.x; 
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (!(player.x > this.wordW + this.x || this.x > player.drawnW + player.x || player.y > this.drawnH + this.y || this.y > player.drawnH + player.y))
            {
        
                var vCollision = {x: player.x - this.x, y: player.y - this.y};
                var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                this.speedx -= (this.speed * vCollisionNorm.x*0.5);
                this.speedy -= (this.speed * vCollisionNorm.y*0.5);      
                
            }
         }
         else if ((this.visibility===false)&&(this.page===2))
         {
            const dx = player.x - this.x; 
            const dy = player.y - this.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (!(player.x > this.wordW + this.x || this.x > player.drawnW + player.x || player.y > this.drawnH + this.y || this.y > player.drawnH + player.y))
            {
        
                var vCollision = {x: player.x - this.x, y: player.y - this.y};
                var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                this.speedx -= (this.speed * vCollisionNorm.x*0.5);
                this.speedy -= (this.speed * vCollisionNorm.y*0.5);      
                
            }
         }

        
        for (let i=0; i<allWords.length; i++)
        {
            let obj1 = allWords[i]
            if (!(obj1 === this))
            {
                this.detectCollision(obj1)
            
                if (this.colliding)
                {
                    const dx = obj1.x - this.x; 
                    const dy = obj1.y - this.y;
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    var vCollision = {x: obj1.x - this.x, y: obj1.y - this.y};
                    var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    this.speedx -= (this.speed * vCollisionNorm.x*0.5);
                    this.speedy -= (this.speed * vCollisionNorm.y*0.5);      
                        
                }
            }
        }
        


        this.x += this.speedx;
        this.y += this.speedy;
        this.Px += this.speedx;
        this.Py += this.speedy;
        this.detectEdgeCollisions()

        
        if (Math.abs(this.speedx)>0.5)
        {
            this.speedx = this.speedx * this.friction;
        }
        else
        {
            this.speedx = 0;
        }
        if (Math.abs(this.speedy)>0.5)
        {
            this.speedy = this.speedy * this.friction;
        }
        else
        {
            this.speedy = 0;
        }
    
        

    }


    detectCollision(obj1)
    {

        obj1.colliding = false;
        this.colliding = false;
        if (!(obj1.x > this.wordW + this.x || this.x > obj1.wordW + obj1.x || obj1.y > this.drawnH + this.y || this.y > obj1.drawnH + obj1.y))
        {
            obj1.colliding = true;
            this.colliding = true;
        }
    }

    detectEdgeCollisions()
    {
        const restitution = 0.50;
        // Check for left and right
        if (this.x < 0){ //disable if chicken go to right
            this.speedx = Math.abs(this.speedx) * restitution;
            this.x = 0;
            this.Px = 0;

        }else if (this.x > this.gameW - this.wordW){
            this.speedx = -Math.abs(this.speedx) * restitution;
            this.x = this.gameW - this.wordW;
            this.Px = this.x;
        }

        // Check for bottom and top
        if (this.y< this.drawnH/2){
            this.speedy = Math.abs(this.speedy) * restitution;
            this.y = this.drawnH/2;
        } else if (this.y > this.gameH  - this.drawnH/2){
            this.speedy = -Math.abs(this.speedy) * restitution;
            this.y = this.gameH  - this.drawnH/2;
        }
        
    }
    
    draw = (ctx) => {
    
        if ((this.visibility === true)&&(this.page===1))
        {

            var image = new Image();
            image.src = this.image;
            ctx.drawImage(image, this.Px,this.Py,this.drawnW,this.drawnH);
        
        }
        else if ((this.visibility === false)&&(this.page===2))
        {
            var image = new Image();
            image.src = this.image;;
            ctx.drawImage(image, this.Px,this.Py,this.drawnW,this.drawnH);
        }
     
    }
}




export default InterObj;