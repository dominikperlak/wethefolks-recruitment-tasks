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
const HOVER_AMPLITUDE = 4;
const HOVER_SPEED = 6;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const createPlayer = (element) => {
  let y = START_Y;
  let velocity = 0;

  const jump = () => {
    velocity = JUMP_VELOCITY;
  };

  const hover = (time) => {
    velocity = 0;
    y = START_Y + Math.sin(time * HOVER_SPEED) * HOVER_AMPLITUDE;
  };

  const update = (delta) => {
    velocity = Math.min(velocity + GRAVITY * delta, MAX_FALL_VELOCITY);
    y += velocity * delta;
  };

  const render = () => {
    const tilt = clamp(velocity * TILT_PER_VELOCITY, MIN_TILT, MAX_TILT);
    element.style.transform = `translate(${X}px, ${y}px) rotate(${tilt}deg)`;
  };

  const getTop = () => y;

  return { jump, hover, update, render, getTop, width: WIDTH, height: HEIGHT };
};
