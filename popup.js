let startCaptureScreen = document.getElementById('startCaptureScreen');
let stopCaptureScreen = document.getElementById('stopCaptureScreen');

// chrome.storage.sync.get('color', function(data) {
// 	changeColor.style.backgroundColor = data.color;
// 	changeColor.setAttribute('value', data.color);
// });

const startCapture = async (displayMediaOptions) => {
	console.log('startCapture')
	let captureStream = null;

	try {
		captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
		console.log('captureStream')
		console.log(captureStream)
	} catch(err) {
		console.error("Error: " + err);
	}
	return captureStream;
}

startCaptureScreen.onclick = async () => {
	console.log('startCaptureScreen')
	const result = await startCapture()
	console.log('result')
	console.log(result)

	// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	// 	chrome.tabs.executeScript(
	// 		tabs[0].id,
	// 		{ code: 'document.body.style.backgroundColor = "' + color + '";' });
	// });
};

stopCaptureScreen.onclick = async () => {
	const result = await stopCapture()
	console.log('result')
	console.log(result)

	// chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	// 	chrome.tabs.executeScript(
	// 		tabs[0].id,
	// 		{ code: 'document.body.style.backgroundColor = "' + color + '";' });
	// });
};