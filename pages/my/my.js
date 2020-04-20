// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasCtx: null,   //canvas上下文
    ratio: 1,    //自适应的比例
    width: 375,
    height: 667,
    r: 20,    //圆点半径
    R: 25,    //真实半径
    points: [],
    isChangeColor: [false, false, false, false, false, false, false, false, false],  //是否改变颜色的标记
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

  initR: function() {
    this.data.R = this.resize(this.data.r);
  },

  initPoints: function() {
    var po = [
      {x: this.resize(80), y: this.resize(80)},
      {x: this.resize(160), y: this.resize(80)},
      {x: this.resize(240), y: this.resize(80)},
      {x: this.resize(80), y: this.resize(160)},
      {x: this.resize(160), y: this.resize(160)},
      {x: this.resize(240), y: this.resize(160)},
      {x: this.resize(80), y: this.resize(240)},
      {x: this.resize(160), y: this.resize(240)},
      {x: this.resize(240), y: this.resize(240)}
    ];
    this.setData({
      points: po
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
          width: res.windowWidth,
          height: res.windowHeight,
          ratio: res.windowWidth / 375,
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
    return Math.abs(x-x0) <= this.data.R && Math.abs(y-y0) <= this.data.R;
  },

  /**
   * 初始化圆点
   */
  initCanvas: function() {
    var ctx = this.data.canvasCtx;
    for(var i=0; i<this.data.points.length; i++) {
      this.drawGrey(ctx, i);
    }
    ctx.draw();
  }, 

  drawGrey: function(ctx, idx) { 
    ctx.beginPath();
    ctx.arc(this.data.points[idx].x, this.data.points[idx].y, this.data.R, 2*Math.PI);
    ctx.setFillStyle('#999');
    ctx.fill();
  },

  drawRed: function(ctx, idx) {
    ctx.beginPath();
    ctx.arc(this.data.points[idx].x, this.data.points[idx].y, this.data.R, 2*Math.PI);
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
   * 首次触摸屏幕进行绘制
   * @param {*} e 
   */
  calcPoint0: function(e) {
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

  pointIn: function(x, y) {
    var points = this.data.points;
    for(var i=0; i<this.data.points.length; i++) {
      if(this.isCircle(points[i].x, points[i].y, x, y)) {
        this.data.isChangeColor[i] = true;
        this.data.lastMoveToX =  points[i].x;
        this.data.lastMoveToY = points[i].y;
        return;
      }
    }
  },

  /**
   * 移动时绘图，连线
   * @param {} e 
   */
  genLine: function(e) {
    var ctx = this.data.canvasCtx;
    var currentX = e.changedTouches[0].x;
    var currentY = e.changedTouches[0].y;
    this.pointIn(currentX, currentY);
    
    //连线
    ctx.beginPath();
    ctx.moveTo(this.data.lastMoveToX, this.data.lastMoveToY);
    ctx.setStrokeStyle("red");
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    //连同之前状态重画
    this.rePaint();
    ctx.draw();
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
   * 生命周期函数--监听页面初次渲染完成
   */ 
  onReady: function () {
    console.log("加载完成");
    this.getRatio();    //初始化比例
    this.initR();
    this.getCanvas();     //获取画布
    this.initPoints();
    this.initCanvas();     //初始化圆点
  }
})