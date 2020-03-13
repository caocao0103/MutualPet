// components/from/voice/index.js
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
          voice: val
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    recordingState: false,
    voice: '',
    duration: 0,
    playState:false,
    setInter: '',
    minute: '0' + 0, // 分
    second: '0' + 0, // 秒
  },
  ready() {
    const innerAudioContext = wx.createInnerAudioContext()
    const recorderManager = wx.getRecorderManager()
    this.setData({
      recorderManager,
      innerAudioContext
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onStartVoice() {
      const recorderManager = this.data.recorderManager
      const options = {
        duration: 60000,
        format: 'mp3'
      }
      // 开始录音
      recorderManager.start(options)
      // 监听录音开始事件
      this.setData({
        recordingState: true
      })
      // 录音计时
      this.setInterval()
      // 监听录音失败事件
      recorderManager.onError(() => {
        console.log('失败')
        clearInterval(this.data.setInter);
        this.setData({
          recordingState: false
        })
      })
    },
    // 计时器
    setInterval() {
      const that = this
      var second = that.data.second //秒
      var minute = that.data.minute //分
      that.data.setInter = setInterval(function () { // 设置定时器
        second++
        // that.setData({
        //   luyinlength: second
        // })
        if (second >= 60) {
          second = 0 //  大于等于60秒归零
          that.setData({
            minute: second + '1'
          })
          clearInterval(that.data.setInter)
          that.onStopRecording()
        }
        if (second < 10) {
          // 少于10补零
          that.setData({
            second: '0' + second
          })
        } else {
          that.setData({
            second: second
          })
        }
      }, 1000)
    },
    // 停止录音
    onStopRecording() {
      this.setData({
        recordingState: false,
        minute: '0' + 0, // 分
        second: '0' + 0, // 秒
      })
      clearInterval(this.data.setInter);
      const recorderManager = this.data.recorderManager
      recorderManager.stop()
      recorderManager.onStop((res) => {
        console.log('结束', res)
        this.setData({
          voice: res.tempFilePath,
        })
        if (res.tempFilePath.length > 0) {
          this.triggerEvent("voiceFile", res.tempFilePath)
        }
      })
    },
    
    // 播放音频
    onPlayVoice() {
      const innerAudioContext = this.data.innerAudioContext
      let playState = this.data.playState;

      innerAudioContext.autoplay = true;
      innerAudioContext.src = this.data.voice;
      console.log(this.data.voice)

      innerAudioContext.onPlay(() => {
        console.log('开始播放')
        this.setData({
          playState: true //正在播放状态
        })
      })
      // 监听播放停止
      innerAudioContext.onEnded(() => {
        console.log('监听播放结束自然停止')
        this.setData({
          playState: false
        })
        innerAudioContext.stop()
      })
       //监听播放失败 
       innerAudioContext.onError(() => {
        console.log('播放失败')
      })
    },

    // 删除音频
    deleteVoice() {
      const innerAudioContext = this.data.innerAudioContext
      innerAudioContext.destroy()
      this.setData({
        voice: '',
      })
      this.triggerEvent("deleteVoice", this.data.voice)
    },
  }
})
