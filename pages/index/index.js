//index.js
//获取应用实例
import { request} from '../../utils/request.js';
var util = require('../../utils/data.js');
const app = getApp()
Page({
  data: {
    active: 0,
    swiperList:[],
    productList:[],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    time: 30 * 60 * 60 * 1000,
    timeData: {},
  },
  //获取全部商品
  getProductList(){
    util.getProduct('/brand/brandlist').then(resp=>{
      console.log(resp)
      let productList = resp.data.data
      this.setData({
        productList
      })
    })
  },
  onClickPro(e){
    let brandId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/goods?brandId=' + brandId,
    })
  },
  onChange(e) {
    this.setData({
      timeData: e.detail,
    });
  },
  getSwiperList(){
    request({url:"http://localhost:88/api/thirdparty/swiper/img"})
    .then(data=>{
      console.log(data)
       this.setData({
       swiperList: data.data.message
       })
    })
  },
  onClickMessage(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  onClickSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  onShow: function() {
    this.tabBar();
  },
  tabBar(){
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      console.log("跳回到主页")
      this.getTabBar().setData({
        selected:0
      })
    }
  },
  onLoad: function () {
    this.getProductList();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getSwiperList();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


})
