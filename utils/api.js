const host = 'https://api5.wochu.cn/client/v1/';
const wxRequest = (params, url,useLoad) => {
  if (!useLoad){
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
  }
  wx.request({
    url: url,
    data: params.data || {},
    method: params.method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'Content-Type': 'application/json'
    }, // 设置请求的 header
    success: function (res) {
      // success
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: function () {
      // fail
      params.fail && params.fail(res)
    },
    complete: function () {
      // complete
      params.complete && params.complete(res)
    }
  })
}


//首页 index
const getAppLayoutamend = (params) => wxRequest(params, host + "app/layoutamend")
const getActsamend = (params) => wxRequest(params, host + "actsamend")

//获取分类列表
const getCategoryListFromPid = (params) => wxRequest(params, host + "Goods/GetCategoryListFromPid")
const SearchAndCategoryByCategoryId = (params) => wxRequest(params, host + "goods/SearchAndCategoryByCategoryId",true)
const getGetCategoryRecommendList = (params) => wxRequest(params, host + "goods/GetCategoryRecommendList")
const getCategoryListByMenuId = (params) => wxRequest(params, host + 'Goods/GetCategoryListByMenuId')

//购物车 cart
const getShippingDateList = (params) => wxRequest(params, host + 'shopcart/GetShippingDateList')




module.exports = {
  getAppLayoutamend,
  getActsamend,
  getShippingDateList,
  SearchAndCategoryByCategoryId,
  getCategoryListByMenuId,
  getCategoryListFromPid
}