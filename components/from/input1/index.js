// components/from/input1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    },
    company: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    val: {
      type: String,
      value: ''
    },
    mandatory: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    'val': function (val) {
      if (val !== undefined) {
        this.setData({
          value: val
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    value: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(e) {
      // console.log(e.detail.value)
      const val = e.detail.value
      this.setData({
        value: val
      })
      this.triggerEvent('input', { val })
    }
  }
})
