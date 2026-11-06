const clickTag = window.clickTag || "https://example.com/landing";

export const openLandingPage = () => {
  window.open(clickTag, "_blank", "noopener");
};
