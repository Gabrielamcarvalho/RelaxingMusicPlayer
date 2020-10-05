const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
let durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Check if song is playing
let isPlaying = false;

const songs = [
  {
    name: 'song-1',
    displayName: 'A New Beginning',
    artist: 'Bensound',
  },
  {
    name: 'song-2',
    displayName: 'Jazzy Frenchy',
    artist: 'Bensound',
  },
  {
    name: 'song-3',
    displayName: 'Memories',
    artist: 'Bensound',
  },
  {
    name: 'song-4',
    displayName: 'Acoustic Breeze',
    artist: 'Bensound',
  },
  {
    name: 'song-5',
    displayName: 'Buddy',
    artist: 'Bensound',
  },
  {
    name: 'song-6',
    displayName: 'Tenderness',
    artist: 'Bensound',
  },
  {
    name: 'song-7',
    displayName: 'Sunny',
    artist: 'Bensound',
  },
  {
    name: 'song-8',
    displayName: 'Slow Motion',
    artist: 'Bensound',
  },
  {
    name: 'song-9',
    displayName: 'Tomorrow',
    artist: 'Bensound',
  },
  {
    name: 'song-10',
    displayName: 'Once Again',
    artist: 'Bensound',
  },
];
//Play
const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
};

const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
};

//Update DOM
const loadSong = (song) => {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  img.src = `./img/${song.name}.jpg`;
};

//current Song
let songIndex = 0;

//Previous Song
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//Next Song
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

//Update progress Bar and Time
const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //calculate and display duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //Delay swiching duration Element to avoid NAN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //calculate and display current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

//Set progress Bar
const setProgressBar = (e) => {
  const width = e.srcElement.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};
//On Load - Select First Song
loadSong(songs[songIndex]);

//Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
