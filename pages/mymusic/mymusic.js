// pages/mymusic/mymusic.js
const innerAudioContext = wx.createInnerAudioContext()
var loadmoredata = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicData: [],
    isplay: false,
    collected: true,
    showtips: false,
    totalsize: 0,
    offset: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    loadmoredata = []
    this.getMusicList(false)
    this.hidetips()
  },
  getMusicList(isloadmore) {
    var that = this
    wx.showLoading({
      title: '数据加载中...',
    })
    if (isloadmore) {
      that.setData({
        offset: that.data.offset + 1
      })
    }
    wx.request({
      url: 'https://www.lizubing.com/article/cover/music/list',
      data: {
        pageNo: that.data.offset,
        pageSize: 8,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        wx.hideLoading()
        var datalist = res.data.data.list
        for (var i in datalist) {
          //往集合中添加一个bool型数据，用于控制播放暂停按钮的切换
          loadmoredata.push(datalist[i])
          loadmoredata[i].isCheck = false
        }
        console.log('datalist', datalist)
        //应该是用户滑动到底了再重新设置
        that.setData({
          totalsize: res.data.data.total,
          musicData: loadmoredata,
        })
      }
    })
  },
  playmusic: function(e) {
    let id = e.currentTarget.dataset.id
    innerAudioContext.autoplay = true
    innerAudioContext.loop = true
    innerAudioContext.onWaiting(() => {
      wx.showLoading({
        title: '音乐加载中...',
      })
    })
    innerAudioContext.onCanplay(() => {
      wx.hideLoading()
      console.log('onCanplay')
    })
    var postCollected = this.data.collected
    for (var i in this.data.musicData) {
      if (id == this.data.musicData[i].musicId - 1) {
        innerAudioContext.src = this.data.musicData[i].musicUrl
        if (this.data.musicData[i].isCheck == false) {
          this.data.musicData[i].isCheck = true
          innerAudioContext.play()
          this.setData({
            collected: true,
            musicData: this.data.musicData
          })
        } else {
          innerAudioContext.pause()
          this.data.musicData[i].isCheck = false
          this.setData({
            collected: false,
            musicData: this.data.musicData
          })
        }
      }
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
    wx.navigateBack()
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
      that.getMusicList(true)
    } else {
      wx.showToast({
        title: '到底了',
      })
    }
  },
  hidetips() {
    var that = this
    setTimeout(function() {
      that.setData({
        showtips: true
      })
    }, 4000)
  },
  onUnload: function() {
    innerAudioContext.stop()
  }
})