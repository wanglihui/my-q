var Defer = require("./defer").Defer;

//将回调函数转换成promise-defer模式
exports.promiseFn = function(fn) {
    return function(){
        var defer = new Defer();
        var args = Array.prototype.slice.call(arguments);
        args.push(done);
        fn.apply(this, args);

        function done(err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        }
        return defer.promise;
    }
}

module.exports.Defer = Defer;