import request from "./request"

// async function getData() {
//   return await request.get(url);
// }

// export default {
//   getBanner: getData("/api/banner"),
//   getBlogType: getData("/api/blogtype");
// }

export default {
  getDatas: async function (url) {
    return await request.get(url)
  },
  async getBlogs(page = 1, limit = 10, categoryid = -1) {
    return await request.get("/api/blog", {
      params: {
        page,
        limit,
        categoryid,
      },
    });
  },
  async getBlog(id) {
    return await request.get(`/api/blog/${id}`)
  },
  async postComment(commentInfo) {
    return await request.post(`/api/comment`, commentInfo);
  },
  async getComments(blogid, page = 1, limit = 10) {
    return await request.get("/api/comment", {
      params: {
        blogid,
        page,
        limit
      }
    })
  },
  async postMessage(messageInfo) {
    return await request.post("/api/message", messageInfo)
  },
  async getMessageList(page = 1, limit = 10) {
    return await request.get("/api/message", {
      params: {
        page,
        limit
      }
    })
  }
}