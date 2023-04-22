const Mock = require('mockjs')

module.exports = [
  {
    url: '/worksites.json',
    type: 'get',
    response: config => {
      return [
          {
            "title": "素材库",
            "children": [
              {
                "site": "https://www.iconfont.cn",
                "title": "阿里矢量图标"
              }
            ]
          },
          {
            "title": "工具",
            "children": [
              {
                "site": "https://www.photopea.com",
                "icon": "https://www.photopea.com/promo/icon512.png",
                "title": "Photopea 在线PS"
              },
              {
                "site": "https://www.processon.com/diagrams",
                "title": "processon"
              }
            ]
          },
          {
            "title": "开发平台",
            "children": [
              {
                "site": "https://portal.qiniu.com/kodo/bucket",
                "title": "七牛云"
              }
            ]
          }
        ]
    }
  }
]

