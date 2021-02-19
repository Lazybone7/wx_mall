// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      show: false,
      selected: null,
      tabList: [
        {
          "pagePath": "pages/index/index", 
          "text": "首页"
        },
        {
          "pagePath": "pages/category/category",
          "text": "分类"
        },
        {
          "pagePath": "pages/cart/cart",
          "text": "购物车"
        },
        {
          "pagePath": "pages/user/user",
          "text": "我的"
        }
      ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    navigatorToRelease(){
      wx.navigateTo({
        url: '/pages/release/release',
      })
  },
    onClickShow() {
      if(this.data.show === true){
        this.onClickHide();
      }else{
        this.setData({ show: true });
      }
      
    },
  
    onClickHide() {
      this.setData({ show: false });
    },
    
    switchTab(e){  
      let key = Number(e.currentTarget.dataset.index);
      console.log(key)
      let tabList = this.data.tabList;
      let selected = this.data.selected;
      if(selected !== key){
        wx.switchTab({
          url: `/${tabList[key].pagePath}`,
        })
      }
    }
  }
})
