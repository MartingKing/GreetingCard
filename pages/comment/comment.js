//madecard.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    commentlist: [],
    inputValue: null,
    id: '',
    usercomment:null,
  },
  submit: function() {
    var that = this
    wx.showLoading({
      title: '提交中',
    })
    console.log('userid', app.globalData.userid)
    console.log('coverid', this.data.id)
    console.log('comment', this.data.usercomment)
    wx.request({
      url: 'https://www.lizubing.com/article/comment/add',
      method: 'POST',
      data:{
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
        that.getComment()
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
    var param = ''
    if (params != null) {
      param = params.coverid
    }
    console.log('coverid--', param)
    var that = this
    that.setData({
      id: param,
    })
    that.getComment()
    that.setData({
      userInfo: app.globalData.userInfo,
    })
  },
  getComment() {
    var that = this
    wx.showLoading({
      title: '请求中',
    })
    wx.request({
      url: 'https://www.lizubing.com/article/comment/list',
      data: {
        coverId: that.data.id,
        pageNo: '1',
        pageSize: '20'
      },
      success: function(res) {
        wx.hideLoading()
        var dataset = res.data.data.list
        that.setData({
          commentlist: dataset,
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

})