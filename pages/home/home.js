// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [
      {
        id: 1,
        img: '/common/images/pet_swiper.jpg'
      }
    ],
    petslist: [],
    list_rows: 5,
    page: 1,
    listState: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPetLists(1)
  },
  _getPetLists(page, state = false) {
    const list_rows = this.data.list_rows
    const obj = {
      city: '',
      pet_uid: app.common.common.getUserinfo().id,
      page: page,
      list_rows: list_rows
    }
    app.api.pets.getPetLists(obj)
      .then(res => {
        if (res.code === 0) {
          const data = res.data.data
          let petslist = state ? this.data.petslist.concat(data) : data
          this.setData({
            petslist: petslist,
            listState: data.length < list_rows ? false : true,
            page: page
          })
        }
      })
  },
  // 跳转到宠物发布页面
  toRelease() {
    app.common.route.navigateTo({
      url: app.route.releasePets
    }, true)
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
    this._getPetLists(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const listState = this.data.listState
    if (listState) {
      let page = this.data.page
      page++
      this._getPetLists(page, true)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    const dataset = e.target.dataset
    const typeStr = ['猫', '狗', '羊驼', '仓鼠', '蛇']
    const sex = dataset.sex == 1 ? '是个男孩' : '是个女孩'
    const pet_id = e.target.dataset.petid || this.data.pet_id
    const url = dataset.src
    return {
      title: `宠物${typeStr[dataset.type - 1]},${sex},${dataset.age ? dataset.age + ',' : ''}坐标${dataset.city},找新家了`,
      path: `/pages/petDetails/petDetails?pet_id=${pet_id}`,
      imageUrl: url
    }
  }
})