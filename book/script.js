function loadSong() {
    let songFile = document.getElementById("songSelect").value;
    let pdfUrl = "songs/" + songFile;
    let pdfViewer = document.getElementById("pdfViewer");

    if (window.innerWidth <= 768) { 
        // Mobile: Open in new tab
        window.open(pdfUrl, "_blank");
    } else {
        // Desktop: Show in iframe
        pdfViewer.src = pdfUrl;
    }
}
function filterSongs() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let options = document.getElementById("songSelect").options;

    for (let i = 0; i < options.length; i++) {
        let songName = options[i].text.toLowerCase();
        options[i].style.display = songName.includes(input) ? "block" : "none";
    }
}
