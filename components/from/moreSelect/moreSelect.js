// components/from/moreSelect/moreSelect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    moreData: {
      type: Array,
      value: []
    },
    val: {
      type: String,
      value: ''
    }
  },
  observers: {
    'val': function (val) {
      if (val !== undefined) {
        const moreData = this.data.moreData
        for (let i = 0; i < moreData.length; i++) {
          if (val.indexOf(i + 1) != -1) {
            moreData[i].check = true
          }
        }
        this.setData({
          more: moreData
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    more: []
  },
  ready() {
    this.setData({
      more: this.data.moreData
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onMoreSel(e) {
      const index = e.currentTarget.dataset.index
      let more = this.data.more
      // console.log(e, moreData, index)
      const statr = more[index].check
      more[index].check = !statr
      this.setData({
        more
      })
      let str = []
      more.forEach((v) => {
        if (v.check) {
          str.push(v.id)
        }
      });
      this.triggerEvent('moreSel', { val: str.join(',') })
    }
  }
})
