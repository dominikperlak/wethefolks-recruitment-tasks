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
const HITBOX_X = 20.75;
const HITBOX_Y = 27;
const HITBOX_RADIUS = 14;

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

  const getHitbox = () => ({ x: X + HITBOX_X, y: y + HITBOX_Y, radius: HITBOX_RADIUS });

  return { jump, hover, update, render, getTop, getHitbox, width: WIDTH, height: HEIGHT };
};
