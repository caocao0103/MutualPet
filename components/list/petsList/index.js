// components/list/petsList/petsList.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    petsObj: {
      type: Object,
      value: {}
    },
    type: {
      type: Number,
      value: 1
    },
    status: {
      type: Number,
      value: 1
    },
    is_collection: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pets: {},
    share: '',
    details_img: [],
    petDetails: {}
  },
  ready() {
    let pets = this.data.petsObj
    const is_collection = this.data.is_collection
    let tagsArr = pets.healthy.split(',')
    tagsArr.forEach((v, i) => {
      if (v === '1') {
        tagsArr[i] = '驱虫'
      } else if (v === '2') {
        tagsArr[i] = '疫苗'
      } else if (v === '3') {
        tagsArr[i] = '三联'
      } else if (v === '4') {
        tagsArr[i] = '狗证'
      }
    });
    pets.sex = pets.sex == '1' ? '公' : '母'
    pets.tags = tagsArr
    let details_img = ''
    if (is_collection === 2) {
      details_img = JSON.parse(pets.details_img)
    } else {
      details_img = pets.details_img
    }
    this.setData({
      pets,
      details_img
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    toPetDetails() {
      const is_collection = this.data.is_collection
      const petsObj = this.data.petsObj
      const id = is_collection === 1 ? petsObj.pet_id : petsObj.id
      const type = this.data.type
      switch (type) {
        case 1:
          wx.showToast({
            title: '宠物审核中，不能查看详情',
            icon: 'none'
          })
          break;
        case 3:
          wx.showToast({
            title: '宠物未通过审核，请完善信息',
            icon: 'none'
          })
          break;
        case 5:
          wx.showToast({
            title: '宠物已下架，请先上架宠物',
            icon: 'none'
          })
          break;
        default:
          app.common.route.navigateTo({
            url: `${app.route.petDetails}?pet_id=${id}`
          });
          break;
      }
      if (type !== 1 && type !== 3 & type !== 5) {

      }
    },
    onShare() {
      const id = this.data.petsObj.id
      this.setData({
        share: 'share'
      })
      this.triggerEvent('share', { id })
    },
    // 
    getDetails() {
      const is_collection = this.data.is_collection
      const petsObj = this.data.petsObj
      const pet_id = is_collection === 1 ? petsObj.pet_id : petsObj.id
      const postData = {
        pet_id: pet_id,
        pet_uid: petsObj.pet_uid || ''
      }
      app.api.pets.getPetDetails(postData)
        .then(res => {
          if (res.code === 0) {
            const data = res.data.pet_info
            this.setData({
              posterStatus: true,
              petDetails: data
            })
          }
        })
    },
    onPetClone() {
      this.setData({
        posterStatus: false
      })
    },
    onPetLowershelf() {
      const _this = this
      wx.showModal({
        title: '提示',
        content: '下架后将不再显示',
        success(res) {
          if (res.confirm) {
            // 下架
            _this._getPetUpdatePetStatus(2)
          }
        }
      })
    },
    // 上架
    onPetUpperShelf() {
      this._getPetUpdatePetStatus(1)
    },
    // 上下架事件

    _getPetUpdatePetStatus(status) {
      const _this = this
      const pet_id = this.data.petsObj.id
      const postData = {
        pet_id: pet_id,
        status: status
      }
      app.api.pets.getPetUpdatePetStatus(postData)
        .then(res => {
          console.log(res)
          if (res.code === 1) {
            wx.showToast({
              title: status == 1 ? '宠物已上架' : '宠物已下架',
              icon: 'none',
              success: (result) => {
                _this.triggerEvent('petUpDown', {})
              },
            });
          }

        })
    },

    //修改宠物资料
    onPetAlter() {
      const id = this.data.petsObj.id
      const url = `${app.route.releasePets}?id=${id}`
      app.common.route.navigateTo({
        url: url
      });
    },
    // 领养宠物
    onPetAdopt() {//Pet_adopt
      // const id = is_collection === 1 ? petsObj.pet_id : petsObj.id
      // const url = `/packageD/pages/petsletter/petsletter?to_pet_uid=${petsObj.pet_uid}&pet_id=${id}&username=${petsObj.username}`
      const is_collection = this.data.is_collection
      const petsObj = this.data.petsObj
      const url = app.route.petsletter
      const id = is_collection === 1 ? petsObj.pet_id : petsObj.id
      const obj = {
        to_pet_uid: petsObj.pet_uid,//接受的宠物用户ID
        pet_id: id,//关联的宠物ID（非必传）
        username: petsObj.username,
      }
      const param = app.common.common.getParam(url, obj)
      app.common.route.navigateTo({
        url: param
      }, true)

    },
  }
})
