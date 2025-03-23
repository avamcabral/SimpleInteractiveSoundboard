import { motion } from "framer-motion";

function GradientText({text}) { //plleeeassee be reusable im just a chill guy
  
  return (
    <h1 className="flashing-text">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ color: "rgb(87, 85, 85)" }}
          animate={{ color: ["rgb(18, 219, 186)", "rgb(87,85,85)"] }}
          transition={{
            duration: .75,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * .025, // Stagger effect for each letter
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