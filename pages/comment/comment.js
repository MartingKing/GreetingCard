//madecard.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

var loadmoredata = []

Page({
  data: {
    userInfo: {},
    commentlist: [],
    inputValue: null,
    id: '',
    usercomment: null,
    offset: 1,
    totalsize: 0,
  },
  submit: function() {
    var that = this
    wx.showLoading({
      title: '提交中',
    })

    wx.request({
      url: 'https://www.lizubing.com/article/comment/add',
      method: 'POST',
      data: {
        comment: that.data.usercomment,
        userId: app.globalData.userid,
        coverId: that.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log('submit comment:', res)
        //增加评论后刷新数据
        that.getComment(false)
        wx.hideLoading()
        that.setData({
          inputValue: ''
        })
      }
    })
  },
  commentinput: function(e) {
    var commentcontent = e.detail.value
    this.setData({
      usercomment: commentcontent
    })
  },
  onLoad: function(params) {
    loadmoredata = []
    var param = ''
    if (params != null) {
      param = params.coverid
    }
    console.log('coverid--', param)
    var that = this
    that.setData({
      id: param,
    })
    that.getComment(false)
    that.setData({
      userInfo: app.globalData.userInfo,
    })
  },
  getComment(isloadmore) {
    var that = this
    wx.showLoading({
      title: '玩命加载中',
    })

    if (isloadmore) {
      that.setData({
        offset: that.data.offset + 1
      })
    }
    wx.request({
      url: 'https://www.lizubing.com/article/comment/list',
      header: {
        'content-type': 'application/text'
      },
      data: {
        coverId: that.data.id,
        pageNo: that.data.offset,
        pageSize: '10'
      },
      success: function(res) {
        wx.hideLoading()
        var dataset = res.data.data.list
        for (var i in dataset) {
          loadmoredata.push(dataset[i])
        }
        that.setData({
          totalsize: res.data.data.total,
          commentlist: loadmoredata,
        })
        console.log('data--', res.data)
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

  onReachBottom: function() {
    var that = this;
    var dataLength = loadmoredata.length
    var totalSize = that.data.totalsize
    console.log('dataLength', dataLength, '\r\n', 'totalSize', totalSize)
    console.log('loadmoredata', loadmoredata)
    if(dataLength<totalSize){
      that.getComment(true)
    }else{
      wx.showToast({
        title: '到底了',
      })
    }
  }
})