//logs.js
const util = require('../../utils/util.js')
import { set1, get1 } from '../../class/stroage.js'
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    console.log(get1())
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
