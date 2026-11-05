import { fitStage } from "./utils/fitStage.js";

const clickTag = window.clickTag || "https://example.com/landing";

const init = () => {
  const ad = document.getElementById("ad");

  fitStage(ad);
  console.log("Gut Run: init", { ad, clickTag });
};

init();
