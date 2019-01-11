//madecard.js
const util = require('../../utils/util.js')

//获取应用实例
const app = getApp()
const backgroundurl = [
  'https://www.lizubing.com/upload/img/spring.png',
  'https://www.lizubing.com/upload/img/love.png',
  'https://www.lizubing.com/upload/img/new_year.png',
  'https://www.lizubing.com/upload/img/new_year_eve.png'
]
const mycolor = ['#000', '#ffef7b', '#f8193e', '#ff9293', '#ffef7b']

var coverid = ''
Page({
  data: {
    userInfo: {},
    backgrounds: '',
    textcolor: '#000',
    greetingwords: "愿你过一个开心的春节!\r\n愿世界充满详和,\r\n我以最真诚的心,\r\n祝愿您拥有幸福的一年! ",
    showtips: false,
    isHidden: true,
    inputHidden: false,
    cancleBtn: false,
    inputPlaceHolder: '请输入祝福语（90字符以内）',
  },
  editgreetingworlds: function(e) {
    app.globalData.editcontent = e._relatedInfo.anchorTargetText
    console.log('编辑内容', e._relatedInfo.anchorTargetText)
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
    that.setData({
      isHidden: true,
      greetingwords: content,
    })
  },
  selectgreetingwords: function(e) {
    console.log('dialog click:', e)
    wx.navigateTo({
      url: '../choicewords/choicewords?coverid=' + coverid,
    })
  },
  onLoad: function(params) {
    //快速选择界面返回的寄语
    var that = this
    coverid = params.id
    that.hidetips()
    that.getHeight()
    console.log('coverid--', coverid)
    // if (backgroundurl[coverid] != null) {
    //   that.setData({
    //     backgrounds: backgroundurl[coverid],
    //     textcolor: mycolor[coverid],
    //   })
    // }
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
  //文字滚动动画
  util: function(obj) {
    var continueTime = (parseInt(obj.list / obj.container) + 1) * 6000;
    var setIntervalTime = 50 + continueTime;
    console.log('continueTime', continueTime);
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });
    this.animation = animation;
    animation.translateY(obj.container).step({
      duration: 50,
      timingFunction: 'step-start'
    }).translateY(-obj.list).step({
      duration: 10000
    });
    this.setData({
      animationData: animation.export()
    })
    setInterval(() => {
      animation.translateY(obj.container).step({
        duration: 50,
        timingFunction: 'step-start'
      }).translateY(-obj.list).step({
        duration: 10000
      });
      this.setData({
        animationData: animation.export()
      })
    }, 10000)
  },
  //文字滚动动画
  getHeight() {
    var obj = new Object();
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.textanimationcontainer').boundingClientRect()
    query.select('.list').boundingClientRect()
    query.exec((res) => {
      obj.container = res[0].height; // 框的height
      obj.list = res[1].height; // list的height
      this.util(obj);
    })
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