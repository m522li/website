/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import { Chicken } from './Components/Chicken';
import { Words } from './Components/Words';
import { Arrows } from './Components/Arrows';
import { InputHandler } from './Components/InputHandler';
import {InterObj} from './Components/InteractableObjects'
import Home from './Components/Home';
import NavBar from './Components/NavBar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import s2 from './Components/Photos/sign2.png'


function App() {
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
    paragraph[i] = new Words(width, height, wordArray[i], init_x, init_y, drawnW, drawnH, 1)
    init_x = paragraph[i].lastpos + drawnW*1.4;
    if (init_x > width-width/6.2) 
    {
      init_x = width/18.58;
      init_y = init_y + height/19.55;
    }
  }
  var bio2 = "CLICK ONE FOR MORE INFO!"
  var paragraph2 = new Array();
  const wordArray2 = bio2.split(" ");
  var init_x2 = width/3;
  var init_y2 = height/9.77;
  for (let i=0; i<wordArray2.length; i++)
  {
    paragraph2[i] = new Words(width, height, wordArray2[i], init_x2, init_y2, drawnW, drawnH, 2)
    init_x2 = paragraph2[i].lastpos + drawnW*1.4;
    if (init_x2 > width-width/6.2) 
    {
      init_x2 = width/18.58;
      init_y2 = init_y2 + height/19.55;
    }
  }

  var arrows = new Arrows(width, height, player);
  var interobj1 = new InterObj(width, height, s2, player.x+width/3, player.y, drawnW*5, drawnH*5, 1);
  var allObj = paragraph;
  allObj.push(interobj1);
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

      interobj1.update(player, allObj);
      interobj1.draw(ctx);
      
      for (let i=0; i<wordArray.length; i++)
      {
        paragraph[i].update(player, allObj);
        paragraph[i].draw(ctx);
      }
      for (let i=0; i<wordArray2.length; i++)
      {
        paragraph2[i].update(player, paragraph2);
        paragraph2[i].draw(ctx);
      }
    }, 100 / 30);
  })
  return (
    <>
      <Router>
        <NavBar/>
      </Router>
      <Home></Home>
    </>
  );
}

export default App;