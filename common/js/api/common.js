import { HTTP } from '../http'
import { params } from '../config/params'
import { config } from '../config/configApi'
class Common extends HTTP {
  // 上传图片
  uploadFile(fileUrl) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config + params.uploadPic, //仅为示例，非真实的接口地址
        filePath: fileUrl,
        name: 'file',
        formData: null,
        success(res) {
          const data = JSON.parse(res.data)
          resolve(data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  // 上传视频、语音
  uploadFiles(fileUrl) {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: config + params.uploadfiles, //仅为示例，非真实的接口地址
        filePath: fileUrl,
        name: 'file',
        formData: null,
        success(res) {
          const data = JSON.parse(res.data)
          resolve(data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
}
export { Common }