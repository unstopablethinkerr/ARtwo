const URL = "./my_model/";
let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    const threshold = parseFloat(document.getElementById("thresholdSlider").value);

    let notInDatabasePercentage = 100;
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        const percentage = (prediction[i].probability * 100).toFixed(2);

        if (prediction[i].probability >= threshold) {
            notInDatabasePercentage -= parseFloat(percentage);
        }

        document.getElementById(prediction[i].className.toLowerCase() + "Percentage").innerText = percentage + "%";
    }

    document.getElementById("notInDatabasePercentage").innerText = notInDatabasePercentage.toFixed(2) + "%";
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
