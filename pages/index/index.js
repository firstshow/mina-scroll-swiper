Page({
  data: {
    list: [ // scrollList
      {
        name: '111'
      },
      {
        name: '222'
      }
    ],
    catchTouchMoveEvent: 'catchtouchmove', // 禁止滑动事件名参数；当为null的时候，不会禁止滑动；
    isShort: true, // 翻页时候是否可以抖动
    nowIndex: 0 // 当前所在第几页
  },
  /**
   * @func 向下滑动，滑动到顶部的回调
   * @author zc
   * @params e 元素对象
   */
  upper(e) {
    console.log('到顶了', e)
    this.setData({
      catchTouchMoveEvent: 'catchtouchmove'
    })
  },
  /**
   * @func 向上滑动，滑动到底部的回调
   * @author zc
   * @params e 元素对象
   */
  lower (e) {
    console.log('到底了', e)
    this.setData({
      catchTouchMoveEvent: null
    })
  },
  /**
   * @func 向上切换页面的时候，进行抖动
   * @author zc
   * @params e 元素对象
   */
  touchmove (e) {
    if (e.target.id === 'blue' && this.data.isShort) {
      this.setData({
        isShort: false
      })
    
      // 震动
      wx.vibrateShort({
        success (res) {
          console.log('成功', res)
        },
        complete (res) {
          console.log('成功', res)
        },
        fail (res) {
          console.log('失败', res)
        },
      })
    }
  },
  /**
   * @func 当页面切换临界点，未完全切换时候促发，此时往回滑动还是能还原的；此时屏蔽滑动事件，以防他往回滑动
   * @author zc
   * @params e 元素对象
   */
  swiperChange () {
    this.setData({
      catchTouchMoveEvent: 'catchtouchmove',
    })
  },
  /**
   * @func 当swiper切换动画完成后的回调函数
   * @author zc
   * @params e 元素对象
   */
  swiperAnimationfinish (e) {
    console.log('切换动画结束啦', e.detail.current, this.data.nowIndex)
    let dataObj = {
      isShort: true,
    }
    // 当前与存储的index页码不一致的时候，表示已经切换了；为了区分滑动一半返回去的情况
    if (e.detail.current !== this.data.nowIndex) {
      let list = this.data.list
      list.push({
        name: Date.parse(new Date())
      })
      dataObj = {
        ...dataObj,
        list,
        nowIndex: e.detail.current
      }
    }

    this.setData(dataObj)
  },
  /**
   * @func 禁止滑动
   * @author zc
   */
  catchtouchmove () {
    return false
  }
})