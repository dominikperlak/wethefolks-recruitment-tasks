const clickTag = window.clickTag || "https://example.com/landing";

const init = () => {
  const ad = document.getElementById("ad");
  console.log("Fireplace: init", { ad, clickTag });
};

init();
