const X = 55.5;
const START_Y = 258.5;
const WIDTH = 42;
const HEIGHT = 41;
const GRAVITY = 1400;
const JUMP_VELOCITY = -380;
const MAX_FALL_VELOCITY = 520;
const TILT_PER_VELOCITY = 0.06;
const MIN_TILT = -20;
const MAX_TILT = 30;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const createPlayer = (element) => {
  let y = START_Y;
  let velocity = 0;

  const jump = () => {
    velocity = JUMP_VELOCITY;
  };

  const update = (delta) => {
    velocity = Math.min(velocity + GRAVITY * delta, MAX_FALL_VELOCITY);
    y += velocity * delta;
  };

  const render = () => {
    const tilt = clamp(velocity * TILT_PER_VELOCITY, MIN_TILT, MAX_TILT);
    element.style.transform = `translate(${X}px, ${y}px) rotate(${tilt}deg)`;
  };

  const getCenterY = () => y + HEIGHT / 2;

  return { jump, update, render, getCenterY, width: WIDTH, height: HEIGHT };
};
