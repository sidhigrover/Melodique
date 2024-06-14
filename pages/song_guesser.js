const songs = [
  { name: "Love Story", src: "../assets/English/LoveStory.mp3" },
  { name: "Shape of You", src: "../assets/English/ShapeOfYou.mp3" },
  { name: "Vampire", src: "../assets/English/Vampire.mp3" },
  { name: "Channa Mereya", src: "../assets/Hindi/ChannaMereya.mp3" },
  { name: "Tum hi ho", src: "../assets/Hindi/TumHiHo.mp3" },
  // Add more songs as needed
];
const optionsContainer = document.getElementById("optionsContainer");
let currentSongIndex = 0;
let score = 0;
let hasAnswered = false; // Flag to track whether the user has answered the current question

document
  .getElementById("audioPlayer")
  .addEventListener("ended", () => nextSong());
document.getElementById("nextSongBtn").addEventListener("click", nextSong);
function playSong() {
  const currentSong = songs[currentSongIndex];
  const audioPlayer = document.getElementById("audioPlayer");

  // Load the song to get its duration
  audioPlayer.src = currentSong.src;
  audioPlayer.load();

  audioPlayer.onloadedmetadata = () => {
    // Calculate a random start time that allows for a 10-second snippet
    const maxStart = Math.max(0, audioPlayer.duration - 10);
    const startTime = Math.random() * maxStart;

    // Set the start time and play the song
    audioPlayer.currentTime = startTime;
    audioPlayer.play();

    // Stop the playback after 10 seconds
    const playbackTimeout = setTimeout(() => {
      audioPlayer.pause();
      audioPlayer.currentTime = 0; // Reset the playback position
      showReplayOptions(); // Show options to replay or go to the next song
    }, 10000);

    // Function to show replay options
    function showReplayOptions() {
      // Clear the timeout in case the function is called manually
      clearTimeout(playbackTimeout);

      // Create buttons for replay and next song options
      const replayButton = document.createElement("button");
      replayButton.textContent = "Replay Snippet";
      replayButton.onclick = () => {
        // Replay the same snippet
        audioPlayer.currentTime = startTime;
        audioPlayer.play();
        setTimeout(() => {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
          showReplayOptions(); // Show options again after replay
        }, 10000);
      };

      const nextSongButton = document.createElement("button");
      nextSongButton.textContent = "Next Song";
      nextSongButton.onclick = nextSong; // Go to the next song

      // Display the buttons
      const optionsDiv = document.getElementById("replayOptions");
      optionsDiv.innerHTML = ""; // Clear previous options
      optionsDiv.appendChild(replayButton);
      optionsDiv.appendChild(nextSongButton);

      // Remove replayButton after it's clicked
      replayButton.onclick = () => {
        replayButton.remove();
        // Replay the same snippet
        audioPlayer.currentTime = startTime;
        audioPlayer.play();
        setTimeout(() => {
          audioPlayer.pause();
          audioPlayer.currentTime = 0;
          showReplayOptions(); // Show options again after replay
        }, 10000);
      };
    }
  };
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  hasAnswered = false; // Reset the flag for the next question
  generateOptions(); // Regenerate options for the new song
}
function generateOptions() {
  optionsContainer.innerHTML = "";

  const correctSong = songs[currentSongIndex];

  // Create an array with three random songs (excluding the correct song)
  const randomSongs = songs.filter((song) => song.name !== correctSong.name);
  const shuffledSongs = [...randomSongs].sort(() => Math.random() - 0.5);

  // Add the correct song to the options array at a random position
  const correctSongPosition = Math.floor(Math.random() * 4);
  shuffledSongs.splice(correctSongPosition, 0, correctSong);

  // Generate options
  for (let i = 0; i < 4; i++) {
    const option = document.createElement("div");
    option.classList.add("option");
    option.textContent = shuffledSongs[i].name;
    option.addEventListener("click", () =>
      checkAnswer(shuffledSongs[i].name, correctSong.name, option)
    );
    optionsContainer.appendChild(option);
  }

  // Move playSong() outside the for loop to ensure it's called once
  playSong(); // Start playing the current song
}

function checkAnswer(selectedSong, correctSong, optionElement) {
  if (hasAnswered) {
    return; // If user has already answered, do nothing
  }

  hasAnswered = true; // Set the flag to indicate that the user has answered
  if (selectedSong === correctSong) {
    playSound("/assets/sounds/correct.mp3"); // Play correct sound
    optionElement.style.backgroundColor = "green";
    score += 10; // Add points for correct answer
    displayScore();
  } else {
    playSound("/assets/sounds/incorrect.mp3"); // Play incorrect sound
    optionElement.style.backgroundColor = "red";
    // Display the correct answer in green
    const correctOption = Array.from(optionsContainer.children).find(
      (option) => option.textContent.trim() === correctSong.trim()
    );
    if (correctOption) {
      correctOption.style.backgroundColor = "green";
    }
  }
}

function displayScore() {
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.textContent = score;
  }
}

function playSound(soundPath) {
  const sound = new Audio(soundPath);
  sound.play();
}
function startGame() {
  document.getElementById("startGameBtn").style.display = "none";
  document.getElementById("nextSongBtn").style.display = "inline-block";
  generateOptions(); // Generate options when starting the game
}
