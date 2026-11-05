import { createLoop } from "../utils/createLoop.js";
import { createPlayer } from "./Player.js";

const DESIGN_WIDTH = 360;
const TRACK_WIDTH = 2528;
const START_SCROLL = 2;
const END_SCROLL = TRACK_WIDTH - DESIGN_WIDTH;
const SCROLL_SPEED = 120;
const PLAYFIELD_TOP = 234.5;
const PLAYFIELD_BOTTOM = 573.5;

export const createGame = (ad) => {
  const track = ad.querySelector(".track");
  const player = createPlayer(ad.querySelector(".player"));
  let scroll = START_SCROLL;

  const isOutOfPlayfield = () => {
    const centerY = player.getCenterY();
    return centerY < PLAYFIELD_TOP || centerY > PLAYFIELD_BOTTOM;
  };

  const render = () => {
    track.style.transform = `translateX(${-scroll}px)`;
    player.render();
  };

  const fail = () => {
    loop.stop();
    ad.removeEventListener("pointerdown", player.jump);
    console.log("Gut Run: fail");
  };

  const update = (delta) => {
    scroll = Math.min(scroll + SCROLL_SPEED * delta, END_SCROLL);
    player.update(delta);
    render();
    if (isOutOfPlayfield()) fail();
    else if (scroll === END_SCROLL) loop.stop();
  };

  const loop = createLoop(update);

  const start = () => {
    ad.addEventListener("pointerdown", player.jump);
    loop.start();
  };

  return { start };
};
