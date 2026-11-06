import { createDebugOverlay, isDebugMode } from "./components/DebugOverlay.js";
import { createIntro } from "./components/Intro.js";
import { openLandingPage } from "./utils/landingPage.js";
import { waitForImages } from "./utils/waitForImages.js";

const init = async () => {
  const ad = document.getElementById("ad");
  ad.addEventListener("click", openLandingPage);
  if (isDebugMode()) createDebugOverlay(ad);

  await waitForImages(ad);
  const intro = createIntro(ad);
  ad.style.visibility = "visible";
  intro.play();
};

init();
