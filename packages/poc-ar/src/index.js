var video = document.createElement('video')
document.body.appendChild(video)

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia

var tw = 1280 / 2
var th = 720 / 2

var hdConstraints = {
  audio: false,
  video: { facingMode: 'environment' },
}

navigator.mediaDevices
  .getUserMedia(hdConstraints)
  .then(success)
  .catch(e => console.log(e))

function success(stream) {
  video.src = window.URL.createObjectURL(stream)

  window.onclick = () => video.play()
  // try {
  //   // video.play()
  // } catch (err) {
  // window.onclick = () => video.play()
  // }

  video.addEventListener('play', () => console.log('play'))

  var cameraParam = new ARCameraParam()

  cameraParam.onload = function() {
    var arController
    var interval = setInterval(function() {
      if (!video.videoWidth) return
      if (!arController) {
        arController = new ARController(video, cameraParam)
        arController.debugSetup()
      }
      arController.process()
    }, 16)
  }
  cameraParam.src = 'camera_para.dat'
}
