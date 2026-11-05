import { OBSTACLES } from "../level.js";
import { createLoop } from "../utils/createLoop.js";
import { createObstacles } from "./Obstacles.js";
import { createPlayer } from "./Player.js";

const DESIGN_WIDTH = 360;
const TRACK_WIDTH = 2528;
const START_SCROLL = 2;
const END_SCROLL = TRACK_WIDTH - DESIGN_WIDTH;
const SCROLL_SPEED = 120;
const SPEED_RAMP_DURATION = 1;
const BRAKE_DISTANCE = 100;
const MIN_SCROLL_SPEED = 6;
const GET_READY_DURATION = 1.5;
const PLAYFIELD_TOP = 234.5;
const PLAYFIELD_BOTTOM = 573.5;

const easeOutQuad = (progress) => 1 - (1 - progress) ** 2;

export const createGame = (ad) => {
  const track = ad.querySelector(".track");
  const player = createPlayer(ad.querySelector(".player"));
  createObstacles(track, OBSTACLES);
  let scroll = START_SCROLL;
  let elapsed = 0;
  let isReady = true;

  const isOutOfPlayfield = () => {
    const top = player.getTop();
    return top + player.height < PLAYFIELD_TOP || top > PLAYFIELD_BOTTOM;
  };

  const getScrollSpeed = () => {
    const rampUp = easeOutQuad(Math.min(elapsed / SPEED_RAMP_DURATION, 1));
    const brake = Math.sqrt(Math.min((END_SCROLL - scroll) / BRAKE_DISTANCE, 1));
    return Math.max(SCROLL_SPEED * rampUp * brake, MIN_SCROLL_SPEED);
  };

  const render = () => {
    track.style.transform = `translateX(${-scroll}px)`;
    player.render();
  };

  const onTap = () => {
    isReady = false;
    player.jump();
  };

  const end = (result) => {
    loop.stop();
    ad.removeEventListener("pointerdown", onTap);
    console.log(`Gut Run: ${result}`);
  };

  const update = (delta) => {
    elapsed += delta;
    scroll = Math.min(scroll + getScrollSpeed() * delta, END_SCROLL);
    if (isReady && elapsed >= GET_READY_DURATION) isReady = false;
    if (isReady) player.hover(elapsed);
    else player.update(delta);
    render();
    if (isOutOfPlayfield()) end("fail");
    else if (scroll === END_SCROLL) end("win");
  };

  const loop = createLoop(update);

  const start = () => {
    ad.addEventListener("pointerdown", onTap);
    loop.start();
  };

  return { start };
};
