//cardme.js
const app = getApp()

Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    var that = this
    app.globalData.userInfo = e.detail.userInfo
    wx.login({
      success: function(res) {
        //获取登录的临时凭证
        var code = res.code
        //todo 登录接口获取sessionkey 和openid等
        that.requestData(code, e.detail.userInfo)
      }
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  requestData: function(code, userInfo) {
    var that = this
    console.log('loginCode:', code)
    console.log('用户信息', userInfo)
    wx.showLoading({
        title: '加载中...',
        icon: 'loading'
      }),
      wx.request({
        url: 'https://www.lizubing.com/article/cover/login',
        method: 'POST',
        data: {
          code: code,
          userInfo: userInfo,
        },

        success: function(res) {
          wx.hideLoading()
          console.log('登录信息:', res.data)
          console.log('userid;', res.data.data.userId)
          app.globalData.userid = res.data.data.userId
          wx.setStorage({
            key: "userid",
            data: res.data.data.userId,
            success: function(res) {
              console.log(res)
            },
            fail: function(res) {
              console.log(res)
            },
            complete: function(res) {
              console.log(res)
            },
          })
          wx.setStorage({
            key: "userInfo",
            data: userInfo,
            success: function(res) {
              console.log(res)
            },
            fail: function(res) {
              console.log(res)
            },
            complete: function(res) {
              console.log(res)
            },
          })
        }
      })
  },
  guide: function(e) {
    wx.navigateTo({
      url: '../userguide/userguide',
    })
  },
  about: function(e) {
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },
  setting: function (e) {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },
})