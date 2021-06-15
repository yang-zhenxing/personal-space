import loadingURL from "@/assets/loading.svg";
import loadingStyle from "./loading.module.less";

function getIsLoading(el) {
  return el.querySelector("img[data-loading=loading]")
}

function createLoadImg() {
  let img = document.createElement("img");
  img.dataset.loading = "loading";
  img.className = loadingStyle.loading;
  img.src = loadingURL;
  return img
}

export default function (el, binding) {
  const flag = getIsLoading(el);
  if (binding.value) {
    if (!flag) {
      let img = createLoadImg();
      el.appendChild(img);
    }
  } else {
    if (flag) {
      flag.remove()
    }
  }
}