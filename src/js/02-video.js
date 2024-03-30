import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';
const savedTime = localStorage.getItem(STORAGE_KEY);

const saveCurrentTime = data => {
  localStorage.setItem(STORAGE_KEY, data.seconds);
};

const throttledSaveCurrentTime = throttle(saveCurrentTime, 1000);

player.on('timeupdate', throttledSaveCurrentTime);

if (savedTime) {
  player.setCurrentTime(savedTime).catch(function (error) {
    console.error(
      'Error occurred when trying to set the current time: ',
      error
    );
  });
}
