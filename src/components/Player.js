import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faBookReader,
	faPause,
} from '@fortawesome/free-solid-svg-icons';

export const Player = ({
	currentSong,
	useIsPlaying,
	isPlaying,
	audioRef,
	setSongInfo,
	songInfo,
	songs,
	setCurrentSong,
	setSongs,
}) => {
	// update active state
	const activeLibrary = (nextprev) => {
		const newSongs = songs.map((item) => {
			if (item.id === nextprev.id) {
				return {
					...item,
					active: true,
				};
			} else {
				return {
					...item,
					active: false,
				};
			}
		});
		setSongs(newSongs);
	};

	// event handlers
	const playSong = () => {
		if (isPlaying) {
			audioRef.current.pause();
			useIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			useIsPlaying(!isPlaying);
		}
	};

	// dragHandler
	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	// formate the time
	const formatTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};

	// skip track forward /backward
	const skipTrack = async (direction) => {
		let currentIndex = songs.findIndex((item) => item.id === currentSong.id);
		if (direction === 'skip-back') {
			if ((currentIndex - 1) % songs.length === -1) {
				await setCurrentSong(songs[songs.length - 1]);
				activeLibrary(songs[songs.length - 1]);
				if (isPlaying) audioRef.current.play();
				return;
			}
			await setCurrentSong(songs[currentIndex - 1]);
		} else if (direction === 'skip-forward') {
			await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
			activeLibrary(songs[(currentIndex + 1) % songs.length]);
		}
		if (isPlaying) audioRef.current.play();
	};

	return (
		<div className='player'>
			<div className='time-control'>
				<p>{formatTime(songInfo.currentTime)}</p>
				<input
					type='range'
					min={0}
					max={songInfo.duration || 0}
					value={songInfo.currentTime}
					onChange={dragHandler}
				/>
				<p>{songInfo.duration ? formatTime(songInfo.duration) : '0:00'}</p>
			</div>
			<div className='play-control'>
				<FontAwesomeIcon
					className='previous'
					size='2x'
					icon={faAngleLeft}
					onClick={() => skipTrack('skip-back')}
				/>
				<FontAwesomeIcon
					className='play'
					onClick={playSong}
					size='2x'
					icon={isPlaying ? faPause : faPlay}
				/>
				<FontAwesomeIcon
					className='next'
					size='2x'
					icon={faAngleRight}
					onClick={() => skipTrack('skip-forward')}
				/>
			</div>
		</div>
	);
};
