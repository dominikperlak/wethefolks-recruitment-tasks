import { READY_MESSAGE, START_MESSAGE } from "./messages.js";

const START_TIMEOUT = 1000;

export const waitForStart = () =>
  new Promise((resolve) => {
    if (window.parent === window) {
      resolve();
      return;
    }

    const start = () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timeout);
      resolve();
    };

    const handleMessage = ({ data, source }) => {
      if (source === window.parent && data?.type === START_MESSAGE) start();
    };

    const timeout = setTimeout(start, START_TIMEOUT);
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(
      { type: READY_MESSAGE, part: document.getElementById("ad").dataset.part },
      "*",
    );
  });
