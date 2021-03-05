// pages/login/index.js
var util = require('../../utils/md5.js')
import {request} from '../../utils/request.js';
Page({

  handlegetUserInfo(e){
    console.log(e);
      const {userInfo} = e.detail;
      wx.setStorageSync("userInfo", userInfo); 
      wx.navigateBack({
        delta: 1
      });
        
  },

  

  /**
   * 页面的初始数据
   */
  data: {
    btnstate:"default",
    disabled:"true",
    accountName:"",
    password:""
  },
  accountInput:function(e){
    var value = e.detail.value;
    if(value!=""){
      this.setData({
        disabled:false,
        btnstate:"primary",
        accountName:value
      });
    }else{
        this.setData({
          disabled:true,
          btnstate:"default"
        })
    }
  },
  pwBlur:function(e){
    var value = e.detail.value;
    if(value!=""){
      value = util.md5(value);
      this.setData({
        disabled:false,
        btnstate:"primary",
        password:value
      });
    }else{
        this.setData({
          disabled:true,
          btnstate:"default"
        })
    }
  },
  //验证用户输入的合法性
  verify(){
 
  },

  login(){
      let {accountName,password} = this.data;
      //封装用户信息
      let data = {
        accountName,
        password
      }
      console.log(123);
      var reqTask = wx.request({
        url: 'http://localhost:88/api/member/member/login',
        data: data,
        method: 'POST',
        success: (result) => {
          
           let {userInfo} = result.data;
            if(userInfo ===""){
              wx.showToast({
                title: '登录失败',
              });       
            }else{
              wx.setStorageSync("userInfo", userInfo);
              wx.switchTab({
                url:"/pages/index/index"
              });     
            }
        },
      });
        
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
