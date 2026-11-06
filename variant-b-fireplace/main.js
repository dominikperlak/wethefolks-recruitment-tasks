import { openLandingPage } from "./utils/landingPage.js";

const init = () => {
  const ad = document.getElementById("ad");
  ad.addEventListener("click", openLandingPage);
};

init();
