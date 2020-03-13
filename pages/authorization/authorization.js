// pages/authorization/authorization.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //微信授权
  bindGetUserInfo(e) {
    if (e.detail.userInfo) { //是否授权
      app.userInfo = e.detail.userInfo
      // 获取code码
      wx.login({
        timeout: 10000,
        success: (res) => {
          this._getSessionKey(res.code)
        }
      });
    } else {
      console.log('用户没有授权')
    }
  },
  // code码换取openid
  _getSessionKey(code) {
    const paramsObj = {
      code: code,
      channel: 1,
      platfrom: 2,
    }
    app.api.login.getSessionKey(paramsObj)
      .then(res => {
        console.log(res)
        if (res.code === 0) {
          const data = res.data
          wx.setStorageSync('openid', data.openid)
          app.common.route.redirectTo({
            url: app.route.login
          })
        }
      })
  },
  // 暂不授权
  onBackBtn() {
    app.common.route.navigateBack(1)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})