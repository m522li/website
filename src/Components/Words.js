import alpha from './Photos/Alphabet2.png'
export class Words{
    
    constructor(gameW,gameH, word, x, y, drawnW, drawnH, page){
        this.gameW = gameW;
        this.gameH = gameH;
        this.width = 20;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.friction = 0.96;
        this.word = word;
        this.letters = word.length;
        this.smap = new SpriteMap().spriteMap;
        this.drawnW = drawnW;   
        this.drawnH = drawnH;
        this.Px = new Array();
        this.Py = new Array();
        this.speedx = 0;
        this.speedy = 0;
        this.colliding = false;
        this.visibility = true;
        this.visibility=true;
        this.page = page;
        for (let i = 0; i<this.letters; i++)
        {
            
            this.Px[i] = this.x+i*drawnW/1.25;
            if ((this.word.charAt(i)===',')||(this.word.charAt(i)===','))
            {
                this.Px[i] -= 10;
            }
            this.Py[i] = this.y;  
        }
        this.lastpos = this.Px[this.letters-1];
        this.wordW = this.Px[this.letters-1] - this.Px[0]+drawnW
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
        for (let i = 0; i<this.letters; i++)
        {
            this.Px[i] += this.speedx;
            this.Py[i] += this.speedy;
            this.detectEdgeCollisions()
        }
        
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
            for (let i = 0; i<this.letters; i++)
            {
                this.Px[i] = 0+i*35;
            }
        }else if (this.x > this.gameW - this.wordW){
            this.speedx = -Math.abs(this.speedx) * restitution;
            this.x = this.gameW - this.wordW;
            for (let i = 0; i<this.letters; i++)
            {
                this.Px[i] = this.x+i*35;
            }
        }

        // Check for bottom and top
        if (this.y< 0){
            this.speedy = Math.abs(this.speedy) * restitution;
            this.y = this.drawnH/2;
        } else if (this.y > this.gameH  - this.drawnH/2){
            this.speedy = -Math.abs(this.speedy) * restitution;
            this.y = this.gameH  - this.drawnH/2;
        }
        
    }
    
    draw = (ctx) => {
        const image = new Array();
        if ((this.visibility === true)&&(this.page===1))
        {
            for (let i = 0; i<this.letters; i++)
            {
                image[i] = new Image();
                image[i].src = alpha;
                
            }
    
            for (let i=0; i<this.letters; i++)
            {
                var letter = this.word.charAt(i)    
                var k = this.smap[letter];
                ctx.drawImage(image[i], k[0],k[1], this.width, this.height, this.Px[i],this.Py[i],this.drawnW,this.drawnH);
            }
        }
        else if ((this.visibility === false)&&(this.page===2))
        {
            for (let i = 0; i<this.letters; i++)
            {
                image[i] = new Image();
                image[i].src = alpha;
                
            }
    
            for (let i=0; i<this.letters; i++)
            {
                var letter = this.word.charAt(i)    
                var k = this.smap[letter];
                ctx.drawImage(image[i], k[0],k[1], this.width, this.height, this.Px[i],this.Py[i],this.drawnW,this.drawnH);
            }
        }
     
    }
}


class SpriteMap{
    constructor()
    {
        this.spriteMap = {};
        this.spriteMap[' '] = [0,0];
        this.spriteMap['0'] = [20,20];
        this.spriteMap['1'] = [40,20];
        this.spriteMap['2'] = [60,20];
        this.spriteMap['3'] = [80,20];
        this.spriteMap['4'] = [100,20];
        this.spriteMap['5'] = [120,20];
        this.spriteMap['6'] = [140,20];
        this.spriteMap['7'] = [160,20];
        this.spriteMap['8'] = [180,20];
        this.spriteMap['9'] = [200,20];
        this.spriteMap['A'] = [60,40];
        this.spriteMap['B'] = [80,40];
        this.spriteMap['C'] = [100,40];
        this.spriteMap['D'] = [120,40];
        this.spriteMap['E'] = [140,40];
        this.spriteMap['F'] = [160,40];
        this.spriteMap['G'] = [180,40];
        this.spriteMap["H"] = [200,40];
        this.spriteMap['I'] = [220,40];
        this.spriteMap['J'] = [240,40];
        this.spriteMap['K'] = [260,40];
        this.spriteMap['L'] = [280,40];
        this.spriteMap['M'] = [0,60];
        this.spriteMap['N'] = [21,60];
        this.spriteMap['O'] = [40,60];
        this.spriteMap['P'] = [60,60];
        this.spriteMap['Q'] = [80,60];
        this.spriteMap['R'] = [100,60];
        this.spriteMap['S'] = [120,60];
        this.spriteMap['T'] = [140,60];
        this.spriteMap['U'] = [160,60];
        this.spriteMap['V'] = [179,60];
        this.spriteMap['W'] = [200,60];
        this.spriteMap['X'] = [220,60];
        this.spriteMap['Y'] = [240,60];
        this.spriteMap['Z'] = [260,60];
        this.spriteMap['.'] = [280,0];
        this.spriteMap[','] = [240,0];
        this.spriteMap['!'] = [20,0];
    }

}

export default Words;