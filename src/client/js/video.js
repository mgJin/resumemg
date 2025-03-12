const video = document.querySelector("video");


const playBtn = document.getElementById("videoPlay");
const muteBtn = document.getElementById("mute");
const videoVolumeRange = document.getElementById("videoVolume");

let volumeValue = 0.5;
video.volume = volumeValue;

const handleVideoPlay = (e)=>{

    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    
}

const handleVideoMute = (e)=>{
    if(video.muted){
        video.muted = false;
    }else{
        video.muted = true;
    }
    
    videoVolumeRange.value  = video.muted?0:volumeValue
}

const handleVideoVolume = (e)=>{
    video.volume = e.target.value;
    
}

playBtn.addEventListener("click",handleVideoPlay);
muteBtn.addEventListener("click",handleVideoMute);
videoVolumeRange.addEventListener("input",handleVideoVolume)
