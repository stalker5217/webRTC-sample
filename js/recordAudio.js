const startBtn = document.querySelector('#start-record');
const stopBtn = document.querySelector('#stop-record');

let recordAudio;

startBtn.addEventListener('click', () => {
	console.log('[START AUDIO RECORDING]');
	
	navigator.getUserMedia(
		{audio: true},
		(stream) => {
			recordAudio = RecordRTC(stream, {
				type: 'audio',
				mimeType: 'audio/webm',
				sampleRate: 44100,
				desiredSampRate: 16000,
				recorderType: StereoAudioRecorder,
				numberOfAudioChannels: 1,
				timeSlice: 2000,
				ondataavailable: (blob) => {
					console.log('!');
					addHTMLSlice(blob);
				}
			});
			recordAudio.startRecording();
		},
		(error) => {
			console.log(error);
		}
	);

	toggleSwitch(startBtn, stopBtn);
});

stopBtn.addEventListener('click', () => {
	console.log('[STOP AUDIO RECORDING]');
	
	recordAudio.stopRecording(() => {
		const blob = recordAudio.getBlob();
		addHTMLFull(blob);
	});

	toggleSwitch(startBtn, stopBtn);
});

const addHTMLSlice = (blob) => {
	const audio = document.createElement('audio');
	audio.controls = true;
	audio.src = window.URL.createObjectURL(blob);

	const wrap = document.createElement('div');
	wrap.append(audio);

	const sliceResult = document.querySelector('#slice-result');
	sliceResult.append(wrap);
};

const addHTMLFull = (blob) => {
	const audio = document.createElement('audio');
	audio.controls = true;
	audio.src = window.URL.createObjectURL(blob);

	const wrap = document.createElement('div');
	wrap.append(audio);

	const fullResult = document.querySelector('#full-result');
	fullResult.append(wrap);
};

const toggleSwitch = (startBtn, stopBtn) => {
	startBtn.disabled = !startBtn.disabled;
	stopBtn.disabled = !stopBtn.disabled;
};