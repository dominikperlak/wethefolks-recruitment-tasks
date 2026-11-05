import { createGame } from "./components/Game.js";
import { createStartScreen } from "./components/StartScreen.js";
import { fitStage } from "./utils/fitStage.js";
import { waitForImages } from "./utils/waitForImages.js";

const clickTag = window.clickTag || "https://example.com/landing";

const init = async () => {
  const ad = document.getElementById("ad");

  fitStage(ad);
  const game = createGame(ad);
  await waitForImages(ad);

  const startScreen = createStartScreen(ad);
  ad.classList.add("is-ready");

  await startScreen.waitForTap();
  console.log("Gut Run: start", { clickTag });
  game.start();
};

init();
