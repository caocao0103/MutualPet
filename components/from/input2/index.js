// components/from/input2/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '微信',
    },
    type: {
      type: String,
      value: 'text',
    },
    placeholder: {
      type: String,
      value: '请输入内容',
    },
    max: {
      type: Number,
      value: 140
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
      const val = e.detail.value
      this.setData({
        value: val
      })
      this.triggerEvent('input', { val })
    }
  }
})
