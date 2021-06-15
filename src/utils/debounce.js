export default function (fn, duration = 100) {
  // 防抖
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args)
    }, duration)
  }
}