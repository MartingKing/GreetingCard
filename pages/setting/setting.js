// pages/setting/setting.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})