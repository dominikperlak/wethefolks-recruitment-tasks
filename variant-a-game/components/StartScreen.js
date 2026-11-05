import { gsap } from "gsap";

export const createStartScreen = (ad) => {
  const headline = ad.querySelector(".headline");
  const player = ad.querySelector(".player");
  const gesture = ad.querySelector(".gesture");

  const tapHint = gsap.to(gesture, {
    scale: 0.94,
    transformOrigin: "40% 25%",
    duration: 0.5,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    paused: true,
  });

  const intro = gsap
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

  const waitForTap = () =>
    new Promise((resolve) => {
      ad.addEventListener(
        "pointerdown",
        () => {
          intro.progress(1);
          tapHint.kill();
          gsap.to(gesture, { autoAlpha: 0, scale: 0.8, duration: 0.25, ease: "power1.in" });
          resolve();
        },
        { once: true },
      );
    });

  return { waitForTap };
};
