<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>最少兽决数计算</span>
      <el-button style="float: right; padding: 3px 0" @click="calcShoujue" type="text">计算</el-button>
    </div>
    <el-form ref="shoujueNumForm" :model="formData" :inline="true">
      <el-form-item label="格子数">
        <el-input-number type="number" :min="0" :max="12" :step="1" size="small" v-model="formData.num" @change="numChange"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="特殊技能数">
        <el-input-number type="number" :min="0" :max="formData.num" :step="1" size="small" v-model="formData.specials" @change="numChange"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="准备拍的兽决种类数">
        <el-input-number type="number" :min="0" :max="formData.num-formData.specials" :step="1" size="small" v-model="formData.numToDo"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="已打成">
        <el-input-number type="number" :min="0" :max="formData.numToDo" :step="1" size="small" v-model="formData.numDone"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
    </el-form>
    <div class="text item">
      结果：{{ result }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "shoujue-num",
  data() {
    return {
      formData: {
        num: 0,
        numToDo: 0,
        numDone: 0,
        specials: 0
      },
      status: 0,
      result: ""
    }
  },
  methods: {
    numChange() {
      this.formData.numToDo = this.formData.num - this.formData.specials
    },
    calcShoujue() {
      if (this.status === 1) {
        return
      }
      this.status = 1;
      this.result = "计算中..."
      let that = this
      new Promise((resolve => {
        let canPutNum = that.formData.num - that.formData.specials;
        let shoujueNum = 0
        for (let i = that.formData.numDone; i < that.formData.numToDo; i++) {
          shoujueNum = that.formData.numToDo / (that.formData.numToDo - i) + shoujueNum
        }
        let spend = shoujueNum.toFixed(2);
        let rate = (Math.pow(canPutNum / that.formData.num, shoujueNum) * 100).toFixed(2);
        resolve(`平均消耗：${spend} 本，打成概率：${rate}%`);
      })).then((res) => {
        that.result = res;
        that.status = 0;
      })
    },
  }
}
</script>

<style scoped>

</style>
