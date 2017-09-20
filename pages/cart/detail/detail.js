// pages/cart/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    // 商品具体信息
    imgUrls: [], //轮播图
    goodsName: '',
    origin1:'',
    shelfLife:'',
    storageCondition:'',
    specification:'',
    price: '',
    marketPrice: '',
    imgIntro: [
      'http://img.i-kitchen.cn/upload/4e92d6d6-b467-4c46-8f43-e8b0fcfbcd35.jpg',
      'http://img.i-kitchen.cn/upload/9dd3194a-aca6-44e7-b1f3-b66ccccb4286.jpg',
      'http://img.i-kitchen.cn/upload/a75a8e7f-d014-4ece-a766-2defe5dfd384.jpg',
      'http://img.i-kitchen.cn/upload/b7de9991-31ee-47be-9cfb-7ec408c32aad.jpg'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api5.wochu.cn/client/v1/goods/imgLoopList', 
      method: 'get',
      data: {
        "parameters": '{"goodsGuid":"' + options.goodsId + '"}'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data);
        that.setData({
          imgUrls: res.data.data
        })
      }
    });
    wx.request({
      url: 'https://api5.wochu.cn/client/v1/goods/getInfo',
      method: 'get',
      data: {
        "parameters": '{"goodsGuid":"' + options.goodsId + '"}'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data);
        var datas = res.data.data;
        that.setData({
          // imgUrls: res.data.data
          goodsName: datas.goodsName,
          price: datas.price,
          marketPrice: datas.marketPrice,
          origin1: datas.origin1,
          shelfLife: datas.shelfLife,
          storageCondition: datas.storageCondition,
          specification: datas.specification
        })
      }
    })
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