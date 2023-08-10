console.log("Welcome to Connect");

//initialze the Variables
let songIndex = 0;
let audioElement = new Audio('songs/s1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let isDragging = false; // Flag to track dragging state
let seekTimeout; // Timeout for debouncing the seek operation
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Chitti", filePath: "songs/s1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "On My Way", filePath: "songs/s2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "My Dilemma", filePath: "songs/s3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Believer", filePath: "songs/s4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Kallo Kooda", filePath: "songs/s5.mp3", coverPath: "covers/cover5.jpg"}
];

songItems.forEach((element,i) =>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
})

// Function to update the audio's current time during dragging
function seekAudio() {
    const seekTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
  }

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
  });
  
//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        makeAllPlays();
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

 // Listen to seek bar changes (input event)
 myProgressBar.addEventListener('input', () => {
    if (!isDragging) {
      // Update the progress bar without seeking immediately
      const progress = myProgressBar.value;
      audioElement.currentTime = (progress / 100) * audioElement.duration;
    }
    // Debounce the seek operation to avoid excessive updates
    clearTimeout(seekTimeout);
    seekTimeout = setTimeout(seekAudio, 300); // 300ms debounce time (adjust as needed)
  });

   // Add event listeners for drag start and end
   myProgressBar.addEventListener('mousedown', () => {
    isDragging = true;
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      seekAudio(); // Perform the final seek when dragging ends
    }
  });

   const makeAllPlays = ()=>{
   Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
   element.classList.remove('fa-pause-circle');
   element.classList.add('fa-play-circle');
     })
   }

  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click', (e)=>{
      // Check if the clicked song is already playing
    const isPlaying = e.target.classList.contains('fa-pause-circle');
   
    // Pause the song if it is currently playing
    if (isPlaying) {
      audioElement.pause();
      e.target.classList.remove('fa-pause-circle');
      e.target.classList.add('fa-play-circle');
      gif.style.opacity = 0;
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
    }
    else  {
      makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); 
    }
  })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

