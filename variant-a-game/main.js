const clickTag = window.clickTag || 'https://example.com/landing';

const init = () => {
  const ad = document.getElementById('ad');
  console.log('Gut Run: init', { ad, clickTag });
};

init();
