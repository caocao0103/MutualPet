import { HTTP } from '../http'
import { params } from '../config/params'
class Login extends HTTP {
  // 传入code码
  getSessionKey(data) {
    return this.request({
      url: params.getSessionKey,
      data
    })
  }
  // 登录
  setPetLogin(data) {
    return this.request({
      url: params.petLogin,
      data
    })
  }
  // 发送验证码
  getSendSms(telnum) {
    return this.request({
      url: params.sendSms,
      data: {
        mobile: telnum
      }
    })
  }
}
export { Login }