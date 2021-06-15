<template>
  <form
    class="data-form-container"
    @submit.prevent="handleSubmit"
    ref="container"
    id="comment-form"
  >
    <div class="nickname">
      <input
        type="text"
        maxlength="10"
        placeholder="用户昵称"
        v-model.trim="form.nickname"
      />
      <div class="wordsLimit">{{ form.nickname.length }}/10</div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="content">
      <textarea
        v-model.trim="form.content"
        placeholder="输入内容"
        maxlength="30"
      ></textarea>
      <div class="wordsLimit">{{ form.content.length }}/30</div>
      <div class="error">{{ error.content }}</div>
    </div>
    <button @click="handleSubmit" :disabled="isSubmiting" class="btn">
      {{ isSubmiting ? "提交中..." : "提交" }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmiting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.error.nickname = this.form.nickname === "" ? "请输入昵称" : "";
      this.error.content = this.form.content === "" ? "请输入内容" : "";
      if (this.error.nickname || this.error.content) {
        return;
      }
      this.isSubmiting = true;
      this.$emit("submit", this.form, (msg) => {
        this.$showMessage({
          content: msg || "评论成功",
          type: "success",
          duration: 1500,
          container: this.$refs.container,
          callback: () => {
            console.log(`success`);
            this.isSubmiting = false;
            this.form.nickname = "";
            this.form.content = "";
          },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.data-form-container {
  width: 100%;
}
.nickname,
.content {
  position: relative;
  margin-bottom: 30px;
  input,
  textarea {
    padding: 0 15px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    resize: none;
    border: 1px dashed #b4b8bc;
    font-size: 14px;
    border-radius: 4px;
    &:focus {
      border: 1px dashed @primary;
    }
  }
  textarea {
    padding: 8px 15px;
  }
  .wordsLimit {
    position: absolute;
    right: 4px;
    bottom: 5px;
    font-size: 12px;
    color: @gray;
  }
  .error {
    position: absolute;
    bottom: -26px;
    line-height: 24px;
    font-size: 14px;
    color: @warn;
  }
}
.nickname {
  height: 40px;
  width: 50%;
}
.content {
  height: 120px;
}

.btn {
  width: 100px;
  height: 36px;
  border-radius: 4px;
  color: #fff;
  outline: none;
  border: 0;
  background-color: @primary;
  transition: 0.3s;
  &:disabled {
    cursor: not-allowed;
    background: @gray;
  }
}
</style>