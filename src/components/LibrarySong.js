import React from 'react';

const LibrarySong = ({
	song,
	setCurrentSong,
	songs,
	audioRef,
	isPlaying,
	setSongs,
}) => {
	const selectSong = async () => {
		await setCurrentSong(song);
		// add active state
		const newSongs = songs.map((item) => {
			if (item.id === song.id) {
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
		if (isPlaying) audioRef.current.play();
	};
	return (
		<div
			className={`librarySong ${song.active ? 'selected' : ''} `}
			onClick={selectSong}
		>
			<img src={song.cover} alt={song.name} />
			<div className='song-description'>
				<h3>{song.name}</h3>
				<h5>{song.artist}</h5>
			</div>
		</div>
	);
};

export default LibrarySong;
