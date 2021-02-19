let ajaxTimes = 0; //记录发送请求的次数
export const request=(params)=>{
    ajaxTimes ++;
    //开启等待图标
    wx.showLoading({
        title: '疯狂加载中...',
        mask: true
    })
    return new Promise((reslove,reject)=>{
        var reqTask = wx.request({
            ...params,
            success:(result)=>{
                reslove(result);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--
                if(ajaxTimes===0){
                //关闭等待图标
                wx.hideLoading();
                }
            }
        });
         
    })
}