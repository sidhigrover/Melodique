const chords = [
    { name: 'C', audio: '/assets/Chords/C-Chord.wav', image: '/assets/Chords_images/C.png' },
    { name: 'G', audio: '/assets/Chords/G-Chord.wav', image: '/assets/Chords_images/G.png' },
    { name: 'D', audio: '/assets/Chords/D-Chord.wav', image: '/assets/Chords_images/D.png' },
    { name: 'A', audio: '/assets/Chords/A-Chord.wav', image: '/assets/Chords_images/A.png' },
    { name: 'E', audio: '/assets/Chords/E-Chord.wav', image: '/assets/Chords_images/E.png' },
    { name: 'B', audio: '/assets/Chords/B-Chord.wav', image: '/assets/Chords_images/B.png' },
    { name: 'F', audio: '/assets/Chords/F-Chord.wav', image: '/assets/Chords_images/F.png' },
    { name: 'Cm', audio: '/assets/Chords/C-Minor-Chord.wav', image: '/assets/Chords_images/Cm.png' },
    { name: 'Gm', audio: '/assets/Chords/G-Minor-Chord.wav', image: '/assets/Chords_images/Gm.png' },
    { name: 'Dm', audio: '/assets/Chords/D-Minor-Chord.wav', image: '/assets/Chords_images/Dm.png' },
    { name: 'Am', audio: '/assets/Chords/A-Minor-Chord.wav', image: '/assets/Chords_images/Am.png' },
    { name: 'Em', audio: '/assets/Chords/E-Minor-Chord.wav', image: '/assets/Chords_images/Em.png' },
    { name: 'Bm', audio: '/assets/Chords/B-Minor-Chord.wav', image: '/assets/Chords_images/Bm.png' },
    { name: 'Fm', audio: '/assets/Chords/F-Minor-Chord.wav', image: '/assets/Chords_images/Fm.png' },
];

const chordImageContainer = document.getElementById('chord_Image'); // Add an element to display the chord image

let audioContext;
let analyser;
const visualizerContainer = document.getElementById('visualizerContainer');
const optionsContainer = document.getElementById('optionsContainer');
let currentChordIndex = 0;
let points = 0;
let hasAnswered = false;

window.addEventListener('load', function () {
    playChord(); // Play the chord when the page loads
});

document.getElementById('playChordBtn').addEventListener('click', playChord);
document.getElementById('nextChordBtn').addEventListener('click', function() {
    nextChord();
    playChord(); // Automatically play the next chord after clicking "Next Chord"
});

function playChord() {
    const currentChord = chords[currentChordIndex];
    const audio = new Audio(currentChord.audio);

    

    // Initialize Web Audio API components
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    // Connect components
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    // Set up canvas for visualization
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 290;
    visualizerContainer.innerHTML = ''; // Clear previous visualizer
    visualizerContainer.appendChild(canvas);

    const canvasContext = canvas.getContext('2d');

    // Analyser settings
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

  // Visualization function
function draw() {
    analyser.getByteTimeDomainData(dataArray);
    canvasContext.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    canvasContext.fillStyle = 'rgba(255, 255, 255, 0)';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(0, 0, 0)';
    canvasContext.beginPath();

    const sliceAngle = (Math.PI * 2) / bufferLength;
    let angle = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const radius = (v * canvas.height) / 2.3;

        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;

        if (i === 0) {
            canvasContext.moveTo(x, y);
        } else {
            canvasContext.lineTo(x, y);
        }

        angle += sliceAngle;
    }

    canvasContext.closePath();
    canvasContext.stroke();

    requestAnimationFrame(draw);
}

    draw();

    // Play audio
    audio.play();
    displayChordImage("");
}

function displayChordImage(imageSrc) {
    chordImageContainer.src = imageSrc; // Update the source of the existing img element
}

function nextChord() {
    // Move to the next chord or loop back to the first chord
    currentChordIndex = (currentChordIndex + 1) % chords.length;
    hasAnswered = false; // Reset the flag for the next question
    visualizerContainer.innerHTML = ''; // Clear visualizer
    generateOptions(); // Regenerate options for the new chord
}

function generateOptions() {
    optionsContainer.innerHTML = '';

    const correctChord = chords[currentChordIndex];

    // Create an array with three random chords (excluding the correct chord)
    const randomChords = chords.filter(chord => chord.name !== correctChord.name);
    const shuffledChords = [...randomChords].sort(() => Math.random() - 0.5);

    // Add the correct chord to the options array at a random position
    const correctChordPosition = Math.floor(Math.random() * 4);
    shuffledChords.splice(correctChordPosition, 0, correctChord);

    // Generate options
    for (let i = 0; i < 4; i++) {
        const option = document.createElement('div');
        option.classList.add('option');
        option.textContent = shuffledChords[i].name;
        option.addEventListener('click', () => checkAnswer(shuffledChords[i].name, correctChord.name, option));
        optionsContainer.appendChild(option);
    }
}

function checkAnswer(selectedChord, correctChord, optionElement) {
    if (hasAnswered) {
        return; // If the user has already answered, do nothing
    }


    hasAnswered = true; // Set the flag to indicate that the user has answered
    if (selectedChord === correctChord) {
        playSound('/assets/sounds/correct.mp3'); // Play correct sound
        optionElement.style.backgroundColor = 'green';
        points += 10; // Add points for the correct answer
        displayPoints();
    } else {
        playSound('/assets/sounds/incorrect.mp3'); // Play incorrect sound
        optionElement.style.backgroundColor = 'red';
         // Display the correct answer in green
         const correctOption = Array.from(optionsContainer.children).find(option =>
            option.textContent.trim() === correctChord.trim()
        );
        if (correctOption) {
            correctOption.style.backgroundColor = 'green';
        }
    }

    displayChordImage(chords[currentChordIndex].image);
}

function displayPoints() {
    const pointsDisplay = document.getElementById('pointsDisplay');
    if (pointsDisplay) {
        pointsDisplay.textContent = `Points: ${points}`;
    }
}

function playSound(soundPath) {
    const sound = new Audio(soundPath);
    sound.play();
}

// Initial options generation
generateOptions();
