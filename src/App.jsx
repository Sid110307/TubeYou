import React from "react";
import "./App.scss";

import video1 from "./videos/1.mp4";
import video2 from "./videos/2.mp4";
import video3 from "./videos/3.mp4";
import video4 from "./videos/4.mp4";

function App() {
	const videos = [video1, video2, video3, video4];
	const [video, setVideo] = React.useState(videos[0]);

	const videoRef = React.useRef(null);
	const timerRef = React.useRef(null);
	const [videoPlaying, setVideoPlaying] = React.useState(false);

	const playPause = () => {
		if (videoPlaying) {
			videoRef.current.pause();
			setVideoPlaying(false);
		} else {
			videoRef.current.play();
			setVideoPlaying(true);
		}
	};

	const nextVideo = () => {
		const currentVideoIndex = videos.indexOf(video);
		const nextVideoIndex = currentVideoIndex + 1;
		const nextVideo = videos[nextVideoIndex];

		if (nextVideo) {
			setVideo(nextVideo);
			videoRef.current.play();
			timerRef.current.style.width = "0%";
			setVideoPlaying(false);
		}
	};

	const prevVideo = () => {
		const currentVideoIndex = videos.indexOf(video);
		const prevVideoIndex = currentVideoIndex - 1;
		const prevVideo = videos[prevVideoIndex];

		if (prevVideo) {
			setVideo(prevVideo);
			videoRef.current.play();
			timerRef.current.style.width = "0%";
			setVideoPlaying(false);
		}
	};

	React.useEffect(() => {
		videoRef.current.addEventListener("timeupdate", () => {
			timerRef.current.style.width = `${(videoRef.current.currentTime / videoRef.current.duration) * 100}%`;
		});
	}, []);
	React.useEffect(() => {
		videoRef.current.ended && setVideoPlaying(false);
	}, [video]);

	return (
		<div className="container">
			<div className="video-wrapper">
				<video src={video} className="video" ref={videoRef} />
				<div className="controls">
					<div className="bar">
						<div className="timer" ref={timerRef} />
					</div>
					<div className="buttons">
						<button id="prev-video" onClick={prevVideo} disabled={video === videos[0]} />
						<button id="play-pause" onClick={playPause} className={videoPlaying ? "pause" : "play"} />
						<button id="next-video" onClick={nextVideo} disabled={video === videos[videos.length - 1]} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
