Component({
  properties: {
    inputPlaceHalder: {
      type: String,
      value: ' ',
    },

    inputHidden: {
      type: Boolean,
      value: true
    },

    dialogHidden: {
      type: Boolean,
      value: true
    },

    // 这里定义了innerText属性，属性值可以在组件使用时指定
    titleText: {
      type: String,
      value: '提示',
    },
    titleMsg: {
      type: String,
      value: ' ',
    },

    inputMsg: {
      type: String,
      value: '请输入...',
    },
    //确定
    determineBtn: {
      type: String,
      value: 'default value',
    },
    //取消
    cancleBtn: {
      type: Boolean,
      value: true,
    },
    inputFocus: {
      type: Boolean,
      value: false,
    },
    dialogTop: {
      type: String,
      value: '28%',
    }
  },

  data: {
    // 这里是一些组件内部数据
    inputValue: '',
    onCancleClick: false,
  },

  methods: {
   
    //自定义方法  选择贺词跳转页面后关闭dialog
    choicewords: function(e) {
      this.triggerEvent('choicewords', e)
      this.setData({
        dialogHidden: true,
      })
    },
    // 这里是一个自定义方法,取消
    cancleBtn: function() {
      // Properties pro = new Properties();
      this.setData({
        dialogHidden: true,
      })

    },

    // 确定
    determineBtn: function(e) {
        
      var determineDetail = this.data.inputValue // detail对象，提供给事件监听函数
      this.triggerEvent('determineevent', determineDetail)
      console.log('确定', e)
      this.setData({
        inputValue: ""
      })
    },
    //输入完成 监听点击完成的回调方法
    // bindFormSubmit: function(event) {
    //   this.triggerEvent('inputfinish', event)
    //   this.setData({
    //     dialogTop: '50%'
    //   })
    // },
     // 输入值 和 dialog位置控制
    bindinput:function(e){
      console.log('bindinput2', e)
      this.triggerEvent('bindinput', e)
      this.setData({
        // inputFocus: true,
        inputValue: e.detail.value,
        // dialogTop: '50%'
      })
    },
    // textareaFocus:function(e){
    //   this.triggerEvent('textareaFocus', e)
    //   this.setData({
    //     inputFocus: true,
    //     dialogTop: '29%'
    //   })
    // }
  }
})