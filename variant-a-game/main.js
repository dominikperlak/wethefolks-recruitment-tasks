import { gsap } from "gsap";
import { createFailEndcard } from "./components/FailEndcard.js";
import { createGame } from "./components/Game.js";
import { createStartScreen } from "./components/StartScreen.js";
import { createWinEndcard } from "./components/WinEndcard.js";
import { fitStage } from "./utils/fitStage.js";
import { openLandingPage } from "./utils/landingPage.js";
import { waitForImages } from "./utils/waitForImages.js";

const FAIL_ENDCARD_DELAY = 0.6;
const WIN_ENDCARD_DELAY = 0.3;

const init = async () => {
  const ad = document.getElementById("ad");
  const failEndcard = createFailEndcard(ad);
  const winEndcard = createWinEndcard(ad);

  const showEndcard = (result) => {
    if (result === "win") gsap.delayedCall(WIN_ENDCARD_DELAY, winEndcard.show);
    else gsap.delayedCall(FAIL_ENDCARD_DELAY, failEndcard.show);
  };

  fitStage(ad);
  const game = createGame(ad, { onEnd: showEndcard });
  await waitForImages(ad);

  ad.querySelectorAll(".cta").forEach((button) =>
    button.addEventListener("click", openLandingPage),
  );
  ad.querySelector(".replay").addEventListener("click", () => {
    failEndcard.hide();
    game.restart();
  });

  const startScreen = createStartScreen(ad);
  ad.classList.add("is-ready");

  await startScreen.waitForTap();
  game.start();
};

init();
