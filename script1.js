 console.log("Welcome to Connect");

//initialze the Variables
let songIndex = 0;
let audioElement = new Audio('songs/s1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Chitti", filePath: "songs/s1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "On My Way", filePath: "songs/s2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "My Dilemma", filePath: "songs/s3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Believer", filePath: "songs/s4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Kallo Kooda", filePath: "songs/s5.mp3", coverPath: "covers/cover5.jpg"}
]

songItems.forEach((element,i) =>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
})
  

// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
 
 // Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
  }

  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=> {
    element.addEventListener('click', (e)=>{
    makeAllPlays();
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.currentTime = 0;
    audioElement.play();

  })
  });



