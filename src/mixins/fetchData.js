// 提取公共的获取远程数据的代码

export default function (dataValue = null) {
  return {
    data() {
      return {
        data: dataValue,
        isLoading: true
      }
    },
    async created() {
      this.data = await this.fetchData();
      this.isLoading = false
    },
  }
}