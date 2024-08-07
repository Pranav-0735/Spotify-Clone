console.log("Hello welcome to spotify..");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let mypbar = document.getElementById('pbar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

// function duracion() {
//     totalNumberOfSeconds = Math.floor(audioElement.duration)
//     const hours = parseInt( totalNumberOfSeconds / 3600 );
//     const minutes = parseInt( (totalNumberOfSeconds - (hours * 3600)) / 60 );
//     const seconds = Math.floor((totalNumberOfSeconds - ((hours * 3600) + (minutes * 60))));
//     const result = (minutes < 10 ?  + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
//     console.log(result)
//     return result
// }

// function mmSS(duration, isValueInMinsFormat = false) 
// {
//   if (isValueInMinsFormat) {
//     // Convert minutes to seconds
//     duration *= 60;
//   }

//   // Calculate minutes and seconds
//   const minutes = Math.floor(duration / 60);
//   const seconds = duration % 60;

//   // Format the result as MM:SS
//   return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// }

let songs = [
    {songName: "Legion", filePath: "songs/1.mp3", coversPath: "covers/1.jpg"},
    {songName: "What makes you beautiful", filePath: "songs/2.mp3", coversPath: "covers/2.jpg"},
    {songName: "Song3", filePath: "songs/3.mp3", coversPath: "covers/3.jpg"},
    {songName: "Song4", filePath: "songs/4.mp3", coversPath: "covers/4.jpg"},
    {songName: "Song5", filePath: "songs/5.mp3", coversPath: "covers/5.jpg"},
    {songName: "Song6", filePath: "songs/6.mp3", coversPath: "covers/6.jpg"},
    {songName: "Song7", filePath: "songs/7.mp3", coversPath: "covers/7.jpg"},
    {songName: "Song8", filePath: "songs/8.mp3", coversPath: "covers/8.jpg"},
    {songName: "Song9", filePath: "songs/9.mp3", coversPath: "covers/9.jpg"},
    {songName: "Song10", filePath: "songs/10.mp3", coversPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coversPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("timestamp")[0].innerText = convert
    //  audioElement.src = `songs/${songIndex+1}.mp3`;
    //  element.getElementsByClassName("timestamp")[0].innerText = mmSS(audioElement.duration, 0);
})

    // audioElement.src = 'songs/1.mp3'; 

// audioElement.play();
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    console.log('time_update');
    pg = parseFloat((audioElement.currentTime/audioElement.duration)*100);
    mypbar.value = pg;
})

mypbar.addEventListener('change', ()=>{
    audioElement.currentTime = mypbar.value*audioElement.duration/100; 
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src =  `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0; 
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');    
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    console.log(songIndex);
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src =  `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0; 
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');    
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=9;
    }
    else{
        songIndex -= 1;
    }
    console.log(songIndex);
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src =  `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0; 
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');    
})