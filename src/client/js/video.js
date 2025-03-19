const video = document.querySelector("video");
const videoContainer = document.querySelector(".videoContainer");
const videoController = document.getElementById("videoControllerBox");
const playBtn = document.getElementById("videoPlay");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const videoVolumeRange = document.getElementById("videoVolume");
const videoPlayTime = document.getElementById("videoPlayTime");
const totalTime = document.getElementById("totalPlayTime");
const currentTime = document.getElementById("currentPlayTime");
const timeBar = document.getElementById("videoPlayTimeBar");


let volumeValue = 0.5;
video.volume = volumeValue;
let mouseMoveTimeout=null;
let mouseLeaveTimeout = null;
const handleVideoPlay = (e)=>{

    if(video.paused){
        video.play();
    }else{
        video.pause();
    }
    playBtnIcon.classList = video.paused?"fas fa-play":"fas fa-pause"
    
}

const handleVideoMute = (e)=>{
    if(video.muted){
        video.muted = false;
    }else{
        video.muted = true;
    }
    
    videoVolumeRange.value  = video.muted?0:volumeValue
    muteBtnIcon.classList = video.muted?"fas fa-volume-xmark":"fas fa-volume-off"

}

const handleVideoVolume = (e)=>{
    video.volume = e.target.value;   
    muteBtnIcon.classList  = video.volume==0? "fas fa-volume-xmark":"fas fa-volume-off"
}

const handleLoadedMetaData =(e)=>{
    totalTime.innerText=formatTime(Math.floor(video.duration));
    timeBar.max = Math.floor(video.duration);
}

const handleTimeUpdate = (e)=>{
    currentTime.innerText = formatTime(e.target.currentTime);
    timeBar.value = Math.floor(e.target.currentTime);
}

const handleTimeBar = (e)=>{
    currentTime.innerText = e.target.value;
    video.currentTime = e.target.value;
}

const handleMouseMove = async(e)=>{
    if(mouseLeaveTimeout){
        clearTimeout(mouseLeaveTimeout);
        mouseLeaveTimeout = null;
    }
    if(mouseMoveTimeout){
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = null;
    }
    videoController.classList.add("show");
    mouseMoveTimeout=setTimeout(hideController,3000);
    
}

const handleMouseLeave = (e)=>{
    mouseLeaveTimeout = setTimeout(hideController,3000);
}

const showController = ()=>{
    videoController.classList.add("show");
}

const hideController = ()=>{
    videoController.classList.remove("show");
}

/**
 * 
 * @param {Number} time
 * @returns hour : minute 로 formatting 된 문자열
 */
const formatTime = (time) =>{
    let hour = Math.floor(time/60);
    let minute = Math.floor(time%60);
    hour = hour.toString().padStart(2,"0");
    minute = minute.toString().padStart(2,"0");
    let formattedTime = `${hour} : ${minute}`;
    return formattedTime;
}


playBtn.addEventListener("click",handleVideoPlay);
muteBtn.addEventListener("click",handleVideoMute);
videoVolumeRange.addEventListener("input",handleVideoVolume)
video.addEventListener("loadeddata",handleLoadedMetaData);
video.addEventListener("timeupdate",handleTimeUpdate);
timeBar.addEventListener("input",handleTimeBar);
// videoController.addEventListener("",handleVideoController);
videoContainer.addEventListener("mousemove",handleMouseMove);
videoContainer.addEventListener("mouseleave",handleMouseLeave);