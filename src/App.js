/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import { Chicken } from './Components/Chicken';
import { Words } from './Components/Words';
import { InputHandler } from './Components/InputHandler';
import NavBar from './Components/NavBar';
import bg from './Components/Photos/Background.png';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'

function App() {
  var width = window.innerWidth;
  var height = window.innerHeight-74;
  let canvas;
  let ctx; 
  const drawnW = width/46.45;
  const drawnH = height/24.424;
  const input = new InputHandler();
  var player = new Chicken(width, height);
  var bio = "HI MY NAME IS MERVIN, I AM CURRENTLY IN MY FOURTH YEAR AT THE UNIVERSITY OF WATERLOO STUDYING COMPUTER ENGINEERING."
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


  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    canvas = document.getElementById("myCanvas");
    setInterval(() => {    
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,width,height);

      player.update(input);
      player.draw(ctx);
      for (let i=0; i<wordArray.length; i++)
      {
        paragraph[i].update(input, player, paragraph);
        paragraph[i].draw(ctx);
      }
    }, 1000 / 30);
  })
  return (
    <>
      <Router>
        <NavBar />
      </Router>
        <canvas id="myCanvas" width={width} height={height} style={{backgroundImage: `url(${bg})`,backgroundSize:"contain"}}/>
    </>
  
    
  );
}

export default App;