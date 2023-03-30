<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>梦幻打书花费计算</span>
      <el-button style="float: right; padding: 3px 0" @click="calcShoujuePrice" type="text">计算</el-button>
    </div>
    <el-form ref="shoujueFeeForm" :model="formData" :rules="rules">
      <el-form-item label="兽决价格列表" prop="prices">
        <el-input class="text-input" type="text" v-model="formData.prices" :validate-event="true" @change="pricesChange"
                  placeholder="请输入价格，英文逗号(,)分割"></el-input>
      </el-form-item>
      <el-form-item label="特殊技能数">
        <el-input-number type="number" :min="0" :max="12" :step="1" size="small" v-model="formData.specials" @change="pricesChange"
                         placeholder="请输入内容"></el-input-number>
      </el-form-item>
      <el-form-item label="格子数">
        <el-input-number type="number" :min="0" :max="12" :step="1" size="small" v-model="formData.num"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <el-form-item label="初始打书对应二进制状态" prop="initStatus">
        <el-input class="small-text-input" width="200" type="text" :validate-event="true" v-model="formData.initStatus"
                  placeholder="对应输入兽决价格 1有0无"></el-input>
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
    var validInitStatus = (rule, value, callback) => {
      for (let i = 0; i < value.length; i++) {
        if (value.charAt(i) !== '1' && value.charAt(i) !== '0') {
          callback(new Error('数据格式不正确'));
        }
      }
      let priceArr = this.formData.prices.split(",").filter(i => i !== "")
      if (priceArr.length !== value.length) {
        callback(new Error('长度与价格列表不对应'));
      }
    };
    return {
      rules: {
        prices: [
          {
            validator: (rule, value, callback) => {
              let priceArr = value.split(",").filter(i => i !== "")
              for (let price of priceArr) {
                if (isNaN(Number(price))) {
                  callback(new Error('数据格式不正确'));
                }
              }
              callback();
            }, trigger: 'blur'
          },
        ],
        initStatus: [
          {
            validator: validInitStatus, trigger: 'blur'
          },
        ]
      },
      status: 0,
      result: "",
      formData: {
        prices: "10,20,30,40",
        specials: 0,
        num: 4,
        initStatus: "0000"
      }
    }
  },
  methods: {
    pricesChange() {
      let priceArr = this.formData.prices.split(",").filter(i => i !== "");
      this.formData.num = priceArr.length + this.formData.specials;
      this.formData.initStatus = "0".repeat(priceArr.length);
    },
    avgFee(pricesArr, doneNum) {
      let cacheMap = {}

      function dfs(pricesArr, doneNum) {
        for (let i = 0; i < pricesArr.length; i++) {
          let pointer = (doneNum >> i) % 2;
          console.log(doneNum & (pointer << i));
        }
        cacheMap[1] = 1
      }
      dfs(pricesArr, doneNum)
      return 0;
    },
    calcShoujuePrice() {
      if (this.status === 1) {
        return
      }
      // 价格列表
      let pricesArr = this.formData.prices.split(",").filter(i => i !== "")
      // 需要打的数量
      let numToDo = pricesArr.length
      // 初始打成数量
      let numDone = 0
      var doneArr = []
      for (let i = 0; i < this.formData.initStatus; i++) {
        let isDone = this.formData.initStatus.charAt(i) === '1';
        if (isDone) {
          numDone++;
        }
        doneArr.push(isDone)
      }
      this.status = 1;
      this.formData.result = "计算中..."
      let that = this
      new Promise((resolve => {
        let fee = that.avgFee(pricesArr, parseInt(this.formData.initStatus, 2))
        let canPutNum = that.formData.num - that.formData.specials;
        let shoujueNum = 0
        for (let i = numDone; i < numToDo; i++) {
          shoujueNum = numToDo / (numToDo - i) + shoujueNum
        }
        // 平均花费兽决树
        let spend = shoujueNum.toFixed(2);
        // 打成概率
        let rate = (Math.pow(canPutNum / that.formData.num, shoujueNum) * 100).toFixed(2);
        resolve(`平均花费：${fee} 金币，平均消耗：${spend} 本，打成概率：${rate}%`);
      })).then((res) => {
        that.result = res;
        that.status = 0;
      })
    }
  }
}
</script>

<style scoped>

</style>
