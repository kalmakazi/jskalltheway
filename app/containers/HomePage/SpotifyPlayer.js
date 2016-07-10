import SpotifyWebApi from 'spotify-web-api-js';
import Q from 'q';


const TICK = 100;
const FADE_TIME = 5000;
const PLAYLIST = [
  '2tUBqZG2AbRi7Q0BIrVrEj', // I want to dance with somebody
  '6o2g1BJvtYQssH84kBYs7y', // Back dat azz up
  '42ftjU4cTN5UTRksyqBKZJ', // Cake by the ocean
];


class SpotifyPlayer {
  constructor() {
    this.audioObjs = {};
    this.timeouts = [];
    this.intervals = [];

    this.playlistIndex = -1;
    this.volStep = 1 / (FADE_TIME / TICK);

    this.spotifyApi = new SpotifyWebApi();
    this.spotifyApi.setPromiseImplementation(Q);
  }

  setInterval(fn, duration) {
    const interval = setInterval(fn, duration);
    this.intervals.push(interval);

    return interval;
  }

  setTimeout(fn, duration) {
    const timeout = setTimeout(fn, duration);
    this.timeouts.push(timeout);

    return timeout;
  }

  fadeIn(audio) {
    const interval = this.setInterval(() => {
      const currentVol = audio.volume;
      let newVol = currentVol + this.volStep;

      if (newVol > 1) {
        newVol = 1;
        clearInterval(interval);
      }

      audio.volume = newVol; // eslint-disable-line no-param-reassign
    }, TICK);
  }

  fadeOut(audio) {
    const interval = this.setInterval(() => {
      const currentVol = audio.volume;
      let newVol = currentVol - this.volStep;

      if (newVol < 0) {
        newVol = 0;
        clearInterval(interval);
      }

      audio.volume = newVol; // eslint-disable-line no-param-reassign
    }, TICK);
  }

  playNext(fadeIn) {
    this.playlistIndex = this.playlistIndex === PLAYLIST.length - 1 ? 0 : this.playlistIndex + 1;
    const id = PLAYLIST[this.playlistIndex];

    if (this.audioObjs[id]) {
      this.playTrack(this.audioObjs[id], fadeIn);
      return;
    }

    this.spotifyApi.getTrack(id).then(data => {
      const audio = new Audio(data.preview_url);

      this.audioObjs[id] = audio;

      this.playTrack(this.audioObjs[id], fadeIn);
    });
  }

  playTrack(audio, fadeIn) {
    if (fadeIn) {
      audio.volume = 0; // eslint-disable-line no-param-reassign
      this.fadeIn(audio);
    }

    audio.play();

    this.setTimeout(() => {
      this.fadeOut(audio);
      this.playNext(true);
    }, 30000 - FADE_TIME);
  }

  start() {
    this.playNext(false);
  }

  stop() {
    const audio = this.audioObjs[PLAYLIST[this.playlistIndex]];
    audio.pause();
    audio.currentTime = 0;

    this.timeouts.map(clearTimeout);
    this.intervals.map(clearInterval);
    this.playlistIndex = -1;
  }
}

export {
  SpotifyPlayer,
};
