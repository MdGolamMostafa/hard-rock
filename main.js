var searchResult = document.getElementById('searchResult');
function searchBtn() {      
    var songName = document.getElementById('searchInput').value;
    document.getElementById('searchResult').innerHTML = '';
    document.getElementById('showLyrics').innerHTML = '';

    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(response => response.json())
    .then(apiData => 

{    
    var  songs = apiData.data;

    for (let i = 0; 10 > i; i++) {           

        var song = songs[i];        

            const music = song.preview;
            const title = song.title;
            const artist = song.artist.name;                  
            const picture = song.artist.picture;
            const type = song.type;

            const result = document.getElementById('searchResult');
            result.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
            
            <div class="col-md-2">
                <img class="img-thumbnail" src="${picture}" alt="Cover Picture">
            </div>
            <div class="col-md-6">
                <h3 class="lyrics-name">${title}</h3>
                <p class="author lead">${type} by <span>${artist}</span></p>
                <div class="col-md-1">
                    <audio controls>
                        <source src="${music}" type="audio/mp3">                 
                    </audio>
                </div>
                
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="lyricsBtn('${title}','${artist}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`

    }
})

}

function lyricsBtn(title,artist) {

fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(lyricsApiData => 

    {

        var getLyrics = lyricsApiData.lyrics;
    
        var lyricsDisplay = document.getElementById("showLyrics");
        lyricsDisplay.innerHTML = `
        <button class="btn btn-success" onclick="goBack()"> go back</button>
        <h2 class="text-success mb-4"> ${artist} - ${title}</h2>
        <pre class="lyric text-white">${getLyrics}   
        </pre>
        `;
        var searchResult = document.getElementById('searchResult');
        searchResult.style.display = "none";
    })
    document.getElementById('searchResult').innerHTML = '';

}
/* BACK TO SEARCH RESULT */
function goBack() {
	searchResult.style.display = "block";
	showLyrics.innerHTML = "";
}


