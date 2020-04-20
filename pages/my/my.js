// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasCtx: null,   //canvas上下文
    ratio: 1,    //自适应的比例
    pointRadius: 20,    //圆点半径
    initPoints: [
      {id: 0, x: 30, y: 30, flag: false},
      {id: 1, x: 90, y: 90, flag: false},
      {id: 2, x: 150, y: 70, flag: false}
    ],
    points: [
      {id: 0, x: 30, y: 30, flag: false},
      {id: 1, x: 90, y: 90, flag: false},
      {id: 2, x: 150, y: 70, flag: false}
    ],
    isChangeColor: [false, false, false],  //是否改变颜色的标记
    pointStorage: [],  //按顺序存放点id
    lastMoveToX: 0,  //画线起点
    lastMoveToY: 0
  },

  /**
   * 获取画布上下文
   */
  getCanvas: function() {
    this.setData({
      canvasCtx: wx.createCanvasContext("pwd")
    });
  },

  /**
   * 获取自适应的比例值
   */
  getRatio: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          ratio: res.windowWidth / 375
        });
      },
    })
  },

  /**
   * 自适应尺寸
   * @param {} size 
   */
  resize: function(size) {
    return size * this.data.ratio;
  },

  /**
   * 查看落点是否在圆内
   * @param {} x0 
   * @param {} y0 
   * @param {} x 
   * @param {} y 
   */
  isCircle: function(x0, y0, x, y) {
    return Math.abs(x-x0) <= 10 && Math.abs(y-y0) <= 10;
  },

  /**
   * 初始化圆点
   */
  initCanvas: function() {
    var ctx = this.data.canvasCtx;
    for(var i=0; i<this.data.points.length; i++) {
      ctx.beginPath();
      ctx.arc(this.data.points[i].x, this.data.points[i].y, 10, 2*Math.PI);
      ctx.setFillStyle('#999');
      ctx.fill();
    }
    ctx.draw();
  }, 

  drawGrey: function(ctx, idx) { 
    ctx.beginPath();
    ctx.arc(this.data.points[idx].x, this.data.points[idx].y, 10, 2*Math.PI);
    ctx.setFillStyle('#999');
    ctx.fill();
  },

  drawRed: function(ctx, idx) {
    ctx.beginPath();
    ctx.arc(this.data.points[idx].x, this.data.points[idx].y, 10, 2*Math.PI);
    ctx.setFillStyle('red');
    ctx.fill();
  },

  /**
   * 每次重画的过程，不包含draw()方法
   */
  rePaint: function() {
    var points = this.data.points;
    var ctx = this.data.canvasCtx;
    for(var i=0; i<points.length; i++) {
      if(this.data.isChangeColor[i]) {
        this.drawRed(ctx, i);
      } else {
        this.drawGrey(ctx, i);
      }
    }
  },

  /**
   * 开始触摸时计算落点touchStart
   * @param {} e 
   */
  calcPoint: function(e) {
    console.log("触摸开始..."); 
    var ctx = this.data.canvasCtx;
    var currentX = e.changedTouches[0].x;
    var currentY = e.changedTouches[0].y;
    var points = this.data.points;
    //遍历圆心
    for(var i=0; i<this.data.points.length; i++) {
      if(this.isCircle(points[i].x, points[i].y, currentX, currentY)) {  //在圆内
        this.data.pointStorage.push(points[i].id);
        ctx.arc(points[i].x, points[i].y, 10, 2*Math.PI);
        ctx.setFillStyle('red');
        ctx.fill();
        ctx.draw(true);
        this.data.lastMoveToX =  points[i].x;
        this.data.lastMoveToY = points[i].y;
        //record
        this.data.isChangeColor[i] = true;
        break;
      }
    }

  },

  calcPoint0: function(e) {
    console.log("触摸开始..."); 
    var currentX = e.changedTouches[0].x;
    var currentY = e.changedTouches[0].y;
    var ctx = this.data.canvasCtx;
    var points = this.data.points;

    for(var i=0; i<this.data.points.length; i++) {
      if(this.isCircle(points[i].x, points[i].y, currentX, currentY)) {
        this.data.isChangeColor[i] = true;
        this.data.lastMoveToX =  points[i].x;
        this.data.lastMoveToY = points[i].y;
        break;
      }
    }
    this.rePaint();
    ctx.draw();
  },

  /**
   * 移动时绘图，连线
   * @param {} e 
   */
  genLine: function(e) {
    var ctx = this.data.canvasCtx;
    var currentX = e.changedTouches[0].x;
    var currentY = e.changedTouches[0].y;

    //连线
    ctx.beginPath();
    ctx.moveTo(this.data.lastMoveToX, this.data.lastMoveToY);
    ctx.setStrokeStyle("red");
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    //连同之前状态重画
    this.rePaint();
    ctx.draw();
    //判断是否在圆点内

  },

  /**
   * 圆点复原
   * @param {} e 
   */
  cancelPoint: function(e) {
    this.initCanvas();
    //清空记录点
    this.data.pointStorage = [];
    //还原状态
    this.data.isChangeColor.fill(false);
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
    this.getCanvas();     //获取画布
    this.initCanvas();     //初始化圆点
    this.getRatio();    //初始化比例
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {}
})