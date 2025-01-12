// pages/wheel/wheel.js
const innerAudioContext = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wheel: 1,
    isTurning: false
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
      title: '吾自人间浪漫 - 幸运转盘',
      path: '/pages/wheel/wheel',
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

  startTurn: function () {
    if (this.data.isTurning) {
      return; // 如果正在转动，直接返回，不执行后续操作
    }
    this.setData({
      isTurning: true // 设置为正在转动状态
    });
    let cur_wheel = this.data.wheel;
    const new_wheel = Math.floor(Math.random() * 12) + 18 + cur_wheel;
    let intervalTime = 50; // 初始间隔时间，单位毫秒，值越小速度越快
    const interval = setInterval(() => {
        if (cur_wheel >= new_wheel) {
          clearInterval(interval);
          this.setData({
            isTurning: false // 转动结束，设置为非转动状态
          });
          return;
        }
        // 每次转动时播放音效
        innerAudioContext.src = '/audio/wheel_sound.mp3';
        innerAudioContext.play();
        this.setData({
          wheel: cur_wheel % 12 + 1
        });
        cur_wheel++;
        // 每转动一定次数后，适当增加间隔时间，实现先快后慢效果
        if (cur_wheel % 3 === 0 && intervalTime < 800) {
          intervalTime += 50;
          clearInterval(interval);
          const newInterval = setInterval(() => {
            if (cur_wheel >= new_wheel) {
              clearInterval(newInterval);
              this.setData({
                isTurning: false // 转动结束，设置为非转动状态
              });
              return;
            }
            // 每次转动时播放音效
            innerAudioContext.src = '/audio/wheel_sound.mp3';
            innerAudioContext.play();
            this.setData({
              wheel: cur_wheel % 12 + 1
          });
          cur_wheel++;
        }, intervalTime);
      }
    }, intervalTime);
  },
})