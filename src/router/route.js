import "nprogress/nprogress.css"
import {
  start,
  done,
  configure
} from "nprogress"
import NotFound from "@/views/NotFound"

configure({
  // 进度条配置
})

/**
 * 
 * @param {func} pageComp
 * @returns { asyncModel }
 * pageComp返回的就是一个异步组件
 * 获取异步组件模块
 */
function getPageComponent(pageComp) {
  return async () => {
    start();
    if (process.env.NODE_ENV === "development") { }
    const resp = await pageComp();
    done()
    return resp
  }
}

const routes = [{
  path: "/index.html",
  redirect: "/home",
  component: getPageComponent(() => import( /* webpackChunkName Home */ "@/views/Home")),
  meta: {
    title: "首页"
  }
}, {
  path: "/",
  redirect: "/home",
}, {
  name: "Home",
  path: "/home",
  component: getPageComponent(() => import( /* webpackChunkName Home */ "@/views/Home")),
  meta: {
    title: "首页"
  }
},
{
  name: "Blog",
  path: "/acticle",
  component: getPageComponent(() => import( /* webpackChunkName Blog */ "@/views/Blog")),
  meta: {
    title: "文章"
  }
},
{
  name: "BlogCategory",
  path: "/acticle/cate/:categoryId",
  component: getPageComponent(() => import( /* webpackChunkName Blog */ "@/views/Blog")),
  meta: {
    title: "文章"
  }
},
{
  name: "ActicleDetail",
  path: "/acticle/:acticleId",
  component: getPageComponent(() => import( /* webpackChunkName Detail */ "@/views/Blog/Detail")),
  meta: {
    title: "详情"
  }
},
{
  name: "About",
  path: "/About",
  component: getPageComponent(() => import( /* webpackChunkName About */ "@/views/About")),
  meta: {
    title: "关于我"
  }
},
{
  name: "Message",
  path: "/Message",
  component: getPageComponent(() => import( /* webpackChunkName Message */ "@/views/Message")),
  meta: {
    title: "留言板"
  }
},
{
  name: "Project",
  path: "/Project",
  component: getPageComponent(() => import( /* webpackChunkName Project */ "@/views/Project")),
  meta: {
    title: "项目&效果"
  }
},
{
  name: "NotFound",
  path: "/404",
  component: NotFound,
  meta: {
    title: "NotFound"
  }
},
{
  // 404方法1：未被上方规则匹配的路由全部重定向到404页面
  path: "*",
  redirect: "/404"
}
];
export default routes