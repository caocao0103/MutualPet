// components/petPoster/petPoster.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    petDetails: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready() {
    this.setData({
      window: wx.getSystemInfoSync()
    })
    this._drawCanvas()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 异步下载图片
    async downloadFile(img) {
      return await new Promise((res, err) => {
        wx.downloadFile({
          url: img,
          success(data) {
            if (data) {
              res(data.tempFilePath)
            }
          },
          fail(e) {
            err(e)
          }
        })
      })
    },
    // 绘制图片
    canvasImg(c, img) {
      const ctx = c
      ctx.drawImage(img.url, img.imgX, img.imgY, img.imgW, img.imgH)
    },
    // 绘制文字
    canvasText(c, text, width = 0) {
      const ctx = c
      ctx.setFillStyle(text.color)
      ctx.setFontSize(text.font)
      const windowWidth = wx.getSystemInfoSync().windowWidth / 2
      let metrics = (windowWidth - (ctx.measureText(text.str).width / 2))
      ctx.fillText(text.str, width ? metrics : text.x, text.y)
    },
    async _drawCanvas() {
      wx.showLoading({
        title: '海报正在生成中',
      })
      const _this = this
      const petDetails = this.data.petDetails
      let context = wx.createCanvasContext('myCanvas', this)
      console.log(wx.getSystemInfoSync())
      const windowWidth = wx.getSystemInfoSync().windowWidth
      const w = 750
      const ratio = windowWidth / w //分辨率
      const top = 492 // 自定义头部的高度
      const canvasH = 1334// 画布高度
      // 海报背景图片
      this.canvasImg(context, {
        url: '/common/images/pet_poster_bg.png',
        imgW: w * ratio,
        imgH: canvasH * ratio,
        imgX: 0 * ratio,
        imgY: 0 * ratio
      })
      let head_bg = ''
      if (petDetails.cover_img || petDetails.details_img[0]) {
        head_bg = petDetails.cover_img || petDetails.details_img[0]
        await this.downloadFile(head_bg)
          .then(res => {
            console.log(res)
            _this.canvasImg(context, {
              url: res,
              imgW: 442 * ratio,
              imgH: 346 * ratio,
              imgX: 122 * ratio,
              imgY: top * ratio
            })
          })
      } else {
        head_bg = '/common/images/pet_sharebg.jpg'
        // 宠物封面图
        this.canvasImg(context, {
          url: head_bg,
          imgW: 442 * ratio,
          imgH: 346 * ratio,
          imgX: 122 * ratio,
          imgY: top * ratio
        })
      }
      wx.downloadFile({
        url: petDetails, //仅为示例，并非真实的资源
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.playVoice({
              filePath: res.tempFilePath
            })
          }
        }
      })

      context.setTextBaseline('middle')
      // console.log(context.measureText(`「${petDetails.pet_nickname}」`))
      this.canvasText(context, {
        str: `「${petDetails.pet_nickname}」`,
        x: 284 * ratio,
        y: (top + 420) * ratio,
        color: '#582D15',
        font: 48 * ratio
      }, ratio)
      // console.log(context.measureText(`「${petDetails.pet_nickname}」`))
      if (petDetails.age) {
        this.canvasText(context, {
          str: `${petDetails.age}，是个${petDetails.sex == 1 ? '男' : '女'}孩，家住${petDetails.city}`,
          x: 164 * ratio,
          y: (982) * ratio,
          color: '#582D15',
          font: 36 * ratio
        })
      } else {
        this.canvasText(context, {
          str: `是个${petDetails.sex == 1 ? '男' : '女'}孩，家住${petDetails.city}`,
          x: 220 * ratio,
          y: (982) * ratio,
          color: '#582D15',
          font: 36 * ratio
        })
      }
      // 二维码
      if (petDetails.qrcode) {
        await this.downloadFile(petDetails.pet_qrcode)
          .then(res => {
            this.canvasImg(context, {
              url: res,
              imgW: 162 * ratio,
              imgH: 162 * ratio,
              imgX: 294 * ratio,
              imgY: 1036 * ratio
            })
          })
      }

      // this.canvasText(context, {
      //   str: '长按小程序码',
      //   x: 278 * ratio,
      //   y: 1220 * ratio,
      //   color: '#444444',
      //   font: 30 * ratio
      // })
      // this.canvasText(context, {
      //   str: '进入互助宠物领养',
      //   x: 278 * ratio,
      //   y: 1260 * ratio,
      //   color: '#AAAAAA',
      //   font: 24 * ratio
      // })
      context.draw(false, () => {
        wx.hideLoading()
        this.setData({
          ratio
        })
      })
    },
    // 保存海报
    onShare(e) {
      const vm = this
      const ratio = this.data.ratio
      let width = this.data.window.windowWidth
      console.log(width, ratio)
      const canvasH = this.data.window.screenHeight * 2// 画布高度
      let destWidth = width > 400 ? width - (width - 375) : width
      wx.showLoading({
        title: '正在保存中',
      })
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: (width - (width - 375)) * 2 * ratio,
        height: (canvasH - (canvasH - 1334)) * ratio + 40,
        destWidth: width * 4 * ratio,
        destHeight: canvasH * 2 * ratio + 40,
        canvasId: 'myCanvas',
        success(res1) {
          if (res1.tempFilePath) {
            let tempFilePath = res1.tempFilePath
            wx.getSetting({
              success(res2) {
                wx.hideLoading()
                if (!res2.authSetting['scope.writePhotosAlbum']) {
                  console.log('未授权')
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success(res3) {
                      console.log('成功', res3)
                      vm._saveImageToPhotosAlbum(tempFilePath)
                    },
                    fail: function (err) {
                      console.log('失败', err)
                      wx.showModal({
                        title: '提示',
                        content: '请在"设置"中开启相册的权限',
                        showCancel: true,
                        confirmText: '确定',
                        success: (result) => {
                          if (result.confirm) {
                            wx.openSetting({
                              success(res4) {
                                console.log('成功2', res4)
                              },
                              fail(err2) {
                                console.log('失败', err2)
                              }
                            })
                          }
                        },
                      });
                    }
                  })
                } else {
                  console.log('授权')
                  vm._saveImageToPhotosAlbum(tempFilePath)
                }
              }
            })
          }
        }
      }, this)
    },
    _saveImageToPhotosAlbum(tempFilePath) {
      const vm = this
      wx.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success(result) {
          console.log('保存')
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          console.log('保存失败', res)
          wx.showToast({
            title: '保存失败',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {
          vm.onClose()
        }
      })
    },
    onClose() {
      this.triggerEvent('petClone', {})
    }
  }
})
