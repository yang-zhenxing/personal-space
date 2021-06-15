<template>
  <ul class="contact-container">
    <li v-for="(item, index) in contactArr" class="contactItem" :key="index">
      <a>
        <div
          class="icon"
          :style="{
            fontSize: item.iconClass === 'weixin' ? '26px' : '',
            textIndent: item.iconClass === 'weixin' ? '-2px' : '',
          }"
        >
          <Icon :type="item.iconClass" />
        </div>
        <span>{{ item.message }}</span>
      </a>
      <template v-if="item.showTip">
        <div class="tip">
          <img :src="item.imgSrc" />
        </div>
      </template>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex"
export default {
  components: {
    Icon,
  },
  // data() {
  //   return {
      // contactArr: [
      //   { iconClass: "github", message: "http://www.com" },
      //   { iconClass: "chat", message: "zhenxiny@126.com" },
      //   {
      //     iconClass: "qq",
      //     message: "1270370942",
      //     showTip: true,
      //     imgSrc:
      //       "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2181944231,3260797126&fm=26&gp=0.jpg",
      //   },
      //   {
      //     iconClass: "weixin",
      //     message: "zhenxiny",
      //     showTip: true,
      //     imgSrc:
      //       "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2181944231,3260797126&fm=26&gp=0.jpg",
      //   },
      // ],
  //   };
  // },
  computed:{
    ...mapState("setting",["data"]),
    contactArr() {
      return [
        { iconClass: "github", message: this.data.giteeName },
        { iconClass: "chat", message: this.data.mail },
        {
          iconClass: "qq",
          message: this.data.qq,
          showTip: true,
          imgSrc:
            "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2181944231,3260797126&fm=26&gp=0.jpg",
        },
        {
          iconClass: "weixin",
          message: this.data.weixin,
          showTip: true,
          imgSrc:
            "https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2181944231,3260797126&fm=26&gp=0.jpg",
        },
      ]
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.contact-container {
  width: 100%;
  background-color: transparent;
  color: @gray;
  margin: 0;
  list-style: none;
  padding: 20px;
  box-sizing: border-box;
  @liheight: 30px;
  li {
    line-height: @liheight;
    margin: 14px 0;
    position: relative;
    &:hover {
      .tip {
        transform: scaleY(1);
      }
    }
    .tip {
      position: absolute;
      left: 0;
      bottom: @liheight+5px;
      background: #fff;
      border-radius: 5px;
      padding: 10px 15px;
      box-sizing: border-box;
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: all 0.4s;
      &::after {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        left: 50%;
        bottom: -12px;
        border: 6px solid transparent;
        border-top-color: #fff;
      }
      img {
        width: 100%;
        max-width: 150px;
        height: 100%;
        max-height: 150px;
        margin: 0 auto;
        display: block;
      }
    }
  }
  a {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      color: @primary;
    }
    .icon {
      font-size: 24px;
      width: 36px;
    }
  }
}
</style>