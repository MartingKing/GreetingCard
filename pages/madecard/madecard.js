//madecard.js
const util = require('../../utils/util.js')

//获取应用实例
const app = getApp()
const backgroundurl = [
  'https://www.lizubing.com/upload/img/spring.png',
  'https://www.lizubing.com/upload/img/love.png',
  'https://www.lizubing.com/upload/img/new_year.png',
  'https://www.lizubing.com/upload/img/new_year_eve.png']
const mycolor = ['#000', '#ffef7b', '#f8193e', '#ff9293', '#ffef7b']
Page({
  data: {
    userInfo: {},
    backgrounds: 'https://www.lizubing.com/upload/img/love.png',
    textcolor: '#ffef7b',
    greetingwords: "愿你过一个开心的春节!\r\n愿世界充满详和,\r\n我以最真诚的心,\r\n祝愿您拥有幸福的一年! ",
    showtips: false,
    isHidden: true,
    inputHidden: false,
    cancleBtn: false,
    inputPlaceHolder: '请输入祝福语（90字符以内，为了美观，请换行断句）'
  },
  editgreetingworlds: function() {
    var that = this;
    that.setData({
      isHidden: false,
      // inputPlaceHolder: "请输入想要发送的内容",
      inputHidden: false,
      // cancleBtn: true,
    })
  },

  scancard() {
    console.log('浏览')
  },

  onMyEvent: function(e) {
    var that = this;
    var content = e.detail;
    var greetings = content.replace(',', '\\r\\n');
    console.log("e.detail :", content)
    that.setData({
      isHidden: true,
      greetingwords: greetings,
    })
  },
  onLoad: function(params) {
    var id = params.id
    this.hidetips()
    console.log('params--', id)
    if (backgroundurl[id] != null) {
      this.setData({
        backgrounds: backgroundurl[id],
        textcolor: mycolor[id]
      })
    }
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
  }
})