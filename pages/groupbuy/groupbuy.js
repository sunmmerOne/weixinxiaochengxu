// pages/groupBuy/groupBuy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pagei:1,
      allPage:-1,    
      goodsInfo:[],
  },
  goDeatail(e){
    console.log(e);
      wx.navigateTo({
        url: '../../../groupDetial/groupDetial?HID='+e.currentTarget.dataset.hid,
      })
  },
  getHotSaleList(pageSize, pageIndex){
    var groupBaseUrl = 'https://tg.wochu.cn/client/v1';
    console.info(this.data.pagei)
    if ((this.data.pagei) == (this.data.allPage+1)){
        return false;
    }

    var pageSize = 5;
    var pageIndex = this.data.pagei;

    wx.request({
      url: groupBaseUrl + "/groupBuy/HotSaleList", 
      data: {
        "parameters": '{"pageSize":' + pageSize + ',"pageIndex":' + pageIndex + '}'
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res)=> {
        var info = this.data.goodsInfo.concat(res.data.data.items);
        this.setData({ goodsInfo: info});

        this.setData({ pagei: ((this.data.pagei) + 1), allPage: res.data.data.pagination.pageCount});
        console.log(this.data.goodsInfo)

        this.getHotSaleList();
        


      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotSaleList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '团购'
    })
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