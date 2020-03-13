// components/from/picker/index.js
import { citys, provinces } from '../../../common/js/config/city'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pickerArr: {
      type: Object,
      value: {}
    },
    val: {
      type: String,
      value: ''
    },
    mandatory: {
      type: Boolean,
      value: false
    },
    arrow: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,
    date: "",
    region: "",
    ageIndex: [0, 0, 0],
    multiIndex: [0, 0],
    // customItem:"全部"
    cityArr: [],
    ageArr: [[], [], []],
    multiStatus: false,
    cityStr: ''
  },
  observers: {
    'pickerArr,val': function (val1, val2) {
      if (val2 !== undefined) {
        if (val1.type == "str") {
          this.setData({
            index: val2 - 1
          })
        } else if (val1.type == "date") {
          this.setData({
            date: val2
          })
        } else if (val1.type == "region") {
          this.setData({
            region: val2
          })
        } else if (val1.type == "city") {
          this.setData({
            cityStr: val2
          })
        } else if (val1.type == "multiSelector") {
          let ageArr = this.data.ageArr
          ageArr[0] = val1.val[0]
          this.setData({
            ageStr: val2,
            ageArr: ageArr,
            // ageIndex: val2.split(',')
          })
        }
      }
    },

  },
  ready() {
    const pickerArr = this.data.pickerArr
    if (pickerArr.type === 'region') {
      let cityArr = [provinces, citys[provinces[0].id]]
      this.setData({
        cityArr: cityArr
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //字符串
    onPickerChange(e) {
      const pickerArr = this.data.pickerArr
      const indedx = e.detail.value - 0
      this.setData({
        index: indedx
      })
      this.triggerEvent('pickerStr', { val: indedx + 1 })
    },
    //日期
    onDateChange(e) {
      this.setData({
        date: e.detail.value
      })
      console.log(e.detail.value)
      this.triggerEvent('pickerDate', { val: e.detail.value })
    },
    bindMultiPickerColumnChange(e) {
      const i = e.detail.value
      const column = e.detail.column
      if (column === 0) {
        let cityArr = this.data.cityArr
        cityArr[1] = citys[provinces[i].id]
        this.setData({
          cityArr
        })
      }
    },
    //城市选择
    onRegionChange(e) {
      console.log(e)
      const i = e.detail.value[1]
      let cityArr = this.data.cityArr
      console.log(cityArr[1][i].name)
      this.setData({
        region: cityArr[1][i].name
      })
      this.triggerEvent('pickerCity', { val: this.data.region })
    },
    onCityChange(e) {
      const val = e.detail.value
      this.setData({
        cityStr: val[1] + val[2]
      })
    },
    onAgeChange(e) {
      const pickerArr = this.data.pickerArr.val
      let ageColumn = this.data.ageColumn
      let ageValue = this.data.ageValue
      // let ageStr = `${ageColumn},${ageValue}|`
      let ageStr = ''
      if (ageColumn == 0 && ageValue == 0) {
        ageStr += pickerArr[0][0]
      } else if (ageColumn == 0 && ageValue == 1) {
        ageStr += '1天'
      } else if (ageColumn == 0 && ageValue > 1) {
        ageStr += pickerArr[ageColumn][ageValue]
      } else if (ageColumn == 1 && ageValue == 0) {
        ageStr += pickerArr[2][ageValue]
      } else if (ageColumn == 1 && ageValue > 0) {
        ageStr += pickerArr[1][ageValue]
      } else if (ageColumn == 2 && ageValue > 0) {
        ageStr += pickerArr[2][ageValue]
      }
      this.setData({
        ageStr
      })
      this.triggerEvent('pickerAge', { val: ageStr })
    },
    // 宠物年龄
    bindAgeChangeChange(e) {
      const multiStatus = this.data.multiStatus
      const pickerArr = this.data.pickerArr.val
      let ageArr = this.data.detail
      const column = multiStatus ? e.detail.column : 0 // 行
      const value = e.detail.value //第几个
      console.log(column, value)
      if (column == 0 && value == 0) {
        ageArr = [pickerArr[0], [], []]
      } else if (column == 0 && value == 1) {
        ageArr = pickerArr
      } else if (column == 0 && value > 1) {
        ageArr = [pickerArr[0], [], []]
      } else if (column == 1 && value == 0) {
        ageArr = pickerArr
      } else if (column == 1 && value > 0) {
        ageArr = [pickerArr[0], pickerArr[1], []]
      }
      this.setData({
        ageArr,
        ageColumn: column,
        ageValue: value,
        multiStatus: true
      })
    }
  }
})
