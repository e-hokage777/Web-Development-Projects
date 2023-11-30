// creating animuseplayer class
class AnimusePlayer {
  constructor(musicList) {
    // setting up music list
    this.musicList = musicList;
    this.currentTrackIndex = 0;

    // getting all components of the music player
    this.wrapper = document.querySelector(".wrapper");
    this.visualizer = document.querySelector(".visualizer");
    this.bars = [];
    this.trackDisplay = document.querySelector(".track-name-display");
    this.controls = document.querySelector(".controls");
    this.playButton = this.controls.querySelector(".play-btn");
    this.nextButton = this.controls.querySelector(".next-btn");
    this.previousButton = this.controls.querySelector(".previous-btn");
    this.moreControls = document.querySelector(".more-controls");
    this.menuToggle = this.moreControls.querySelector(".menu-toggle");
    this.volumeSlider = this.moreControls.querySelector(".volume-slider");
    this.audioSeeker = document.querySelector(".audio-seek");
    this.trackTimeElapsed = document.querySelector(".track-time-elapsed");
    this.trackTimeRemaining = document.querySelector(".track-time-remaining");
    this.audioTrack = document.querySelector(".audio-track");

    // creating necessary variables
    this.isTrackPlaying = false;
    this.isSeeking = false;

    // creating audio graph
    this.audioContext = new AudioContext();
    this.audioSource = this.audioContext.createMediaElementSource(
      this.audioTrack
    );
    this.analyzer = this.audioContext.createAnalyser();

    // setting up the analyzer
    this.analyzerFFT = 256;
    this.analyzer.fftSize = this.analyzerFFT;

    // getting important components from analyzer
    this.bufferLength = this.analyzer.frequencyBinCount;

    // array to hold frequency data
    this.visualizerDataArray = new Uint8Array(this.bufferLength);
    // this.visualizerDataArrayFloat = new Float32Array(this.bufferLength);

    // making audio graph connections
    this.audioSource.connect(this.analyzer);
    this.analyzer.connect(this.audioContext.destination);

    // creating the bars
    for (let i = 0; i < this.bufferLength; i++) {
      let bar = document.createElement("span");
      bar.classList.add("bar");
      this.visualizer.appendChild(bar);
      this.bars.push(bar);
    }

    // initializing components
    this.initComponents();

    //binding functions to this keyword
    this.visualize = this.visualize.bind(this);
  }

  // function to initialize components
  initComponents() {
    // setting up music
    this.currentTrack = this.musicList[this.currentTrackIndex];
    this.audioTrack.src = this.currentTrack.track_src;

    // setting name of track
    this.trackDisplay.querySelector("p").innerHTML =
      this.currentTrack.name + " - " + this.currentTrack.artist;

    // setting up background image
    this.wrapper.style.backgroundImage = `url(${this.currentTrack.img_src})`;

    // setting up event listeners
    this.playButton.addEventListener("click", (event) => {
      this.playPause();
    });

    this.nextButton.addEventListener("click", (event) => {
      this.nextTrack();
    });

    this.previousButton.addEventListener("click", (event) => {
      this.previousTrack();
    });

    this.menuToggle.addEventListener("click", (event) => {
      this.toggleMoreControlsMenu();
    });

    this.audioSeeker.addEventListener("change", (event) => {
      this.seek();
    });

    this.audioSeeker.addEventListener("input", (event) => {
      this.isSeeking = true;
    });

    this.volumeSlider.addEventListener("input", (event) => {
      this.audioTrack.volume = this.volumeSlider.value;
    });

    this.audioTrack.addEventListener("loadedmetadata", (event) => {
      this.setTrackTime();
    });

    this.audioTrack.addEventListener("timeupdate", (event) => {
      if (!this.isSeeking) {
        this.updateSeeker();
      }
    });

    this.audioTrack.addEventListener("ended", (event) => {
      this.nextTrack();
    });
  }

  // utility functions ************************
  // function to format audio time
  formatTime(time) {
    let mins = Math.floor(time / 60);
    let secs = Math.round(time % 60);

    return `${mins} : ${secs.toString().padStart(2, "0")}`;
  }

  // function to set track time up
  setTrackTime() {
    let audioDuration = this.audioTrack.duration;
    this.trackTimeRemaining.innerText = this.formatTime(audioDuration);

    this.audioSeeker.max = audioDuration; // setting the max range of audio seeker
  }

  // function to update seeker value
  updateSeeker() {
    this.audioSeeker.value = Math.floor(this.audioTrack.currentTime); // updating the slider value

    // changing time elapsed
    this.trackTimeElapsed.innerText = this.formatTime(
      this.audioTrack.currentTime
    );

    // changing time remaining
    this.trackTimeRemaining.innerText = this.formatTime(
      this.audioTrack.duration - this.audioTrack.currentTime
    );
  }

  // function to seek
  seek() {
    this.audioTrack.currentTime = this.audioSeeker.value;
    this.isSeeking = false;
  }

  // function to start playing audio
  playPause() {
    if (this.isTrackPlaying) {
      this.audioTrack.pause();
      this.audioContext.suspend();
      this.playButton.classList.remove("active");
      this.playButton.innerHTML = "<i class='fa-solid fa-play'>";
      this.isTrackPlaying = false;
    } else {
      this.audioContext.resume();
      this.audioTrack.play();
      this.playButton.classList.add("active");
      this.playButton.innerHTML = "<i class='fa-solid fa-pause'>";
      this.isTrackPlaying = true;
      this.visualize(); // to start visualizer
    }
  }

  // function to play next track
  nextTrack() {
    this.currentTrackIndex =
      (this.currentTrackIndex + 1) % this.musicList.length;
    this.currentTrack = this.musicList[this.currentTrackIndex];
    this.audioTrack.currentTime = 0;
    this.audioTrack.src = this.currentTrack.track_src;
    this.wrapper.style.backgroundImage = `url(${this.currentTrack.img_src})`;
    this.trackDisplay.querySelector("p").innerHTML =
      this.currentTrack.name + " - " + this.currentTrack.artist;

    if (this.isTrackPlaying) {
      this.audioTrack.play();
    }
  }

  // function to play previous track
  previousTrack() {
    if (this.currentTrackIndex === 0) {
      this.currentTrackIndex = this.musicList.length - 1;
    } else {
      this.currentTrackIndex--;
    }
    this.currentTrack = this.musicList[this.currentTrackIndex];
    this.audioTrack.currentTime = 0;
    this.audioTrack.src = this.currentTrack.track_src;
    this.wrapper.style.backgroundImage = `url(${this.currentTrack.img_src})`;
    this.trackDisplay.querySelector("p").innerHTML =
      this.currentTrack.name + " - " + this.currentTrack.artist;

    if (this.isTrackPlaying) {
      this.audioTrack.play();
    }
  }

  // function to toggle more controls menu
  toggleMoreControlsMenu() {
    this.moreControls.classList.toggle("active");
  }

  // function to vary bar heights
  visualize(timestamp) {
    this.analyzer.getByteFrequencyData(this.visualizerDataArray);
    // updating bar scales
    let factor = 30 / Math.max(...this.visualizerDataArray);
    for (let i = 0; i < this.bufferLength; i++) {
      let currValue = this.visualizerDataArray[i];
      currValue = this.processValue(currValue);
      let scale = this.processValue(currValue * factor + 1);
      this.bars[i].style.transform = `scaleY(${scale})`;
    }
    if (this.isTrackPlaying) {
      requestAnimationFrame(this.visualize);
    }
  }

  // function for processing frequency value
  processValue(val) {
    if (val === 0) {
      return Math.ceil(Math.random() * 20);
    }
    if (val === Infinity) {
      return 1;
    }
    return val;
  }
}

// track folder url
const TRACKS_URL = "tracks/";
// track folder url
const IMAGES_URL = "images/";

// creating a music list
const musicList = [
  {
    name: "Standing Still",
    artist: "Joakim Molitor ft Victoria Voss",
    img_src: IMAGES_URL + "standing-still.jpg",
    track_src:
      TRACKS_URL + "Joakim Molitor feat Victoria Voss  Standing Still.mp3",
  },
  {
    name: "Alone",
    artist: "Marshmallow",
    img_src: IMAGES_URL + "alone.jpg",
    track_src: TRACKS_URL + "Marshmallow - Alone.mp3",
  },
  {
    name: "Without You (Mesto Remix)",
    artist: "Mike Williams, Felix Jaehn, Mesto, Jordan Shaw",
    img_src: IMAGES_URL + "listening_to_music.jpg",
    track_src:
      TRACKS_URL +
      "Mike Williams & Felix Jaehn - Without You (Mesto Remix) feat. Jordan Shaw.mp3",
  },
  {
    name: "Free",
    artist: "Rino Esposito x Adriano Pepe",
    img_src: IMAGES_URL + "free.jpg",
    track_src: TRACKS_URL + "Rino Esposito x Adriano Pepe  Free.mp3",
  },
  {
    name: "Reminds me of you",
    artist: "Dropgun Mindpunk ft SayWeCanFly",
    img_src: IMAGES_URL + "reminds_me_of_u.jpg",
    track_src: TRACKS_URL + "Dropgun  Mindpunk feat SayWeCanFly  Reminds Me Of You.mp3"
  }
];

window.onload = function () {
  // creating an instance of animuse player
  const animusePlayer = new AnimusePlayer(musicList);
};
