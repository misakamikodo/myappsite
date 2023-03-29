<template>
  <div class="index">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>梦幻最少兽决数计算</span>
        <el-button style="float: right; padding: 3px 0" @click="calcShoujue" type="text">计算</el-button>
      </div>
      <el-form ref="shoujueNumForm" inline="true">
        <el-form-item label="格子数" >
          <el-input-number type="number" min="0" max="12" step="1" size="small" v-model="shoujue.num"
                           placeholder="请输入数量"></el-input-number>
        </el-form-item>
        <el-form-item label="已打成" >
          <el-input-number type="number" min="0" max="12" step="1" size="small" v-model="shoujue.okNum"
                           placeholder="请输入数量"></el-input-number>
        </el-form-item>
      </el-form>
      <div class="text item">
        结果：{{ shoujue.result }}
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>梦幻打书花费计算</span>
        <el-button style="float: right; padding: 3px 0" @click="calcShoujuePrice" type="text">计算</el-button>
      </div>
      <el-form ref="shoujuePriceForm">
        <el-form-item label="兽决价格列表" >
          <el-input class="text-input" type="text" v-model="shoujueFee.prices"
                    placeholder="请输入价格，英文逗号(,)分割"></el-input>
        </el-form-item>
        <el-form-item label="特殊技能数" >
          <el-input-number type="number" min="0" max="12" step="1" size="small" v-model="shoujueFee.specials"
                           placeholder="请输入内容"></el-input-number>
        </el-form-item>
        <el-form-item label="初始打书二进制状态" >
          <el-input class="small-text-input" width="200" type="text" v-model="shoujueFee.initStatus"
                    placeholder="对应输入兽决价格 1有0无"></el-input>
        </el-form-item>
      </el-form>
      <div class="text item">
        结果：成功花费：{{ shoujueFee.spend }}，打成概率：{{ shoujueFee.rate }} %
      </div>
    </el-card>
  </div>
</template>
<script>

export default {
  components: {},
  data() {
    return {
      shoujue: {
        num: 0,
        okNum: 0,
        result: 0
      },
      shoujueFee: {
        initStatus: "0000",
        rate: 0,
        spend: 0,
        specials: 0,
        prices: "10,20,30,40"
      }
    }
  },
  methods: {
    calcShoujue() {
      let num = Math.min(Math.max(this.shoujue.num, 0), 12)
      let temp = 0
      for (let i = this.shoujue.okNum; i < num; i++) {
        temp = num / (num - i) + temp
      }
      this.shoujue.result = temp;
    },
    calcShoujuePrice() {

    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
.index {
  line-height: 40px;
  padding: 10px;
  column-count: 3;
  column-gap: 10px;

  .box-card {
    width: 100%;
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
    margin-bottom: 10px;

    .text {
      margin-top: 10px;
    }
  }
}

.small-text-input {
  width: 150px;
}

.text-input {
  width: 300px;
}

</style>
