/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, Component} from 'react';
import { Chicken } from './Chicken';
import { Arrows } from './Arrows';
import { InputHandler } from './InputHandler';
import CardController from './CardController'
import bg from './Photos/Background.png';
import '../App.css'
import eventBus from "./Events";


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight-74,
      showCards: "hidden",
    };
  }
   
  
    componentDidMount() {
      eventBus.on("showCards", (data) =>
        this.setState({ showCards: data.show })
      );
    }
  
    componentWillUnmount() {
      eventBus.remove("showCards");
    }

  render() {
    var {width, height} = this.state;
    var input= new InputHandler();
    var player=  new Chicken(width, height);
    var arrows= new Arrows(width, height, player);

   
    return (
      <div className="container_row">
        <div className="layer1">
          <canvas id="myCanvas" width={width} height={height} style={{backgroundImage: `url(${bg})`,backgroundSize:"contain"}}/>
        </div>
        <div className="layer2" style={{visibility: this.state.showCards}}>
        <div className='Cards'>
          <CardController></CardController>
        </div>
        </div>
    </div>
    );
  }
};

export default Home;