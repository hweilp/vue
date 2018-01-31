/**
 * Created by fangjiahui on 17/5/15.
 */
// function add() {
//
//   var count = 0;
//
//   var _args = arguments;
//   var length = _args.length;
//
//   var i = 0;
//
//   for (; i < length; i++) {
//     count += _args[i];
//   }
//
//
//
// }

// (function () {
//
//   var count = 0;
//
//   var add = function () {
//
//     var _args = arguments;
//     var length = _args.length;
//
//     var i = 0;
//
//     for (; i < length; i++) {
//
//       count += _args[i];
//     }
//
//     return add
//   }
//
//   add.toString = function () {
//     console.log(count)
//   }
//
//   window.add = window.$ = add
//
// })();

//
// function add() {
//   let _args = [].slice.call(arguments);
//
//   let adder = function () {
//     [].push.apply(_args, [].slice.call(arguments));
//     return adder
//   }
//
//   adder.toString = function () {
//     return _args.reduce.call(_args, function (a, b) {
//       return a + b
//     })
//   }
//
//   adder._join = function ($fn, $sign = '-') {
//     let newArg = _args.map(function (arg, index) {
//       if (index == (_args.length - 1)) {
//         return $fn(arg)
//       } else {
//         return $fn(arg) + $sign
//       }
//     })
//     let result = '';
//     newArg.forEach(function (e, index) {
//       result += newArg[index]
//     })
//
//     return result
//
//   }
//
//   return adder
// }
//
// console.log(add(1)(2)(5)._join(function (element) {
//   return ++element
// }, '---'));
// console.log(add(1));

//
// var currying = function (fn) {
//   let _args = [].slice.call(fn)
//
//   return function () {
//     debugger;
//     fn.apply({}, _args)
//   }
// }
//
//
// var addAll = function () {
// debugger;
//   let _args = [].slice.call(arguments)
//   return _args.reduce(function (a, b) {
//     return a + b
//   })
// }
//
// var sum = currying(addAll)
//
//
// console.log(sum(1, 2, 3, 4))

  //操作函数
var opr = function () {
    let _args = [].slice.call(arguments)
    return _args.reduce(function (a, b) {
      return a + b
    })
  }

var curry = function (fn) {

  function curryOpr() {

    let _args = [].slice.call(arguments); // all the args

    function _curryOpr() {
      [].push.apply(_args, [].slice.call(arguments))
      return _curryOpr
    }


    _curryOpr.valueOf = function () {
      let res = fn.apply(null, _args)
      return res
    }

    return _curryOpr
  }

  return curryOpr
}


//将函数 柯丽华
var curryOpr = curry(opr)

console.log(curryOpr(1, 2, 3) + 10)
console.log(curryOpr(1)(2) + 2)


//1：收集所有参数 2：确认操作函数

// function add(a, b) {
//   return a + b
// }
//
// console.log(add.call({},1,2))
