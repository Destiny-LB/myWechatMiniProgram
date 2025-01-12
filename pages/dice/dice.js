// pages/dice/dice.js
const innerAudioContext = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dice_1: '',
    dice_2: '',
    dice_3: '',
    dice_4: '',
    dice_5: '',
    diceAnimation: {},
    coverButton: '开盖',
    diceView: false,
    coverView: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setInnerAudioOption({
      mixWithOther: true,
      obeyMuteSwitch: false,
      success: function (res) {
        console.log("play sucess");
      },
      fail: function (err) {
        console.log(err);
        console.log("play fail");
      }
    });

    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      timingFunction: "ease-in-out"
    });
    animation.opacity(1).rotate(1).scale(1, 1).step({
      duration: 10
    });
    
    this.setData({
      diceAnimation: animation.export()
    });

    this.setData({
      dice_1: Math.floor(Math.random() * 6) + 1,
      dice_2: Math.floor(Math.random() * 6) + 1,
      dice_3: Math.floor(Math.random() * 6) + 1,
      dice_4: Math.floor(Math.random() * 6) + 1,
      dice_5: Math.floor(Math.random() * 6) + 1,
    });
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
      title: '吾自人间浪漫 - 逸趣骰子',
      path: '/pages/dice/dice',
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
  
  throwDice: function () {
    const new_dice_1 = Math.floor(Math.random() * 6) + 1;
    const new_dice_2 = Math.floor(Math.random() * 6) + 1;
    const new_dice_3 = Math.floor(Math.random() * 6) + 1;
    const new_dice_4 = Math.floor(Math.random() * 6) + 1;
    const new_dice_5 = Math.floor(Math.random() * 6) + 1;
    console.log(new_dice_1, new_dice_2, new_dice_3, new_dice_4, new_dice_5);
    this.setData({
      dice_1: new_dice_1,
      dice_2: new_dice_2,
      dice_3: new_dice_3,
      dice_4: new_dice_4,
      dice_5: new_dice_5,
      coverButton: '开盖',
      diceView: false,
      coverView: true,
    });
    innerAudioContext.src = '/audio/dice_sound.mp3';
    innerAudioContext.play();
    wx.showLoading({
      title: '正在重新投掷',
      mask: true, 
    });
    setTimeout(()=>{
      wx.hideLoading();
      wx.showToast({
        title: "投掷成功",
        icon: "success",
        duration: 600,
      });
    }, 1000);
  },

  changeCover: function () {
    if (this.data.coverButton == '开盖'){
      this.setData({
        coverButton: '关盖',
        diceView: true,
        coverView: false,
      });
    }
    else if (this.data.coverButton == '关盖') {
      this.setData({
        coverButton: '开盖',
        diceView: false,
        coverView: true,
      });
    }
  }
})