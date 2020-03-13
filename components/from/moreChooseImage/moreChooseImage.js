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
      type: Array,
      value: ''
    },
    count: {
      type: Number,
      value: 1
    }
  },
  observers: {
    'val': function (val) {
      if (val !== undefined) {
        console.log(val)
        this.setData({
          imgArr: val,
          imgs: val
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    tempFilePaths: "",
    imgIndex: 0,
    imgArr: [],
    imgs: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 上传图片
    onChooseImage() {
      const _this = this
      const count = this.data.count
      const imgArr = this.data.imgArr.length
      wx.chooseImage({
        count: count - imgArr,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          _this._getFileImg(tempFilePaths, count)
        }
      })
    },
    _getFileImg(img, count, index = 0) {
      const _this = this
      let num = count
      let imgIndex = index
      let imgs = this.data.imgs
      if (imgIndex < count) {
        app.api.common.uploadFile(img[imgIndex])
          .then(res => {
            if (res.code === 0) {
              const data = res.data.path
              imgs.push(data)
              this.setData({
                imgs
              })
              if (imgIndex < (img.length - 1)) {
                imgIndex += 1
                _this._getFileImg(img, num, imgIndex)
              } else if (imgIndex === (img.length - 1)) {
                this.setData({
                  imgArr: imgs
                })
                this.triggerEvent('moreChooseImage', { val: this.data.imgArr })
              }
            }
          })
      }
    },
    // 删除图片
    onCloseImg(e) {
      const index = e.currentTarget.dataset.index
      let imgArr = this.data.imgArr
      imgArr.splice(index, 1)
      console.log(imgArr)
      this.setData({
        imgArr
      })
      this.triggerEvent('moreChooseImage', { val: this.data.imgArr })
    },
    // 预览图片
    onPreviewImage(e) {
      const url = e.currentTarget.dataset.url
      const index = e.currentTarget.dataset.index
      let imgArr = this.data.imgArr
      wx.previewImage({
        current: imgArr[index], // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      })
    }
  }
})
