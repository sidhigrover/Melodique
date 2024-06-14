const chords = [
    { name: 'Channa Mereya', audio: '/assets/Hindi/ChannaMereya.mp3', image: '/assets/artist_images/Arijit Singh.jpeg' },
    { name: 'Pee Loon', audio: '/assets/Hindi/PeeLoon.mp3', image: '/assets/artist_images/Mohit Chauhan.jpeg' },
    { name: 'Tum Hi Ho', audio: '/assets/Hindi/TumHiHo.mp3', image: '/assets/artist_images/Arijit Singh.jpeg' },
    { name: 'Tum Se Hi', audio: '/assets/Hindi/TumSeHi.mp3', image: '/assets/artist_images/Mohit Chauhan.jpeg' },
    { name: 'Tum Mile', audio: '/assets/Hindi/TumMile.mp3', image: '/assets/artist_images/Neeraj Shridhar.jpeg' },
    { name: 'Asit Was', audio: '/assets/English/AsitWas.mp3', image: '/assets/artist_images/Harry Styles.jpg' },
    { name: 'Feather', audio: '/assets/English/NoTearsLeft.mp3', image: '/assets/artist_images/Selena Gomez.jpeg' },
    { name: 'Girlfriend', audio: '/assets/English/Girlfriend.mp3', image: '/assets/artist_images/Ruger-EP.webp' },
    { name: 'Love Story', audio: '/assets/English/LoveStory.mp3', image: '/assets/artist_images/taylor swift.jpeg' },
    { name: 'Loving You', audio: '/assets/English/ShapeOfYou.mp3', image: '/assets/artist_images/Ed Sheeran.jpeg' },


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

     // Stop the previous audio (if any)
     stopAudio();

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
        canvasContext.strokeStyle = '#FBC630';
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

    // Set a timeout to stop the audio after 10 seconds
    const snippetDuration = 8; // seconds
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        visualizerContainer.innerHTML = ''; // Clear visualizer
    }, snippetDuration * 1000);

    // Play audio
    audio.play();
    displayChordImage(currentChord.image,true);
}


function displayChordImage(imageSrc, applyBlur) {
    chordImageContainer.src = imageSrc; // Update the source of the existing img element
    
    // Apply or remove blur effect based on the applyBlur parameter
    if (applyBlur) {
        chordImageContainer.style.filter = 'blur(5px)';
    } else {
        chordImageContainer.style.filter = 'none';
    }
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

    // displayChordImage(chords[currentChordIndex].image);
    displayChordImage(chords[currentChordIndex].image, false); // Remove blur effect
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

function stopAudio() {
    if (analyser) {
        analyser.disconnect();
        analyser = null;
    }

    if (audioContext) {
        audioContext.close().then(function () {
            console.log('AudioContext closed');
        });
        audioContext = null;
    }

    visualizerContainer.innerHTML = ''; // Clear visualizer
}

// Call stopAudio when the page is unloaded to ensure resources are released
window.addEventListener('beforeunload', stopAudio);


// Initial options generation
generateOptions();
