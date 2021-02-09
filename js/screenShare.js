const startBtn = document.querySelector('#start-capture');
const stopBtn = document.querySelector('#stop-capture');

let desktopStream;
let deviceRecorder;

startBtn.addEventListener('click', async () => {
	console.log('[START AUDIO CAPTURE]');
	toggleSwitch(startBtn, stopBtn);

	desktopStream = await navigator.mediaDevices.getDisplayMedia({video: true, audio: true});
	deviceRecorder = new MediaRecorder(desktopStream, {mimeType: 'video/webm'});
	
	blobs = [];
	deviceRecorder.ondataavailable = (e) => {
		console.log(e);
		blobs.push(e.data);
	};
	
	deviceRecorder.onstop = async () => {
		const blob = new Blob(blobs, {type: 'audio/webm'});

		addHTMLVideo(blob);
		addHTMLAudio(blob);
		
		toggleSwitch(startBtn, stopBtn);
	};

	console.log(deviceRecorder);
	deviceRecorder.start();
});

stopBtn.addEventListener('click', () => {
	console.log('[STOP AUDIO CAPTURE]');

	deviceRecorder.stop();

	desktopStream.getTracks().forEach(s => {
		s.stop();
	});
});

const toggleSwitch = (startBtn, stopBtn) => {
	startBtn.disabled = !startBtn.disabled;
	stopBtn.disabled = !stopBtn.disabled;
};

const addHTMLAudio = (blob) => {
	const audio = document.createElement('audio');
	audio.controls = true;
	audio.src = window.URL.createObjectURL(blob);
	
	const wrap = document.createElement('div');
	wrap.append(audio);

	const resultWrapper = document.querySelector('#audio-wrapper');
	resultWrapper.append(wrap);
};

const addHTMLVideo = (blob) => {
	const video = document.createElement('video');
	video.controls = true;
	video.src =  window.URL.createObjectURL(blob);
	video.height = screen.height / 3;
	video.width = screen.width / 3;
	
	const wrap = document.createElement('div');
	wrap.append(video);

	const resultWrapper = document.querySelector('#video-wrapper');
	resultWrapper.append(wrap);
};