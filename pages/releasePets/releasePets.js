// pages/releasePets/releasePets.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    age: {
      type: 'str',
      val: ['公', '母'],
      title: '性别'
    },
    Hygiene: {
      type: 'str',
      val: ['已驱虫', '已疫苗', '已绝育'],
      title: '驱虫、疫苗、三联'
    },
    Birthday: {
      type: 'date',
      start: '2020-02-02',
      end: '2022-02-02',
      title: '生日'
    },
    region: {
      type: 'region',
      title: '城市'
    },
    release: {
      img1: {
        must: true,
        msg: '请上传封面图片',
        val: ''
      },
      img2: {
        must: true,
        msg: '请上传封面图片1',
        val: ''
      },
      img3: {
        must: false,
        msg: '请上传封面图片2',
        val: ''
      },
      img4: {
        must: false,
        msg: '请上传封面图片3',
        val: ''
      },
      name: {
        must: true,
        msg: '姓名不能为空',
        val: ''
      },
      sex: {
        must: true,
        msg: '请填写性别',
        val: ''
      },
      birthday: {
        must: true,
        msg: '请选择生日',
        val: ''
      },
      weight: {
        must: true,
        msg: '请填写体重',
        val: ''
      },
      hygiene: {
        must: true,
        msg: '请选择宠物健康状态',
        val: ''
      },
      city: {
        must: true,
        msg: '请选择所在城市',
        val: ''
      },
      wx: {
        must: true,
        msg: '请填写微信',
        val: ''
      },
      QQ: {
        must: true,
        msg: '请填写QQ',
        val: ''
      },
      tel: {
        must: true,
        msg: '请填写手机号',
        val: ''
      },
      introduce: {
        must: true,
        msg: '请填写个人介绍',
        val: ''
      },
      demand: {
        must: true,
        msg: '请填写领养人需求',
        val: ''
      },
      demandVoice: {
        must: false,
        msg: '请填写领养人需求语音',
        val: ''
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.api, app.common)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getCoverImage(e) { this.update(e, 'img1') },
  getPetsImage1(e) { this.update(e, 'img2') },
  getPetsImage2(e) { this.update(e, 'img3') },
  getPetsImage3(e) { this.update(e, 'img4') },
  getNameInput(e) { this.update(e, 'name') },
  getWeightInput(e) { this.update(e, 'weight') },
  getPickerAge(e) { this.update(e, 'sex') },
  getPickerBirthday(e) { this.update(e, 'birthday') },
  getPickerHygiene(e) { this.update(e, 'hygiene') },
  getPickerRegion(e) { this.update(e, 'city') },
  getWxNum(e) { this.update(e, 'wx') },
  getQQNum(e) { this.update(e, 'QQ') },
  getTelNum(e) { this.update(e, 'tel') },
  getIntroduce(e) { this.update(e, 'introduce') },
  getDemand(e) { this.update(e, 'demand') },
  update(e, name) {
    const tempFilePaths = e.detail.val
    const release = this.data.release
    release[name].val = tempFilePaths
    this.setData({
      release
    })
  },

  // 提交数据
  onReleasePets() {
    const release = this.data.release
    let releaseState = true
    for (const key in release) {
      if (release[key].must) {
        if (release[key].val === '') {
          wx.showToast({
            title: release[key].msg,
            icon: 'none'
          })
          releaseState = false
          break
        }
      }
    }
    if (releaseState) {
      console.log('提交成功')
    } else {
      console.log('条件不足')
    }
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