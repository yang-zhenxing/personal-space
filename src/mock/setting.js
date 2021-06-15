import Mock from "mockjs"

Mock.mock("/api/setting", "get", {
  code: 0,
  msg: "",
  data: {
    avatar: "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2181944231,3260797126&fm=26&gp=0.jpg",
    siteTitle: "个人空间",
    gitee: "https://gitee.com/yzxollie",
    qq: "1270370942",
    qqQrCode: "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
    weixin: "id_zhenxiny",
    weixinQrCode: "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png",
    mail: "zhenxiny@126.com",
    icp: "黑ICP备17001719号",
    giteeName: "yzxollie",
    favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f",
  }
})