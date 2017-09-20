import api from '../../utils/api.js'
Page({
  data: {
    feed: {},
    carousels: [],   // 轮播图
    recommendeds: [], //推荐活动类型
    acts: [],  //首页货架模板
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    firstCategoryList: [], //一级分类
    secondCateGoryList: [], //二级
    scrollWidth: 750,
    srollHeight:600,
    categoryList: [], //商品分类
    categoryListId:[], //存放商品分类Id
    scrollId:"scroll0", //头部滚动Id
    categories:[], //分类商品
    canshow:true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.loadData();
    /** 
    * 获取系统信息 
    */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    width: 0,
      that.setData({ width: 1050 });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this;
    wx.getSystemInfo({
        success: function(res) {
          var height = res.windowHeight - 80*res.windowWidth/750;   //footerpannelheight为底部组件的高度
        that.setData({
           srollHeight: height
        });
        }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /* 滑动切换tab 
   */
  bindChange: function (e) {
    var that = this;
  
    scrollId: "scroll0",
      that.setData({ currentTab: e.detail.current, canshow:false});
    var id = that.data.categoryListId[e.detail.current];
    that.setData({
      categories: []
    });
    if (that.data.currentTab > 3) {
      this.setData({ scrollId: "scroll" + (e.detail.current-4) });
    }
    api.SearchAndCategoryByCategoryId({
      data: {
        parameters: { orderId: 0, categoryId: id }
      },
      success: (res) => {
        if (res.data.data.categories && res.data.data.categories != {}) {
          var datas = res.data.data.categories;
          
          // success
          var arr = [];
          for (var i = 0; i < datas.length; i++) {
            var cur = datas[i];
            console.log(cur.goods);
            if (cur.goods && cur.goods.length > 5) {
              cur.goods = cur.goods.splice(0, 5);
            }
            var tmpl = {
              id: cur.id,
              name: cur.name,
              goods:cur.goods
            }
            arr.push(tmpl);
          };
          that.setData({
            categories:arr
          });
          setTimeout(() => { that.setData({ canshow: true });},500);
        }
      }
    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
   
    that.setData({
      categories: []
    });
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  goGoodsDetail(e){
    wx.navigateTo({
      url: '../cart/detail/detail?goodsId=' + e.currentTarget.dataset.goodsid,
    })
  },
  addCart(){//加入购物车
    wx.showToast({
      title: '加入购物车',
      icon:"sucess"
    })
  },
  modeltap(e){
    console.log(e);
    wx.showToast({
      title: '您点击了我',
      image:"../../images/uload1.png"
    })
  },
  loadData: function () {
    //获取分类
    var that = this;
     api.getCategoryListFromPid({
       data: {
         parameters: { parentId: 0 }
       },
       success: (res) => {
         if (res.data.data && res.data.data != {}) {
           // success
           var datas = res.data.data;
           that.setData({
             scrollWidth: 160 * datas.length
           });
           var arr = [],idArr = [];
           idArr.push(0);
           for (var i = 0; i < datas.length; i=i+2) {
             var cur = datas[i];
             that.setData({ categoryList: arr });
             idArr.push(cur.id);
             var tmpl = {
               id: cur.id,
               name: cur.name
             }
             arr.push(tmpl);
           };
           that.setData({ categoryList: arr, categoryListId: idArr});
         }
       }
     });
    //获取首页轮播图
    api.getAppLayoutamend({
      data: {
        parameters: { version: "4.8.0", source: "I" }
      },
      success: (res) => {
        // console.log(res)
        if (res.data.data && res.data.data != {}) {
          // success
          that.setData({
            feed: res.data,
            carousels: res.data.data.carousel,
            recommendeds: res.data.data.recommendedContent["0"].items
          });
        }
      }
    });
    api.getActsamend({
      data: {
        parameters: { version: "4.8.0", source: "I" }
      },
      success: (res) => {
        // console.log(res)
        if (res.data.data && res.data.data != {}) {
          var acts = [];
          if (res.data.data.acts.length>20){
            acts = res.data.data.acts.slice(0,20);
          }
          // success
          that.setData({
            acts: acts
          });
        }
      }
    });
  },
  goDetail() {
    wx.navigateTo({
      url: '../cart/detail/detail?id=1',
    })
  },
  updateCategoryListData: function (categoryListArray) {
    var that = this;
    var leftArray = this.data.firstCategoryList;
    var rightArray = this.data.secondCateGoryList;
    for (let i = 0; i < categoryListArray.length; i++) {
      var object = categoryListArray[i];
      if (object.menu == '1') {
        leftArray.push(object);
      } else if (object.menu == '2') {
        rightArray.push(object);
      }
    }
    that.setData({
      firstCategoryList: leftArray,
      secondCateGoryList: rightArray,
    })
  },
  refresh: function () {
    //this.loadData();
  },
  upper: function () {
    //this.refresh();
  },
  lower: function () {

  }
})