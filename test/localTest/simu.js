// let a = {
//   age:12
// };
//
// Object.defineProperty(a,'name',{
//   set:function (value) {
//     console.log(arguments)
//     return 122
//   }
// })
//
// a.name=122
// console.log(a)

//
// var o = {},
//   myName = 'erik';
//
// Object.defineProperty(o, 'name', {
//   set: function(name) {
//     myName = name;
//   },
//   get: function() {
//     return myName;
//   }
// });
//
// o.name=123
// console.log(o.name)

// function defineReactive(object, key, val) {
//   Object.defineProperty(object, key, {
//     set: function (newValue) {
//       val = newValue
//     },
//     get: function () {
//       return val
//     }
//   })
// }
// //
// // var ob = {
// //   name: 'Jiahui'
// // };
// //
// //
// function observe(object) {
//   Object.keys(object).forEach(
//     function (key) {
//       defineReactive(object, key, object[key])
//     }
//   )
// }

//
//
// ob.name = 'fuck'
//
// console.log(ob.name)


var pub1 = {
  channel: '',
  publish: function (Channel) {
    this.channel = Channel
  },
  sendMessage: function (message) {
    this.channel.message = message
  }
}

function Channel() {
  this.subscribers = [];
  this.message = ''
}


Channel.prototype.notify = function (message) {
  this.subscribers.forEach(function (element) {
    element.handler(message)
  })
}

Channel.prototype.addSubscriber = function (subscriber) {
  this.subscribers.push(subscriber)
}


var sub1 = {
  subscribe: function (Channel) {
    Channel.addSubscriber(this)
  },
  handler: function (message) {
    console.log(message)
  }
}
var sub2 = {
  subscribe: function (Channel) {
    Channel.addSubscriber(this)
  },
  handler: function (message) {
    console.log(message)
  }
}


var ch1 = new Channel()


var Message = '';


function defineReactive(channel, key, val) {
  Object.defineProperty(channel, key, {
    set: function (newValue) {
      val = newValue
      this.notify(val)
    },
    get: function () {
      return val
    }
  })
}

defineReactive(ch1, 'message', '');

sub1.subscribe(ch1)
sub2.subscribe(ch1)

pub1.publish(ch1)

pub1.sendMessage('Fuck');


// let Fa = {};
//
// (function (w) {
//
//   let jQuery = function (selector) {
//     this.element = []
//     return new jQuery.fn.init(selector)
//   }
//
//   jQuery.prototype = jQuery.fn = {
//     constructor: jQuery,
//     init: function (selector) {
//       this.element = document.getElementById(selector)
//       return this;
//     },
//     css: function () {
//
//     }
//   }
//
//   w.jQuery = w.$ = jQuery
// })(Fa)
//
// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }
//
// Person.prototype.getName = function () {
//   return this.name
// };
//
//
// function Teacher(name, age, className) {
//   Person.apply(this, [].slice.call(arguments))
//   this.className = className
// }
//
// Teacher.prototype = JSON.parse(JSON.stringify(Person.prototype))
// Teacher.prototype.constructor = Teacher
//
//
// var Jiahui = new Teacher('Jiahui', '18', 'Shuxue')

//
// function F() {
//
// }
// function extend(object) {
//   var target = this
//   for (let i in object) {
//     target[i] = object[i]
//   }
// }
//
// F.extend = extend
//
// F.extend({
//   sayWhat: function () {
//     console.log('what')
//   }
// })
//
// F.sayWhat()
