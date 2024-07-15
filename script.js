$('.search-btn').on('click', function (){
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=47ab8c01&s=' + $('.input-key').val(),
        success: results => {
            const movies = results.Search;
    
            let cards = '';
            movies.forEach(m => {
                cards += allCards(m);
            });
            $('.movies-container').html(cards);
    
            // ketika tombol modal di klik = GET data api
            $('.modal-details').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=47ab8c01&i=' + $(this).data('imdbid'),
                    success: m => {
                        console.log(m);
                        const modalDetails = allModalDetail(m);
    
                        $('.modal-body').html(modalDetails);
                    },
                    error: e => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        error: e => {
            console.log(e.responseText);
        }
    });
});




function allCards (m){
    return  `<div class="col-md-4 my-3">
                <div class="card">
                  <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <button type="button" class="btn btn-primary modal-details" 
                        data-bs-toggle="modal" data-bs-target="#masMovies" data-imdbid="${m.imdbID}">Show Details</button>
                   </div>
                </div>
            </div>`;
}

function allModalDetail (mod){
    return ` <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${mod.Poster}" class="img-fluid">
                </div>

                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${mod.Title}</h4></li>
                        <li class="list-group-item"><Strong>Director :</Strong> ${mod.Director}</li>
                        <li class="list-group-item"><Strong>Released :</Strong> ${mod.Released}</li>
                        <li class="list-group-item"><strong>Actors :</strong> ${mod.Actors}</li>
                        <li class="list-group-item"><strong>Writer :</strong> ${mod.Writer}</li>
                        <li class="list-group-item"><strong>Genre :</strong> ${mod.Genre}</li>
                        <li class="list-group-item"><strong>Runtime :</strong> ${mod.Runtime}</li>
                        <li class="list-group-item"><strong>Plot :</strong> <br> ${mod.Plot}</li>
                      </ul>
                </div>
            </div>
          </div>`

}