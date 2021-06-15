import System from "../api"

export default {
  namespaced: true,
  state: {
    loading: false,
    data: []
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
    async fetchProject(ctx) {
      if (ctx.state.data.length) {
        return
      }
      ctx.commit("setLoading", true);
      const resp = await System.getDatas("/api/project");
      ctx.commit("setLoading", false);
      ctx.commit("setData", resp)
    }
  }
}