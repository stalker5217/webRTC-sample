const startBtn = document.querySelector('#start-stt');
const stopBtn = document.querySelector('#stop-stt');

const recognition = new(
	window.SpeechRecognition ||
	window.webkitSpeechRecognition ||
	window.mozSpeechRecognition ||
	window.msSpeechRecognition
)

recognition.lang = 'ko-KR';
recognition.interimResults = false; 
recognition.maxAlternatives = 5;
recognition.continuous = true;

let resultCnt = 0;
recognition.onresult = (event) => {
	const result = event.results[resultCnt++][0].transcript;
	console.log('[RESULT]' + result);

	addHTML(result);
};

startBtn.addEventListener('click', () => {
	console.log('START STT');
	toggleSwitch(startBtn, stopBtn);
	
	recognition.start();
});

stopBtn.addEventListener('click', () => {
	console.log('STOP STT');
	toggleSwitch(startBtn, stopBtn);
	
	recognition.stop();
});

const addHTML = (result) => {
	const wrap = document.createElement('div');
	wrap.innerHTML = result;

	const resultWrapper = document.querySelector('#result-wrapper');
	resultWrapper.append(wrap);
};

const toggleSwitch = (startBtn, stopBtn) => {
	startBtn.disabled = !startBtn.disabled;
	stopBtn.disabled = !stopBtn.disabled;
};