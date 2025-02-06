let model;
let video = document.getElementById('video');
let toggleButton = document.getElementById('toggleButton');
let thresholdSlider = document.getElementById('threshold');
let thresholdValue = document.getElementById('thresholdValue');
let resultsTable = document.getElementById('resultsTable');

async function loadModel() {
    model = await tf.loadGraphModel('./my_model/model.json');
}

async function startVideo() {
    if (navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
    }
}

function stopVideo() {
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;
}

function updateThreshold() {
    thresholdValue.textContent = thresholdSlider.value;
}

async function predict() {
    const img = tf.browser.fromPixels(video);
    const resizedImg = tf.image.resizeBilinear(img, [224, 224]);
    const expandedImg = resizedImg.expandDims(0);
    const predictions = await model.predict(expandedImg).data();

    const labels = ['strawberry', 'grape', 'apple', 'not in database'];
    const results = Array.from(predictions).map((prob, index) => ({ label: labels[index], probability: prob }));

    results.sort((a, b) => b.probability - a.probability);

    resultsTable.querySelectorAll('tbody tr').forEach((row, index) => {
        const labelCell = row.querySelector('td:first-child');
        const probabilityCell = row.querySelector('td:last-child');
        if (index < results.length) {
            labelCell.textContent = results[index].label;
            probabilityCell.textContent = `${(results[index].probability * 100).toFixed(2)}%`;
        } else {
            labelCell.textContent = 'Not in Database';
            probabilityCell.textContent = '0%';
        }
    });

    requestAnimationFrame(predict);
}

toggleButton.addEventListener('click', () => {
    if (toggleButton.textContent === 'Start') {
        startVideo();
        predict();
        toggleButton.textContent = 'Stop';
    } else {
        stopVideo();
        toggleButton.textContent = 'Start';
    }
});

thresholdSlider.addEventListener('input', updateThreshold);

loadModel().then(() => {
    console.log('Model loaded');
});
