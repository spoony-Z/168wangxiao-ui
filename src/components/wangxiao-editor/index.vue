<template>
  <div :class="ShowHide ? 'Hide' : 'Show'">
    <quill-editor v-model="contentItem" ref="myQuillEditor" :options="editorOption" @focus="onEditorFocus($event)"
      @blur="onEditorBlur($event)" @change="onEditorChange($event)" class="editor"></quill-editor>

    <!-- 图片上传 -->
    <form action method="post" enctype="multipart/form-data" id="uploadFormMulti">
      <input style="display: none" :id="uniqueId" type="file" name="file" multiple
        accept="image/jpg, image/jpeg, image/png, image/gif" @change="uploadImg('uploadFormMulti')" />
    </form>

    <!-- 视频上传 -->
    <el-dialog :close-on-click-modal="false" width="30%" style="margin-top: 1px" title="视频上传"
      :visible.sync="videoForm.show" append-to-body>
      <el-tabs v-model="videoForm.activeName">
        <el-tab-pane label="本地视频上传" name="first">
          <el-upload v-loading="loading" style="text-align: center;" drag action accept="video/*"
            :name="uploadVideoConfig.name" :before-upload="onBeforeUploadVideo" :on-success="onSuccessVideo"
            :on-error="onErrorVideo" :multiple="false" :http-request="httpRequest">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传MP4文件，且不超过{{ uploadVideoConfig.maxSize }}M</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="添加视频链接" name="second">
          <el-input v-model="videoForm.videoLink" placeholder="请输入视频链接" clearable></el-input>
          <el-button type="primary" size="small" style="margin: 20px 0px 0px 0px "
            @click="insertVideoLink(videoForm.videoLink)">确认
          </el-button>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["image"], // 链接、图片
  ['video'] // 视频
];
export default {
  name: "WangxiaoEditor",

  components: {
    quillEditor,
  },

  props: {
    content: {
      type: String,
      default: "",
    },
    uniqueId: {
      type: String,
      default: "",
    },
    uploadUrl: {
      type: String,
      default: "",
    },
    // 视频上传配置
    uploadVideoConfig: {
      type: Object,
      default() {
        return {
          // uploadUrl: process.env.VUE_APP_BASE_API + "/examQuestions/uploadAvatorBase", // 上传地址
          maxSize: 10, // 图片上传大小限制，默认不超过2M
          name: 'Filedata' // 图片上传字段
        }
      }
    }
  },

  data() {
    const _self = this;
    return {
      // uniqueId: "uniqueId",
      contentItem: null, // 富文本编辑器默认内容
      ShowHide: false, // 控制工具栏的显示隐藏
      editorOption: {
        //  富文本编辑器配置
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              'video': () => {
                // 覆盖默认的上传视频，点击视频图标，显示弹窗
                _self.videoForm.show = true
              }
            }
          },
        },
        theme: "snow",
        placeholder: "请输入..",
      },
      pubImages: [], // 失去焦点图片数组
      uploadImages: [], // 上传成功图片数组

      loading: false, // 加载loading
      videoForm: {
        show: false, // 显示插入视频链接弹框的标识
        videoLink: '',
        activeName: 'first'
      },
    };
  },

  computed: {
    //当前富文本实例
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },

  watch: {
    content: {
      handler(val) {
        this.contentItem = ''
        this.contentItem = val;
      },
      immediate: true,
    },
  },

  mounted() {
    var _this = this;
    var imgHandler = async function (image) {
      if (image) {
        var fileInput = document.getElementById(_this.uniqueId); //隐藏的file文本ID
        fileInput.click(); //加一个触发事件
      }
    };
    _this.editor.getModule("toolbar").addHandler("image", imgHandler);
  },

  methods: {
    // 准备富文本编辑器
    onEditorReady() { },
    // 富文本编辑器 失去焦点事件
    onEditorBlur() {
      this.pubImages = [];
      let length = document.querySelectorAll(".ql-editor img").length;
      if (length) {
        let images = document.querySelectorAll(".ql-editor img");
        images.forEach((item) => {
          this.pubImages.push(item.src);
        });
      }
      // 删除
      let remove = this.uploadImages.filter((i) =>
        this.pubImages.every((e) => e != i)
      );
      if (remove.length != 0) {
        // 删除图片
        this.$api.delete("/sysOss/deleteMoreFile", remove, (res) => {
          if (res.data.errCode == 200) {
            console.log("删除成功！！！！！！", res);
          } else {
            this.$message.warning("文件删除失败");
          }
        });
      }
      this.ShowHide = false;
    },
    // 富文本编辑器 获得焦点事件
    onEditorFocus() {
      this.ShowHide = true;
    },
    // 富文本编辑器 内容改变事件
    onEditorChange() {
      // 判断是否为 base64
      var imgReg = /<img.*?(?:>|\/>)/gi;
      const srcReg = /src=['"]?([^'"]*)['"]?/i;
      var base64img = this.contentItem.match(imgReg);
      if (base64img != null) {
        base64img.forEach((element) => {
          if (element.indexOf('src="data:image/') != -1) {
            var base64Data = element.match(srcReg);
            var formData = new FormData();
            formData.append("base64Data", base64Data[1]);
            this.$api.post(
              "/examQuestions/uploadAvatorBase",
              formData,
              (res) => {
                if (res.data.errCode == 200) {
                  this.contentItem = this.contentItem.replace(
                    base64Data[1],
                    res.data.data
                  );
                }
              }
            );
          }
        });
      }
      this.$emit("delDiyItemCall", this.contentItem);
      this.$emit("input", this.contentItem);
    },

    // 上传图片
    uploadImg() {
      var formData = new FormData();
      var _this = this;
      formData.append("file", document.getElementById(_this.uniqueId).files[0]);
      //调用上传文件接口
      this.$api.post(this.uploadUrl, formData, (res) => {
        // 文章内容图片上传接口
        if (this.uploadUrl == "/sysOss/uploadFile") {
          if (res.data.errCode == 200) {
            // 返回上传文件的地址
            let url = res.data.data.url;
            if (url != null && url.length > 0) {
              let Range = _this.editor.getSelection();
              url = url.indexOf("http") != -1 ? url : "http:" + url;
              // 上传文件成功之后回显图片
              _this.editor.insertEmbed(
                Range != null ? Range.index : 0,
                "image",
                url
              );
              this.uploadImages.push(url.replace(/\\/g, "/"));
            } else {
              _this.$message.warning("图片上传失败");
            }
            //成功之后,将文件的文本框的value置空
            document.getElementById(_this.uniqueId).value = "";
          }
        } else {
          // 题库上传接口
          if (res.data.errCode == 200) {
            // 返回上传文件的地址
            let url = res.data.data;
            if (url != null && url.length > 0) {
              let Range = _this.editor.getSelection();
              url = url.indexOf("http") != -1 ? url : "http:" + url;
              //上传文件成功之后回显图片
              _this.editor.insertEmbed(
                Range != null ? Range.index : 0,
                "image",
                url
              );
            } else {
              _this.$message.warning("图片上传失败");
            }
            /** 移动光标 */
            let index = this.editor.selection.savedRange.index;
            this.editor.setSelection(index + 1);
            //成功之后,将文件的文本框的value置空
            document.getElementById(_this.uniqueId).value = "";
          }
        }
      });
    },

    /******************************************* 上传视频相关方法 ********************************************/
    hideLoading() {
      this.loading = false
    },
    insertVideoLink(videoLink) {
      if (!videoLink) return this.$message.error('视频地址不能为空！')
      this.videoForm.show = false
      let index = this.$refs.myQuillEditor.quill.selection.savedRange.index
      // 在光标所在位置 插入视频
      this.editor.insertEmbed(index, 'video', videoLink)
      // 调整光标到最后
      this.editor.setSelection(index + 1)
      this.hideLoading()
    },
    // el-文件上传组件
    onBeforeUploadVideo(file) {
      this.loading = true
      let acceptArr = ['video/mp4']
      const isVideo = acceptArr.includes(file.type)
      const isLt1M = file.size / 1024 / 1024 < this.uploadVideoConfig.maxSize
      if (!isVideo) {
        this.hideLoading()
        this.$message.error('只能上传mp4格式文件!')
      }
      if (!isLt1M) {
        this.hideLoading()
        this.$message.error(`上传文件大小不能超过 ${this.uploadVideoConfig.maxSize}MB!`)
      }
      return isLt1M && isVideo
    },
    // 文件上传成功时的钩子
    onSuccessVideo() {
      this.hideLoading();
    },
    httpRequest(flileList) {
      var formData = new FormData();
      var _this = this;
      formData.append("file", flileList.file);
      this.$api.post('/sysOss/uploadFile', formData, (res) => {
        if (res.data.errCode == 200) {
          let url = res.data.data.url;
          if (url != null && url.length > 0) {
            this.insertVideoLink(url)
          } else {
            _this.$message.warning("图片上传失败");
          }
        }
      });
    },
    // 文件上传失败时的钩子
    onErrorVideo() {
      this.hideLoading()
      this.$message.error('上传失败')
    },
  },
};
</script>

<style scoped>
.editor {
  line-height: normal !important;
  min-height: 0.7rem;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.Show>>>.ql-toolbar {
  display: none;
}

.Hide>>>.ql-toolbar {
  display: block;
}

>>>.ql-toolbar.ql-snow+.ql-container.ql-snow {
  border-top: none;
  border: 1px solid #ccc;
}
</style>
