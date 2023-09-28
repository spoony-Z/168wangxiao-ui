<template>
  <div class="upload-container" :style="{ '--wx-upload-img-h': eHeight + 'px', '--wx-upload-img-w': eWidth + 'px' }">
    <el-upload class="upload-demo" drag action :multiple="multiple" :show-file-list="false" :auto-upload="false"
      :on-change="onChange">
      <div v-if="this.$scopedSlots.content">
        <slot name="content"></slot>
      </div>
      <div v-else style="height: 100%;">
        <div v-if="echoData == 'card' && fileList.length !== 0" class="echo-style">
          <img :src="imgURL" alt="" class="id-number-img">
          <div class="masking-out">
            <div class="masking-out-style">
              <el-button type="text" icon="el-icon-delete" @click.stop="deleteImg"></el-button>
              <span> | </span>
              <el-button type="text" icon="el-icon-view" @click.stop="preview"></el-button>
            </div>
          </div>
        </div>

        <!-- 身份证上传 正面 -->
        <div ref="echartsWrapper" class="id-numner" v-if="idCard && frontBack === 'front' && fileList.length === 0">
          <div class="upload-card">
            <div>
              <div class="full-name">
                <div></div>
                <div></div>
              </div>
              <div class="full-name">
                <div></div>
                <div></div>
              </div>
              <div class="full-name">
                <div></div>
                <div></div>
              </div>
            </div>
            <img :src="frontImg" alt="">
          </div>
          <div class="id_number_front">
            <div class="el-upload__text_number">{{ IDdescribe }}</div>
            <div class="el-upload__tip_id_number" slot="tip">{{ IDprompt }} </div>
            <div class="dimension">{{ IDdimension }}</div>
          </div>
        </div>

        <!-- 身份证上传 反面 -->
        <div ref="echartsWrapper" class="id-numner_opposite"
          v-else-if="idCard && frontBack === 'back' && fileList.length === 0">
          <div class="upload-card">
            <img :src="reverseImg" alt="">
            <div class="id-img">
              <img :src="nationalEmblem" alt="">
            </div>
          </div>
          <div class="id_number_opposite">
            <div class="el-upload__text_number">{{ IDdescribe }}</div>
            <div class="el-upload__tip_id_number" slot="tip">{{ IDprompt }} </div>
            <div class="dimension">{{ IDdimension }}</div>
          </div>
        </div>

        <!-- 列表上传 -->
        <div v-else-if="listJudgment" class="upload-conten" ref="echartsWrapper">
          <el-button class="upload-btn">{{ text }}</el-button>
          <div class="el-upload__text">{{ describe }}</div>
          <div class="el-upload__tip" slot="tip">{{ prompt }}</div>
          <div class="dimension">{{ dimension }}</div>
        </div>
      </div>

    </el-upload>

    <!-- 文件回显列表 -->
    <div v-if="fileList.length > 0 && echoData !== 'card'" class="files">
      <div class="item-list" v-for="(item, index) in fileList" :key="index">
        <div class="left">
          <img :src="fileType(item.name)" />
          <div class="file-name">{{ item.name }}</div>
        </div>
        <div class="delete-icon">
          <img class="img1" src="./img/del.png" alt="" />
          <img class="img2" src="./img/del-hover.png" @click="removeFile(item, index)" alt="" />
        </div>
      </div>
    </div>

    <!-- 预览弹窗 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="imgURL" alt="">
    </el-dialog>
  </div>
</template>

<script>
import word from "./img/word.png"
import pdf from "./img/pdf.png"
import xlsx from "./img/xlsx.png"
import unknown from "./img/b-file-unknown-active.png"
import {frontImg, reverseImg, nationalEmblem} from "./base64"

export default {
  name: "WangxiaoUpload",
  props: {
    text: {
      type: String,
      default: "上传文件"
    },
    describe: {
      type: String,
      default: "点击上传 / 拖拽到此区域上传"
    },
    prompt: {
      type: String,
      default: "支持扩展名：word文件(.doc .docx) 、 PDF文件(.pdf)、文件大小在500M内"
    },

    /** 底部警告 */
    dimension: {
      type: String,
      default: ""
    },

    /** 是否支持多选文件上传 */
    multiple: {
      type: Boolean,
      default: true,
    },

    /** 限制文件类型 */
    suffixArray: {
      type: Array,
      default: () => ["doc", "docx", "pdf"]
    },

    /** 限制文件大小 */
    fileSize: {
      type: Number,
      default: 500
    },

    idCard: {
      type: Boolean,
      default: false
    },
    /** 图片回显样式 card / list */
    echo: {
      type: String,
      default: "list"
    },

    /** 身份证上传 正反面 front / back */
    frontBack: {
      type: String,
      default: "front"
    },

    /** 身份证上传提示语 */
    IDprompt: {
      type: String,
      default: "支持扩展名：.jpg .jpeg .png，文件大小在5M内"
    },
    IDdescribe: {
      type: String,
      default: "点击上传 / 拖拽到此区域上传头像面"
    },

    /** 身份证上传底部警告 */
    IDdimension: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      frontImg,
      nationalEmblem,
      reverseImg,
      fileList: [],
      imgURL: "",
      dialogVisible: false,
      eHeight: "",
      eWidth: "",
    };
  },
  computed: {
    fileType() {
      return (val) => {
        let fileIcon = {
          dox: word,
          docx: word,
          doc: word,
          docm: word,
          dot: word,
          pdf: pdf,
          xlsx: xlsx,
          xlsm: xlsx,
          xlsb: xlsx,
          xltx: xlsx,
          unknown: unknown,
        }
        const parts = val.split('.');
        return fileIcon[parts[parts.length - 1]]
      }
    },
    echoData() {
      if (this.idCard) {
        return "card";
      } else {
        return this.echo;
      }
    },
    listJudgment() {
      return !this.idCard && (this.echo === "card" ? !this.fileList.length : true);
    }
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      if (this.$refs.echartsWrapper) {
        setTimeout(() => {
          that.eWidth = this.$refs.echartsWrapper.clientWidth;
          that.eHeight = this.$refs.echartsWrapper.clientHeight;
        }, 1000)
      }
    })
  },
  methods: {
    /**
     * 预览
     */
    preview() {
      this.dialogVisible = true
    },
    /** 删除图片 */
    deleteImg() {
      this.fileList = [];
      this.imgURL = "";
      this.$emit("input", this.imgURL, this.fileList)
    },
    /**
     * 文件变化
     */
    onChange(file, fileList) {
      this.fileList = fileList;
      let suffix = this.getFileType(file.name); // 获取文件后缀名
      // let suffixArray = []; // 限制的文件类型，根据情况自己定义
      if (!this.suffixArray.includes(suffix)) {
        this.$message.warning("文件格式错误");
        const currIdx = this.fileList.indexOf(file);
        this.fileList.splice(currIdx, 1);
        return;
      }
      const isL500M = file.size / 1024 / 1024 > this.fileSize;
      if (isL500M) {
        this.$message.error(`上传文件大小不能超过 ${this.fileSize}MB`);
        const currIdx = this.fileList.indexOf(file);
        this.fileList.splice(currIdx, 1);
        return;
      }
      if (this.echoData === "card") {
        let files = event.target.files[0];
        let url = "";
        var reader = new FileReader();
        reader.readAsDataURL(files);
        let that = this;
        reader.onload = function () {
          url = this.result.substring(this.result.indexOf(",") + 1);
          that.imgURL = "data:image/png;base64," + url;
        };
        this.$emit("input", this.fileList)
      } else {
        this.$emit("input", fileList)
      }
    },
    /**
     * 获取文件后缀
     */
    getFileType(name) {
      let startIndex = name.lastIndexOf(".");
      if (startIndex !== -1) {
        return name.slice(startIndex + 1).toLowerCase();
      } else {
        return "";
      }
    },
    /** 删除文件 */
    removeFile(item, i) {
      this.fileList.splice(i, 1)
      this.$emit("input", this.fileList)
    }
  },
};
</script>
<style scoped>
>>>.el-upload-dragger {
  border: none;
  border-radius: 0 !important;
  width: 100%;
  height: auto;
}

.upload-container {
  border: 1px dashed #dddddd;
  padding: 20px;
}

.upload-conten {
  background: rgba(0, 127, 207, 0.03);
  height: 100%;
  padding-bottom: 20px;
}

.upload-conten:hover {
  background: rgba(0, 127, 207, 0.05);
}

.upload-btn {
  border-radius: 0;
  background: rgba(0, 127, 207, 0.9);
  color: #fff;
  border: 1px solid rgba(0, 127, 207, 0.9);
  margin-top: 40px;
  margin-bottom: 16px;
}

.upload-btn:hover {
  background: rgba(0, 127, 207, 1);
  color: #fff;
}

.el-upload__text {
  font-size: 14px !important;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 127, 207, 1);
  line-height: 37px;
}

.el-upload__tip_id_number {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  border-radius: 2px 2px 2px 2px;
}

.el-upload__tip {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  line-height: 29px;
  border-radius: 2px 2px 2px 2px;
  padding: 0 20px;
}


.dimension {
  font-size: 12px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: red;
  line-height: 29px;
  border-radius: 2px 2px 2px 2px;
}

.files {
  padding-top: 20px;
}

.file-name {
  font-size: 16px;
  color: #212121;
  margin-left: 10px;
}

.left {
  display: flex;
  align-items: center;
}

.upload-demo {
  background: #feffff;
  border-radius: 0px 0px 0px 0px;
  /* padding: 20px; */
}

.delete-icon img {
  width: 75%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.delete-icon .img2 {
  opacity: 0;
}

.delete-icon {
  position: relative;
  padding-right: 10px;
  width: 13px;
  height: 13px;
}

.item-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 5px;
  transition: 0.7s;
}

.item-list:hover {
  background-color: #e0eff9;
}

.item-list:hover .img2 {
  opacity: 1;
}

.item-list:hover .img1 {
  opacity: 0;
}

.echo-style {
  position: relative;
}


/* 身份证上传样式 */

/* 正面 */
.upload-card {
  display: flex;
  justify-content: space-between;
  padding: 0 0 0 0;
  align-items: center;
}

.upload-card img {
  width: auto;
  height: auto;
}

.id-numner {
  background: rgba(0, 127, 207, 0.03);
  height: 100%;
  padding: 20px 40px 20px 25px;
}

/** 反面 */
.id-numner_opposite {
  background: rgba(0, 127, 207, 0.03);
  height: 100%;
  padding: 20px 40px;
}

.id_number_opposite {
  padding-top: 43px;
}

.id_number_front {
  padding-top: 29px;
}

.el-upload__text_number {
  font-size: 14px !important;
  font-weight: 400;
  color: rgba(0, 127, 207, 1);
  padding-bottom: 8px;
}

.full-name {
  display: flex;
  column-gap: 20px;
}

.full-name div:nth-child(1) {
  width: 42px;
  height: 17px;
  background: #007FCE;
  border-radius: 2px 2px 2px 2px;
  opacity: 0.1;
  margin: 7.5px 0;
}

.full-name div:nth-child(2) {
  width: 107px;
  height: 17px;
  background: #007FCE;
  border-radius: 2px 2px 2px 2px;
  opacity: 0.1;
  margin: 7.5px 0;
}

.el-upload__tip_number {
  font-size: 12px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
  border-radius: 2px 2px 2px 2px;
}

.masking-out {
  width: 100%;
  height: 100%;
  display: none;
  background: #00000099 !important;
  transition: 3s;
  position: absolute;
  top: 0;
}

.masking-out-style {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.masking-out span {
  margin: 0 20px;
}

.masking-out-style .el-button--text {
  color: #ffffff;
}

.id-number-img {
  width: var(--wx-upload-img-w);
  height: var(--wx-upload-img-h);
}

>>>.echo-style:hover .masking-out {
  display: block;
}

>>>.el-upload {
  display: block;
  width: 100%;
  height: 100%;
}
</style>