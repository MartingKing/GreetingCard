//cardhome.js
const util = require('../../utils/util.js')
const app = getApp()
var cardlist = []
var coverid = -1

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
    // that.imgLoader = new ImgLoader(that, that.imageOnLoad.bind(that))
    //每次要置空数据，否则数组会重复添加
    that.data.coverlist = []
    wx.showLoading({
      title: '努力加载中...',
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
        //因为第一次加载进来滑动卡片，是没有index变化的，所以给个默认值
        if (coverid == -1) {
          coverid = cardlist[cardlist.length - 1].coverId;
        }
        for (let i in cardlist) {
          cardlist[i].loaded = false
        }
        app.globalData.globalCardList = cardlist
        //应该是用户滑动到底了再重新设置
        that.setData({
          coverlist: cardlist,
        })
        // that.loadImages()
      }
    })
    that.newUserGuide()
  },
  // comment: function() {
  //   wx.getUserInfo({
  //     success: function(res) {
  //       //此处为获取微信信息后的业务方法
  //       wx.navigateTo({
  //         url: '../comment/comment?coverid=' + coverid
  //       })
  //     },
  //     fail: function() {
  //       //获取用户信息失败后。请跳转授权页面
  //       wx.showModal({
  //         title: '提示',
  //         content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
  //         success: function(res) {
  //           if (res.confirm) {
  //             wx.switchTab({
  //               url: '../cardme/cardme',
  //             })
  //           }
  //         }
  //       })
  //     }
  //   })
  // },

  // like: function() {
  //   var postCollected = this.data.collected
  //   this.setData({
  //     collected: !postCollected
  //   })
  // },

  handleSwipeOut(...args) {
    var index = args[0].detail.list.length
    console.log('index', index)
    //由于数据请求成功之后给了一个默认值，所以这里是index-2的时候的coverid才是正确id  
    if (index - 1 > 0) {
      coverid = cardlist[index - 2].coverId;
    }
    //index等于1的时候其实也是最大的coverid
    if (index - 1 == 0) {
      coverid = cardlist[cardlist.length - 1].coverId;
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
  //同时发起全部图片的加载 设置加载大图还是缩略图
  loadImages() {
    this.data.coverlist.forEach(item => {
      this.imgLoader.load(item.imgUrl)
    })
  },
  //加载完成后的回调   可在此处替换缩略图
  imageOnLoad(err, data) {
    var imgList = this.data.coverlist.map(item => {
      if (item.imgUrl == data.src)
        item.loaded = true
      return item
    })
    this.setData({
      coverlist: imgList
    })
  },
  newUserGuide: function() {
    wx.getStorage({
      key: 'key_userguide',
      success: function(res) {

      },
      fail: function(res) {
        wx.showModal({
          title: '温馨提示',
          content: '是否需要查看新手引导？',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../userguide/userguide',
              })
            }
          }
        })
      },
      complete: function(res) {}
    })


  }
})