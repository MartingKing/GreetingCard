//app.js
App({
  onLaunch: function() {
    console.log('启动中...',Date.now())
    var that = this
    var userinfo = null
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        that.globalData.userid = res.data
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        userinfo = res.data
        that.globalData.userInfo = userinfo
      },
      fail: function(res) {
      },
      complete: function(res) {
      }
    })
    // wx.getSystemInfo({
    //   success: function (res) {
    //     //model中包含着设备信息
    //     console.log(res)
    //     var model = res.model
    //     if (model.search('iPhone X') != -1) {
    //       that.globalData.isIpx = true;
    //     } else {
    //       that.globalData.isIpx = false;
    //     }
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        //todo 登录接口获取sessionkey 和openid等
        var that = this
        var userInfo = that.globalData.userInfo
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
            }
          })
      }
    })

    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '检测到新版本，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
      wx.showModal({
        title: '温馨提示',
        content: '打开新版本遇到故障，请手动删除小程序再打开',
      })
    })
  },
  globalData: {
    userInfo: null,
    userid: null,
    editcontent:null,
    globalCardList:[],
    isIpx:false,
  }
})