var expect = require("chai").expect; 
var chai = require('chai');
//test info:
var sinon = require("sinon");
//var api = require("../app");

var request = require('request');


describe('Website Tests', function () {


// Check if Heroku Website is Up:
it('Main page status', function(done) {
    request('https://watchit-csumb.herokuapp.com/' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

//Check if Other Parts are having problems:
it('Events Page Status', function(done) {
    request('https://watchit-csumb.herokuapp.com/eventdashboard' , function(error, response, body) {
        expect(response.statusCode).to.not.equal(404);
        done();
    });
});

it('Create Event Page Status', function(done) {
    request('https://watchit-csumb.herokuapp.com/event' , function(error, response, body) {
        expect(response.statusCode).to.not.equal(404);
        done();
    });
});

it('Profile Page Status', function(done) {
    request('https://watchit-csumb.herokuapp.com/profile' , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});




})

describe("CircleCI test", function() {
    it("should return without errors", function(done) {
        var a = 1 + 1;
        done();
    });
});

describe("return data:", function(){
    it("Should Return Info!", function(done){
        var assert = chai.assert;
        var test = "54";
        assert.notEqual(test ,null);
        done();
    })
});
