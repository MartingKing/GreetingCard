//madecard.js
const util = require('../../utils/util.js')

//获取应用实例
const app = getApp()
const mywords = ['新年佳节到，拜年要赶早，好运跟你跑，吉祥围你绕，财源进腰包，心想事就成，春节齐欢笑，我的祝福如此早，请你一定要收到！',
  '情人节快乐，预祝有情的你永远浪漫、热情的你永远青春、真情的你永远开心、纯情的你永远快乐、深情的你永远甜蜜、痴情的你永远幸福!'
]
var coverid = ''
Page({
  data: {
    userInfo: {},
    backgrounds: '',
    textcolor: '#000',
    greetingwords: '',
    showtips: false,
    isHidden: true,
    inputHidden: false,
    cancleBtn: false,
    inputFocus: false,
    inputMsg: '',
    inputPlaceHolder: '请输入祝福语（90字符以内）',
  },
  //点击显示dialog
  editgreetingworlds: function(e) {
    var content = e._relatedInfo.anchorTargetText
    var that = this;
    that.setData({
      isHidden: false,
      inputMsg: content,
      inputFocus: true,
      // inputPlaceHolder: "请输入想要发送的内容",
      inputHidden: false,
      // cancleBtn: true,
    })
  },

  scancard:function() {
    var that = this
    wx.getUserInfo({
      success: function(res) {
        //此处为获取微信信息后的业务方法
        wx.navigateTo({
          url: '../scancard/scancard?greetingwords=' + that.data.greetingwords + '&coverid=' + coverid,
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
    var coverImgList = app.globalData.globalCardList
    that.setData({
      backgrounds: coverImgList[coverid - 1].imgUrl,
      greetingwords: mywords[1]
    })
  },
  musicclick() {
    wx.navigateTo({
      url: '../mymusic/mymusic',
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
    setTimeout(function() {
      that.setData({
        showtips: true
      })
    }, 3000)
  }
})