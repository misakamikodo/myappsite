<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>合宠概率计算</span>
      <el-button style="float: right; padding: 3px 0" @click="calc" type="text">计算</el-button>
    </div>
    <el-form ref="shoujueNumForm" :model="formData" :inline="true">
      <el-form-item label="主宠技能数">
        <el-input-number type="number" :min="formData.mainMustBeNum" :max="12" :step="1" size="small" v-model="formData.mainNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="副宠技能数">
        <el-input-number type="number" :min="formData.deputyMustBeNum" :max="12" :step="1" size="small" v-model="formData.deputyNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="主宠必带数">
        <el-input-number type="number" :min="0" :max="2" :step="1" size="small" v-model="formData.mainMustBeNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="副宠必带数">
        <el-input-number type="number" :min="0" :max="2" :step="1" size="small" v-model="formData.deputyMustBeNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="主宠必带打掉数量">
        <el-input-number type="number" :min="0" :max="2" :step="1" size="small" v-model="formData.mainMustBeRecoverNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="副宠必带打掉数量">
        <el-input-number type="number" :min="0" :max="2" :step="1" size="small" v-model="formData.deputyMustBeRecoverNum"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
    </el-form>
    <div class="text item" v-html="'技能数: 概率 <br>'+ result">
    </div>
  </el-card>
</template>

<script>
export default {
  name: "shoujue-num",
  data() {
    return {
      formData: {
        mainNum: 0,
        deputyNum: 0,
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
      let main = this.formData.mainNum - this.formData.mainMustBeNum + this.formData.mainMustBeRecoverNum;
      let deputy = this.formData.deputyNum - this.formData.deputyMustBeNum + this.formData.deputyMustBeRecoverNum;
      let minMustNum = Math.min(this.formData.mainMustBeNum, this.formData.deputyMustBeNum);
      let maxMustNum = Math.max(this.formData.mainMustBeNum, this.formData.deputyMustBeNum);
      let total = main + deputy;
      let res = ""
      // 最少
      let minRate = 0;
      for (let i = 0; i < maxMustNum; i++) {
        minRate += (this.zuhe(i, total) / (1 << total))
      }
      res += `${maxMustNum}: ${(minRate * 100).toFixed(2)}%; `
      let mainMustLess = this.formData.mainMustBeNum < this.formData.deputyMustBeNum;
      // 中间部分的概率
      let middleRate = 0;
      for (let i = minMustNum; i < maxMustNum; i++) {
        // 只有一半概率
        middleRate = this.zuhe(i, total) / (1 << total)
        res += `${i}(${mainMustLess ? '主' : '副'}): ${(middleRate * 50).toFixed(2)}%; `
      }
      // 合出必带多的那方的数量时的概率
      let maxMustNumRate = this.zuhe(maxMustNum, total) / (1 << total)
      if (this.formData.mainMustBeNum !== this.formData.deputyMustBeNum) {
        res += `${maxMustNum}(${mainMustLess ? '副' : '主'}): ${(maxMustNumRate * 100).toFixed(2)}%; `
        res += `${maxMustNum}(${mainMustLess ? '主' : '副'}): ${(middleRate * 50).toFixed(2)}%; `
      } else {
        res += `${maxMustNum}: ${(maxMustNumRate * 100).toFixed(2)}%; `
      }

      for (let i = maxMustNum + 1; i <= total && i < 12; i++) {
        res += `${i}: ${((this.zuhe(i, total) / (1 << total)) * 100).toFixed(2)}%; `
      }
      if (total >= 12) {
        let left = 0;
        for (let i = 12; i <= total; i++) {
          left += (this.zuhe(i, total) / (1 << total))
        }
        res += `12: ${(left * 100).toFixed(2)}%; `
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
