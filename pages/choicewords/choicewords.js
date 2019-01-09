// pages/choicewords/choicewords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showtips:false,
    wishlist:[]
  },

  hidetips() {
    var that = this
    var starttime = 3;
    var times = setInterval(function () {
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
   * birthday 生日 lantern 元宵  lover情人节 new_year_eve除夕 spring春节
   */
  onLoad: function (options) {
    var that = this
    that.hidetips()
    wx.request({
      url: 'https://www.lizubing.com/article/wish/list',
      data:{
        wishType:'lover',
        pageNo:'1',
        pageSize:10
      },
      success(res){
        console.log('wish:',res.data)
        that.setData({
          wishlist:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})