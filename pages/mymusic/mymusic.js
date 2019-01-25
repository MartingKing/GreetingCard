// pages/mymusic/mymusic.js
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicData: [],
    isplay: false,
    collected: true,
    showtips: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.hidetips()
    wx.request({
      url: 'https://www.lizubing.com/article/cover/music/list',
      data: {
        pageNo: 1,
        pageSize: 31,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log('coverImg', res.data)
        var datalist = res.data.data.list
        for (var i in datalist) {
          //往集合中添加一个bool型数据，用于控制播放暂停按钮的切换
          datalist[i].isCheck = false
        }
        console.log('datalist', datalist)
        //应该是用户滑动到底了再重新设置
        that.setData({
          musicData: datalist,
        })
      }
    })
  },

  playmusic: function(e) {
    let id = e.currentTarget.dataset.id
    innerAudioContext.seek(1)
    for (var i in this.data.musicData) {
      if (id == this.data.musicData[i].musicId - 1) {
        innerAudioContext.src = this.data.musicData[i].musicUrl 
        if (this.data.musicData[i].isCheck == false) {
          this.data.musicData[i].isCheck = true
          this.setData({
            musicData: this.data.musicData
          })
        } else {
          this.data.musicData[i].isCheck = false
          this.setData({
            musicData: this.data.musicData
          })
        }
      }
    }

    var postCollected = this.data.collected
    this.setData({
      collected: !postCollected
    })
    console.log('postCollected', postCollected)
    if (postCollected) {
      innerAudioContext.play()
    } else {
      innerAudioContext.stop()
      innerAudioContext.pause()
    }
  },
  gotolastpage: function(e) {
    console.log('musicInfo', e)
    var musicId = e.currentTarget.dataset.musicdata.musicId 
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    prevPage.setData({
      musicid: musicId
    })
    innerAudioContext.stop()
    wx.navigateBack()
  },

  hidetips() {
    var that = this
    setTimeout(function () {
      that.setData({
        showtips: true
      })
    }, 5000)
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