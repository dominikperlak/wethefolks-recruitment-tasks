import { gsap } from "gsap";
import { createEndcard } from "./Endcard.js";

const BUBBLE_ORIGIN = "179.75px 235.25px";
const BACTERIA_ORIGINS = [
  "144.5px 133.75px",
  "258.25px 215.25px",
  "87px 231px",
  "94.5px 148px",
  "221.5px 155.25px",
];

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
    .from(select(".mascot"), { y: -120, autoAlpha: 0, duration: 0.8, ease: "bounce.out" }, "-=0.35")
    .from(
      select(".bacterium"),
      {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: (index) => BACTERIA_ORIGINS[index],
        duration: 0.45,
        ease: "back.out(2)",
        stagger: 0.08,
      },
      "-=0.5",
    )
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
    .from(
      select(".replay"),
      { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: "back.out(2)" },
      "-=0.3",
    )
    .to(select(".bacterium"), {
      y: -4,
      duration: 1.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
    })
    .to(
      select(".cta"),
      { scale: 1.05, duration: 0.6, ease: "sine.inOut", repeat: -1, yoyo: true },
      "<",
    );

export const createFailEndcard = (ad) =>
  createEndcard(ad.querySelector(".endcard-fail"), buildIntro);
