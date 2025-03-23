import React, { useEffect } from 'react';
import {useState} from 'react';
import * as Tone from 'tone';
import {animate, motion}  from 'framer-motion';
import GradientText from './GradientText';
import './App.css';
import PowerButton from './PowerButton';

const drumPads = [
  { key: 'sus', sound: "/audio/sus.mp3" },
  { key: 'bass drop', sound: "/audio/bassDrop.mp3" },
  { key: 'explosion', sound: "/audio/underwaterXplosion.mp3" },
  //all key : value pairs that can be mapped to divs (buttons)
];

function App() {
  const [players, setPlayers] = useState(null); //this is gonna keep track of the amount of players active

  const [isStarted, setIsStarted] = useState(false); //keeps track of whether the audio context successfully starts

  const [isOpen, setIsOpen] = useState(true); //this makes sure the user triggers the audio context b4 anything else

  const initializeAudio = async () => { //async so it waits and is dependent on the context starting i think,,, is the reasoning behind it?
    console.log("did i get here");      //not terribly sure but i looked it up and that was the general consensus; i thought tho async was
    if (!isStarted) {                   // for big workloads but i think here its cuz we don't want it to just start upon compiling
      await Tone.start(); // starts the audio contexts and waits till its done
      console.log("Tone.js started!");

      const loadedPlayers = new Tone.Players( //making 'player's
        drumPads.reduce((acc, pad) => {
          acc[pad.key] = pad.sound; //maps the key value pairs to a simple dictionary to pull from 
          return acc;
        }, {}),
        () => console.log("All sounds loaded!")
      ).toDestination(); //this is to send to the speaker akchewelly, and in general its sending 'to output' essentially i believe

      setPlayers(loadedPlayers); //we now have our list of players as the uh extracted dictionary
      setIsStarted(true); // and now we can set the started as yes it is 
    }
  };

  const playSound = (key) => {
    if (players) {
      players.player(key).start(); //if we have players and audio loaded, based on the key, play associated value(sound)
    } else {
      console.log("Audio not initialized yet!");
    }
  };

  return (
    <div className="App">
      <h1>Soundboard</h1>
      {/*whats cool about this is the buttons only there conditionally i didnt know u could do that really or rather didnt know how*/}
      {!isStarted && isOpen &&(
        <div className="popup-overlay">
        <div className="popup-content">
          <GradientText text = "Welcome to the Soundboard" /> {/*coincidentally the right size font idk how*/}
          <p style = {{ fontSize: "1.5em" }}> Click the power button to start.</p>
          <PowerButton symbol = "&#x23FB;" onClick={() => {setIsOpen(false); initializeAudio();}}></PowerButton>
        </div>
      </div>
      )} 
      
      

      {/* and the drum pad container (button) is defined in the CSS purr*/}
      <div className="drum-pad-container"> {/* i have my friendly uh drum pad container which is values mapped to 'buttons'*/}
        {drumPads.map((pad) => (
          <div key={pad.key} className="drum-pad" onClick={() => playSound(pad.key)}> 
            {pad.key}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;