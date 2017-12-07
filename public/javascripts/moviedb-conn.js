const API_KEY = '76390e37292e31aa4b2f0f32cb375f2c';

function getMovieDb() {
    const https = require('https');
    let database = [];
    var index = 0;
    https.get('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY +'&language=en-US&page=1', (resp) => {
        
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var object = JSON.parse(data);
            
            for (result in object.results) {
                database[index] = {
                    title : object.results[result].title,
                    poster_path : object.results[result].poster_path,
                    overview : object.results[result].overview
                };
                index += 1;
            }
            console.log(database);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    
    https.get('https://api.themoviedb.org/3/tv/popular?api_key=' + API_KEY +'&language=en-US&page=1', (resp) => {
        
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var object = JSON.parse(data);
            for (result in object.results) {
                database[index] = {
                    title : object.results[result].name,
                    poster_path : object.results[result].poster_path,
                    overview : object.results[result].overview
                };
                index += 1;
            }
            console.log(database);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
    return database;
}