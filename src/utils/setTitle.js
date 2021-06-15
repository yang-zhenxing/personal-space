let routerTitle = '',
  vuexTitle = '';

function setTitle() {
  let title;
  if (!routerTitle && !vuexTitle) {
    title = "loading……"
  } else if (routerTitle && !vuexTitle) {
    title = routerTitle
  } else if (!routerTitle && vuexTitle) {
    title = vuexTitle
  } else {
    title = routerTitle + "-" + vuexTitle
  }
  document.title = title;
}

export default {
  setRouterTitle(title) {
    routerTitle = title;
    setTitle()
  },
  setVuexTitle(title) {
    vuexTitle = title;
    setTitle()
  }
}