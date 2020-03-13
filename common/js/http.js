import { config, err_ok } from "./config/configApi";


class HTTP {
  request(params) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: config + params.url,
        data: params.data || null,
        header: { 'content-type': 'application/json' },
        method: params.method || 'POST',
        // dataType: 'json',
        // responseType: 'text',
        success: (res) => {
          wx.hideLoading()
          wx.stopPullDownRefresh()
          if (res.statusCode === err_ok) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: () => {
          reject(err)
          wx.hideLoading()
          wx.stopPullDownRefresh()
        },
        // complete: () => {}
      });
    })
  }
}
export { HTTP }