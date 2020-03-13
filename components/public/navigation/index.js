// components/public/navigation/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '互助宠物'
    },
    navimg: {
      type: String,
      value: ''
    },
    back: {
      type: Number,
      value: 1
    },
    homeUrl: {
      type: String,
      value: '/pages/home/home'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pagesIndex: 1,
    height: 0,

  },
  attached() {
    let route = getCurrentPages()[0].route
    let pages = getCurrentPages().length
    let routeArr = [
      "pages/home/home",
      "pages/my/my",
      "pages/news/news"
    ]

    const pagefilter = routeArr.filter(v => v === route)
    console.log(pagefilter.length, routeArr.filter(v => v === route))
    if (pagefilter.length === 0) {
      pages = 2
    }
    console.log(pages)
    this.setData({
      pagesIndex: pages
    })
    wx.getSystemInfo({
      success: (res) => {
        let height = ''
        if (res.model.indexOf('iPhone') > -1) {
          height = res.statusBarHeight
        } else {
          height = res.statusBarHeight + 2
        }
        this.setData({
          height: height
        })
        // this.globalData.height = res.statusBarHeight
      }
    })
    console.log('页面栈数量:' + pages.length)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onBack() {
      console.log('返回')
      const back = this.data.back
      wx.navigateBack({
        delta: back
      });
    },
    onToHome() {
      console.log('首页')
      const homeUrl = this.data.homeUrl
      wx.switchTab({
        url: homeUrl,
        success: (result) => {
        },
        fail: () => { },
        complete: () => { }
      });
    }
  }
})
