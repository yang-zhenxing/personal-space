import System from "../api"
import {
  setTitle
} from "@/utils"

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setData(state, payload) {
      state.data = payload
    }
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const resp = await System.getDatas("/api/setting");
      ctx.commit("setLoading", false);
      ctx.commit("setData", resp);
      if (resp.siteTitle) {
        setTitle.setVuexTitle(resp.siteTitle)
      }
      if (resp.favicon) {
        let faviconEl = document.querySelector("link[rel$='icon']");
        if (faviconEl) {
          faviconEl.href = resp.favicon;
          return
        }
        faviconEl = document.createElement("link");
        faviconEl.type = "images/x-icon";
        faviconEl.rel = "shortcut icon";
        faviconEl.href = resp.favicon;
        document.head.appendChild(faviconEl)
      }
    }
  }
}