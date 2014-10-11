/**
 * Created by YCXJ-wanglihui on 2014/10/11.
 */
'use strict';

var Defer = require("./lib").Defer;
var assert = require("assert");

describe("lib/index.js", function(){
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