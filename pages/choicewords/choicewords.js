// pages/choicewords/choicewords.js

var loadmoredata = []
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtips: false,
    wishlist: [],
    totalsize: 0,
    offset: 1,
    mtype: "",
  },

  hidetips() {
    var that = this
    setInterval(function() {
      that.setData({
        showtips: true
      })
    }, 3000)
  },
  gotolastpage: function(e) {
    console.log('itemclick:', e)
    var content = e._relatedInfo.anchorTargetText;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      greetingwords: content
    })
    // wx.navigateTo({
    //   url: '../madecard/madecard?wishwords=' + content
    // })
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   * birthday 生日 9 5;lantern 元宵 5 ;lover情人节 2 11; new_year_eve除夕 4 10; spring春节 12 3 8 7 6 1;
   */
  onLoad: function (options) {
    var that = this

    loadmoredata = []
    var coverid = options.coverid
    console.log('coverid', coverid)
    
    var type = ''
    var coverImgList = app.globalData.globalCardList
    for (let i in coverImgList) {
      if (coverImgList[i].coverId == coverid) {
        type = coverImgList[i].wishType
      }
    }
    that.setData({
      mtype: type
    })
    that.hidetips()
    that.getWishList(false)
  },

  getWishList(isloadmore) {
    var that = this
    wx.showLoading({
      title: '玩命加载中',
    })
    if (isloadmore) {
      that.setData({
        offset: that.data.offset + 1
      })
    }
    console.log('type', that.data.mtype)
    wx.request({
      url: 'https://www.lizubing.com/article/wish/list',
      data: {
        wishType: that.data.mtype,
        pageNo: that.data.offset,
        pageSize: 10
      },
      success(res) {
        wx.hideLoading()
        var dataset = res.data.data.list
        for (var i in dataset) {
          loadmoredata.push(dataset[i])
        }
        that.setData({
          totalsize: res.data.data.total,
          wishlist: loadmoredata
        })
      }
    })
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
    var that = this;
    var dataLength = loadmoredata.length
    var totalSize = that.data.totalsize
    console.log('dataLength', dataLength, '\r\n', 'totalSize', totalSize)
    console.log('loadmoredata', loadmoredata)
    if (dataLength < totalSize) {
      that.getWishList(true)
    } else {
      wx.showToast({
        title: '到底了',
      })
    }
  },
})