const URL = "./my_model/";
let model, webcam, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const constraints = {
        video: {
            facingMode: { exact: "environment" } // Request the back camera
        }
    };

    const flip = false; // Set to false to use the back camera
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip

    // Override the default getUserMedia call to use our constraints
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    webcam.webcam.srcObject = stream;

    await new Promise((resolve) => {
        webcam.webcam.onloadedmetadata = resolve;
    });
    webcam.webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    const threshold = parseFloat(document.getElementById("thresholdSlider").value);

    let maxProbability = 0;
    let recognizedLabel = "None";
    let recognizedPercentage = "0%";

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > maxProbability && prediction[i].probability >= threshold) {
            maxProbability = prediction[i].probability;
            recognizedLabel = prediction[i].className;
            recognizedPercentage = (prediction[i].probability * 100).toFixed(2) + "%";
        }
    }

    document.getElementById("recognizedLabel").innerText = recognizedLabel;
    document.getElementById("recognizedPercentage").innerText = recognizedPercentage;
}

function toggleWebcam() {
    const button = document.getElementById("startStopButton");
    if (button.textContent === "Start") {
        init();
        button.textContent = "Stop";
    } else {
        webcam.stop();
        button.textContent = "Start";
    }
}
