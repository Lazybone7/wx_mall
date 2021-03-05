const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var util = require('../../utils/data');
var uuid = require('../../utils/util');
import {request} from '../../utils/request.js';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{},
      province: '',  
      city: '', 
      latitude: '',
      longitude: '',
      district: '',
      imgList:[],
      upLoadImgs:[],
      modalName:'',
      categoryPath:[],
      price: 0,
      startingPrice:0,
      shipping:0,
      data:{
        price:0,
        startingPrice:0,
        shipping:0,
      },
      name:'',
      descript:'',
      cateId:0,
  },
  onReleaseClick(){
    request({
      url:"http://localhost:88/api/thirdparty/oss/policy"

    }).then(response=>{   
      if(response === "error"){
        Dialog.alert({
          title: '发布失败',
          message: '请检查网络',
        }).then(() => {
          
        });  
        return;     
      }
      let policy = response.data.data.policy;
      let signature = response.data.data.signature;
      let ossaccessKeyId = response.data.data.accessid;
      let dir = response.data.data.dir;
      let host = response.data.data.host;
      this.data.imgList.forEach((v,i)=>{
        let key = response.data.data.dir+uuid.wxuuid()+v.substring(11,v.length);
        let formData = {
          policy:policy,
          signature:signature,
          key:key,
          ossaccessKeyId:ossaccessKeyId,
          dir:dir,
          host:host,
        } 
        var upTask = wx.uploadFile({
          url: 'http://mail123.oss-cn-hangzhou.aliyuncs.com',
          filePath: v,
          name: "file",
          formData: formData,
        });
        if(upTask!=undefined){
          let path = "http://mail123.oss-cn-hangzhou.aliyuncs.com/" + key;
          this.data.upLoadImgs.push(path);
        }else{
          Dialog.alert({
            title: '发布失败',
            message: '请检查网络',
          }).then(() => {
            
          });  
          return;
        } 
      })
        let data = {
          titleVal:this.data.name,
          contentVal:this.data.descript,
          price:this.data.data.price,
          startingPrice:this.data.data.startingPrice,
          shipping:this.data.data.shipping,
          upLoadImgs:this.data.upLoadImgs,
          cateName:this.data.categoryPath[2],
          memberId:this.data.userInfo.id,
          cateId:this.data.cateId,
        }
        util.getProduct('/brand/save/release',data).then(resp=>{
          Dialog.alert({
            title: '发布成功',
            message: '请等待审核结果',
          }).then(() => {
              wx.navigateTo({
                url: '/pages/success/success',
              })
          });  
        })
    });
  },
  bindTitle(e){
      this.setData({
        name:e.detail.value
      })
  },
  bindContent(e){
    this.setData({
      descript:e.detail.value
    })
  },
  onConfirmPriceClick(){
    let data = {
      price : this.data.price,
      startingPrice : this.data.startingPrice,
      shipping : this.data.shipping,
    }
    this.setData({
      data
    })
    console.log(this.data.data)
    this.hideModal()
  },
  bindPrice(e){
    this.setData({
      price:e.detail.value
    })
  },
  bindStartingPrice(e){
    this.setData({
      startingPrice:e.detail.value
    })
  },
  bindShipping(e){
    this.setData({
      shipping:e.detail.value
    })
  },
  onSelectCate(){
    wx.navigateTo({
      url: '/pages/release/cateList',
    })
  },
  showModal(){
    console.log(111)
    this.setData({
      modalName:'modal1'
    })
  },
  hideModal(){
    this.setData({
      modalName:''
    })
  },
  onSelectAddressClick(e){
    let address = e.detail.value;
    let province = address[0];
    let city = address[1];
    let district = address[2];
    this.setData({
      province,
      city,
      district
    })
    console.log(e);
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '图片删除',
      content: '确定要删除么？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync("userInfo");
    this.setData({
      userInfo
    })
    qqmapsdk = new QQMapWX({
      key: 'QQUBZ-3INK6-N3ESZ-EETUQ-PJQ6T-UPFW4' //key秘钥进行填充
    });
    this.getUserLocation();
    let vm = this;
    vm.getUserLocation();
  },
    //获取用户地理位置
    getUserLocation(){
      let vm = this;
      wx.getSetting({
        success: (res) => {
          // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
          // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
          // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
          if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        //再次授权，调用wx.getLocation的API
                        
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] == undefined) {
            //调用wx.getLocation的API
            vm.getLocation();
          }
          else {
            //调用wx.getLocation的API
            vm.getLocation();
          }
        }
      })
    },
    //获取当前位置的经纬度
    getLocation: function () {
      let vm = this;
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy;
          vm.getLocal(latitude, longitude)
        },
        fail: function (res) {
          console.log('fail' + JSON.stringify(res))
        }
      })
    },
    // 获取当前地理位置
    getLocal: function (latitude, longitude) {
      let vm = this;
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          let province = res.result.ad_info.province
          let city = res.result.ad_info.city
          let district = res.result.ad_info.district
          vm.setData({
            province: province,
            city: city,
            district:district,
            latitude: latitude,
            longitude: longitude
          })
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          // console.log(res);
        }
      });
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