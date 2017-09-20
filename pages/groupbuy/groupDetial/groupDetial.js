// pages/groupDetial/groupDetial.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodImg1: '',
    goodImg2: '',
    goodDate: '',
    residualTime:'',
    allPage:-1,
    pageIndex:1,
    otherArr:[],
    otherImg:[]
  },
  getOtherHotSaleList(pageSize, pageIndex, hotSale_Id){
    if ((this.data.pageIndex) == (this.data.allPage + 1)) {
      return false;
    }
    var param = '{"pageSize":' + pageSize + ',"pageIndex":' + pageIndex + ',"hotSale_Id":"' + hotSale_Id + '"}';
    wx.request({
      url: 'https://tg.wochu.cn/client/v1/groupBuy/OtherHotSaleList', //仅为示例，并非真实的接口地址
      data: {
        parameters: param
      },
      header: {
        'content-type': 'application/json'
      },
      success:  (res)=> {
        console.log('其他',res.data)
        var info = this.data.otherArr.concat(res.data.data.items);
        this.setData({ otherArr: info });
        this.setData({ pageIndex: ((this.data.pageIndex) + 1), allPage: res.data.data.pagination.pageCount });
        


      }
    })

  },
  getTimeStamp(times) {
    var datetimeArray = times.split(' ');
    var dateArray = datetimeArray[0].split('-');
    var timeArray = datetimeArray[1].split(':');
    var end_time = new Date(dateArray[0], (dateArray[1] - 1), dateArray[2], timeArray[0], timeArray[1], timeArray[2]).getTime();
    var time = end_time - new Date().getTime();
    if (time < 0) {
      var datestr = "此团已结束!"
    } else {
      var sys_second = (end_time - new Date().getTime()) / 1000;
      var day = Math.floor((sys_second / 3600) / 24);
      var hour = Math.floor((sys_second / 3600) % 24);
      var minute = Math.floor((sys_second / 60) % 60);
      var datestr = day + "天" + (hour < 10 ? "0" + hour : hour) + "小时" + (minute < 10 ? "0" + minute : minute) + "分";
    }
    return datestr;
  },
  getGoodsInfo(hid) {
    console.log(1)
    var u = "https://tg.wochu.cn/client/v1/groupBuy/Detail"
    wx.request({
      url: u,
      data: {
        parameters: { "hotSale_Id": hid }
      },
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.info(this)
        console.log(res.data.data)
        console.log(res.data.data.hotSaleImage)
        var residualTime = this.getTimeStamp(res.data.data.end_time);    
        this.setData({ goodDate: res.data.data, residualTime: residualTime});
        for (let i = 0; i < res.data.data.hotSaleImage.length; i++) {
          if (res.data.data.hotSaleImage[i].IMAGE_TYPE == 1) {
            this.setData({ goodImg1: res.data.data.hotSaleImage[i].URL });
          } else if (res.data.data.hotSaleImage[i].IMAGE_TYPE == 2) {
            this.setData({ goodImg2: res.data.data.hotSaleImage[i].URL });
          }
        }
        

        // this.setData({ goodDate: res.data });
        // this.data.goodDate = res.data;

      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsInfo(options.HID);
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
      console.log('111dddididid')

      this.getOtherHotSaleList(4, this.data.pageIndex,"4342a3a0df917c0ea521ba5ba870c876f6c9dc70ecfd8f90ba8598aa2401cd1a");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})