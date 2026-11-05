export const createMuteButton = (button, sounds) => {
  button.addEventListener("pointerdown", (event) => event.stopPropagation());
  button.addEventListener("click", () => {
    const isMuted = sounds.toggleMute();
    button.classList.toggle("is-muted", isMuted);
    button.setAttribute("aria-pressed", String(isMuted));
    button.setAttribute("aria-label", isMuted ? "Ton an" : "Ton aus");
  });
};
