import React, {useEffect} from "react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import GradientText from "./GradientText";
import PowerButton from "./PowerButton";
import LoadingDots from "./LoadingCircles";

const Popup = ({isOpen, onClose, loadStart, isStarted}) => {

if (!isOpen) return null;

return(
  <AnimatePresence>
    <motion.div
    className = "popup-overlay"
    initial={{opacity: 1}}
    animate={{opacity:1}}
    exit={{opacity: 0,y:100}}
    transition={{duration:.5, ease: 'easeInOut'}}
    >

    <motion.div 
        className="popup-content"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{y:50, opacity:0}}
        transition={{ duration: .5, ease: "easeOut" }}
      >
        {loadStart ? ( //when loading is started on click, should display the dots and loading message
          <>
            <GradientText text="Loading Sounds..." />
            <LoadingDots />
          </>
          ) : isStarted ? (
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
        </AnimatePresence>
)



}

export default Popup;