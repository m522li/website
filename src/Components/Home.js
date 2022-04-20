/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import { Chicken } from './Chicken';
import { Words } from './Words';
import { Arrows } from './Arrows';
import { InputHandler } from './InputHandler';
import bg from './Photos/Background.png';
import '../App.css'


function Home() {
  var width = window.innerWidth;
  var height = window.innerHeight-74;
  let canvas;
  let ctx; 
  const drawnW = width/46.45;
  const drawnH = height/24.424;
  const input = new InputHandler();
  var player = new Chicken(width, height);
  var bio = "HEY MY NAME IS MERVIN! I AM CURRENTLY IN MY FOURTH YEAR AT THE UNIVERSITY OF WATERLOO STUDYING COMPUTER ENGINEERING. CHECK OUT MY RESUME OR EXPLORE THE PAGE!"
  var paragraph = new Array();
  const wordArray = bio.split(" ");
  var init_x = width/18.58;
  var init_y = height/9.77;

  for (let i=0; i<wordArray.length; i++)
  {
    paragraph[i] = new Words(width, height, wordArray[i], init_x, init_y, drawnW, drawnH)
    init_x = paragraph[i].lastpos + drawnW*1.4;
    if (init_x > width-width/6.2) 
    {
      init_x = width/18.58;
      init_y = init_y + height/19.55;
    }
  }
  var arrows = new Arrows(width, height, player)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    canvas = document.getElementById("myCanvas");
    setInterval(() => {    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,width,height);

      player.update(input);
      player.draw(ctx);

      arrows.update(input);
      arrows.draw(ctx)
      for (let i=0; i<wordArray.length; i++)
      {
        paragraph[i].update(input, player, paragraph);
        paragraph[i].draw(ctx);
      }
    }, 100 / 30);
  })

  return (
    <div class="container_row">
    <div class="layer1">
      <canvas id="myCanvas" width={width} height={height} style={{backgroundImage: `url(${bg})`,backgroundSize:"contain"}}/>
    </div>
    
  </div>
  
    
  );
}

export default Home;