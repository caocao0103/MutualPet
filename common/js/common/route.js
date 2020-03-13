import { Common } from './common'
const common = new Common()
class Route {
  //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  switchTab(obj, verifi = false) {
    if (verifi) {
      common.verifiLogin(() => {
        wx.switchTab(obj)
      })
    } else {
      wx.switchTab(obj)
    }
  }

  //关闭所有页面，打开到应用内的某个页面
  reLaunch(obj, verifi = false) {
    if (verifi) {
      common.verifiLogin(() => {
        wx.reLaunch(obj)
      })
    } else {
      wx.reLaunch(obj)
    }
  }

  //关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
  redirectTo(obj, verifi = false) {
    if (verifi) {
      common.verifiLogin(() => {
        wx.redirectTo(obj)
      })
    } else {
      wx.redirectTo(obj)
    }
  }

  // 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
  navigateTo(obj, verifi = false) {
    if (verifi) {
      common.verifiLogin(() => {
        wx.navigateTo(obj)
      })
    } else {
      wx.navigateTo(obj)
    }
  }

  // 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
  navigateBack(num, verifi = false) {
    if (verifi) {
      common.verifiLogin(() => {
        wx.navigateBack({
          delta: num
        })
      })
    } else {
      wx.navigateBack({
        delta: num
      })
    }
  }
}
export { Route }