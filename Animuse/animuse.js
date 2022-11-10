// creating animuseplayer class
class AnimusePlayer {
  constructor() {
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
    this.audioTrack = document.querySelector(".audio-track");

    // creating necessary variables
    this.isTrackPlaying = false;

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
    this.playButton.addEventListener("click", (event) => {
      this.playPause();
    });
  }

  //function to start playing audio
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

  // function to vary bar heights
  visualize(timestamp) {
    this.analyzer.getByteFrequencyData(this.visualizerDataArray);
    // updating bar scales
    let factor = 30/Math.max(...this.visualizerDataArray);
    for(let i = 0; i < this.bufferLength; i++){
        let currValue = this.visualizerDataArray[i];
        currValue = this.processFreq(currValue);
        this.bars[i].style.transform = `scaleY(${currValue * factor + 1})`
    }
    if (this.isTrackPlaying) {
      requestAnimationFrame(this.visualize);
    }
  }

  // function for processing frequency value
  processFreq(val){
    if(val === 0){
        return Math.ceil(Math.random() * 10);
    }
    return val
  }
}

// creating an instance of animuse player
const animusePlayer = new AnimusePlayer();
