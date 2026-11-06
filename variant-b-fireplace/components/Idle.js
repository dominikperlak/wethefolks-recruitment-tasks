import { gsap } from "gsap";

const BREATH_SCALE = 1.03;
const BREATH_DURATION = 6.25;
const BREATHS = 4;
const PULSE_SCALE = 1.06;
const PULSE_DURATION = 0.5;
const PULSE_PAUSE = 2;
const PULSES = 8;

const addBackground = (timeline, ad) => {
  timeline.to(
    ad.querySelector(".background"),
    {
      scale: BREATH_SCALE,
      duration: BREATH_DURATION,
      ease: "sine.inOut",
      yoyo: true,
      repeat: BREATHS - 1,
    },
    0,
  );
};

const addCtaPulse = (timeline, ad) => {
  const pulse = gsap.timeline({ repeat: PULSES - 1, repeatDelay: PULSE_PAUSE });
  pulse.to(ad.querySelector(".cta"), {
    scale: PULSE_SCALE,
    duration: PULSE_DURATION,
    ease: "sine.inOut",
    yoyo: true,
    repeat: 1,
  });
  timeline.add(pulse, 0);
};

export const createIdle = (ad) => {
  const timeline = gsap.timeline();
  addBackground(timeline, ad);
  if (ad.dataset.part !== "top") addCtaPulse(timeline, ad);
  return timeline;
};
