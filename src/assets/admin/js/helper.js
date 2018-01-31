/**
 * Created by fangjiahui on 17/4/18.
 */

let Nav = {
  back: (router, num = -1) => {
    router.go(num)
  },
  refesh: (router, num = 0) => {
    router.go(num)
  }
}

let FG = {
  //对象变量赋值，非直接挂载对象，如果force == true 强制生成新属性
  //force为true时，如果要用$set必须传递$vm对象
  setValueToObject: function (target, resource, force, $vm = '') {
    if (!force) {
      for (let i in target) {
        if (resource.hasOwnProperty(i)) {
          if (resource[i] instanceof Object) {
            FG.setValueToObject(target[i], resource[i], false)
          } else {
            target[i] = resource[i]
          }
        }
      }
    } else {
      for (let i in resource) {
        if (resource[i] instanceof Object) {
          $vm.$set(target, i, {})
          FG.setValueToObject(target[i], resource[i], true, $vm)
        } else {
          $vm.$set(target, i, resource[i])
        }
      }
    }
  },

  //路由参数赋值
  setParams: function (string, object) {
    if(object.classStr){
      string = string.replace('classString', object.classStr)
    }

    for (let i in object) {
      string = string.replace('{' + i + '}', object[i])
    }
    return string
  },

  //日期时间格式转换
  formatDate:function (date,string) {
    let str = string ? string : "-"
    date = new Date(date);
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    let d = date.getDate();
    m = m < 10 ? ("0" + m) : m;
    d = d < 10 ? ("0" + d) : d;
    return y + str + m + str + d;
  },
  // 错误函数
  error:function (error) {
    // this.$message.error(error.body.resultMessage)
  }

}



const FG_CONFIG = {
  host: 'http://192.1.17.24:8080'
}



export default {
  FG,
  Nav,
  FG_CONFIG,
}
