import { gsap } from "gsap";
import { createFailEndcard } from "./components/FailEndcard.js";
import { createGame } from "./components/Game.js";
import { createMuteButton } from "./components/MuteButton.js";
import { createSounds } from "./components/Sounds.js";
import { createStartScreen } from "./components/StartScreen.js";
import { createWinEndcard } from "./components/WinEndcard.js";
import { fitStage } from "./utils/fitStage.js";
import { openLandingPage } from "./utils/landingPage.js";
import { waitForImages } from "./utils/waitForImages.js";

const FAIL_ENDCARD_DELAY = 0.6;
const WIN_ENDCARD_DELAY = 0.3;

const init = async () => {
  const ad = document.getElementById("ad");
  const sounds = createSounds();
  const failEndcard = createFailEndcard(ad);
  const winEndcard = createWinEndcard(ad);

  const showFailEndcard = () => {
    failEndcard.show();
    sounds.play("fail");
  };

  const showWinEndcard = () => {
    winEndcard.show();
    sounds.play("applause");
    sounds.play("cheer");
  };

  const handleEnd = (result, reason) => {
    sounds.stopMusic();
    if (reason === "hit") sounds.play("crash");
    if (result === "win") gsap.delayedCall(WIN_ENDCARD_DELAY, showWinEndcard);
    else gsap.delayedCall(FAIL_ENDCARD_DELAY, showFailEndcard);
  };

  fitStage(ad);
  const game = createGame(ad, { onEnd: handleEnd });
  await waitForImages(ad);

  createMuteButton(ad.querySelector(".mute-button"), sounds);
  ad.querySelectorAll(".cta").forEach((button) =>
    button.addEventListener("click", openLandingPage),
  );
  ad.querySelector(".replay").addEventListener("click", () => {
    sounds.stopAll();
    failEndcard.hide();
    game.restart();
    sounds.startMusic();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      game.pause();
      sounds.pause();
      gsap.globalTimeline.pause();
    } else {
      gsap.globalTimeline.resume();
      sounds.resume();
      game.resume();
    }
  });

  const startScreen = createStartScreen(ad);
  ad.classList.add("is-ready");
  ad.addEventListener("pointerup", sounds.unlock);
  ad.addEventListener("pointerdown", sounds.startMusic, { once: true });

  await startScreen.waitForTap();
  game.start();
};

init();
