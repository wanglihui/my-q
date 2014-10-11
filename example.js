/**
 * Created by YCXJ-wanglihui on 2014/10/11.
 */
'use strict';

var Defer = require('./lib').Defer;

function addOne(value) {
    var defer = new Defer();
    if (/^\d$/.test(value)){
        defer.resolve(value+1);
    } else {
        var err = new Error("value must be number!");
        defer.reject(err);
    }
    return defer.promise;
}

//接收成功消息
addOne(1).success(function(result) {
    console.info(result);
});

//接收失败消息
addOne('12').error(function(result) {
    console.info(result);
})

//同时接收错误和成功消息
addOne(12)
    .success(function(result){
        console.info(result);
    })
    .error(function(err){
        console.info(err);
    });
//或者
addOne('21')
    .then(function(result){
        console.info(result);
    },function(err){
        console.info(err);
    });

//串联操作
//step1(2).success(function(result1){
//      step2(result1).success(function(result2){
//          console.info(result2);
//      }
// })
addOne(2).success(addOne).success(addOne).success(function(result){
    console.info(result);
});

//兼容nodejs callback形式
function test(value, callback) {
    var defer = new Defer();
    if (/^\d$/.test(value)){
        defer.resolve(value+1);
    } else {
        var err = new Error("value must be number!");
        defer.reject(err);
    }
    return defer.promise.notify(callback);
}
test(2, function(err, result) {
    if (err) {
        console.info("err");
    } else {
        console.info(result);
    }
});
