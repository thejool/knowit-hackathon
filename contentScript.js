chrome.runtime.onConnect.addListener((port) => {
  console.log('port')
  console.log(port)
  port.onMessage.addListener(async (message) => {
    switch(message.type) {
      case "startVideoCapture":
        console.log('startVideoCapture')
        const screenStream = navigator.mediaDevices.getDisplayMedia();
        const webcamStream = navigator.mediaDevices.getUserMedia({ video: true })

        console.log('sxx creenStream')
        console.log(screenStream)
        console.log('xxwebcamStream')
        console.log(webcamStream)
    		port.postMessage({ type: "startVideoCaptureResult", webcamStream, screenStream, });
      break
    }
  });
});
