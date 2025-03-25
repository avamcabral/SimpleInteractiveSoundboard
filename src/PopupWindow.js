import React, {useEffect} from "react";
import { AnimatePresence, easeInOut, easeOut, motion } from "framer-motion";
import GradientText from "./GradientText";
import PowerButton from "./PowerButton";
import LoadingDots from "./LoadingCircles";

const Popup = ({onClose, loadStart, isStarted}) => {

 const overlayExit = {
  opacity: 0,
  y:100,
  transition:{
    duration: 0.5,
    ease: "easeInOut"
  },
 };

 const windowExit = {
  opacity: 0,
  y:50,
  transition:{
    duration: 0.5,
    ease: "easeInOut"
  },
 };

//if (!isOpen) return null;

return(
    <motion.div
    className = "popup-overlay"
    initial={{opacity: 1}}
    animate={{opacity:1}}
    exit={overlayExit}
    transition={{duration:.5, ease: 'easeInOut'}}
    >

    <motion.div 
        className="popup-content"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={windowExit}
        transition={{ duration: .5, ease: "easeOut" }}
      >
        {loadStart && !isStarted ?( //when loading is started on click, should display the dots and loading message
          <>
            <GradientText text="Loading Sounds..." />
            <LoadingDots />
          </>
          ) : isStarted && !loadStart ? (
            <>
              <GradientText text="Ready!" />
            </>
        ) : (
          <>
            <GradientText text="Welcome to the Soundboard" />
            <p style={{ fontSize: "1.5em" }}>Click the power button to start.</p>
            <PowerButton symbol="&#x23FB;" onClick={onClose} />
          </>
        )}
        </motion.div>

        </motion.div>
)



}

export default Popup;