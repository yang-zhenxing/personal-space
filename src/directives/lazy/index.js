import {
  debounce
} from "@/utils";
import $bus from "@/eventBus.js"
import lazyLoad from "@/assets/lazy-load.gif"

let imgs = [];

function handleImgs() {
  for (let img of imgs) {
    handleImg(img)
  }
}

function handleImg(img) {
  img.dom.src = lazyLoad;
  const clientHeight = document.documentElement.clientHeight;
  const rect = img.dom.getBoundingClientRect();
  const height = rect.height || 150;
  if (rect.top >= -height && rect.top <= clientHeight) {
    img.dom.src = img.src
    imgs = imgs.filter(i => i !== img)
  }
}

$bus.$on("scroll", debounce(handleImgs, 50));

export default {
  inserted(el, binding) {
    let img = {
      dom: el,
      src: binding.value
    };
    imgs.push(img);
    handleImg(img)
  },
  unbind(el, binding) {
    imgs = imgs.filter((img) => img.dom !== el);
  }
}