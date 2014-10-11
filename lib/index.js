/**
 * Created by think on 2014/9/25.
 */

function Promise() {
    this.sucessFns = [];
    this.errorFns = [];
}

Promise.prototype.then = function (successFn, errFn) {
    var obj = this;
    if (successFn && typeof successFn === 'function') {
        obj.sucessFns.push(successFn);
    }
    if (errFn && typeof errFn === 'function') {
        obj.errorFns.push(errFn);
    }
    return obj;
}

Promise.prototype.success = function (fn) {
    var obj = this;
    obj.sucessFns.push(fn);
    return obj;
}

Promise.prototype.error = function (fn) {
    var obj = this;
    obj.errorFns.push(fn);
    return obj;
}

Promise.prototype.notify = function (nodeback) {
    var obj = this;
    if(nodeback) {
        obj.then(function(value) {
            nodeback(null, value);
        }, function(err) {
            nodeback(err);
        });
    }
}

function Defer() {
    this.promise = new Promise();
}

Defer.prototype.resolve = function (value) {
    var obj = this;
    process.nextTick(execSuccessFn);
    function execSuccessFn(){
        for (var i= 0, ii = obj.promise.sucessFns.length; i < ii; i++) {
            var callback = obj.promise.sucessFns.shift();
            callback(value);
        }
        obj.promise.sucessFns = [];
    }
}

Defer.prototype.reject = function (err) {
    var obj = this;
    process.nextTick(execFailFn);
    function execFailFn() {
        for (var i= 0, ii= obj.promise.errorFns.length; i< ii; i++) {
            var callback = obj.promise.errorFns.shift();
            callback(err);
        }
        obj.promise.errorFns = [];
    }
}

module.exports.Defer = Defer;