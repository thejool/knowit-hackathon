import S3 from 'aws-s3';

const config = {
  bucketName: 'knowit-videos',
  dirName: 'webcam', /* optional */
  region: 'eu-central-1',
  accessKeyId: 'AKIAUWTQVGGE5JIA4ZPX',
  secretAccessKey: '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',
}

console.log('config')
console.log(config)
const S3Client = new S3(config);

let startCaptureScreen = document.getElementById('startCaptureScreen');
let stopCaptureScreen = document.getElementById('stopCaptureScreen');
let upload = document.getElementById('upload');


startCaptureScreen.onclick = async () => {
	chrome.tabs.query({ active: true, currentWindow: true}, (tabs) => {
		console.log('tabs')
		console.log(tabs)
		const port = chrome.tabs.connect(tabs[0].id, { name: "channel" });
		port.postMessage({ type: "startVideoCapture" });
		port.onMessage.addListener(async ({ type, screenStream, webcamStream }) => {
			console.log('type')
			console.log(type)
			console.log('screenStream')
			console.log(screenStream)
			console.log('webcamStream')
			console.log(webcamStream)

			
			// data.forEach((recorder) => {
				// 	console.log('___recorder')
				// 	console.log(recorder)
				
			if(type === 'startVideoCaptureResult') {
				let chunks = []
				console.log('screenStream')
				console.log(await webcamStream)
				console.log('screenStream')
				console.log(await webcamStream)

				const screenRecorder = new MediaRecorder(await screenStream);
				const webcamRecorder = new MediaRecorder(await webcamStream);
				
				webcamRecorder.start();
				webcamRecorder.ondataavailable = (e) => chunks.push(e.data);
				
				stopCaptureScreen.onclick = async () => {
					webcamRecorder.stop()
				}

				webcamRecorder.onstop = (e) => {
					console.log('chunks[0].type')
					console.log(chunks[0].type)
					const completeBlob = new Blob(chunks, { type: chunks[0].type });
			
					console.log('completeBlob')
					console.log(completeBlob)
					
					var file = new File([completeBlob], key, {
						type: "video/x-matroska"
					});
					
					console.log('file')
					console.log(file)
			
					upload.onclick = async () => {
						S3Client
							.uploadFile(file, key)
							.then(data => console.log(data))
							.catch(err => console.error(err))
					}
				};
			}
		})
	});
};

upload.onclick = async () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { type: "uploadVideoCapture" }, function(response){
			console.log('response')
			console.log(response)
		});
	});
};

