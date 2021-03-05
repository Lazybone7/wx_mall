// pages/goods/goods.js
var util = require('../../utils/data.js');
var utils = require('../../utils/util.js');
import {request} from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_URL:"https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg",
    like:0,
    brandId:0,
    goodsObj:{},
    comment:'',
    commentList:[],
    commentListLength: 0,
    userInfo:{}
  },
  onIWantClick(){
      var detail = this.data.goodsObj;
      wx.navigateTo({
        url: '/pages/chat/chat?goodsObj=' + JSON.stringify(detail),
      })
  },
  getUserInfo(){
   let userInfo =  wx.getStorageSync('userInfo');
   this.setData({
     userInfo
   })
  },
  async getGoodsDetail(brandId){
    const goods =await request({url:"http://localhost:88/api/product/brand/detail",data:{brandId}});
    let goodsObj = goods.data.data;
    this.setData({
        goodsObj
    })
  },
  getComment : function(e){
    this.setData({
      comment: e.detail.value
    })
  },
  sendCommentClick(){
    var that = this;
    let timeRelease = utils.formatDate(Date.now(),'yyyy-MM') ;
    let content = this.data.comment;
    let brandId = this.data.brandId;
    let memberId = this.data.userInfo.id;
    let data={
      timeRelease,
      content,
      brandId,
      memberId
    }
    util.getProduct('/comment/comment/save',data).then(resp=>{
      that.onLoad({brandId:that.data.brandId});
    });
    
  },

   async getBrandComment(brandId){
     var that = this;
     await request({url:"http://localhost:88/api/product/comment/commentInfo/" + brandId}).then(resp=>{
      that.setData({
        commentList:resp.data.comment,
      })
      that.setData({
        commentListLength:that.data.commentList.length
      })
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      value:''
    })
    let brandId = options.brandId;
    this.setData({
      brandId
    })
    await this.getUserInfo()
    await this.getGoodsDetail(brandId);
    await this.getBrandComment(this.data.brandId);
  },


  handleLikeTap(){
    let {like} = this.data;
    if(like===1){
      like = 0;
    }else{
      like = 1;
    }
    this.setData({
      like
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