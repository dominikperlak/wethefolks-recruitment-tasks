import musicUrl from "../assets/music/background-music/funny-game-loop.mp3";
import crashUrl from "../assets/music/crash/cartoon-crash-boing.mp3";
import failUrl from "../assets/music/endcard-fail/fail.mp3";
import applauseUrl from "../assets/music/endcard-win/applause.mp3";
import cheerUrl from "../assets/music/endcard-win/celebrative-happy-woohoo-cheer-2.mp3";

const SOUND_URLS = {
  music: musicUrl,
  crash: crashUrl,
  fail: failUrl,
  applause: applauseUrl,
  cheer: cheerUrl,
};
const MUSIC_VOLUME = 0.5;

const fetchFile = (url) =>
  fetch(url)
    .then((response) => response.arrayBuffer())
    .catch(() => null);

export const createSounds = () => {
  const files = Object.entries(SOUND_URLS).map(([name, url]) => [name, fetchFile(url)]);
  const buffers = {};
  const sources = new Set();
  let context = null;
  let output = null;
  let music = null;
  let isMusicWanted = false;
  let isMuted = false;

  const playBuffer = (name, { loop = false, volume = 1 } = {}) => {
    const buffer = buffers[name];
    if (!buffer) return null;
    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = buffer;
    source.loop = loop;
    gain.gain.value = volume;
    source.connect(gain).connect(output);
    source.addEventListener("ended", () => sources.delete(source));
    source.start();
    sources.add(source);
    return source;
  };

  const startMusic = () => {
    isMusicWanted = true;
    music?.stop();
    music = playBuffer("music", { loop: true, volume: MUSIC_VOLUME });
  };

  const stopMusic = () => {
    isMusicWanted = false;
    music?.stop();
    music = null;
  };

  const decode = async (name, file) => {
    const data = await file;
    if (!data) return;
    buffers[name] = await context.decodeAudioData(data);
    if (name === "music" && isMusicWanted && !music) startMusic();
  };

  const unlock = () => {
    if (context) {
      if (context.state === "suspended" && !document.hidden) context.resume().catch(() => {});
      return;
    }
    context = new AudioContext();
    output = context.createGain();
    output.gain.value = isMuted ? 0 : 1;
    output.connect(context.destination);
    files.forEach(([name, file]) => decode(name, file).catch(() => {}));
  };

  const play = (name) => {
    playBuffer(name);
  };

  const stopAll = () => {
    sources.forEach((source) => source.stop());
    sources.clear();
    music = null;
    isMusicWanted = false;
  };

  const pause = () => {
    context?.suspend();
  };

  const resume = () => {
    context?.resume().catch(() => {});
  };

  const toggleMute = () => {
    isMuted = !isMuted;
    if (output) output.gain.value = isMuted ? 0 : 1;
    return isMuted;
  };

  return { unlock, play, startMusic, stopMusic, stopAll, pause, resume, toggleMute };
};
