function searchMovie() {
    //kosongkan movie-list setiap refresh
    $('#movie-list').html('');

    $.ajax({
        type : 'GET',
        url : 'http://www.omdbapi.com',
        dataType : 'JSON',
        
        //data yang akan dikirim
        data : {
            'apikey' : '6b010a5a',
            's'      : $('#search-input').val()
        },

        success : function(result) {
            // console.log(result);
            if (result.Response == 'True') {

                let movies = result.Search;
                
                $.each(movies, function(index, data) {
                    $('#movie-list').append('<div class="col-md-4 mb-3"><div class="card"><img src="'+ data.Poster +'"  class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+data.Title+'</h5><p class="card-text">'+data.Year+'</p><h5 class="card-title">'+data.Type+'</h5><a href="#" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-id="'+data.imdbID+'" id="detail">See Detail</a></div></div></div>');
                });

                $('#search-input').val('');

            } else {
                // $('#movie-list').html("<h2 class='text-center'>Movie Not Found</h2>");
                $('#movie-list').html("<div class='col text-center'><h2>Movie Not Found</h2></div>");
            }
        }
    });
}

$('#search-button').on('click', function() {
    searchMovie();
});

$('#search-input').on('keyup', function(event) {
    if (event.keyCode === 13) {
        searchMovie();
    }
    // keyup = apabila tombol keyboar ditekan/dilepas
    // keycode = kode tombol. kode tombol 'enter' adalah 13
});


//event binding / event delegation
//mendapatkan data dari elemen yang tidak ada
$('#movie-list').on('click', '#detail', function() {
    // console.log($(this).data('id'));
    $.ajax({
        type : 'GET',
        url : 'http://www.omdbapi.com',
        dataType : 'json',
        data : {
            'apikey' : '6b010a5a',
            'i'      : $(this).data('id')
        },
        success : function(movie) {
            if (movie.Response === 'True') {
                $('.modal-body').html(`
                        <div class="contrainer-fluid">
                            <div class="row">
                                <div class="col-md-4">
                                    <img src="`+movie.Poster+`" class="img-fluid" alt="">
                                </div>
                                <div class="col-md-8">
                                    <ul class="list-group">
                                      <li class="list-group-item"><h3>Title : `+movie.Title+`</h3></li>
                                      <li class="list-group-item">Release : `+movie.Released+`</li>
                                      <li class="list-group-item">Genre : `+movie.Genre+`</li>
                                      <li class="list-group-item">Director : `+movie.Director+`</li>
                                      <li class="list-group-item">Actor : `+movie.Actors+`</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `);
            }
        }
    });
});