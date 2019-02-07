// pages/calculator/calculator.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: {
      // 原始尺寸——高
      raw_height: undefined,
      // 原始尺寸——宽
      raw_width: undefined,
      // 扇子高度
      shanzi_height: undefined,
      // 是否有翻窗
      hasPF: undefined,
      // 翻窗数
      PFC: undefined,
      // 扇子数
      WC: undefined,
    },

    // fanchuangboli_gao: undefined,
    // fanchuangboli_kuan1: undefined,
    // fanchuangboli_kuan2: undefined,

    // shanziboli_gao: undefined,
    // shanziboli_kuan: undefined,

    // bianfeng: undefined,
    // bianguan: undefined,
    // shangxiahua: undefined,

    // gouguangji: undefined,
    // shangxiafang: undefined,

    radioPFCItems: [{
        // name: '2',
        name: '1',
        value: 2,
        checked: true
      },
      {
        // name: '3',
        name: '2',
        value: 3,
      },
      {
        // name: '4',
        name: '3',
        value: 4,
      }
    ],

  },

  onLoad: function(options) {
    var options = new Object()
    // console.log('app.globalData.series[0].hasPF值为', app.globalData.series[0].hasPF)
    options.shanzi_height = app.globalData.series[0].shanzi_height
    options.hasPF = app.globalData.series[0].hasPF
    // console.log('hasPF值为', options.hasPF)
    options.PFC = app.globalData.series[0].PFC
    options.WC = app.globalData.series[0].WC

    this.setData({
      options: options
    })
  },

  formSubmit: function(e) {
    console.log('form 发生 submit 事件，携带值为', e.detail.value)

    var results = new Object();
    var options = new Object();

    options.raw_height = parseFloat(e.detail.value.raw_height)
    // console.log('height值为', height)
    options.raw_width = parseFloat(e.detail.value.raw_width)
    // 此处this.data.shanzi_height的值并未改变
    options.shanzi_height = parseFloat(e.detail.value.shanzi_height)

    options.hasPF = this.data.options.hasPF
    console.log('hasPF值为', options.hasPF)
    options.PFC = this.data.options.PFC
    // console.log('PFC值为', options.PFC)
    options.WC = this.data.options.WC
    // console.log('WC值为', options.WC)

    // 边封长度即为原始尺寸高度
    results.bianfeng = options.raw_height
    // 上下滑为原始尺寸宽度减去两边边封大厚度（默认为0.05米）//0.05 bianfeng_h_d = 0.025
    results.shangxiahua = options.raw_width - 2 * 0.025
    // 扁管长度（如有翻窗）即为上下滑长度
    results.bianguan = results.shangxiahua

    // 钩光极长度，如果有翻窗，即为扇子高度（默认为1.175米）；否则为原始尺寸高度减去上滑厚度和下滑厚度（上下滑总厚度默认为0.065米）
    results.gouguangji = this.data.options.hasPF ? options.shanzi_height : options.raw_height - 0.065
    console.log('results.gouguangji值为', results.gouguangji)

    // 上下方长度
    // 2个扇子时，为原始尺寸宽度减去两边边封小厚度（默认为0.012米），然后除以2
    var shangxiafang2 = (options.raw_width - 0.012) / 2
    // 4个扇子时
    var shangxiafang4 = (options.raw_width + 0.018) / 4
    results.shangxiafang = ((options.WC == 2) ? shangxiafang2 : shangxiafang4)

    // 扇子玻璃高度为扇子高度（钩光极长度）减去上下方总厚度（默认为0.075米）
    results.shanziboli_gao = results.gouguangji - 0.075
    // 扇子玻璃宽度为扇子宽度（上下方长度）减去钩极和光极的厚度（默认为0.065米）
    results.shanziboli_kuan = results.shangxiafang - 0.065

    // 翻窗玻璃高度为原始尺寸高度减去扇子部分高度和扁管厚度（一个，默认为0.025米），再减去预留空隙0.002米
    // 扇子部分分为扇子高度与上下方厚度（上下方总厚度默认为0.065米）
    results.fanchuangboli_gao = options.raw_height - (results.gouguangji + 0.065) - 0.025 - 0.002
    // 翻窗玻璃平均宽度等于扁管长度减去吊线总厚度（吊线实际就是扁管，扁管厚度默认为0.025米），然后除以翻窗数PFC
    var fanchuangboli_kuan = (results.bianguan - 0.025 * (options.PFC - 1)) / options.PFC
    // 翻窗玻璃实际宽度为平均宽度加3毫米或者减2毫米
    results.fanchuangboli_kuan1 = fanchuangboli_kuan + 0.003
    results.fanchuangboli_kuan2 = fanchuangboli_kuan - 0.002

    app.globalData.results = results
    options.shanzi_height = results.gouguangji
    app.globalData.options = options
    // app.globalData.results.fanchuangboli_gao = fanchuangboli_gao
    // app.globalData.results.fanchuangboli_kuan1 = fanchuangboli_kuan1
    // app.globalData.results.fanchuangboli_kuan2 = fanchuangboli_kuan2

    // app.globalData.results.shanziboli_gao = shanziboli_gao
    // app.globalData.results.shanziboli_kuan = shanziboli_kuan

    // app.globalData.results.bianfeng = bianfeng
    // app.globalData.results.bianguan = bianguan
    // app.globalData.results.shangxiahua = shangxiahua

    // app.globalData.results.gouguangji = gouguangji
    // app.globalData.results.shangxiafang = shangxiafang
 
    console.log(app.globalData)

    wx.navigateTo({
      url: '/pages/calculator/result/result',
    })

  },

  toSeriesList: function() {
    wx.navigateTo({
      url: '/pages/series/list/list',
    })
  },

  switchChange: function(e) {
    console.log('switch 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      ["options.hasPF"]: e.detail.value
    })
    app.globalData.options.hasPF = e.detail.value
  },

  radioPFCChange: function(e) {
    console.log('radioPFC 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      ["options.PFC"]: e.detail.value
    })
    app.globalData.options.PFC = e.detail.value
  },

  radioWCChange: function(e) {
    console.log('radioWC 发生 change 事件，携带值为', e.detail.value)
    this.setData({
      ["options.WC"]: e.detail.value
    })
    app.globalData.options.WC = e.detail.value
  },


})

// PF: 翻窗(pivot frame)