/* eslint-disable react-hooks/exhaustive-deps */
import React, {Component} from 'react';

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