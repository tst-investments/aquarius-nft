import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  className: string;
  initialRounded: boolean;
  borderRadius?: string;
}

type MotionProps = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export default function LayoutCube({
  className,
  initialRounded,
  borderRadius = "12px",
}: Props) {
  const [isRounded, setIsRounded] = useState(initialRounded);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.5) {
        setIsRounded((rounded) => !rounded);
      }
    }, Math.random() * 1000 + 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={clsx(className, "absolute w-3 h-3 bg-default-200 z-20")}
      custom={{
        isRounded,
        borderRadius,
      }}
      variants={cubeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ delay: 0.35, duration: 0.6 }}
      inherit={false}
      layout
    ></motion.div>
  );
}

const cubeVariants = {
  initial: (options: { isRounded: boolean; borderRadius: string }) => ({
    scale: 0,
    borderRadius: options.isRounded ? options.borderRadius : "0px",
    rotate: options.isRounded ? "90deg" : "0deg",
  }),
  animate: (options: { isRounded: boolean; borderRadius: string }) => ({
    scale: 1,
    borderRadius: options.isRounded ? options.borderRadius : "0px",
    rotate: options.isRounded ? "90deg" : "0deg",
  }),
  exit: (options: { isRounded: boolean }) => ({ scale: 0 }),
};
