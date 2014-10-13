/**
 * Created by YCXJ-wanglihui on 2014/10/11.
 */
'use strict';

var Defer = require('./lib').Defer;

//function addOne(value) {
//    var defer = new Defer();
//    if (/^\d$/.test(value)){
//        defer.resolve(value+1);
//    } else {
//        var err = new Error("value must be number!");
//        defer.reject(err);
//    }
//    return defer.promise;
//}
//
////接收成功消息
//addOne(1).success(function(result) {
//    console.info(result);
//});
//
////接收失败消息
//addOne('12').error(function(result) {
//    console.info(result);
//})
//
////同时接收错误和成功消息
//addOne(12)
//    .success(function(result){
//        console.info(result);
//    })
//    .error(function(err){
//        console.info(err);
//    });
////或者
//addOne('21')
//    .then(function(result){
//        console.info(result);
//    },function(err){
//        console.info(err);
//    });

//串联操作
//step1(2).success(function(result1){
//      step2(result1).success(function(result2){
//          console.info(result2);
//      }
// })
//addOne(2).success(addOne).success(addOne).success(function(result){
//    console.info(result);
//});
//
//
//addOne(2).success(addOne).success(addOne).success(function(result){
//    console.info("test 串联操作========");
//    console.info(result);
//    console.info("======================");
//});
//
//addOne(2).success(function(value1) {
//    addOne(value1).success(function(value2) {
//        addOne(value2).success(function(result) {
//            console.info("++++++++++++++++++++++");
//            console.info(result);
//            console.info("+++++++++++++++++++++++");
//        })
//    })
//})
////兼容nodejs callback形式
//function test(value, callback) {
//    var defer = new Defer();
//    if (/^\d$/.test(value)){
//        defer.resolve(value+1);
//    } else {
//        var err = new Error("value must be number!");
//        defer.reject(err);
//    }
//    return defer.promise.notify(callback);
//}
//test(2, function(err, result) {
//    if (err) {
//        console.info("err");
//    } else {
//        console.info(result);
//    }
//});

//promiseFn
//将普通回调函数转换成promise-defer模式
var promiseFn = require("./lib").promiseFn;
function testCallBack(value, cb) {
    cb(null, value);
}

var myCb = promiseFn(testCallBack);

var x = myCb(1000).success(function(result) {
    console.info("///promiseFn success")
    console.info(result);
}).error(function(err) {
    console.info("///promiseFn error");
    console.info(err);
});

var myCb2 = promiseFn(testCallBackMutiArgs);
function testCallBackMutiArgs(value1, value2, value3, cb) {
    cb(null, value1+value2+value3);
}

myCb2(2,3,4).success(function(result) {
    console.info(result);
})