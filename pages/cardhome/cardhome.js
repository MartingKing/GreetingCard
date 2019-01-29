//cardhome.js
const util = require('../../utils/util.js')
const app = getApp()
var cardlist = []
var coverid = '4'

//引入图片预加载组件  首先请求缩略图的接口，把缩略图展示到卡片，然后请求大图接口，大图加载完毕后，用大图替换缩略图
const ImgLoader = require('../img-loader/img-loader.js')

Page({
  data: {
    collected: false,
    coverlist: [],
    currentindex: '3',
  },

  onLoad: function() {
    var that = this
    //初始化图片预加载组件，并指定统一的加载完成回调
    that.imgLoader = new ImgLoader(that, that.imageOnLoad.bind(that))

    that.data.coverlist = []
    wx.showLoading({
      title: '一大波贺卡来袭，请耐心等待...',
    })

    wx.request({
      url: 'https://www.lizubing.com/article/cover/img/list',
      data: {
        pageNo: 1,
        pageSize: 20,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        wx.hideLoading()
        cardlist = res.data.data.list
        for (let i in cardlist) {
          cardlist[i].loaded = false
        }
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
      coverid = cardlist.length;
    }
    if (index == 1) {
      this.setData({
        coverlist: cardlist,
        currentindex: index - 1,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //同时发起全部图片的加载
  loadImages() {
    this.data.coverlist.forEach(item => {
      this.imgLoader.load(item.imgUrl)
    })
  },
  //加载完成后的回调   可在此处替换缩略图
  imageOnLoad(err, data) {
    console.log('data', data)
    console.log('err', err)
    const imgList = this.data.coverlist.map(item => {
      if (item.imgUrl == data.src)
        item.loaded = true
      return item
    })
    this.setData({
      coverlist: imgList
    })
  }
})