import { createLoop } from "../utils/createLoop.js";

const DESIGN_WIDTH = 360;
const TRACK_WIDTH = 2528;
const START_SCROLL = 2;
const END_SCROLL = TRACK_WIDTH - DESIGN_WIDTH;
const SCROLL_SPEED = 120;

export const createGame = (ad) => {
  const track = ad.querySelector(".track");
  let scroll = START_SCROLL;

  const render = () => {
    track.style.transform = `translateX(${-scroll}px)`;
  };

  const update = (delta) => {
    scroll = Math.min(scroll + SCROLL_SPEED * delta, END_SCROLL);
    render();
    if (scroll === END_SCROLL) loop.stop();
  };

  const loop = createLoop(update);

  return { start: loop.start };
};
