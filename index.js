
function displayCollection(){ 
    var catalogue = JSON.parse(sessionStorage.getItem("Collection"))
    if(!catalogue){
        var text = document.createElement("h3");
        text.setAttribute("style", "text-align: center;")
        text.innerText = "No Music! Go to the Search tab to add music to your collection."
        document.getElementById("main").appendChild(text);
	}
    else{
        for(var i = 0; i < catalogue.length; i++){
            var title = catalogue[i].title;
            var artist = catalogue[i].artist.name;
            var cover = catalogue[i].album.cover_medium;
            var preview = catalogue[i].preview;
            createCards(cover, artist, title, preview);
        }
	}
}

function createCards(cover, artist, title, preview){
    var divCard = document.createElement("div");
    divCard.setAttribute("class", "col");
    
    var img = document.createElement('img');
    img.setAttribute("src", cover);
    img.setAttribute("class", "card-img-top");

    divCard.append(img);

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    var cardText = document.createElement("p");
    cardText.setAttribute("class","card-text");
    cardText.innerText = artist;

    var cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class","card-title");
    cardTitle.innerText = title;

    var audio = document.createElement("audio");
    audio.setAttribute("controls", "controls");
    audio.setAttribute("class", "w-100");

    var source = document.createElement("source");
    source.setAttribute("src", preview);
    source.setAttribute("type", "audio/mp3");

    audio.append(source);
  
    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(audio);
    

    divCard.append(cardBody);

    document.getElementById("catalogueCards").appendChild(divCard); 
    console.log(divCard)
  }

