
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData: { 
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleTap(e) {
      var params = e.target.id
      console.log('卡片id：', e)
      wx.navigateTo({
        url: '../madecard/madecard?id=' + params
      })
    }
  }
})