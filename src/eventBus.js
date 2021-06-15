// let listeners = {};

// // {
// //   event: [
// //     handler1() {},
// //     handler2() {}
// //   ]
// // }

// window.listen = listeners

// export default {
//   $on(event, handler) {
//     if (!listeners.event) {
//       listeners[event] = new Set();
//     };
//     listeners[event].add(handler)
//   },
//   $off(event, handler) {
//     if (!listeners[event]) {
//       return
//     };
//     listeners[event].delete(handler)
//   },
//   $emit(event, ...arg) {
//     if(!listeners[event]){
//       return
//     }
//     for (let it of listeners[event]) {
//       it(...arg)
//     }
//   }
// }

import Vue from "vue"
let bus = new Vue({});
Vue.prototype.$bus = bus;
export default bus