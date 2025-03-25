import React, { useEffect } from 'react';
import {useState} from 'react';
import * as Tone from 'tone';
import {animate, AnimatePresence, motion}  from 'framer-motion';
import GradientText from './GradientText';
import './App.css';
import PowerButton from './PowerButton';
import Popup from './PopupWindow';
import LoadingDots from './LoadingCircles';

const drumPads = [
  { key: 'sus', sound: "/audio/sus.mp3" },
  { key: 'bass drop', sound: "/audio/bassDrop.mp3" },
  { key: 'explosion', sound: "/audio/underwaterXplosion.mp3" },
  //all key : value pairs that can be mapped to divs (buttons)
];

function App() {
  const [players, setPlayers] = useState(null); //this is going to keep track of the amount of players active

  const [isStarted, setIsStarted] = useState(false); //keeps track of whether the audio context successfully starts

  const [isOpen, setIsOpen] = useState(true); //controls keeping the popup open

  const [loadStart, setLoadStart] = useState(false); //helps the popup react (display loading dots)



  const handlePopupClose = async () => {
    setLoadStart(true);
    console.log("loading should be set");
    await initializeAudio(); //should wait for the audio to finish loading before closing the popup

    setIsOpen(false);
  };


  const initializeAudio = async () => { //async so it waits and is dependent on the context starting 
    console.log("did i get here");      //believe this is so it doesn't just try to start playback upon compiling
      await Tone.start(); // starts the audio contexts and waits till its done
      console.log("Tone.js started!");

      const loadedPlayers = new Tone.Players( //making 'player's
        drumPads.reduce((acc, pad) => {
          acc[pad.key] = pad.sound; //maps the key value pairs to a simple dictionary to pull from 
          return acc;
        }, {}),
        () => console.log("All sounds loaded!")
      ).toDestination(); //this is to send to the speaker, and in general its sending 'to output' essentially I think

      setPlayers(loadedPlayers); //we now have our list of players as the extracted dictionary
      setIsStarted(true); // and now we can set the started true'
      setLoadStart(false);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    //checking/prompting the statechange
    useEffect(() => {
      if (isStarted) {
        console.log("isStarted state has been set to true");
      }
    }, [isStarted]);

    useEffect(() => {
      if (!loadStart) {
        console.log("loadstart false again hopefully");
      }
    }, [loadStart]);

    useEffect(() => {
      if (!isOpen) {
        console.log("isOpen state has been set to false");
      }
    }, [isOpen]);



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
      {/*conditionally displays the popup to start */}
      <AnimatePresence>
      {isOpen &&(
          <Popup onClose={handlePopupClose} loadStart={loadStart} isStarted={isStarted}/>

      )}
      </AnimatePresence> 
      
      

      <div className="drum-pad-container"> {/* drum pad defined in css; going to update and style this later*/}
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