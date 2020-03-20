<template>
  <a-form :layout="formLayout" :form="form">
    <a-form-item
      label="Form Layout"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-radio-group
        default-value="horizontal"
        @change="handleFormLayoutChange"
      >
        <a-radio-button value="horizontal">
          Horizontal
        </a-radio-button>
        <a-radio-button value="vertical">
          Vertical
        </a-radio-button>
        <a-radio-button value="inline">
          Inline
        </a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- <a-form-item
      label="Field A"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      :validate-status="fieldAStatus"
      :help="fieldAHelp"
    > -->
      <!-- <a-input v-model="fieldA" placeholder="input placeholder" /> -->
      <a-input
        v-decorator="[
          'fieldA',
          {
            initialValue: fieldA,
            rules: [{ required: true, min: 6, message: '必须大于5个字符' }]
          }
        ]"
        placeholder="input placeholder"
      />
    </a-form-item>
    <a-form-item
      label="Field B"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <!-- <a-input v-model="fieldB" placeholder="input placeholder" /> -->
      <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
    </a-form-item>
    <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
      <a-button type="primary" @click="handleSubmit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  data() {
    //创建一个form实例
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "hello",
      fieldB: ""
      // fieldAStatus: "",
      // fieldAHelp: "必须大于5个字符"
    };
  },
  // //增加监听
  // watch: {
  //   fieldA(val) {
  //     if (val.length <= 5) {
  //       this.fieldAStatus = "error";
  //       this.fieldAHelp = "必须大于5个字符";
  //     } else {
  //       this.fieldAStatus = "";
  //       this.fieldAHelp = "";
  //     }
  //   }
  // },
  //把后台返回来的值动态改变form的值
  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({ fieldA: "hello world!" });
    }, 3000);
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          //值同步到变量
          Object.assign(this, values);
        }
      });
      // if (this.fieldA.length <= 5) {
      //   this.fieldAStatus = "error";
      //   this.fieldAHelp = "必须大于5个字符";
      // } else {
      //   console.log({
      //     fieldA: this.fieldA,
      //     fieldB: this.fieldB
      //   });
      // }
    }
  }
};
</script>
