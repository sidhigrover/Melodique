function playAndFetchLyrics(
  trackName,
  artistName,
  albumName,
  duration,
  audioSrc
) {
  // Construct the API call URL with query parameters
  var callUrl = `https://lrclib.net/api/get?track_name=${encodeURIComponent(
    trackName
  )}&artist_name=${encodeURIComponent(
    artistName
  )}&album_name=${encodeURIComponent(albumName)}&duration=${duration}`;

  // Get the audio element and set its source
  var audioElement = document.getElementById("audioElement");
  audioElement.src = audioSrc;

  // Make the API call
  fetch(callUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.code && data.code === 404) {
        console.error("Track not found");
      } else {
        console.log("Lyrics:", data.plainLyrics);
        document.getElementById("lyrics").innerHTML = data.plainLyrics;
        // You can add a call to fetch translations here if needed
        // fetchTranslations(trackName, artistName);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // Play the audio
  audioElement.play();
}

// Example function to fetch translations
// function fetchTranslations(trackName, artistName) {
//   // Implement translation fetching logic here
// }
