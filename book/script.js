document.getElementById("songSearch").addEventListener("input", function(event) {
    const songQuery = event.target.value.trim().toLowerCase();
    const songs = [
        { number: "001", name: "A Bárány vére" },
        { number: "002", name: "Adj új szívet" },
        { number: "003", name: "Aki értem megnyíltál" },
        { number: "004", name: "Ahol az élet vize árad" },
        { number: "005", name: "Áldásodd megyünk" },
        { number: "006", name: "Áldd, lelkem, Istened" },
        { number: "007", name: "Áldd meg, édes Istenünk" },
        { number: "008", name: "Áldjad, lelkem, áldjad, életem" },
        { number: "009", name: "Áldjátok az Urat" },
        { number: "010", name: "Áldjon meg téged" },
        { number: "011", name: "Áldott a nap" },
        { number: "012", name: "Áldott az Úr" },
        { number: "013", name: "Áldott légy, Istenem!" },
        { number: "014", name: "Álmokat kergettél" },
        { number: "015", name: "A mélyből Hozzád száll szavam" },
        { number: "016", name: "Üres" },
        { number: "017", name: "Amikor teljes sötétség" },
        { number: "018", name: "Amint vagyok" },
        { number: "019", name: "A nepfelkeltétől" },
        { number: "020", name: "A napkeltétől napnyugtáig" },
        { number: "021", name: "Aranyszárnyú angyal" },
        { number: "022", name: "Átadom magamat" },
        { number: "023", name: "A Te nevedben" },
        { number: "024", name: "Atyám, én imádlak" },
        { number: "025", name: "Atyám, két kezedben" },
        { number: "026", name: "Atyját és az anyját" },
        { number: "27", name: "Az Ő szeretete" },
        { number: "28", name: "Az Úr csodásan működik" },
        { number: "29", name: "Az Úr gondol ránk" },
        { number: "30", name: "Az Úr jósága" },
        { number: "31", name: "Az Úr lejött" },
        { number: "32", name: "Az Úr van itt" },
        { number: "33", name: "Békét ad Ő" },
        { number: "34", name: "Bízom benned, Uram, Jézus" },
        { number: "35", name: "Boldog ember az" },
        { number: "36", name: "Csodálom az Ő útjait" },
        { number: "37", name: "Dicséri, áldja szüntelen" },
        { number: "38", name: "Édes Atyám, Tiéd az ég" },
        { number: "39", name: "Egyedül csak Te vagy" },
        { number: "40", name: "Egymásnak terhét" },
        { number: "41", name: "Egy új nap" },
        { number: "42", name: "Egy új parancsot adok néktek" },
        { number: "43", name: "Éjjel, nappal" },
        { number: "44", name: "El Shaddai" },
        { number: "45", name: "Életem csak kegyelem" },
        { number: "46", name: "Életutam" },
        { number: "47", name: "Elhagytad mennyei hazád" },
        { number: "48", name: "Elmúlik ez a világ" },
        { number: "49", name: "Emberek vagy angyalok nyelvén" },
        { number: "50", name: "Emlékezzél meg" },
        { number: "51", name: "Én Istenem, Benned bízom" },
        { number: "52", name: "Én Istenem! (Mi Atyánk)" },
        { number: "53", name: "Én kiválasztottalak téged" },
        { number: "54", name: "Énekelj az Úrnak" },
        { number: "55", name: "Én Uram, én Istenem" },
        { number: "56", name: "Esdve kérlek, jó Atyám" },
        { number: "57", name: "Este van, imádkozunk" },
        { number: "58", name: "Ez a szó: szeretet" },
        { number: "59", name: "Ez az a nap" },
        { number: "60", name: "Fel, barátim" },
        { number: "61", name: "Felséges vagy, Uram" },
        { number: "62", name: "Formáld a szívünket" },
        { number: "63", name: "Földön és égen" },
        { number: "64", name: "Fönn a csillagok felett" },
        { number: "65", name: "Ha csak hangulat él a szívemben" },
        { number: "66", name: "Hadd énekeljek hű Mesteremről" },
        { number: "67", name: "Hajnalórán lelkem ébred" }
    ];

    if (songQuery) {
        // Simulate searching for the song and updating the circle
        document.getElementById("searchCircle").style.width = "140px";
        document.getElementById("searchCircle").style.height = "140px";
        document.getElementById("searchCircle").style.borderRadius = "17px";

        // Search for the song by number or name
        const matchedSong = songs.find(song => 
            song.number.includes(songQuery) || song.name.toLowerCase().includes(songQuery)
        );

        if (matchedSong) {
            loadSongPDF(matchedSong);
        } else {
            // No song found, load a placeholder PDF
            loadSongPDF({ number: "000", name: "Song Not Found" });
        }
    } else {
        // If input is cleared, reset the circle
        resetCircle();
    }
});

function resetCircle() {
    document.getElementById("searchCircle").style.width = "200px";
    document.getElementById("searchCircle").style.height = "200px";
    document.getElementById("searchCircle").style.borderRadius = "50%";
    document.getElementById("pdfViewer").style.display = "none";
}

function loadSongPDF(song) {
    let pdfURL = `songs/${song.number}.pdf`;

    document.getElementById("pdfViewer").style.display = "block";

    // Load PDF.js and render
    const loadingTask = pdfjsLib.getDocument(pdfURL);
    loadingTask.promise.then(pdf => {
        pdf.getPage(1).then(page => {
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.getElementById("pdfCanvas");
            const context = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    }).catch(error => {
        console.error("Error loading PDF: ", error);
    });
}
