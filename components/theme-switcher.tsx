'use client'

import {
  HTMLMotionProps,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useTheme } from "next-themes"

const DarkModeToggle: React.FC<HTMLMotionProps<"button">> = (props) => {
  const { setTheme, theme } = useTheme();

  const duration = 0.7;

  const moonVariants = {
    checked: {
      scale: 1,
    },
    unchecked: {
      scale: 0,
    },
  };

  const sunVariants = {
    checked: {
      scale: 0,
    },
    unchecked: {
      scale: 1,
    },
  };

  const isChecked = theme === "light";

  const scaleMoon = useMotionValue(isChecked ? 1 : 0);
  const scaleSun = useMotionValue(isChecked ? 0 : 1);

  const pathLengthMoon = useTransform(scaleMoon, [0.6, 1], [0, 1]);
  const pathLengthSun = useTransform(scaleSun, [0.6, 1], [0, 1]);

  const toggle = () => {
    if (theme === 'light') return setTheme('dark')

    return setTheme('light')
  }

  return (
    <motion.button
      {...props}
      className="size-8 flex justify-center items-center rounded-md border bg-white/10 p-1.5 cursor-pointer"
      onClick={toggle}
      initial={false}
      animate={isChecked ? "checked" : "unchecked"}
      transition={{ duration }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // className="size-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <motion.path
          custom={isChecked}
          variants={sunVariants}
          transition={{ duration }}
          style={{
            pathLength: pathLengthSun,
            scale: scaleSun,
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
        <motion.path
          custom={isChecked}
          variants={moonVariants}
          transition={{ duration }}
          style={{
            pathLength: pathLengthMoon,
            scale: scaleMoon,
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </motion.button>
  );
};

export default DarkModeToggle;
