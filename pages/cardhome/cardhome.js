//cardhome.js
const util = require('../../utils/util.js')
const app = getApp()
var cardlist = []
var coverid = '4'
Page({
  data: { 
    collected: false,
    coverlist: [],
    currentindex: '3',
  },

  onLoad: function() {
    var that = this
    that.data.coverlist = []
    wx.request({
      url: 'https://www.lizubing.com/article/cover/img/list?pageNo=1&pageSize=20',
      success(res) {
        cardlist = res.data.data.list
        app.globalData.globalCardList = cardlist
        //应该是用户滑动到底了再重新设置
        that.setData({
          coverlist: cardlist,
        })
      }
    })

  },
  comment: function() {
    wx.getUserInfo({
      success: function(res) {
        //此处为获取微信信息后的业务方法
        wx.navigateTo({
          url: '../comment/comment?coverid=' + coverid
        })
      },
      fail: function() {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '提示',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../cardme/cardme',
              })
            }
          }
        })
      }
    })
  },

  like: function() {
    var postCollected = this.data.collected
    this.setData({
      collected: !postCollected
    })
  },

  handleSwipeOut(...args) {
    var index = args[0].detail.list.length
    if (index - 1 > 0) {
      coverid = index - 1;
    }
    if (index - 1 == 0) {
      coverid = 12;
    }
    console.log('index:', index)
    if (index == 1) {
      this.setData({
        coverlist: cardlist,
        currentindex: index - 1,
      })
    }
    console.log('args:', args)
  },
  getUserInfo: function(e) {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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

})