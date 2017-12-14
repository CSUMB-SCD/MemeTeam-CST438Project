var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var http = require("http").Server(app)

var index = require('./routes/index');
var profile = require('./routes/profile');
var users = require('./routes/users');
var chat = require('./routes/chat');
var event = require('./routes/event');
var events = require('./routes/events');
var eventdashboard = require('./routes/eventdashboard');


//app.locals.port = 3001;
//const index = require('./routes/index');
//app.use('*', index);
// app.listen(app.locals.port, function() {
//     console.log('Server listening on ' + app.locals.port);
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/event', event);
app.use('/messages', chat);
app.use('/profile', profile);
app.use('/events', events);
app.use('/eventdashboard', eventdashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


const API_KEY = '76390e37292e31aa4b2f0f32cb375f2c';
var database = [];

var returnvar1 = false;
var returnvar2 = false;

function getMovieDb() {
    const https = require('https');
    var index = 0;
    https.get('https://api.themoviedb.org/3/movie/popular?api_key=' + API_KEY + '&language=en-US&page=1', (resp) => {

        let data = '';
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
                app.locals.database = database;
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        returnvar1 = true;
    });

    https.get('https://api.themoviedb.org/3/tv/popular?api_key=' + API_KEY + '&language=en-US&page=1', (resp) => {

        let data = '';
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
                app.locals.database = database;
                app.locals.fish = 'salmon'
                //console.log(database);
            }
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
        returnvar2 = true;
    });
    console.log(returnvar1, returnvar2);

}
getMovieDb();


module.exports = app;

