<template>
  <div class="menu-container">
    <RouterLink
      v-for="item in menuList"
      :key="item.name"
      :to="{ name: item.name }"
      active-class="selected"
      exact-active-class=""
      :exact="item.exact"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <p>{{ item.title }}</p>
    </RouterLink>
  </div>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      menuList: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true,
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, // 只要当前路径以name开头，当前菜单就是选中的，不需要精确匹配
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true,
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true,
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true,
        },
      ],
    };
  },
  // methods: {
  //   isSelected(item){
  //     let link = item.link.toLowerCase();
  //     let curLink = location.pathname.toLowerCase();
  //     if(item.startWith){
  //       return curLink.startsWith(link)
  //     }else{
  //       return curLink === link
  //     }
  //   }
  // },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.menu-container {
  color: @gray;
  margin: 24px 0;
  a {
    &.selected {
      background: darken(@words, 3%);
    }
    padding: 0 50px;
    display: block;
    display: flex;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
  }
}
</style>