function library(query, id) {
    let contArtist = document.getElementById(`${id}`)
    let displaySection = document.querySelector(`#${query}`)


    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => {

            let artist = data.data
            console.log(artist);
            displaySection.classList.remove("d-none")
            for (let i = 0; i < artist.slice(0, 4).length; i++) {
                let element = artist[i]
                contArtist.innerHTML += `   
                <div class="col">
                    <div class="card">
                        <img src="${element.album.cover_medium}" class="card-img-top" alt="...">
                        <div class="card-body info">
                            <h5 class="card-title">${element.artist.name}</h5>
                            <button type="button" class="btn btn-secondary" onclick="modal('${element.album.id}')" data-bs-toggle="modal" data-bs-target="#albumModal">
                                ${element.album.title}
                            </button>
                        </div>
                    </div>
                </div>
                `
            }

        })
        .catch((error) => {
            console.log(error);
   
        })
        

}


let Btn = document.getElementById('button-search')
Btn.addEventListener('click', function () {
    let displayRes = document.getElementById('searchSection')
    let displayResBlock = document.getElementById('searchResults')
    let Sinput = document.getElementById('searchField')
    let search = Sinput.value
    search = search.toLowerCase()
    displayResBlock.classList.remove("d-none")

    displayRes.innerHTML = ''

    function offDisplay(id) {
        let displaynone = document.getElementById(id);
        displaynone.classList.add("d-none");
    }

    offDisplay("eminem");
    offDisplay("metallica");
    offDisplay("queen");

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${search}`)
        .then((response) => response.json())
        .then((data) => {

            let output = data.data
            for (let i = 0; i < output.length; i++) {

                let element = output[i]
                console.log(element);
                displayRes.innerHTML += `
                <div class="col">
                    <div class="card">
                        <img src="${element.album.cover_medium}" class="card-img-top" alt="...">
                        <div class="card-body info">
                            <h5 class="card-title">${element.artist.name}</h5>
                            <button type="button" class="btn btn-secondary" onclick="modal('${element.album.id}')" data-bs-toggle="modal" data-bs-target="#albumModal">
                                ${element.album.title}
                            </button>
                        </div>
                    </div>
                </div>
                `
            }
        })
        .catch((error) => {
            console.log(error);
        })

})


function modal(albumId) {    

    
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
        .then((response) => response.json())
        .then((album) => {
            
            let modal = document.getElementById('modalContent');
            modal.innerHTML = `<div class="modal-header flex-column">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                <h5 class="modal-title" id="modalTitle">${album.title}</h5>
                                <div class="row">
                                    <div class="col-md-4">
                                        <img src="${album.cover_medium}" class="img-fluid" alt="${album.title}">
                                    </div>
                                    <div class="col-md-8">
                                        <h5>Artista: ${album.artist.name}</h5>
                                        <p>Data di uscita: ${album.release_date}</p>
                                        <p>Numero di tracce: ${album.nb_tracks}</p>
                                    </div>
                                </div>
                                
                            </div>`;
        })
        .catch(error => {
            console.error('Error fetching album:', error);
        });
}




library("eminem", "eminemSection")
library("metallica", "metallicaSection")
library("queen", "queenSection")