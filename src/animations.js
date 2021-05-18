export const scaleAndOpacity = {
  initial: {
    y: -200,
    scale: 0.3,
    opacity: 0,
  },
  animate: {
    y: 0,
    scale: 1.0,
    opacity: 1.0,
  },
  transition: {
    duration: 0.5,
  },
};

export const buttonHover = {
  hover: {
    scale: 1.02,
    opacity: 0.9,
  },
  transition: {
    duration: 0.2,
  },
};

export const buttonTap = {
  tap: {
    scale: 0.98,
    opacity: 1,
  },
  transition: {
    duration: 0.2,
  },
};

export const slideLTR = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};
