import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./route"
import { setTitle } from "../utils"

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history"
});

// router.beforeEach((to,from,next)=>{
//   方法2：路由前置守卫，检测匹配的路由；不符合规则的跳转404
//   if(to.matched.length===0){
//     console.log(`redirect`);
//     next("404")
//   } else{
//     next()
//   }
// })

router.afterEach((to, from) => {
  if (to.meta.title) {
    // document.title = to.meta.title;
    setTitle.setRouterTitle(to.meta.title)
  }
})

export default router