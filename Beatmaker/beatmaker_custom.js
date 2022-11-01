// creating drumkit class
class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.tempoDisplay = document.querySelector(".tempo-value span");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-audio");
    this.snareAudio = document.querySelector(".snare-audio");
    this.hihatAudio = document.querySelector(".hihat-audio");
    this.trackSelectors = document.querySelectorAll(".track-selector");
    this.muteBtns = document.querySelectorAll(".mute");
    this.step = 0;
    this.isPlaying = null;
    this.bpm = 150;
  }

  // function to activate a pad
  activatePad(pads) {
    pads.forEach((pad) => {
      pad.classList.add("beat");
      this.playSound(pad);
      pad.addEventListener("animationend", function () {
        this.classList.remove("beat");
      });
    });
  }

  //function to play sounds
  playSound(currentPad) {
    if (currentPad.classList.contains("active")) {
      if (currentPad.classList.contains("kick-pad")) {
        this.kickAudio.play();
        this.kickAudio.currentTime = 0;
      } else if (currentPad.classList.contains("snare-pad")) {
        this.snareAudio.play();
        this.snareAudio.currentTime = 0;
      } else {
        this.hihatAudio.play();
        this.hihatAudio.currentTime = 0;
      }
    }
  }

  // function to change track
  changeTrack(event) {
    let selector = event.target.name;
    let trackSrc = event.target.value;
    switch (selector) {
      case "kick-select":
        this.kickAudio.src = trackSrc;
        break;
      case "snare-select":
        this.snareAudio.src = trackSrc;
        break;
      case "hihat-select":
        this.hihatAudio.src = trackSrc;
        break;
    }
  }

  // function to mute track
  muteTrack(event) {
    let targetMuteBtn = event.target;
    let dataTrack = targetMuteBtn.getAttribute("data-track");
    let newVolume = 1;
    if (targetMuteBtn.classList.contains("active")) {
      newVolume = 0;
    }
    switch (dataTrack) {
      case "0":
        this.kickAudio.volume = newVolume;
        break;
      case "1":
        this.snareAudio.volume = newVolume;
        break;
      case "2":
        this.hihatAudio.volume = newVolume;
        break;
    }
  }

  // function to change tempo display value
  changeTempoValue(event){
    this.tempoDisplay.innerText = event.target.value;
  }

  // function to change drumkit tempo
  changeTempo(event){
      this.bpm = parseInt(event.target.value);
      if(this.isPlaying){
        this.playPause();
      }
  }

  // function to iterate over pads
  repeat() {
    this.step = this.step % 8;
    let activePads = document.querySelectorAll(`.b${this.step}`);
    this.step++;
    this.activatePad(activePads);
  }

  playPause(){
    if(this.isPlaying){
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      this.playBtn.classList.remove("active");
    }
    else{
      this.start();
      this.playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      this.playBtn.classList.add("active");
    }
  }

  // function to turn on beatmaker
  start() {
    let interval = (60 / this.bpm) * 1000;
    this.isPlaying = setInterval(() => {
      this.repeat();
    }, interval);
  }
}

const drumKit = new DrumKit();

// adding event listener to play button
drumKit.playBtn.addEventListener("click", function () {
  drumKit.playPause();
});

// adding event listeners to each of the pads
drumKit.pads.forEach(function (pad) {
  pad.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// adding event listener to track selectors
drumKit.trackSelectors.forEach(function (trackSelector) {
  trackSelector.addEventListener("change", function (event) {
    drumKit.changeTrack(event);
  });
});

// adding event listener to mute buttons
drumKit.muteBtns.forEach(function (muteBtn) {
  muteBtn.addEventListener("click", function (event) {
    event.target.classList.toggle("active");
    drumKit.muteTrack(event);
  });
});

// adding event listeners to tempo slider
drumKit.tempoSlider.addEventListener("input", function(event){
  drumKit.changeTempoValue(event);
});


drumKit.tempoSlider.addEventListener("change", function(event){
  drumKit.changeTempo(event);
});
