async function searchSong() {
	const trackName = document.getElementById('searchInput').value;
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = `https://api.deezer.com/search?q=track:"${trackName}"`;
	const response = await fetch(apiUrl);
	const data = await response.json();
	console.log(data);
	displaySearchResults(data.data);
}


function displaySearchResults(data) {
	const searchResultsElement = document.getElementById('searchResults');
	searchResultsElement.innerHTML = '';

	data.forEach((track) => {
		const trackElement = document.createElement('div');

		trackElement.id = track.id;
		trackElement.innerHTML = `
		<div class="row">
		<div class="col-md-2">
			<h3>${track.title}</h3>
			<img 
			src="${track.album.cover}"
			style="height: 8rem; width: 8rem; object-fit: cover; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border: 0.35rem solid white;"
			/>
			<p>Album: ${track.album.title}</p>
		</div>
		<div class="col-md-4 my-auto d-flex align-items-center justify-content-center">
        <audio controls>
            <source src="${track.preview}" type="audio/mp3">
            Your browser does not support the audio element.
        </audio>
    </div>
		<div class="col-md-4 d-flex align-items-center">
        <img 
            src="${track.artist.picture}" 
            style="height: 6rem; width: 6rem; object-fit: cover; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border-radius: 50%; border: 0.35rem solid white;" 
        />
        <p class="ml-3">Artist: ${track.artist.name}</p>
    </div>
    <div class="col-md-2 my-auto d-flex align-items-center justify-content-center">
        <button class="btn btn-primary"
		style="height: 3rem; width: 3rem; object-fit: cover; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); border-radius: 50%; border: 0.35rem solid white;"
		onclick="toggleButton(this); addToCollection(${track.id})">+</button>
    </div>
	</div>
	
	`;
		searchResultsElement.appendChild(trackElement);
	});
}

var collection = [];
var idCollection = [];

if(sessionStorage.getItem("Collection") && sessionStorage.getItem("idCollection")){
	collection = JSON.parse(sessionStorage.getItem("Collection"));
	idCollection = JSON.parse(sessionStorage.getItem("idCollection"));
}
console.log(idCollection);
async function addToCollection(trackId) {
	if (!idCollection.includes(trackId)) {
		idCollection.push(trackId);
		window.sessionStorage.setItem("idCollection", JSON.stringify(idCollection));
		try {
			// Fetch detailed information of the track using its ID
			const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
			const trackUrl = `https://api.deezer.com/track/${trackId}`;
			const response = await fetch(trackUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch track data');
			}
			const trackData = await response.json();

			// Add the trackObj instance to the collection
			collection.push(trackData);
			window.sessionStorage.setItem("Collection", JSON.stringify(collection));
			console.log('Song added: ', trackData);
		} catch (error) {
			console.error('Error adding song to collection: ', error);
		}
		console.log('Current collection: ', JSON.parse(sessionStorage.getItem("Collection")));
	} else {
		console.log('song in collection already');
	}
}

function toggleButton(button) {
	button.classList.remove('btn-primary');
	button.classList.add('btn-success');
	button.innerHTML = '✔';
}


