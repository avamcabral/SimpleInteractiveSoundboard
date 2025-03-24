import { motion } from "framer-motion";

function GradientText({text}) {
  
  return (
    <h1 className="flashing-text">
      {text.split("").map((char, index) => ( //maps each character independently for the color gradient
        <motion.span
          key={index}
          initial={{ color: "rgb(87, 85, 85)" }} //start at gray,
          animate={{ color: ["rgb(18, 219, 186)", "rgb(87,85,85)"] }} //change to blue and return to gray
          transition={{
            duration: .75,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * .025, 
            repeatDelay: .25,
            ease: "easeInOut"
          }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}

export default GradientText;