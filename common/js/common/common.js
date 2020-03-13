import { url } from '../config/routes'
class Common {
  // 验证登录+
  verifiLogin(callback) {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo == '') {
      wx.navigateTo({
        url: url.authorization
      });
    } else {
      callback()
    }
  }

  /** 格式化路径加参数
   * url:路径
   * param：参数对象
  */
  getParam(url, param) {
    let paramStr = ''
    let u = url.indexOf('?') > -1 ? '' : url + '?'
    for (let k in param) {
      if (param[k] !== undefined) {
        paramStr += paramStr.length > 0 ? `&${k}=${param[k]}` : `${k}=${param[k]}`
      }
    }
    return u + paramStr
  }
  // 获取用户信息
  getUserinfo() {
    return wx.getStorageSync('userInfo')
  }
}
export { Common }