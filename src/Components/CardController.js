import React, { useState,Component } from "react";
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
        location: "Ottawa, Ontario (Jan 2019 - Apr 2019)",
        desc: `Large exposure to many compilers/tools used in various industries like Arm, gcc/g++, Mingw, Make/makefiles, Ant, and Maven.
        Experience working with Jira, VMs (using Docker, AWS, MobaXterm) and Linux and Windows command line tools and commands.
        Developed and improved many skills like time management, problem solving, teamwork and communication.
        Self learned bash to convert a bash script to python script which was used to transfer files using SCP and it included JSON file functionality. Also wrote unit tests and used pytest for the script`,
      
      },
      2: {
        show: true,
        expand: false,
        text: "eSentire",
        src: es,
        location: "Waterloo, Ontario (Sep 2019 - Dec 2019)",
        desc: `Used python to complete tasks on Flask apps, REST APIs and endpoints, databases, tests, and logging.
        Involved with using Kubernetes and Terraform, for various applications and different AWS products.
        Wrote and updated various unit and functional tests in python using pytest and mocker.
        Implemented a centralized container logging system using Fluent Bit and Amazon Cloudwatch`
      },
      3: {
        show: true,
        expand: false,
        text: "VirtaMove",
        src:vm,
        location: "Ottawa, Ontario (Jan 2021 - Apr 2021)",
        desc: `Front and Back End Development, with C#, .NET, JS, CSS, HTML, and Blazor.
        Operated independently to implement new features, with investigating, prototyping, and development.
        Exposure to working with databases and how to handle concurrency with pulling and storing data`
      },
      4: {
        show: true,
        expand: false,
        text: "KA Imaging Inc.",
        src: ka,
        location: "Waterloo, Ontario (Jan 2022 - Apr 2022)",
        desc: `Developed User Interfaces using WPF and dotNet, and worked on back end code using C#.
        Designed/Implemented SQLite database using SQLAlchemy, and scripts to search for and parse JSON.
        Improved ability to understand complex projects to implement new features and approve code reviews`
      }
    },
    showNav: false,
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
    const { cards, showNav} = this.state;
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
          location={cards[key].location}
          expand={showNav}
          click={this.click}
        />
      );
    }
    return (
      <div className="container">
        <div className="row">{currentCards}</div>
      </div>
    );
  }
}

export default CardController;


