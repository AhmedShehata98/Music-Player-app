const play = document.querySelector('.play')
const pause = document.querySelector('.pause');
const coverIMG = document.querySelector('.container .main-body .music-picture img');
play.addEventListener('click',()=>{
    pause.style.display='block'
    pause.style.opacity='1'
    play.style.display='none'
    coverIMG.classList.add('active')
    audioPlayerTag.play();
})
pause.addEventListener('click',()=>{
    play.style.display='block'
    pause.style.display='none'
    coverIMG.classList.remove('active')
    audioPlayerTag.pause();
})
// 
// 
// 
let currentSongIndex=0;


const audioPlayerTag = document.querySelector('#playerTag');
const songCover = document.querySelector('.cover');
const seekBar = document.querySelector('#seekbar');
const CurrentTime = document.querySelector('.currentTime');
const songDurtion = document.querySelector('.songDurtion');
const songName = document.querySelector('.songNameH3');
const artistName  = document.querySelector('.aristName');
const prev_btn = document.querySelector('.prev-btn [name="rewind"]');
const play_btn = document.querySelector('.play-btn .play');
const pause_btn = document.querySelector('.play-btn .pause');
const next_btn = document.querySelector('.next-btn [name="fastforward"]');
const volmute_btn = document.querySelector('.volMute');
const volRangeBar = document.querySelector('#volume')
const vol_high_btn = document.querySelector('.volHigh');


//Trigger music setup function
setupMusic(currentSongIndex);


function setupMusic(index){
    // seekbar Set value to 0 
    seekBar.value = 0;
    // Getting songs object array and cache in var
    let song = songs[index];

    // Giving each Element the attribute to it
    songCover.src=`${song.cover}`;
    audioPlayerTag.src=`${song.path}`;
    songName.innerHTML='';
    songName.innerHTML=`${song.SongName}`;
    artistName.innerHTML=``;
    artistName.innerHTML=`${song.artist}`;
    songCover.src=`${song.cover}`;

    // Set Seekbar some informations
    CurrentTime.innerHTML=''
    CurrentTime.innerHTML='00:00'
    setInterval(()=>{
        seekBar.max= audioPlayerTag.duration;
        songDurtion.innerHTML= timeFormat(audioPlayerTag.duration)
    },300)
    
    // if (coverIMG.classList.contains('active')){
    //   let musicIsPlay =  setInterval(() => {
    //         seekBar.value = audioPlayerTag.CurrentTime;
    //     }, 500);
    // }else{
    //     clearInterval(musicIsPlay)
    // }
}

// Creating Function that Convert the input to Min:Sec
function timeFormat(time){
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`
    }

    // Seconds
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`
    }

    return `${min}:${sec}`
}

// 
// Increment The Seekbar and current time values
let setHandel=setInterval(() => {
    seekBar.value = audioPlayerTag.currentTime;
    CurrentTime.innerHTML= timeFormat(audioPlayerTag.currentTime);
    // in music finished Return the play btn to his state
    if(audioPlayerTag.currentTime === audioPlayerTag.duration){
        play.style.display='block'
        pause.style.display='none'
        coverIMG.classList.remove('active')
        
    }

}, 500);
if (audioPlayerTag.currentTime == audioPlayerTag.duration) { 
    clearInterval(setHandel)
}
// 
// Change Music track time
seekBar.addEventListener('change',()=>{
    audioPlayerTag.currentTime = seekBar.value;
})

//  Change the Track
// 
prev_btn.addEventListener('click' ,()=>{
    if (currentSongIndex <= 0) {

        
    }else{
        currentSongIndex--;
        setupMusic(currentSongIndex);
    }
})
next_btn.addEventListener('click' ,()=>{
    if (currentSongIndex >= songs.length -1) {

    }else{
        currentSongIndex++;
        setupMusic(currentSongIndex);
    }
})
    

// 
// volume btn Logic 
volmute_btn.addEventListener('click',()=>{
    audioPlayerTag.volume= 0;
    volRangeBar.value= 0;
    volmute_btn.style.color='#DD4A48'
})
vol_high_btn.addEventListener('click',()=>{
    volmute_btn.style.color='#fff';
    audioPlayerTag.volume = 1;
    volRangeBar.value= 100;

})
volRangeBar.addEventListener('change',()=>{
    audioPlayerTag.volume = volRangeBar.value /100;
})