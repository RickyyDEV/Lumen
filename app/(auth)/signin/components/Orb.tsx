import { motion } from "framer-motion";

const Orb = ({
  size,
  x,
  y,
  delay,
  color,
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
  color: "accent" | "glow";
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, hsl(var(--lumen-${color}) / 0.35) 0%, transparent 70%)`,
      filter: `blur(${size * 0.4}px)`,
    }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.15, 1],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

export default Orb;
