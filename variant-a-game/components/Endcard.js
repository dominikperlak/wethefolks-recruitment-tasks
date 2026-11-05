import { gsap } from "gsap";

export const createEndcard = (element, buildIntro) => {
  let intro = null;

  const show = () => {
    intro?.revert();
    gsap.set(element, { autoAlpha: 1 });
    intro = buildIntro(gsap.utils.selector(element), element);
  };

  const hide = () => {
    intro?.revert();
    intro = null;
    gsap.set(element, { autoAlpha: 0 });
  };

  return { show, hide };
};
