import { gsap } from "gsap";

const addBackground = (timeline, ad) => {
  const background = ad.querySelector(".background");
  timeline
    .from(background, { opacity: 0, duration: 0.8, ease: "power1.out" }, 0)
    .from(background, { scale: 1.12, duration: 5, ease: "power2.out" }, 0);
};

const addHeadline = (timeline, ad) => {
  timeline.from(
    ad.querySelectorAll(".headline-line"),
    { opacity: 0, y: 18, duration: 0.8, ease: "power3.out", stagger: 0.4 },
    0.6,
  );
};

const addSkyscraper = (timeline, ad) => {
  timeline
    .from(
      ad.querySelector(".logo"),
      {
        opacity: 0,
        scale: 0.85,
        transformOrigin: "160.5px 125.25px",
        duration: 0.9,
        ease: "back.out(1.6)",
      },
      0.4,
    )
    .from(ad.querySelector(".box"), { opacity: 0, y: 40, duration: 0.9, ease: "power3.out" }, 1.8)
    .from(ad.querySelector(".copy"), { opacity: 0, y: 16, duration: 0.8, ease: "power3.out" }, 2.2)
    .from(
      ad.querySelector(".cta"),
      { opacity: 0, scale: 0.6, duration: 0.8, ease: "back.out(1.7)" },
      3,
    );
};

export const createIntro = (ad) => {
  const timeline = gsap.timeline();
  addBackground(timeline, ad);
  if (ad.dataset.part === "top") addHeadline(timeline, ad);
  else addSkyscraper(timeline, ad);
  return timeline;
};
