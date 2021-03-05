//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/data');
import {request} from '../../utils/request.js';
Page({
  data: {
    activeNames: ['0'],
    cateList:[],
    secondCateList:[],
    thirdCateList:[],
    cateIndex:1,
    secondIndex:0,
    categoryPath:[],
    modalView:false,
    cateId:0,
  },
  onSelectCateClick(e){
    console.log(e)
    let categoryPath = [];
    this.setData({
      ['categoryPath[2]']:e.currentTarget.dataset.item.name,
      cateId:e.currentTarget.dataset.item.catId, 
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      categoryPath : this.data.categoryPath,
      cateId:this.data.cateId
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  onGetSecondListClick(e){
    var that = this
    let categoryPath = []
    categoryPath[0] = this.data.cateList[e.currentTarget.dataset.data].name
    let secondCateList = this.data.cateList[e.currentTarget.dataset.data].children
    that.setData({
      ['categoryPath[0]']: this.data.cateList[e.currentTarget.dataset.data].name,
      secondCateList
    })
    this.setData({
      secondIndex:this.data.cateList.length + 1
    })
  },
  onGetThirdListClick(e){
    let categoryPath = []
    categoryPath[1] = this.data.secondCateList[e.currentTarget.dataset.data].name
    let thirdCateList = this.data.secondCateList[e.currentTarget.dataset.data].children
    this.setData({
      categoryPath,
      thirdCateList
    })
    this.setData({
      secondIndex:this.data.cateList.length + 1
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  getAllCategory(){
    util.getProduct('/category/list/tree').then(resp=>{
      this.setData({
          cateList:resp.data.data
      });
      this.setData({
        modalView:true
      })
    })
  },
  onLoad: function(){
    this.getAllCategory();

  },
})
