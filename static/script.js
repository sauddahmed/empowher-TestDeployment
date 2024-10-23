const video = document.getElementById("videoElement");
const captureButton = document.getElementById("captureButton");

// Request access to the camera
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    // Set the video element's source to the camera stream
    video.srcObject = stream;
  })
  .catch(function (err) {
    console.error("Error accessing the camera: ", err);
  });

// Capture button event listener
captureButton.addEventListener("click", function () {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL("image/png");

  // Send the image data to Flask backend
  fetch("/process_frame", {
    method: "POST",
    body: JSON.stringify({ image: dataURL }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
});
