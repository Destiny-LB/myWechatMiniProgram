// pages/scale/scale.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scaleList: [
      {id: 1, value: 2, name: "2进制"},
      {id: 2, value: 8, name: "8进制"},
      {id: 3, value: 10, name: "10进制"},
      {id: 4, value: 16, name: "16进制"},
    ],
    inputScaleId: 3,
    inputScale: "10进制" ,
    outputScaleId: 4,
    outputScale: "16进制" ,
    input: '',
    result: '',
    startX: 0,
    endX: 0,
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
      title: '吾自人间浪漫 - 进制转换',
      path: '/pages/scale/scale',
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
   * 转化成十六进制字符
   */
  convertToHexChar: function (num) {
    const HEX_CHARS = '0123456789abcdef';
    return HEX_CHARS.charAt(num);
  },
  
  /**
   * 10进制转化成其它进制
   */
  decfrom10: function (scaleID, num) {
    let result = '';
    let quotient = num;
    let scale = this.data.scaleList[scaleID-1].value;
    while(quotient !== 0) {
      let remainder = quotient % scale;
      quotient = Math.floor(quotient / scale);
      if (scaleID == 4) {
        result = this.convertToHexChar(remainder) + result;
      }
      else{
        result = remainder.toString() + result;
      }
    }
    return result;
  },

  /**
   * 2进制转化成其它进制
   */
  decfrom2: function (scaleID, num) {
    let result = '';
    let decimal = 0;
    for (let i = 0; i < num.length; i++) {
      decimal += parseInt(num.charAt(i)) * Math.pow(2, num.length - i - 1);
    }
    result = this.decfrom10(scaleID, decimal);
    return result;
  },

  /**
   * 8进制转化成其它进制
   */
  decfrom8: function (scaleID, num) {
    let result = '';
    let decimal = 0;
    for (let i = 0; i < num.length; i++) {
      decimal += parseInt(num.charAt(i)) * Math.pow(8, num.length - i - 1);
    }
    result = this.decfrom10(scaleID, decimal);
    return result;
  },

  /**
   * 16进制转化成其它进制
   */
  decfrom16: function (scaleID, num) {
    let result = '';
    let decimal = 0;
    for (let i = 0; i < num.length; i++) {
      decimal += parseInt(num.charAt(i), 16) * Math.pow(16, num.length - i - 1);
    }
    result = this.decfrom10(scaleID, decimal);
    return result;
  },

  /**
   * 计算转换结果
   */  
  calculateResult: function () {
    if (this.data.inputScaleId == 1 ) {
      this.setData({
        result: this.decfrom2(this.data.outputScaleId, this.data.input)
      });
    } 
    else if (this.data.inputScaleId == 2) {
      this.setData({
        result: this.decfrom8(this.data.outputScaleId, this.data.input)
      });
    }
    else if (this.data.inputScaleId == 3) {
      this.setData({
        result: this.decfrom10(this.data.outputScaleId, this.data.input)
      });
    }
    else if (this.data.inputScaleId == 4) {
      this.setData({
        result: this.decfrom16(this.data.outputScaleId, this.data.input)
      });
    }
  },

  /**
   * 判断是不是二进制数
   */  
  isBinary: function (num) {
    const pattern = /^[01]+$/;
    return pattern.test(num);
  },

  /**
   * 判断是不是八进制数
   */  
  isOctaly: function (num) {
    const pattern = /^[0-7]+$/;
    return pattern.test(num);
  },

  /**
   * 判断是不是十进制数
   */  
  isDecimal: function (num) {
    const pattern = /^[0-9]+$/;
    return pattern.test(num);
  },

  /**
   * 判断是不是十六进制数
   */  
  isHexadecimal: function (num) {
    const pattern = /^[0-9A-Fa-f]+$/;
    return pattern.test(num);
  },
  

  /**
   * 切换输入进制
   */  
  changeInputScale: function (e) {
    console.log("输入进制：" + e.detail.select);
    this.setData({
      inputScaleId: e.detail.selectId,
      inputScale: e.detail.select,
    });
    this.setData({
      result: '',
    });
  },

  /**
   * 切换输出进制
   */  
  changeOutputScale: function (e) {
    console.log("输出进制：" + e.detail.select);
    this.setData({
      outputScaleId: e.detail.selectId,
      outputScale: e.detail.select,
    });
    this.setData({
      result: '',
    });
  },

  /**
   * 获取输入数字
   */  
  getNum: function (e) {
    this.setData({
      input: e.detail.value,
    });
  },

  /**
   * 获取计算结果
   */  
  getResult: function () {
    if (this.data.input == '') {
      wx.showToast({
        title: "请输入转换数字",
        icon: "error",
        duration: 800,
      });
      this.setData({
        result: '',
      });
      return;
    }
    else{
      const num = this.data.input;
      console.log(num);
      if (this.data.inputScaleId == 1 ) {
        if (!this.isBinary(num)) {
          wx.showToast({
            title: "二进制数不正确",
            icon: "error",
            duration: 800,
          });
          this.setData({
            result: '',
          });
          return;
        }
      } 
      else if (this.data.inputScaleId == 2) {
        if (!this.isOctaly(num)) {
          wx.showToast({
            title: "八进制数不正确",
            icon: "error",
            duration: 800,
          });
          this.setData({
            result: '',
          });
          return;
        }
      }
      else if (this.data.inputScaleId == 3) {
        if (!this.isDecimal(num)) {
          wx.showToast({
            title: "十进制数不正确",
            icon: "error",
            duration: 800,
          });
          this.setData({
            result: '',
          });
          return;
        }
      }
      else if (this.data.inputScaleId == 4) {
        if (!this.isHexadecimal(num)) {
          wx.showToast({
            title: "十六进制数不正确",
            icon: "error",
            duration: 800,
          });
          this.setData({
            result: '',
          });
          return;
        }
      }
      this.calculateResult();
    }
  }
})