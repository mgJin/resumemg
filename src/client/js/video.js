const video = document.getElementById("projectVideo");

const playBtn = document.getElementById("videoPlay");

const handleVideoPlay = (e)=>{
    video.play();
}

playBtn.addEventListener("click",handleVideoPlay);
