// pages/news/news.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petsinformation:[], // 宠物消息列表
    pet_login:false, //是否显示登陆按钮  默认不显示
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
    if (app.common.common.getUserinfo() == '' || app.common.common.getUserinfo() == null){
      this.setData({
        pet_login: true
      })
    }else{
      this._petsinformation()
      this.setData({
        pet_login: false
      })
    }
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

  },
 //获取消息列表
  _petsinformation() {

    const obj = {
      pet_uid: app.common.common.getUserinfo().id,
      page: 1,
      list_rows: 99,
    }
    app.api.pets.petsinformation(obj)
      .then(res => {
        if (res.code === 0) {
          console.log(res)
          this.setData({
            petsinformation: res.data.data
          })
        }
      })
  },
  navinformation(e){
    console.log(e.currentTarget.dataset.index)
    var pageData = this.data
    var i = e.currentTarget.dataset.index
    if (pageData.petsinformation[i].to_pet_uid == app.common.common.getUserinfo().id){
      var to_pet_uid = pageData.petsinformation[i].from_pet_uid
    }else{
      var to_pet_uid = pageData.petsinformation[i].to_pet_uid
    }
    wx.navigateTo({
      url: app.route.petsletter + '?to_pet_uid=' + to_pet_uid + '&pet_id=' + pageData.petsinformation[i].id + '&username=' + pageData.petsinformation[i].nickname,
    })
  },

  navlogin(){
    wx.navigateTo({
      url: app.route.login,
    })
  }
})