import { gsap } from "gsap";
import { createDebugOverlay, isDebugMode } from "./components/DebugOverlay.js";
import { createIdle } from "./components/Idle.js";
import { createIntro } from "./components/Intro.js";
import { openLandingPage } from "./utils/landingPage.js";
import { waitForImages } from "./utils/waitForImages.js";
import { waitForStart } from "./utils/waitForStart.js";

const init = async () => {
  const ad = document.getElementById("ad");
  ad.addEventListener("click", openLandingPage);
  if (isDebugMode()) createDebugOverlay(ad);

  await waitForImages(ad);
  const animation = gsap.timeline({ paused: true }).add(createIntro(ad)).add(createIdle(ad));
  await waitForStart();
  ad.style.visibility = "visible";
  animation.play();
};

init();
