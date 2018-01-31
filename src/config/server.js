import Env from './env.js'

let Servers = {
  Merchant: {
    BackEnd: {
      http: Env.merchantServerHttp || 'http://',
      host: Env.merchantServerHost || '192.1.17.77',
      port: Env.merchantServerPort || '8099',
      remoteAddr: function () {
        return process.env.MERCHANT_SERVER_ADDR || (this.http + this.host + (this.port ? ':' + this.port : ''))
      }
    }
  },
  ImgUpload:{
    BackEnd: {
      http: Env.imgUploadServerHttp || 'http://',
      host: Env.imgUploadServerHost || '192.1.17.24',
      port: Env.imgUploadServerPort || '8083',
      remoteAddr: function () {
        return process.env.IMAGE_SERVER_ADDR || (this.http + this.host + (this.port ? ':' + this.port : ''))
      }
    }
  },
  PlatformManage: {
    BackEnd: {
      http: Env.platformManageServerHttp || 'http://',
      host: Env.platformManageServerHost || '192.1.17.24',
      port: Env.platformManageServerPort || '8082',
      remoteAddr: function () {
        return this.http + this.host + (this.port ? ':' + this.port : '')
      }
    }
  }

}

export default Servers
