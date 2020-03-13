import { HTTP } from '../http'
import { params } from '../config/params'
class Pets extends HTTP {
  // 发布宠物
  getPetRelease(data) {
    return this.request({
      url: params.pet_release,
      data
    })
  }
  // 我发布的宠物
  getPetMyPetList(data) {
    return this.request({
      url: params.pet_myPetList,
      data
    })
  }
  // 编辑资料
  setPetEdit(data) {
    return this.request({
      url: params.Pet_edit,
      data
    })
  }
  // 获取宠物详情
  getPetDetails(data) {
    return this.request({
      url: params.Pet_details,
      data
    })
  }
  //宠物收藏列表
  getPetCollectList(data) {
    return this.request({
      url: params.pet_collectList,
      data
    })
  }
  //宠物列表
  getPetLists(data) {
    return this.request({
      url: params.pet_lists,
      data
    })
  }
  //宠物上下架
  getPetUpdatePetStatus(data) {
    return this.request({
      url: params.Pet_updatePetStatus,
      data
    })
  }
  //申请领养
  getPet_adopt(data) {
    return this.request({
      url: params.Pet_adopt,
      data
    })
  }
  //用户收藏pet_collect
  getpet_collect(data) {
    return this.request({
      url: params.pet_collect,
      data
    })
  }
  //宠物消息
  petsinformation(data) {
    return this.request({
      url: params.petmessage,
      data
    })
  }
  //宠物私信聊天记录
  petmessageList(data) {
    return this.request({
      url: params.petmessageList,
      data
    })
  }
  //宠物发送私信
  petsendMessage(data) {
    return this.request({
      url: params.petsendMessage,
      data
    })
  }
  //宠物举报
  petreport(data) {
    return this.request({
      url: params.petreport,
      data
    })
  }
}
export { Pets }