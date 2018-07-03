let {
  windowWidth,
  windowHeight
} = wx.getSystemInfoSync()

Component({
  properties: {
    x: {
      type: Number,
      value: windowWidth - 70
    },
    y: {
      type: Number,
      value: windowHeight - 75
    },
    visible: {
      type: Boolean,
      value: false
    }
  },

  created() {
    this.ctx.visible = true
  }
})
