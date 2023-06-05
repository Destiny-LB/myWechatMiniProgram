// pages/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
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
      title: '独饮花间酒',
      path: '/pages/index/index',
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
   * 进入个人网站
   */
  enterPW: function () {
    wx.navigateTo({
      url: '/pages/web/web',
    });
  },

  /**
   * 进入圆弧计算工具
   */
  enterArc: function () {
    wx.navigateTo({
      url: '/pages/arc/arc',
    });
  },

  /**
   * 进入进制转换工具
   */
  enterScale: function () {
    wx.navigateTo({
      url: '/pages/scale/scale',
    });
  },

  /**
   * 进入掷骰子游戏
   */
  enterDice: function () {
    wx.navigateTo({
      url: '/pages/dice/dice',
    });
  },
})