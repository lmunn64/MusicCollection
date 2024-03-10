async function searchSong() {
	const response = await fetch(
		`https://api.deezer.com/search?limit=1&q=track:"shapeofyou"`
	);

	const data = await response.json();

	console.log(data);
}

searchSong();
