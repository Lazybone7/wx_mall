import { request} from '../../utils/request.js';
var util = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberAddress:[],
    userInfo:{}
  },

  addAddress(){
    wx.navigateTo({
      url: '/pages/address/add',
    })
  },

  async getAllAddress(){
    await  request({url:'http://localhost:88/api/member/memberreceiveaddress/info/'+this.data.userInfo.id}).then(resp=>{
      console.log(resp)  
      this.setData({
          memberAddress:resp.data.memberReceiveAddress
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({userInfo});
    await this.getAllAddress();
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