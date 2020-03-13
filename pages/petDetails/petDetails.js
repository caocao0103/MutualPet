// pages/petDetails/petDetails.js
const app = getApp();
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: '',
    statusBarHeights: '',
    current: 1,
    swiperData: [],
    petslist: [],
    nav1: {},
    nav2: {},
    nav3: {},
    pic: [],
    pause: false, // 语音切换
  },
  //宠物详情
  petDetails() {
    const obj = {
      pet_id: this.data.pet_id,
      pet_uid: app.common.common.getUserinfo().id
    }
    app.api.pets.getPetDetails(obj)
      .then(res => {
        if (res.code === 0) {
          const data = res.data.pet_info
          console.log(data)
          const data2 = res.data.user_info
          //顶部图
          const username = data2.nickname
          const pet_uid = data.pet_uid
          var pic = data.details_img
          if (data.cover_img != '') {
            pic.unshift(data.cover_img);
          }
          var img = "/common/images/pet_sharebg.jpg"

          if (data.cover_img == '' && data.details_img.length == 0) {
            pic = pic.concat(img)
          }
          if (data.age == "") {
            var age = ''
          } else {
            var age = data.age.split(',')
            for (var i = 0; i < age.length; i++) {
              console.log(i)
            }
          }


          let is_collect = 0
          if (data.is_collect == 1) {
            is_collect = 1
          } else if (data.is_collect == 0) {
            is_collect = 0
          }
          //对象转成数组
          let tagsArr = data.healthy.split(',')
          tagsArr.forEach((v, i) => {
            if (v === '1') {
              tagsArr[i] = '驱虫'
            } else if (v === '2') {
              tagsArr[i] = '疫苗'
            } else if (v === '3') {
              tagsArr[i] = '三联'
            } else if (v === '4') {
              tagsArr[i] = '狗证'
            }
          });
          this.setData({
            petDetails: data,
            is_likes: is_collect,
            pic: pic,
            tags: tagsArr,
            username: username,
            pet_uid: pet_uid,
            age: age
          })

        }
      })
  },
  //宠物列表
  _getPetLists() {
    const obj = {
      city: '上海',
      pet_uid: app.common.common.getUserinfo().id,
      list_rows: 3,
    }
    app.api.pets.getPetLists(obj)
      .then(res => {
        if (res.code === 0) {
          this.setData({
            petslist: res.data.data
          })
        }
      })
  },

  //收藏
  addBuildAttention() {
    app.common.common.verifiLogin(() => {
      const obj = {
        pet_id: this.data.pet_id,
        pet_uid: app.common.common.getUserinfo().id
      }
      app.api.pets.getpet_collect(obj)
        .then(res => {
          if (res.code === 1) {
            console.log(res.data)
            if (res.msg == '收藏成功') {
              console.log(res.msg)
            }
            wx.showToast({
              title: res.msg,
              duration: 2000
            })

            var respData = res.data.is_collect;
            this.setData({
              is_likes: respData
            })

          }
        })
    })
  },
  //点击领养
  apply() {
    app.common.common.verifiLogin(() => {
      const obj = {
        pet_id: this.data.pet_id,
        pet_uid: app.common.common.getUserinfo().id
      }
      app.api.pets.getPet_adopt(obj)
        .then(res => {
          if (res.code === 1) {
            wx.navigateTo({
              url: '/pages/petsletter/petsletter?to_pet_uid=' + this.data.pet_uid + '&pet_id =' + this.data.pet_id + '&username=' + this.data.username

            })
          }
        })
    })
  },
  //点击预览图片
  previewImage(e) {
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var pic = []
    for (var i = 0; i < this.data.petDetails.details_img.length; i++) {
      pic = pic.concat(this.data.petDetails.details_img[i])
    }
    wx.previewImage({
      current: index,
      urls: pic // 当前显示图片的 http 链接
    });
  },
  //返回列表
  navList() {
    wx.navigateBack({
      url: "/pages/home/home"
    })
  },

  // 播放语音
  playVoice() {
    innerAudioContext.play();
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.petDetails.demand_voice,

      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })

    innerAudioContext.onEnded(() => {
      this.setData({
        pause: false
      })
      console.log('结束')
      innerAudioContext.stop()
    })

    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    this.setData({
      pause: true
    })
  },
  stopVoice() {
    this.setData({
      pause: false
    })
    innerAudioContext.stop()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const scene = options.scene ? decodeURIComponent(options.scene).split('=')[1] : ''
    this.setData({
      pet_id: options.pet_id || scene
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onPetShare() {
    this.setData({
      posterStatus: true
    })
  },
  onPetClone() {
    this.setData({
      posterStatus: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.petDetails();
    this._getPetLists();
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
  onSwiperChange(e) {
    const current = e.detail.current
    this.setData({
      current: current + 1
    })
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
  onShareAppMessage: function (e) {
    // console.log(e.target.dataset)
    // console.log(this.data.pet_id)
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