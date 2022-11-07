// creating animuseplayer class
class AnimusePlayer{
    constructor(){
        // getting all components of the music player
        this.wrapper = document.querySelector(".wrapper");
        this.trackDisplay = document.querySelector(".track-name-display");
        this.controls = document.querySelector(".controls");
        this.playButton = this.controls.querySelector(".play-btn");
        this.nextButton = this.controls.querySelector(".next-btn")
        this.previousButton = this.controls.querySelector(".previous-btn")
        this.moreControls = document.querySelector(".more-controls");
        this.audioTrack = document.querySelector(".audio-track");
        this.isTrackPlaying = false;

        // initializing components
        this.initComponents();
    }

    // function to initialize components
    initComponents(){
        this.playButton.addEventListener("click", (event) => {
            this.playPause();
        });
    }

    //function to start playing audio
    playPause(){
        if(this.isTrackPlaying){
            this.audioTrack.pause();
            this.playButton.classList.remove("active");
            this.playButton.innerHTML = "<i class='fa-solid fa-play'>";
            this.isTrackPlaying = false;
        }
        else{
            this.audioTrack.play();
            this.playButton.classList.add("active");
            this.playButton.innerHTML = "<i class='fa-solid fa-pause'>";
            this.isTrackPlaying = true;
        }
    }
}


// creating an instance of animuse player
const animusePlayer = new AnimusePlayer();
