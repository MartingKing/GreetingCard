const app = getApp()
var timeutil = require('../../utils/util.js')
const innerAudioContext = wx.createInnerAudioContext()

var musicUrl = 'https://www.lizubing.com/upload/mp3/china_boy_congrate.mp3'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    imgOpacity: 1,
    isHidden: false,
    middlestyle: 0,
    leftstyle: 5,
    containarstyle: 0,
    hidenGreeting: true,
    isStop: true,
    animationData: null,
    greetingwords: '',
    shareData: {},
    shareId: '',
    tideMarginTop: '74%',
    traggleMarginTop: '70%',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var sid = options.shareId
    wx.request({
      url: 'https://www.lizubing.com/article/cover/share/select',
      data: {
        shareId: sid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        wx.hideLoading()
        var words = res.data.data.wishWord
        musicUrl = res.data.data.musicUrl
        that.setData({
          shareData: res.data.data,
          shareId: sid,
        })
        setTimeout(function() {
          that.setData({
            greetingwords: words,
          })
        }, 14200)
        that.playMusic(musicUrl)
      }
    })
    //适配iphone x
    // if (app.globalData.isIpx) {
    //   this.setData({
    //     tideMarginTop: '96.5%',
    //     traggleMarginTop: '92.5%',
    //   })
    // } else {
    //   this.setData({
    //     tideMarginTop: '74%',
    //     traggleMarginTop: '70%',
    //   })
    // }

    that.createAnimations()
    that.openCardAnimation()
    that.tideAnimation()
    setTimeout(function() {
      that.translateToLeft()
    }, 6000)
    setTimeout(function() {
      that.translateToRight()
    }, 7500)
    setTimeout(function() {
      that.translateAndScale()
    }, 9000)
    //字幕动画
    setTimeout(function() {
      that.setData({
        hidenGreeting: false
      })
      that.startGreetingAnim()
    }, 15000)
  },

  playMusic: function(url) {
    console.log('url', url)
    innerAudioContext.autoplay = true
    innerAudioContext.loop = true
    innerAudioContext.src = url
    innerAudioContext.onWaiting(() => {
      // wx.showLoading({
      //   title: '音乐加载中',
      // })
    })
    innerAudioContext.onCanplay(() => {
      // wx.hideLoading()
      innerAudioContext.play()
    })
    innerAudioContext.onError((res) => {
      console.log('播放错误', res.errMsg)
      console.log('播放错误码', res.errCode)
      wx.showModal({
        title: '音乐出错啦',
        content: '返回重新编辑贺卡？\r（或者点击右上角音乐图标试试）',
        success: function(res) {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    })
  },

  createAnimations: function() {
    this.animationLeft = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 2800,
      timingFunction: 'ease',
      // 延迟多长时间开始
      delay: 100,
      transformOrigin: 'left top 0',
      // transformOrigin: 'right top 0 ',
    })
    this.animationRight = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 2800,
      timingFunction: 'ease',
      // 延迟多长时间开始
      delay: 100,
      // transformOrigin: 'left top 0',
      transformOrigin: 'right top 0 ',
    })

    this.animationTraggle = wx.createAnimation({
      duration: 1500,
      delay: 1000
    })
    this.animationTide = wx.createAnimation({
      duration: 4000,
      delay: 1000
    })

  },
  /**
   *信封右侧打开动画
   */
  translateToRight: function() {
    var that = this
    that.animationRight.rotateY(180, 0).step()
    that.setData({
      //输出动画
      animation2: that.animationRight.export(),

    })
    setTimeout(function() {
      that.setData({
        rightstyle: '0',
      })
    }, 2800)
  },
  /**
   *信封左侧打开动画
   */
  translateToLeft: function() {
    var that = this
    that.animationLeft.rotateY(-180, 0).step()
    that.setData({
      //输出动画
      animation1: that.animationLeft.export()
    })
    setTimeout(function() {
      that.setData({
        leftstyle: 0
      })
    }, 2000)
  },
  /**
   *音乐图标事件
   */
  musicclick: function() {
    var temp = this.data.isStop
    this.setData({
      isStop: !temp
    })
    if (temp == true) {
      innerAudioContext.pause()
    } else {
      innerAudioContext.play()
    }
  },
  /**
   *贺卡背景平移放大动画
   */
  translateAndScale: function() {
    var that = this
    that.animation = wx.createAnimation({
      duration: 2000,
      delay: 500
    })
    that.animation.translateX(-230).step().translateX(0).scale(2.96, 2.66).step()
    setTimeout(function() {
      that.setData({
        middlestyle: 101
      })
    }, 2500)
    setTimeout(function() {
      that.setData({
        containarstyle: 102
      })
    }, 3000)
    that.setData({
      animation3: that.animation.export()
    })
  },
  /**
   *打开信封包装的“开”字图标动画
   */
  openCardAnimation: function() {
    var that = this
    that.animationTraggle.rotate(-180 * 2).step().opacity(0).step()
    that.setData({
      animation4: that.animationTraggle.export()
    })
  },
  /**
   *信封包装带动画
   */
  tideAnimation: function() {
    var that = this
    that.animationTide.opacity(0).step()
    that.setData({
      animation5: that.animationTide.export()
    })
  },

  //文字滚动动画
  startGreetingAnim: function() {
    var obj = new Object();
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.container').boundingClientRect()
    query.select('.list').boundingClientRect()
    query.exec((res) => {
      if (res[0] != null) {
        obj.container = res[0].height; // 框的height
        obj.list = res[1].height; // list的height
        this.greetingUtil(obj);
      }
    })
  },
  //文字滚动动画
  greetingUtil: function(obj) {
    var that = this
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
    });
    that.animation = animation;
    animation.translateY(obj.container).step({
      duration: 50,
      timingFunction: 'step-start'
    }).translateY(-obj.list).step({
      duration: 10000
    });
    that.setData({
      animationData: animation.export()
    })
    setInterval(() => {
      animation.translateY(obj.container).step({
        duration: 50,
        timingFunction: 'step-start'
      }).translateY(-obj.list).step({
        duration: 10000
      });
      that.setData({
        animationData: animation.export()
      })
    }, 10000)
  },
  scancard: function() {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  onUnload: function() {
    innerAudioContext.stop()
    innerAudioContext.destroy()
  },
  navigateToHome: function() {
    wx.switchTab({
      url: '../cardhome/cardhome',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    console.log('shareId', this.data.shareId)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '收到来自' + this.data.shareData.username + "的贺卡",
      // path: '/pages/cardhome/cardhome'
    }
  },
  onShow: function() {

  }
})