import { request} from '../../utils/request.js';
var util = require('../../utils/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address1:[],
    address:'',
    detailAddress:'',
    name:'',
    phoneNum:'',
    postCode:'',
    userInfo:{}
  },
  onSaveClick(){
    var that = this.data;
    let data = {
      memberId:that.userInfo.id,
      name:that.name,
      phoneNum:that.phoneNum,
      postCode:that.postCode,
      province:that.address1[0],
      city:that.address1[1],
      region:that.address1[2],
      detailAddress:that.detailAddress,
      defaultStatus:0,
    };
     util.getMember('/memberreceiveaddress/save',data).then(resp=>{
        var pages = getCurrentPages()
        pages[pages.length -2 ].onLoad() 
        wx.navigateBack({

          delta: 1,
        })
     });

  },
  bindPostCode(e){
    this.setData({
      postCode:e.detail.value
    })
  },
  bindPhoneNum(e){
    this.setData({
      phoneNum:e.detail.value
    })
  },
  bindName(e){
    this.setData({
      name:e.detail.value
    })
  },
  bindAddressDetail(e){
      this.setData({
        detailAddress:e.detail.value
      })
  },
  bindRegionChange(e){
    console.log(e);
    let address1 = e.detail.value;
    let address = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];
    this.setData({
      address,
      address1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo
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