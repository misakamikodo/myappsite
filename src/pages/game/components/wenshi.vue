<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>纹饰合成计算</span>
      <el-button style="float: right; padding: 3px 0" @click="calc" type="text">计算</el-button>
    </div>
    <el-form ref="shoujueNumForm" :model="formData" :inline="true">
      <el-form-item label="主纹饰价格(k)">
        <el-input-number type="number" :min="0" :max="100000" :step="1000" size="small" @change="mainPriceChange"
                         v-model="formData.mainPrice"></el-input-number>
      </el-form-item>
      <el-form-item label="纹饰总计条数">
        <el-input-number type="number" :min="0" :max="4" :step="1" size="small"
                         v-model="formData.totalNum"></el-input-number>
      </el-form-item>
      <el-form-item label="主纹饰主属性条数">
        <el-input-number type="number" :min="0" :max="4" :step="1" size="small"
                         v-model="formData.mainNum" @change="formData.deputyNum=formData.mainNum"></el-input-number>
      </el-form-item>
      <el-form-item label="副纹饰价格(k)">
        <el-input-number type="number" :min="0" :max="100000" :step="1000" size="small"
                         v-model="formData.deputyPrice"></el-input-number>
      </el-form-item>
      <el-form-item label="副纹饰主属性条数">
        <el-input-number type="number" :min="0" :max="4" :step="1" size="small"
                         v-model="formData.deputyNum"></el-input-number>
      </el-form-item>
    </el-form>
    <div class="text item">
      结果：{{ result }}
    </div>
  </el-card>
</template>

<script>
export default {
  name: "wenshi",
  data() {
    return {
      formData: {
        mainPrice: 5000,
        deputyPrice: 5000,
        totalNum: 3,
        mainNum: 2,
        deputyNum: 2
      },
      status: 0,
      result: ""
    }
  },
  methods: {
    mainPriceChange() {
      this.formData.deputyPrice = this.formData.mainPrice;
    },
    calc() {
      let earn = (this.formData.mainPrice + this.formData.deputyPrice) / 0.85 / 0.91
      let oneMore = this.formData.deputyNum / this.formData.totalNum * 0.7
      this.result = `摆摊${earn.toFixed(0)}能赚, 成功合成多一条概率${(oneMore * 100).toFixed(2)}%`
    }
  }
}
</script>

<style scoped>

</style>
