var video = document.querySelector(".video");
var timer = document.querySelector(".timer");
var btn = document.getElementById("play-pause");
var NextVid = document.getElementById("nextVideo");
const vids = ["../src/videos/1.mp4", "../src/videos/2.mp4", "../src/videos/3.mp4", "../src/videos/4.mp4"];
let vidPlaying = 0;

function togglePlayPause() {
	if (video.paused) {
		btn.className = "pause";
		video.play();
	} else {
		btn.className = "play";
		video.pause();
	}
}

btn.onclick = function () {
	togglePlayPause();
};

video.addEventListener("timeupdate", function () {
	var timerPos = video.currentTime / video.duration;
	timer.style.width = timerPos * 100 + "%";
	if (video.ended) {
		btn.className = "play";
	}
});

function nextVideobtn() {
	if (vidPlaying < 3) {
		vidPlaying++;
	} else {
		vidPlaying = 0;
	}
	video.src = "videos/" + vids[vidPlaying];
}
