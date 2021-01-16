import React, { useState, useRef } from 'react';
// import styles
import './styles/app.scss';
// import components
import Song from './components/Song';
import { Library } from './components/Library';
import { Player } from './components/Player';
import data from './data';
import { Nav } from './components/Nav';

function App() {
	// ref
	const audioRef = useRef(null);
	// State
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, useIsPlaying] = useState(false);
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
	const [libraryStatus, setLibraryStatus] = useState(false);

	// update time
	const timeUpdate = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({
			...songInfo,
			currentTime,
			duration,
		});
	};

	// songEnded
	const songEnded = async () => {
		let currentIndex = songs.findIndex((item) => item.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	};

	return (
		<div className={`App ${libraryStatus ? 'library-active' : ''}`}>
			<Nav setLibraryStatus={setLibraryStatus} libraryStatus={libraryStatus} />
			<Song currentSong={currentSong} />
			<Player
				audioRef={audioRef}
				currentSong={currentSong}
				isPlaying={isPlaying}
				useIsPlaying={useIsPlaying}
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				songs={songs}
				setCurrentSong={setCurrentSong}
				setSongs={setSongs}
			/>
			<Library
				songs={songs}
				setCurrentSong={setCurrentSong}
				audioRef={audioRef}
				isPlaying={isPlaying}
				setSongs={setSongs}
				libraryStatus={libraryStatus}
			/>
			<audio
				ref={audioRef}
				onLoadedMetadata={timeUpdate}
				onTimeUpdate={timeUpdate}
				src={currentSong.audio}
				onEnded={songEnded}
			></audio>
		</div>
	);
}

export default App;
