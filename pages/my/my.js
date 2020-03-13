// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData: [
      {
        id: 1,
        icon: '/common/images/my/my_Release.png',
        title: '我发布的'
      },
      {
        id: 2,
        icon: '/common/images/my/my_news.png',
        title: '我的消息'
      },
      {
        id: 3,
        icon: '/common/images/my/my_collection.png',
        title: '我的收藏'
      }
    ],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onLogin() {
    app.common.common.verifiLogin(() => {
      this.setData({
        userInfo: app.common.common.getUserinfo()
      })
    })
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
    this._isUserInfo()
  },
  // 判断用户是否登录
  _isUserInfo() {
    const userInfo = this.data.userInfo
    if (!userInfo.username) {
      this.setData({
        userInfo: app.common.common.getUserinfo()
      })
    }
  },
  onToNav(e) {
    const index = e.currentTarget.dataset.index
    switch (index) {
      case 0:
        app.common.route.navigateTo({
          url: app.route.petMyRelease
        }, true)
        break;
      case 1:
        app.common.route.switchTab({
          url: app.route.news
        }, true)
        break;
      case 2:
        app.common.route.navigateTo({
          url: app.route.petCollection
        }, true)
        break;
    }
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