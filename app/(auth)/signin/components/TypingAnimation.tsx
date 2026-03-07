import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = ["insights", "clareza", "conhecimento", "eficiência", "brilho"];

const TypingWord = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[index];
    if (!isDeleting) {
      setDisplayText(currentWord.substring(0, displayText.length + 1));
      if (displayText.length + 1 === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1800);
        return;
      }
    } else {
      setDisplayText(currentWord.substring(0, displayText.length - 1));
      if (displayText.length - 1 === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [displayText, index, isDeleting]);

  useEffect(() => {
    const speed = isDeleting ? 60 : 120;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <span className="bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-[hsl(var(--lumen-accent))]"
      >
        |
      </motion.span>
    </span>
  );
};

export default TypingWord;