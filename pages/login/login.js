// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: '获取验证码',
    status: true,
    tel: '',
    verifiCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 获取号码
  getTelNum(e) {
    const val = e.detail.value
    this.setData({
      tel: val
    })
  },
  // 获取验证码
  getVerifiCode(e) {
    const val = e.detail.value
    this.setData({
      verifiCode: val
    })
  },
  // 验证码倒计时处理
  onGetVerifiCode() {
    let status = this.data.status
    let second = 60
    let times = ''
    const tel = this.data.tel - 0
    const regular_tel = app.common.regular.phoneFormat(tel)
    if (!regular_tel) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none'
      });
    } else {
      if (status) {
        this._getSendSms(tel)
        status = false
        this.setData({
          status
        })
        times = setInterval(() => {
          second--
          if (second < 1) {
            clearInterval(times)
            status = true
            second = '获取验证码'
          }
          this.setData({
            second: second,
            status
          })
        }, 1000);
      }
    }

  },
  // 发送验证码
  _getSendSms(num) {
    app.api.login.getSendSms(num)
      .then(res => {
        if (res.code === 1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
      })
  },
  // 登录事件
  onLogin() {
    const verifiCode = this.data.verifiCode
    const tel = this.data.tel
    const userInfo = app.userInfo
    const regular_tel = app.common.regular.phoneFormat(tel)
    if (tel === '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none'
      });
    } else if (!regular_tel) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
    } else if (!verifiCode) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
    } else {
      this._setPetLogin({
        tel: tel,
        code: verifiCode,
        nickname: userInfo.nickName,
        head_pic: userInfo.avatarUrl
      })
    }

  },
  // 手机号验证码登录
  _setPetLogin(obj) {
    const loginObj = {
      channel: 1,
      mobile: obj.tel,
      code: obj.code,
      nickname: obj.nickname,
      head_pic: obj.head_pic
    }
    app.api.login.setPetLogin(loginObj)
      .then(res => {
        if (res.code === 1) {
          wx.setStorageSync('userInfo', res.data);
          app.common.route.navigateBack(1)
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          });
        }
      })
  },

  // 取消事件
  onCancel() {
    app.common.route.navigateBack(1)
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