// getting the container
const container = document.getElementById("container");

// creating canvas and stuff
const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creating audio element
let audio = document.getElementById("audio-source");

// creating audio context
let audioCtx = new AudioContext();

// adding an event listener to the container
container.addEventListener("click", function (event) {
  audioCtx.resume();
  audio.play();
  let audioSource = audioCtx.createMediaElementSource(audio);
  let analyser = audioCtx.createAnalyser();

  // connecting the nodes
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);

  // setting up the analyzer
  analyser.fftSize = 2048;

  bufferLength = analyser.frequencyBinCount;

  let dataArray = new Uint8Array(bufferLength);

  let barWidth = (canvas.width) / bufferLength;
  // let barWidth = (canvas.width/2) / bufferLength;
  function animate() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);

    drawVisualizerBarsRot(bufferLength, dataArray, barWidth);

    requestAnimationFrame(animate);
  }

  animate();
});

// function to draw visualizer bars
function drawVisualizerBars(bufferLength, dataArray, barWidth) {
  // ** =---- MY IMPLEMENTATION =========**/
  // let xpos;
  // let oddCount = 1;
  // let evenCount = 0;
  // for (let i = 0; i < bufferLength; i++) {
  //   // creating height
  //   let barHeight = dataArray[i];
  //   // creating colors for each bar
  //   let red = barHeight/2;
  //   let green = (i+1) * barHeight/20;
  //   let blue = (i+1) * barHeight * 1.1;
  //   canvasCtx.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";

  //   if(i%2 != 0){
  //     xpos = -(oddCount*barWidth);
  //     oddCount++;
  //   }
  //   else{
  //     xpos = evenCount * barWidth;
  //     evenCount++;
  //   }
  //   // barHeight is the height of each bar
  //   canvasCtx.fillRect(
  //     // i * barWidth,
  //     canvas.width/2 + xpos - barWidth/2,
  //     canvas.height - barHeight,
  //     barWidth,
  //     barHeight
  //   );
  // }

  for (let i = 0; i < bufferLength; i++) {
    // creating height
    let barHeight = dataArray[i];
    // creating colors for each bar
    let red = barHeight/2;
    let green = (i+1) * barHeight/20;
    let blue = (i+1) * barHeight * 1.1;
    // drawing small squares above
    canvasCtx.fillStyle = "white";
    // canvasCtx.fillRect(
    //   canvas.width/2 - (i * barWidth),
    //   canvas.height - barHeight - 10,
    //   barWidth,
    //   5
    // );
    canvasCtx.beginPath();
    canvasCtx.arc(canvas.width/2 - (i*barWidth), canvas.height-barHeight-10, 2, 0, Math.PI * 2);
    canvasCtx.fill();
    canvasCtx.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
    // barHeight is the height of each bar
    canvasCtx.fillRect(
      canvas.width/2 - (i * barWidth),
      canvas.height - barHeight,
      barWidth,
      barHeight
    );
  }

  for (let i = 0; i < bufferLength; i++) {
    // creating height
    let barHeight = dataArray[i];
    // creating colors for each bar
    let red = barHeight/2;
    let green = (i+1) * barHeight/20;
    let blue = (i+1) * barHeight * 1.1;

    canvasCtx.fillStyle = "white";
    canvasCtx.beginPath();
    canvasCtx.arc((canvas.width/2) + (i * barWidth), canvas.height-barHeight-10, 2, 0, Math.PI * 2);
    canvasCtx.fill();
    
    canvasCtx.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
    // barHeight is the height of each bar
    canvasCtx.fillRect(
      (canvas.width/2) + (i * barWidth),
      canvas.height - barHeight,
      barWidth,
      barHeight
    );
  }
}
// function to draw visualizer bars
function drawVisualizerBarsRot(bufferLength, dataArray, barWidth) {

  for (let i = 0; i < bufferLength; i++) {
    // creating height
    let barHeight = dataArray[i];
    // creating colors for each bar
    let hue = bufferLength/(i+1) * 360;

    // translating and rotating
    canvasCtx.save();
    canvasCtx.translate(canvas.width/2, canvas.height/2);
    canvasCtx.rotate(i + Math.PI * 10 / bufferLength);
    // drawing small squares above
    // canvasCtx.fillStyle = "white";
    // canvasCtx.beginPath();
    // canvasCtx.arc(0 - (i*barWidth), canvas.height-barHeight-10, 2, 0, Math.PI * 2);
    // canvasCtx.fill();
    canvasCtx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
    // barHeight is the height of each bar
    canvasCtx.fillRect(
      0,
      0,
      barWidth*2,
      barHeight
    );

    canvasCtx.restore();
  }

  // for (let i = 0; i < bufferLength; i++) {
  //   // creating height
  //   let barHeight = dataArray[i];
  //   // creating colors for each bar
  //   let red = barHeight/2;
  //   let green = (i+1) * barHeight/20;
  //   let blue = (i+1) * barHeight * 1.1;

  //   canvasCtx.fillStyle = "white";
  //   canvasCtx.beginPath();
  //   canvasCtx.arc((canvas.width/2) + (i * barWidth), canvas.height-barHeight-10, 2, 0, Math.PI * 2);
  //   canvasCtx.fill();
    
  //   canvasCtx.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
  //   // barHeight is the height of each bar
  //   canvasCtx.fillRect(
  //     (canvas.width/2) + (i * barWidth),
  //     canvas.height - barHeight,
  //     barWidth,
  //     barHeight
  //   );
  // }
}
