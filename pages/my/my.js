// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasCtx: null,
    points: [
      {x: 50, y: 100},
      {x: 80, y: 50},
      { x: 100, y: 150 }
    ]
  },

  getCanvas: function() {
    this.setData({
      canvasCtx: wx.createCanvasContext("pwd")
    });
  },

  showTest: function(e) {
    console.log(this.data.canvasCtx);
  },

  /**
   * 初始化圆点
   */
  initCanvas: function(e) {
    var ctx = this.data.canvasCtx;
 //ctx.setFillStyle('black'
    for(var i=0; i<this.data.points.length; i++) {
      ctx.beginPath();
      ctx.arc(this.data.points[i].x, this.data.points[i].y, 5, 2*Math.PI);
      ctx.setFillStyle('#333333')
      ctx.fill();
    }
    ctx.draw();
  },

  testInit: function(e) {
    var ctx = wx.createCanvasContext("pwd");
    console.log(ctx);
    ctx.setFillStyle('red');
    ctx.fillRect(40, 40, 150, 75);
    ctx.draw();
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
   //this.testInit();
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