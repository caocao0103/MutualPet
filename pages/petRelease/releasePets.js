// pages/releasePets/releasePets.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pet_id: '',
    sex: {
      type: 'str',
      val: ['公', '母'],
      title: '性别'
    },
    petType: {
      type: 'str',
      val: ['猫', '狗', '羊驼', '仓鼠', '蛇'],
      title: '类别'
    },
    Hygiene: {
      type: 'str',
      val: ['已驱虫', '已疫苗', '已绝育'],
      title: '驱虫、疫苗、三联'
    },
    Birthday: {
      type: 'date',
      start: '',
      end: '2022-02-02',
      title: ' 生日'
    },
    region: {
      type: 'region',
      title: '所在城市'
    },
    multiSelector: {
      type: 'multiSelector',
      title: '宠物年龄',
      val: [
        ['年龄未知', '小于1岁', '1岁', '2岁', '3岁', '4岁', '5岁', '6岁', '7岁', '8岁', '9岁', '10岁', '11岁', '12岁', '13岁', '14岁', '15岁', '16岁', '17岁', '18岁', '19岁', '20岁'],
        ['小于1个月', '1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月', '12个月'],
        ['1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天', '9天', '10天', '11天', '12天', '13天', '14天', '15天', '16天', '17天', '18天', '19天', '20天', '21天', '22天', '23天', '24天', '25天', '26天', '27天', '28天', '29天', '30天', '31天']
      ],
    },
    release: {
      cover_img: {
        must: false,
        msg: '请上传封面图片',
        val: ''
      },
      details_img: {
        must: false,
        msg: '请上传宠物详情图',
        val: []
      },

      name: {
        must: true,
        msg: '姓名不能为空',
        val: ''
      },
      petType: {
        must: true,
        msg: '请选择宠物类型',
        val: ''
      },
      sex: {
        must: true,
        msg: '请填写性别',
        val: ''
      },
      birthday: {
        must: false,
        msg: '请选择生日',
        val: ''
      },
      age: {
        must: false,
        msg: '请选择年龄',
        val: ''
      },
      weight: {
        must: false,
        msg: '请填写体重',
        val: ''
      },
      hygiene: {
        must: false,
        msg: '请选择宠物健康状态',
        val: ''
      },
      city: {
        must: true,
        msg: '请选择所在城市',
        val: ''
      },
      wx: {
        must: false,
        msg: '请填写联系方式',
        val: ''
      },
      QQ: {
        must: false,
        msg: '请填写联系方式',
        val: ''
      },
      tel: {
        must: false,
        msg: '请填写联系方式',
        val: ''
      },
      introduce: {
        must: true,
        msg: '请填写描述内容',
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
      },
      videoFile: {
        must: false,
        msg: '请填写领养人需求视频',
        val: ''
      }
    },
    moreData: [
      {
        id: 1,
        title: '驱虫',
        check: false
      },
      {
        id: 2,
        title: '疫苗',
        check: false
      },
      {
        id: 3,
        title: '三联',
        check: false
      },
      {
        id: 4,
        title: '狗证',
        check: false
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let timestamp = Date.parse(new Date()) / 1000;//当前时间戳
    let currentDate = app.common.time.formatTime(timestamp, 'Y/M/D') // 当前日期格式
    let Birthday = this.data.Birthday
    const pet_uid = wx.getStorageSync('pet_uid')
    Birthday.end = currentDate
    this.setData({
      Birthday,
      pet_uid,
      pet_id: options.id || ''
    })
    if (options.id) {
      console.log('ok')
      this._getPetDetails(options.id)
    } else {
      console.log('no')
    }
  },
  // 获取详情
  _getPetDetails(id) {
    const postData = {
      pet_id: id,
      pet_uid: this.data.pet_uid
    }
    app.api.pets.getPetDetails(postData)
      .then(res => {
        if (res.code === 0) {
          const data = res.data.pet_info
          let release = this.data.release

          release.name.val = data.pet_nickname
          release.sex.val = data.sex
          release.petType.val = data.type
          release.city.val = data.city
          release.weight.val = data.weight
          release.cover_img.val = data.cover_img
          release.introduce.val = data.desc
          release.wx.val = data.wechat
          release.QQ.val = data.qq
          release.tel.val = data.mobile
          release.age.val = data.age
          release.demand.val = data.demand_text
          release.birthday.val = data.birthday
          release.hygiene.val = data.healthy // 宠物健康状况
          release.details_img.val = data.details_img || ''
          release.demandVoice.val = data.demand_voice
          // release.videoFile.val = data.video
          this.setData({
            release
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  videoFile(e) {
    let localVideo = e.detail;
    this.loadFilePath(localVideo,'videoFile');

  },
  voiceFile(e) {
    let localVoice = e.detail;
    this.loadFilePath(localVoice,'demandVoice');
  },
  // 删除视频
  deleteVideo(e) {
    let localVideo = e.detail;
    const release = this.data.release
    release['videoFile'].val = localVideo
    this.setData({
      release
    })
  },
  // 删除语音
  deleteVoice(e) {
    let localVoice = e.detail;
    const release = this.data.release
    release['demandVoice'].val = localVoice
    this.setData({
      release
    })
  },
  getCoverImage(e) { this.update(e, 'cover_img') },
  getPetsDetailsImage(e) { this.update(e, 'details_img') },
  getNameInput(e) { this.update(e, 'name') },
  getWeightInput(e) { this.update(e, 'weight') },
  getPickerSex(e) { this.update(e, 'sex') },
  getPickerPetType(e) { this.update(e, 'petType') },
  getPickerBirthday(e) { this.update(e, 'birthday') },
  getPickerHygiene(e) { this.update(e, 'hygiene') },
  getPickerAge(e) { this.update(e, 'age') },
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
    if (release.wx.val || release.QQ.val || release.tel.val) {
      release.wx.must = false
    } else {
      release.wx.must = true
    }
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
      const pet_id = this.data.pet_id || ''
      let postData = {
        pet_uid: wx.getStorageSync('userInfo').id, //宠物用户uid
        pet_id: pet_id,
        channel: 1,
        pet_nickname: release.name.val, //宠物昵称
        sex: release.sex.val, // 宠物性别
        type: release.petType.val, //宠物类型
        city: release.city.val,//城市
        weight: release.weight.val,//宠物重量
        cover_img: release.cover_img.val,//封面图
        details_img: release.details_img.val.join(','), //详情图
        desc: release.introduce.val, //宠物描述
        wechat: release.wx.val, // 联系微信
        qq: release.QQ.val, //qq
        mobile: release.tel.val,//联系电话
        demand_text: release.demand.val,//领养要求
        demand_voice: release.demandVoice.val,//领养要求语音描述（OSS链接）
        birthday: release.birthday.val, //宠物生日
        age: release.age.val, //宠物生日
        healthy: release.hygiene.val, //宠物健康状况
        // video: release.videoFile.val, //宠物视频

      }
      if (pet_id !== '') {
        delete postData.pet_uid
        this._setPetEdit(postData)
      } else {
        delete postData.pet_id
        this._getPetRelease(postData)
      }

    } else {
      console.log('条件不足')
    }
  },
  // 发布宠物
  _getPetRelease(postData) {
    app.api.pets.getPetRelease(postData)
      .then(res => {
        if (res.code === 1) {
          const url = app.route.petReleaseSuccess
          app.common.route.redirectTo({
            url: url
          })
        }
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      })
  },
  // 编辑宠物
  _setPetEdit(postData) {
    app.api.pets.setPetEdit(postData)
      .then(res => {
        if (res.code === 1) {
          const url = app.route.petReleaseSuccess
          app.common.route.redirectTo({
            url: url
          })
        }
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
      })
  },

  // 上传视频文件
  loadFilePath(fileInfo,name) {
    wx.showLoading({
      title: '上传中',
    })
    app.api.common.uploadFiles(fileInfo)
      .then(res => {
        if (res.code === 0) {
          wx.hideLoading()
          const release = this.data.release
          release[name].val = res.data.url
          this.setData({
            release
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
        }
        
      })
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