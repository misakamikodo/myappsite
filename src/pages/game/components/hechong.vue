<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>合宠概率计算</span>
      <el-button style="float: right; padding: 3px 0" @click="calc" type="text">计算</el-button>
    </div>
    <el-form ref="shoujueNumForm" :model="formData" :inline="true">
      <el-form-item label="主宠技能数">
        <el-input-number type="number" :min="formData.mainMustBeNum" :max="12" :step="1" size="small"
                         v-model="formData.mainNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="副宠技能数">
        <el-input-number type="number" :min="formData.deputyMustBeNum" :max="12" :step="1" size="small"
                         v-model="formData.deputyNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="主宠必带数">
        <el-input-number type="number" :min="0" :max="Math.min(2, formData.mainNum)" :step="1" size="small"
                         v-model="formData.mainMustBeNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="副宠必带数">
        <el-input-number type="number" :min="0" :max="Math.min(2, formData.deputyNum)" :step="1" size="small"
                         v-model="formData.deputyMustBeNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="主宠必带打掉数量">
        <el-input-number type="number" :min="0" :max="formData.mainMustBeNum" :step="1" size="small"
                         v-model="formData.mainMustBeRecoverNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="副宠必带打掉数量">
        <el-input-number type="number" :min="0" :max="formData.deputyMustBeNum" :step="1" size="small"
                         v-model="formData.deputyMustBeRecoverNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
    </el-form>
    <div class="text item" v-html="'技能数: 概率(以上概率)% <br>'+ result">
    </div>
  </el-card>
</template>

<script>
export default {
  name: "hechong",
  data() {
    return {
      formData: {
        mainNum: 4,
        deputyNum: 4,
        mainMustBeNum: 1,
        deputyMustBeNum: 1,
        mainMustBeRecoverNum: 1,
        deputyMustBeRecoverNum: 0
      },
      status: 0,
      result: ""
    }
  },
  methods: {
    calc() {
      let res = ""
      // 合成主宠的概率计算
      {
        let rateArr = []
        let main = this.formData.mainNum - this.formData.mainMustBeNum + this.formData.mainMustBeRecoverNum;
        let mainTotal = main + this.formData.deputyNum;
        let maxNum = 12 - this.formData.mainMustBeNum;
        for (let i = 0; i <= mainTotal && i < maxNum; i++) {
          let rate = this.zuhe(i, mainTotal) / (1 << mainTotal)
          rateArr[i] = rate * 50
        }
        if (mainTotal >= maxNum) {
          let mainOverRate = 0;
          for (let i = maxNum; i <= mainTotal; i++) {
            mainOverRate += this.zuhe(i, mainTotal) / (1 << mainTotal);
          }
          rateArr[maxNum] = mainOverRate * 50;
        }
        let sumRate = 0
        for (let i = rateArr.length - 1; i >= 0 && rateArr[i] !== undefined; i--) {
          let item = rateArr[i]
          sumRate += item
          res += `${Number(i) + this.formData.mainMustBeNum}: ${(item).toFixed(2)}(${sumRate.toFixed(2)})%; `
        }
      }
      res += "<br>"
      // 合成副的概率计算
      {
        let rateArr = []
        let deputy = this.formData.deputyNum - this.formData.deputyMustBeNum + this.formData.deputyMustBeRecoverNum;
        let deputyTotal = deputy + this.formData.deputyNum;
        let maxNum = 12 - this.formData.deputyMustBeNum;
        for (let i = 0; i <= deputyTotal && i < maxNum; i++) {
          let rate = this.zuhe(i, deputyTotal) / (1 << deputyTotal)
          rateArr[i] = rate * 50
        }
        if (deputyTotal >= maxNum) {
          let deputyOverRate = 0;
          for (let i = maxNum; i <= deputyTotal; i++) {
            deputyOverRate += this.zuhe(i, deputyTotal) / (1 << deputyTotal);
          }
          rateArr[maxNum] = deputyOverRate * 50;
        }
        let sumRate = 0
        for (let i = rateArr.length - 1; i >= 0 && rateArr[i] !== undefined; i--) {
          let item = rateArr[i]
          sumRate += item
          res += `${Number(i) + this.formData.deputyMustBeNum}: ${(item).toFixed(2)}(${sumRate.toFixed(2)})%; `
        }
      }
      this.result = res

    },
    zuhe(m, n) {
      let sum1 = 1;
      for (let i = 1; i <= m; i++) {
        sum1 = sum1 * i;
      }
      let sum2 = 1;
      for (let j = n; j >= n - m + 1; j--) {
        sum2 = sum2 * j;
      }
      return sum2 / sum1;
    }
  }
}
</script>

<style scoped>

</style>
