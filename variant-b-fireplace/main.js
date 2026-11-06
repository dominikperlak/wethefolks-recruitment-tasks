import { createDebugOverlay, isDebugMode } from "./components/DebugOverlay.js";
import { openLandingPage } from "./utils/landingPage.js";

const init = () => {
  const ad = document.getElementById("ad");
  ad.addEventListener("click", openLandingPage);
  if (isDebugMode()) createDebugOverlay(ad);
};

init();
