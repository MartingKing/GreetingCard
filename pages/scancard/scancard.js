const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    imgOpacity: 1,
    userInfo: null,
    backgroundurl: '',
    isHidden: false,
    middlestyle: 0,
    containarstyle: 0,
    hidenGreeting: true,
    isStop: true,
    animationData: null,
    greetingwords: "",
    src: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var words = options.greetingwords
    var coverid = options.coverid
    var coverImgList = app.globalData.globalCardList
    var that = this
    that.setData({
      userInfo: app.globalData.userInfo,
      backgroundurl: coverImgList[coverid - 1].imgUrl
    })
    setTimeout(function() {
      that.setData({
        greetingwords: words,
      })
    }, 13800)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('https://sz-btfs.ftn.qq.com/ftn_handler/809ab44cce265ae1b132c02c3e7debd7de330b00c1e3442541e63062d17ce3fdbe5112907a9a58281138ad9086f5d0c6cbbeed3b820fbda564988af962697b5e/?fname=%E5%BA%BE%E6%BE%84%E5%BA%86-%E6%83%85%E9%9D%9E%E5%BE%97%E5%B7%B2.mp3')
    this.audioCtx.play()
  },
  onShow: function() {
    var that = this
    that.createAnimations()
    that.openCardAnimation()
    that.tideAnimation()
    setTimeout(function() {
      that.translateToLeft()
    }, 4500)
    setTimeout(function() {
      that.translateToRight()
    }, 6000)
    setTimeout(function() {
      that.translateAndScale()
    }, 8000)
    //字幕动画不运作  todo
    setTimeout(function() {
      that.setData({
        hidenGreeting: false
      })
      that.startGreetingAnim()
    }, 13700)
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
    this.animationRight.rotateY(180, 0).step()
    this.setData({
      //输出动画
      animation2: this.animationRight.export()
    })
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
        isHidden: true
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
      this.audioCtx.pause()
    } else {
      this.audioCtx.play()
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
    that.animation.translateX(-230).step().translateX(0).scale(2.05, 2.14).step()
    setTimeout(function() {
      that.setData({
        middlestyle: 101
      })
    }, 2500)
    setTimeout(function() {
      that.setData({
        containarstyle: 102
      })
      console.log(that.data.containarstyle)
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
      obj.container = res[0].height; // 框的height
      obj.list = res[1].height; // list的height
      // return obj;
      this.greetingUtil(obj);
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
})