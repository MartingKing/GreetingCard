//madecard.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
var commentcontent = ''
var coverid = ''
Page({
  data: {
    userInfo: {},
    commentlist: [],
    inputValue:''
  },
  submit: function() {
    var that = this
    wx.showLoading({
      title: '提交中',
    })
    wx.request({
      url: 'https://www.lizubing.com/article/comment/add',
      data: {
        comment: commentcontent,
        userId: app.globalData.userid,
        coverId: coverid
      },
      success(res) {
        console.log('submit comment:', res)
        //增加评论后刷新数据
        that.onLoad()
        wx.hideLoading()
        that.setData({
          inputValue:''
        })
      }
    })
  },
  commentinput: function(e) {
    commentcontent = e.detail.value
  },
  onLoad: function(params) {
    coverid = params.coverid
    console.log('coverid--', coverid)
    var that = this
    wx.showLoading({
      title: '请求中',
    })
    wx.request({
      url: 'https://www.lizubing.com/article/comment/list',
      data: {
        coverId: coverid,
        pageNo: '1',
        pageSize: '20'
      },
      success: function(res) {
        wx.hideLoading()
        var dataset = res.data.data.list
        that.setData({
          commentlist: dataset
        })
        console.log('data--', res.data)
      }
    })

    this.setData({
      userInfo: app.globalData.userInfo,
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

})