function loadSong() {
    let songFile = document.getElementById("songSelect").value;
    document.getElementById("pdfViewer").src = "songs/" + songFile;
}

function filterSongs() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let options = document.getElementById("songSelect").options;

    for (let i = 0; i < options.length; i++) {
        let songName = options[i].text.toLowerCase();
        options[i].style.display = songName.includes(input) ? "block" : "none";
    }
}
