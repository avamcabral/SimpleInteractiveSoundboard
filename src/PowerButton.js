import './App.css';
import {motion} from 'framer-motion';
import { useState } from 'react';

function PowerButton({symbol, onClick}) {
    const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true); // Mark the button as clicked
    onClick(); // Execute the onClick passed from parent
  };

    return(
    <button className='power-button' onClick={onClick}>
        <span className={`symbol ${clicked ? 'clicked' : ''}`}>{symbol}</span>
    </button>

);
}

export default PowerButton;


