// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasCtx: null
  },

  getCanvas: function() {
    this.setData({
      canvasCtx: wx.createCanvasContext("pwd")
    });
    console.log(this.data.canvasCtx);
  },

  showTest: function(e) {
    console.log(this.data.canvasCtx);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("加载完成");
    this.getCanvas();
   // console.log(this.data.canvasCtx);
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