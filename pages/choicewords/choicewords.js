// pages/choicewords/choicewords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtips: false,
    wishlist: []
  },

  hidetips() {
    var that = this
    var starttime = 3;
    var times = setInterval(function() {
      starttime--;
      console.log('starttime', starttime)
      if (starttime != null && starttime === 0) {
        clearInterval(times)
        that.setData({
          showtips: true
        })
      }
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   * birthday 生日 1;lantern 元宵 5 ;lover情人节 2; new_year_eve除夕 4; spring春节 3;
   */
  onLoad: function(options) {
    var coverid = options.coverid
    console.log('coverid', coverid)
    var type = ''
    if (coverid == 1) {
      type = 'birthday'
    }
    if (coverid == 2) {
      type = 'lover'
    }
    if (coverid == 3) {
      type = 'spring'
    }
    if (coverid == 4) {
      type = 'new_year_eve'
    }
    if (coverid == 5) {
      type = 'lantern'
    }
    var that = this
    that.hidetips()
    wx.request({
      url: 'https://www.lizubing.com/article/wish/list',
      data: {
        wishType: type,
        pageNo: '1',
        pageSize: 20
      },
      success(res) {
        console.log('wish:', res.data.data)
        that.setData({
          wishlist: res.data.data.list
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

  },
})