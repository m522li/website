import React, { Component } from "react";
import "./CardController.css";
import Cards from "./Cards";
import rw from './Photos/rogue.jpg'
import es from './Photos/eSentire.jpg'
import vm from './Photos/vm.jpg'
import ka from './Photos/ka.jpg'

import "./CardController.css";



class CardController extends Component {
  state = {
    // Here's a list of the cards you're using
    cards: {
      1: {
        show: true,
        expand: false,
        text: "Rogue Wave Software",
        src: rw,
        desc: "waaaaaaaa"
      },
      2: {
        show: true,
        expand: false,
        text: "eSentire",
        src: es,
        desc: "waaaaaaaa"
      },
      3: {
        show: true,
        expand: false,
        text: "VirtaMove",
        src:vm,
        desc: "waaaaaaaa"
      },
      4: {
        show: true,
        expand: false,
        text: "KA Imaging Inc.",
        src: ka,
        desc: "waaaaaaaa"
      }
    },
    showNav: false
  };
  click = id => {
    const cards = Object.create(this.state.cards);
    let showNav = false;
    for (let key in this.state.cards) {
      // Here we just toggle the show property!
      if (key !== id) {
        cards[key].show = !cards[key].show;
        cards[key].expand = !cards[key].expand
        showNav = !cards[key].show;
        
      }
    }
    this.setState({ cards, showNav });
  };

  render() {
    const { cards, showNav } = this.state;
    console.log(this.state);
    let currentCards = [];
    for (let key in cards) {
      currentCards.push(
        <Cards
          key={key}
          id={key}
          text={cards[key].text}
          show={cards[key].show}
          src={cards[key].src}
          desc={cards[key].desc}
          expand={showNav}
          click={this.click}
        />
      );
    }
    return (
      <div class="container">
        <div class="row">{currentCards}</div>
      </div>
    );
  }
}

export default CardController;


