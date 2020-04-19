// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [
      {id: 0, src: '../../images/pics/001.jpg'},
      {id: 1, src: '../../images/pics/002.jpg'},
      {id: 2, src: '../../images/pics/003.jpg'},
      {id: 3,src: '../../images/pics/004.jpg'}
    ],
    midNavList: [
      { id: 0, content: '食品', focus: false},
      { id: 1, content: '日用品', focus: false },
      { id: 2, content: '彩妆', focus: false },
      { id: 3, content: '电器', focus: false },
      { id: 4, content: '更多', focus: false }
    ],
    productList: [
      { id: 0, img: '../../images/pics/p001.jpg', title: '沙发边小茶几创意边桌边几北欧小边几铁艺角几现代简约飘窗小茶几', desc: '115人已购买', price: '￥99.9'},
      { id: 1, img: '../../images/pics/p001.jpg', title: '沙发边小茶几创意边桌边几北欧小边几铁艺角几现代简约飘窗小茶几', desc: '115人已购买', price: '￥99.9' },
      { id: 2, img: '../../images/pics/p001.jpg', title: '沙发边小茶几创意边桌边几北欧小边几铁艺角几现代简约飘窗小茶几', desc: '115人已购买', price: '￥99.9' },
      { id: 3, img: '../../images/pics/p001.jpg', title: '沙发边小茶几创意边桌边几北欧小边几铁艺角几现代简约飘窗小茶几', desc: '115人已购买', price: '￥99.9' },
      { id: 4, img: '../../images/pics/p001.jpg', title: '沙发边小茶几创意边桌边几北欧小边几铁艺角几现代简约飘窗小茶几', desc: '115人已购买', price: '￥99.9' }
    ],
    currentMidNav: 0  // 激活的导航项，初始为-1
  },

  changeNavColor: function (e) {
    //console.log(e.currentTarget.dataset.i);
    var id = e.currentTarget.dataset.i;
    var currentId = this.data.currentMidNav;
    var var1 = "midNavList[" + id + "].focus";
    var var2 = "midNavList[" + currentId + "].focus"; 
    this.setData({
      [var2]: false,
      [var1]: true,
      currentMidNav: id
    });
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