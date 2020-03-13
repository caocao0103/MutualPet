// packageD/pages/petMyRelease/petMyRelease.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    petslist: [],
    pet_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pet_uid = wx.getStorageSync('pet_uid')
    this.setData({
      pet_uid
    })
    this._petMyPetList()
  },
  // 宠物上下架触发
  onPetUpDown() {
    this._petMyPetList()
  },
  // 请求宠物列表
  _petMyPetList() {
    const postData = {
      pet_uid: app.common.common.getUserinfo().id,
      page: 1,
      list_rows: 99,
    }
    app.api.pets.getPetMyPetList(postData)
      .then(res => {
        console.log(res)
        if (res.code === 0) {
          this.setData({
            petslist: res.data.data
          })
        }
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

  },
  toPetRelease() {

    const url = app.route.releasePets
    wx.navigateTo({
      url: url,
      success: (result) => { }
    });
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
    this._petMyPetList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onPetShare(e) {
    this.setData({
      pet_id: e.detail.id
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const dataset = e.target.dataset
    const typeStr = ['猫', '狗', '羊驼', '仓鼠', '蛇']
    const sex = dataset.sex == 1 ? '是个男孩' : '是个女孩'
    const pet_id = e.target.dataset.petid || this.data.pet_id
    const url = dataset.src
    return {
      title: `宠物${typeStr[dataset.type - 1]},${sex},${dataset.age ? dataset.age + ',' : ''},坐标${dataset.city},找新家了`,
      path: `/pages/petDetails/petDetails?pet_id=${pet_id}`,
      imageUrl: url
    }
  }
})