var expect = require("chai").expect; 
//var sinon = require("sinon");
//var api = require("../app");

const API_KEY = '76390e37292e31aa4b2f0f32cb375f2c';
var database = [];

var returnvar1 = false;
var returnvar2 = false;

describe("The movie DB api call", function() {
    var data = getMovieDb();
    
    it("should return not null", function(done) {
        
        expect(data).to.not.be.a('null');
        done();
    }); 
    
    
    
    
    
});




function getMovieDb() {
    const https = require('https');
    var index = 0;
    https.get('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=en-US&page=1', (resp) => {

        var data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var object = JSON.parse(data);

            for (result in object.results) {
                //console.log(typeof(object.results[result].backdrop_path));
                //console.log(!(object.results[result].backdrop_path == null));
                if (!(object.results[result].poster_path == null) && !(object.results[result].backdrop_path == null)
                    && !(object.results[result].title == null)
                    && !(object.results[result].overview == null)) {
                    database[index] = {
                        title: object.results[result].title,
                        poster_path: object.results[result].poster_path,
                        backdrop: object.results[result].backdrop_path,
                        overview: object.results[result].overview
                    };
                    index += 1;
                }
            }
            returnvar1 = true;
            if (returnvar2 && returnvar1) {
                //app.locals.database = database;
                return database;
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        returnvar1 = true;
    });

    https.get('https://api.themoviedb.org/3/tv/popular?api_key=' + API_KEY + '&language=en-US&page=1', (resp) => {

        var data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            var object = JSON.parse(data);

            for (result in object.results) {
                //console.log(typeof(object.results[result].backdrop_path));
                //console.log(!(object.results[result].backdrop_path == null));
                if (!(object.results[result].poster_path == null) && !(object.results[result].backdrop_path == null)) {
                    database[index] = {
                        title: object.results[result].name,
                        poster_path: object.results[result].poster_path,
                        backdrop: object.results[result].backdrop_path,
                        overview: object.results[result].overview
                    };
                    index += 1;
                }
            }
            returnvar2 = true;
            if (returnvar2 && returnvar1) {
                //app.locals.database = database;
                //app.locals.fish = 'salmon'
                //console.log(database);
                return database;
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        returnvar2 = true;
    });
    console.log(returnvar1, returnvar2);

}
