import { gsap } from "gsap";
import { prefersReducedMotion } from "../utils/prefersReducedMotion.js";

const createIntro = (headline, player, gesture) => {
  const tapHint = gsap.to(gesture, {
    scale: 0.94,
    transformOrigin: "40% 25%",
    duration: 0.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    paused: true,
  });

  const timeline = gsap
    .timeline({ onComplete: () => tapHint.play() })
    .from(headline, {
      autoAlpha: 0,
      y: -12,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
    })
    .from(player, { scale: 0, duration: 0.6, ease: "back.out(2)", clearProps: "all" }, "-=0.25")
    .from(gesture, { autoAlpha: 0, y: 16, duration: 0.5, ease: "power2.out" }, "-=0.2");

  const finish = () => {
    timeline.progress(1);
    tapHint.kill();
  };

  return { finish };
};

export const createStartScreen = (ad) => {
  const headline = ad.querySelector(".headline");
  const player = ad.querySelector(".player");
  const gesture = ad.querySelector(".gesture");
  const reduceMotion = prefersReducedMotion();
  const intro = reduceMotion ? null : createIntro(headline, player, gesture);

  const waitForTap = () =>
    new Promise((resolve) => {
      ad.addEventListener(
        "pointerdown",
        () => {
          intro?.finish();
          gsap.to(gesture, {
            autoAlpha: 0,
            scale: reduceMotion ? 1 : 0.8,
            duration: reduceMotion ? 0 : 0.25,
            ease: "power1.in",
          });
          resolve();
        },
        { once: true },
      );
    });

  return { waitForTap };
};
