/**
 * Created by YCXJ-wanglihui on 2014/10/11.
 */
'use strict';

var Defer = require("./lib").Defer;
var promiseFn = require("./lib").promiseFn;
var assert = require("assert");

describe("./lib/defer.js", function(){
    function test(value) {
        var defer = new Defer();
        if (value > 1) {
            defer.resolve(value+1);
        } else {
            var err = new Error("value should than 1");
            defer.reject(err);
        }
        return defer.promise;
    }

    describe("Defer", function(){
        it("#resolve() should be ok", function(done){
            test(2)
                .success(function(result) {
                    console.info("resolve pass...");
                    assert.equal(result, 3);
                    done();
                });
        });

        it("#reject() should be ok", function(done) {
            test(1).error(function(err) {
                if (err instanceof Error) {
                    done();
                }
            });
        });
    });
});

describe("./lib/index.js", function(){
   describe("#promiseFn", function(){
       it("should be ok", function(done) {
           function testOneArg(value, callback){
               callback(null, value);
           }
           var fn = promiseFn(testOneArg);
           fn(3).success(function(result) {
               assert.equal(3, result);
               done();
           });
       });

       it("should be ok", function(done) {
           function testMutiArgs(value1, value2, value3, callback) {
               callback(null, value1+value2+value3);
           }
           var fn = promiseFn(testMutiArgs);
           fn(1,2,3).success(function(result) {
               assert.equal(6, result);
               done();
           });
       })
   })
});