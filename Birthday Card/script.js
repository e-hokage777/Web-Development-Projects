const messages = [
'First message',
'Second message',
'Third longer message',
'Fourth much longer message',
'Fifth very very very long messages :)',
'Sixth very very very very very long messages',
'Another message',
'Eight message',
'Ninth messageeeeeeeee',
'Yet another message if you want',
'Another',
'*the last*'
]


colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
]

const messageAnims = [
	'animate__animated animate__fadeInUp',
 	'animate__animated animate__fadeIn', 
 	'animate__animated animate__fadeInDownBig', 
 	'animate__animated animate__fadeInLeftBig',
 	'animate__animated animate__bounce',
 	'animate__animated animate__rubberBand',
 	'animate__animated animate__swing',
 	'animate__animated animate__tada',
 	'animate__animated animate__heartBeat',
 	'animate__animated animate__lightSpeedInLeft',
 	'animate__animated animate__lightSpeedInRight',
 	'animate__animated animate__rotateIn',
 	'animate__animated animate__bounceInDown',
 	'animate__animated animate__zoomIn',
 	]


let messageIndex = 0;
let colorIndex = 0;
let messageAnimIndex = 0;

//Getting the message field
const messageField = document.getElementById('messages');
const background = document.getElementById('wrapper');
const heart = document.getElementById('heart');


function changeMessage(){
	messageField.textContent = messages[messageIndex];

	if(messageIndex == messages.length)
		messageIndex = 0;
	else
		messageIndex++;

	changeMessageAnim();
	changeBackground();
}


function changeBackground(){
	colorIndex = Math.floor(Math.random()*colors.length);
	document.body.style.color = colors[colorIndex]
	document.body.style.backgroundColor = colors[colorIndex]
	heart.style.color = colors[colorIndex];
}

function changeMessageAnim(){
	messageAnimIndex = Math.floor(Math.random()*messageAnims.length);
	messageField.className = messageAnims[messageAnimIndex];
}