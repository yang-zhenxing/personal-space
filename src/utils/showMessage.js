import getComponentRootDom from "./getComponentRootDom.js"
import IconCom from "@/components/Icon";
import messageStyle from "./showMessage.module.less"

export default function showMessage({
  content,
  type = "info",
  duration = 2000,
  container = document.body,
  callback
} = option) {
  const div = document.createElement("div");
  const Icon = getComponentRootDom(IconCom, {
    type
  });

  div.innerHTML = `<span class="${messageStyle.icon}">${Icon.outerHTML}</span><span>${content}</span>`

  div.classList.add(messageStyle.message, messageStyle[`message-${type}`]);

  // 只有在传入的父级元素不为body时才会改变position
  // 这样就会相对于视口定位，否则body没有高度，弹出框看不见
  if (container != document.body) {
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative"
    }
  }
  container.appendChild(div);
  container.offsetLeft;
  div.style.transform = "translate(-50%,-50%) translateY(0)";
  div.style.opacity = 1;
  setTimeout(() => {
    div.style.transform = "translate(-50%,-50%) translateY(-25px)";
    div.style.opacity = 0;
    div.addEventListener(
      "transitionend",
      () => {
        div.remove();
        callback && callback()
      }, {
        once: true
      }
    )
  }, duration)
}