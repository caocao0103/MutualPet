// components/from/petVideo/petVideo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    val: String
  },

  observers:{
    'val': function (val) {
      if (val !== undefined) {
        this.setData({
          videoFile: val
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    videoFile: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择视频
    selectVideo(){
      const that = this;
      wx.chooseVideo({
        maxDuration: 59,
        success(res){
          if (res.duration > 60) {
            wx.showModal({
              content: '视频过长，请选择60秒以内的视频',
              showCancel: false,
              success: function (res) { },
            })
          } else {
            // 52428800字节 = 50兆
            if (res.size > 52428800) {
              wx.showModal({
                content: '视频过大，请更换视频',
                showCancel: false,
                success: function(res) {},
              })
            } else {
              that.setData({
                videoFile: res.tempFilePath,
              })
              
              that.triggerEvent('videoFile', res.tempFilePath)
            }
          }
        }
      })
    },

    previewVideo(){
      var videoContext = wx.createVideoContext('videoId',this)
      videoContext.requestFullScreen()
    },
    // 预览视频
    preview(e){
      var videoContext = wx.createVideoContext('videoId',this)
      videoContext.requestFullScreen()
    },
    // 删除视频
    delete(){
      this.setData({
        videoFile: '',
      })
      this.triggerEvent('deleteVideo', this.data.videoFile)
    },
  }
})
