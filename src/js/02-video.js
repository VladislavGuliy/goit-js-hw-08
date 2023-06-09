import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const iframePlayer = new Player(iframe);
const currentTimePlayer = localStorage.getItem(STORAGE_TIME_KEY);

iframePlayer.on(
  'timeupdate',
  throttle(
    ({ seconds }) => localStorage.setItem(STORAGE_TIME_KEY, seconds),
    1000
  )
);

if (currentTimePlayer) {
    iframePlayer.setCurrentTime(currentTimePlayer);
}
