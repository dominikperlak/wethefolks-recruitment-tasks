import { gsap } from "gsap";
import { createEndcard } from "./Endcard.js";

const BUBBLE_ORIGIN = "179.75px 245.25px";
const CONFETTI_ORIGIN = "110px 170px";

const buildIntro = (select, element) =>
  gsap
    .timeline()
    .from(element, { autoAlpha: 0, duration: 0.3 })
    .from(select(".bubble"), {
      scale: 0.6,
      autoAlpha: 0,
      transformOrigin: BUBBLE_ORIGIN,
      duration: 0.6,
      ease: "back.out(1.6)",
    })
    .from(
      select(".confetti"),
      {
        scale: 0.2,
        rotation: -12,
        autoAlpha: 0,
        transformOrigin: CONFETTI_ORIGIN,
        duration: 0.9,
        ease: "expo.out",
      },
      "-=0.4",
    )
    .from(select(".mascot"), { y: 80, autoAlpha: 0, duration: 0.7, ease: "back.out(1.7)" }, "-=0.6")
    .from(
      select(".endcard-headline"),
      { y: 20, autoAlpha: 0, duration: 0.5, ease: "power2.out" },
      "-=0.3",
    )
    .from(
      select(".cta"),
      { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" },
      "-=0.15",
    )
    .to(select(".mascot"), { y: -8, duration: 0.5, ease: "sine.inOut", repeat: -1, yoyo: true })
    .to(
      select(".cta"),
      { scale: 1.05, duration: 0.6, ease: "sine.inOut", repeat: -1, yoyo: true },
      "<",
    );

export const createWinEndcard = (ad) => createEndcard(ad.querySelector(".endcard-win"), buildIntro);
