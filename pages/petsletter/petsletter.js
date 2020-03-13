// pages/petsletter/petsletter.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    underMessage: [], //私信聊天记录
    content:'', // 输入的内容

    //计算聊天框高度
    statusBarHeight: '',
    statusBarHeights: '',
    scrollheight: '',
    scrollheights: '',

    username:'我爱罗',
    pet_uid: 1, //我的petid
    to_pet_uid: 2, //私信对象petid
    pet_id: 1,//宠物的id

    jubao: false,//举报弹框
    saorao: [],
    build_saorao: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pet_uid: app.common.common.getUserinfo().id, //我的petid
      to_pet_uid: options.to_pet_uid, //私信对象petid
      pet_id: options.pet_id,//宠物的id
      username: options.username,
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取聊天信息
    this._petmessageList()

    var that = this;
    // 计算聊天框的高度
    wx.getSystemInfo({
      success: function (res) {
        var hei = res.windowHeight - res.statusBarHeight - 310
        var heis = res.windowHeight - res.statusBarHeight - 88 // 减去30
        that.setData({
          statusBarHeight: res.statusBarHeight,
          statusBarHeights: res.statusBarHeight + 44,
          scrollheight: hei,
          scrollheights: heis
        })
      }
    })
  },

  //获取聊天信息
  _petmessageList() {
    var pageData = this.data
    console.log(pageData.pet_uid)
    console.log(pageData.to_pet_uid)
    const obj = {
      mine_pet_uid: pageData.pet_uid,
      other_pet_uid: pageData.to_pet_uid,
      page: 1,
      list_rows: 999,
    }
    app.api.pets.petmessageList(obj)
      .then(res => {
        if (res.code === 0) {
          console.log(res)
          this.setData({
            underMessage: res.data.data,
            scrollTop: 1000000000,
          })
        }
      })
  },

  //发送私信
  _petsendMessage() {
    var pageData = this.data
    const obj = {
      from_pet_uid: pageData.pet_uid,
      to_pet_uid: pageData.to_pet_uid,
      message: pageData.content,
      pet_id: pageData.pet_id
    }
    app.api.pets.petsendMessage(obj)
      .then(res => {
        if (res.code === 1) {
          this.setData({     
            content: '',
            scrollTop: 10000000000000000,
          })
          this._petmessageList()
        }
      })
  },
  // 输入的内容
  change: function(e) {
    this.setData({
      content: e.detail.value,
    })
  },

  // 举报
  jubao: function () {
    this.setData({
      jubao: true
    })
  },
  // 清除举报
  qingchujubao: function () {
    this.setData({
      jubao: false
    })
  },
  // 举报骚扰 获取相应内容
  saorao: function (e) {
    console.log(e.detail.value);
    var index = e.detail.value
    var build_index = '';
    for (var i = 0; i < index.length; i++) {
      if (build_index == '') {
        build_index = index[i];
      } else {
        build_index = build_index + ',' + index[i]
      }
    }
    console.log(build_index)
    this.setData({
      saorao: e.detail.value,
      build_saorao: build_index
    })
  },

  // 举报提交
  tijiao: function () {
    var self = this
    var pageData = self.data;
    if (self.data.saorao == '') {
      wx.showModal({
        title: '',
        content: '请选择内容',
        showCancel: false,
        success(res) {
        }
      })
    } else {
      wx.showModal({
        title: '',
        content: '举报成功',
        showCancel: false,
        success(res) {

          const obj = {
            pet_id: pageData.pet_id,
            pet_uid: pageData.pet_uid,
            text: pageData.build_saorao,
          }
          app.api.pets.petreport(obj)
            .then(res => {
              if (res.code === 1) {
                self.setData({
                  jubao: false,
                  saorao: []
                })
              }else{
                self.setData({
                  jubao: false,
                  saorao: []
                })
              }
            })
          
        }
      })
    }
  },
})