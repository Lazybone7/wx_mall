// pages/category/category.js
var util = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    item:0,
    cateList:[],
    secondCateList:[]
  },
  onShow: function() {
    
  },
  onChange(e){
    let item = e.detail;
    this.setData({
      item
    })
  },
  tabBar(){
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tabBar();
    this.getProductCategory();
    
  },
  //点击分类图标事件
  onClickCateItem(e){
    console.log(e);
      let cateId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/goodsList/goodsList?cateId=' + cateId,
      })
  },
  // 获取分类信息
  getProductCategory(){
      util.getProduct('/category/list/tree').then(resp=>{
          let cateList = resp.data.data;
          this.setData({
            cateList
          })
      });
  },
  //-------------------------
  //分类列表点击事件
  onClickCateChange(e){
    let index = e.currentTarget.dataset.index;
    let secondCateList = index.children;
    console.log(secondCateList);
    this.setData({
      secondCateList
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