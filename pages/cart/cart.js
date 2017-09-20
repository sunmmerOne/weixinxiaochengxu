// pages/cart/cart.js
Page({

  data: {
    checkedBol1: false,
    checkedBol2: false,
    checkedBol3: false,
    checkedBol4: false,
    checkedBol5: false,
    dayTab:0,
    currentTab:0
  },
  checkChoose1: function () {
    var that = this;
    that.setData({
      checkedBol1: !that.data.checkedBol1
    })
    console.log(that.data.checkedBol1);
  },
  checkChoose2: function () {
    this.setData({
      checkedBol2: !this.data.checkedBol2
    })
    console.log(this.data.checkedBol2);
  },
  checkChoose3: function () {
    this.setData({
      checkedBol3: !this.data.checkedBol3
    })
  },
  checkChoose4: function () {
    this.setData({
      checkedBol4: !this.data.checkedBol4
    })
  },
  checkChoose5: function () {
    this.setData({
      checkedBol5: !this.data.checkedBol5
    })
  },
  goGoodsDetail(e){
      wx.navigateTo({
        url: './detail/detail?goodsId=' + e.currentTarget.dataset.goodsid,
      })
  },
  //更改配送日期
  chooseDay:function(e){
    var that = this;
    that.setData({ dayTab: e.currentTarget.dataset.daychange });
    console.log(e.currentTarget.dataset.daychange);
  },
  // 更改配送时间
  changeTime:function(e){
    var that = this;
    that.setData({ currentTab: e.currentTarget.dataset.current });
    console.log(e.currentTarget.dataset.current);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})