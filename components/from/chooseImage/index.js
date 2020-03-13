// components/from/chooseImage/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    chooseStyle: {
      type: String,
      value: 'width:360rpx;height:360rpx;'
    },
    index: {
      type: Number,
      value: 0
    },
    val: {
      type: String,
      value: ''
    }
  },
  observers: {
    'val': function (val) {
      if (val !== undefined) {
        this.setData({
          tempFilePaths: val
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    tempFilePaths: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 上传图片
    onChooseImage() {
      const _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths[0]
          _this._uploadFile(tempFilePaths)
        }
      })
    },
    _uploadFile(uploadFile) {
      app.api.common.uploadFile(uploadFile)
        .then(res => {
          this.setData({
            tempFilePaths: res.data.path
          })
          this.triggerEvent('chooseImage', { val: this.data.tempFilePaths })
        })
    },
    // 删除图片
    onCloseImg() {
      this.setData({
        tempFilePaths: ""
      })
      this.triggerEvent('chooseImage', { val: this.data.tempFilePaths })
    },
    // 预览图片
    onPreviewImage(e) {
      const url = e.currentTarget.dataset.url
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: [url] // 需要预览的图片http链接列表
      })
    }
  }
})
