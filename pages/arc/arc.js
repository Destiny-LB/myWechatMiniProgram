// pages/arc/arc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    diameterLength: '',
    arcLength: '',
    chordLength: '',
    chordHeight: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    console.log("触发下拉...");
    this.setData({
      diameterLength: '',
      arcLength: '',
      chordLength: '',
      chordHeight: '',
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '独饮花间酒 - 圆弧计算工具',
      path: '/pages/arc/arc',
      success: function (res) {
        // 分享成功
        gio('track', 'shareSuccess', { 'sharedPage': this.title })
      },
      fail: function (res) {
        // 分享失败
        gio('track', 'shareFail')
      }
    }
  },
  
  /**
   * 获取直径
   */
  getDiameter: function (e) {
    this.setData({
      diameterLength: e.detail.value,
    });
  },

  /**
   * 获取弧长
   */
  getArc: function (e) {
    this.setData({
      arcLength: e.detail.value,
    });
  },

  /**
   * 获取计算结果
   */
  getResult: function () {
    if(this.data.diameterLength == ''){
      wx.showToast({
        title: "请先输入直径",
        icon: "error",
        duration: 800,
      });
      return;
    }
    if(this.data.arcLength == ''){
      wx.showToast({
        title: "请先输入弧长",
        icon: "error",
        duration: 800,
      });
      return;
    }
    else{
      console.log("DiameterLength:" + this.data.diameterLength);
      console.log("ArcLength:" + this.data.arcLength);
      var diameter = parseFloat(this.data.diameterLength);
      var arc = parseFloat(this.data.arcLength);
      if (diameter * Math.PI <= arc) {
        wx.showToast({
          title: "请检查数据",
          icon: "error",
          duration: 800,
        });
        console.log("Data error!");
        return;
      }
      else {
        this.setData({
          chordLength: String((diameter*Math.sin(arc/diameter)).toFixed(3)),
          chordHeight: String((diameter*Math.cos(arc/diameter)/2).toFixed(3)),
        });
        console.log("ChordLength:" + this.data.chordLength);
        console.log("ChordHeight:" + this.data.chordHeight);
      }
    }
  }
})