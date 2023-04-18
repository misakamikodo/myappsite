<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>打书花费计算</span>
      <el-button style="float: right; padding: 3px 0" @click="calcShoujuePrice" type="text">计算</el-button>
    </div>
    <el-form ref="shoujueFeeForm" :model="formData" :rules="rules">
      <el-form-item label="兽决价格列表" prop="prices">
        <el-input class="text-input" type="text" v-model="formData.prices" :validate-event="true" @change="pricesChange"
                  placeholder="请输入价格，英文逗号(,)分割"></el-input>
      </el-form-item>
      <el-form-item label="特殊技能数">
        <el-input-number type="number" :min="0" :max="12" :step="1" size="small" v-model="formData.specials"
                         @change="pricesChange"
                         placeholder="请输入内容"></el-input-number>
      </el-form-item>
      <el-form-item label="格子数">
        <el-input-number type="number" :min="0" :max="12" :step="1" size="small" v-model="formData.num"
                         placeholder="请输入数量"></el-input-number>
      </el-form-item>
      <div>
        此模块计算量较大，故已提前计算好公式系数，初始状态影响系数结果故不支持初始状态
      </div>
      <!--      <el-form-item label="初始打书对应二进制状态" prop="initStatus">-->
      <!--        <el-input class="small-text-input" width="200" type="text" :validate-event="true" v-model="formData.initStatus"-->
      <!--                  placeholder="对应输入兽决价格 1有0无"></el-input>-->
      <!--      </el-form-item>-->
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
    formula(...args) {
      if (args.length === 1) {
        return args[0]
      } else if (args.length === 2) {
        return 1.666 * args[0] + 1.333 * args[1]
      } else if (args.length === 3) {
        return 2.125 * args[0] + 1.875 * args[1] + 1.500 * args[2]
      } else if (args.length === 4) {
        return 2.466 * args[0] + 2.266 * args[1] + 2 * args[2] + 1.6 * args[3]
      } else if (args.length === 5) {
        return 2.736 * args[0] + 2.569 * args[1] + 2.361 * args[2] + 2.083 * args[3] + 1.666 * args[4]
      } else if (args.length === 6) {
        return 2.957 * args[0] + 2.814 * args[1] + 2.642 * args[2] + 2.428 * args[3] + 2.142 * args[4] + 1.714 * args[5]
      } else if (args.length === 7) {
        return 3.143 * args[0] + 3.018 * args[1] + 2.873 * args[2] + 2.698 * args[3] + 2.479 * args[4] + 2.187 * args[5] +
            1.75 * args[6]
      } else if (args.length === 8) {
        return 3.304 * args[0] + 3.193 * args[1] + 3.066 * args[2] + 2.918 * args[3] + 2.740 * args[4] + 2.518 * args[5] +
            2.222 * args[6] + 1.777 * args[7]
      } else if (args.length === 9) {
        return 3.44600240638488 * args[0] +
            3.34600240638488 * args[1] +
            3.23350240638488 * args[2] +
            3.10493097781345 * args[3] +
            2.95493097781345 * args[4] +
            2.77493097781345 * args[5] +
            2.54993097781346 * args[6] +
            2.24993097781346 * args[7] +
            1.79993097756686 * args[8]
      } else if (args.length === 10) {
        return null
      } else if (args.length === 11) {
        return null
      } else if (args.length === 12) {
        return null
      }
    },
    calcShoujuePrice() {
      if (this.status === 1) {
        return
      }
      // 价格列表
      let pricesArr = this.formData.prices.split(",").filter(i => i !== "").map(i => parseInt(i))
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
        let feeTemp = that.formula(...pricesArr)
        let fee = feeTemp == null ? "暂不支持" : feeTemp.toFixed(2)
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
    },
    // 效率太低
    avgFee(pricesArr, doneStatusNum, depth = 0) {
      const len = pricesArr.length;
      if (depth >= 10 || doneStatusNum === ((1 << len) - 1)) {
        // 同一本书会被顶的次数大于10就不再统计 或者打完
        return 0
      }
      let result = 0
      let curStatusNum = doneStatusNum;
      let i = 0
      while (i < len && (doneStatusNum >> (len - i - 1)) % 2 === 1) {
        i += 1
      }
      // 把这本改为打成
      curStatusNum |= (1 << ((len - i) - 1))
      result += pricesArr[i]
      let putNum = 0
      for (let j = 0; j < len; j++) {
        if (j === i) {
          // 跳过刚打的这本
          continue
        }
        // 打掉了的情况的补书
        if ((curStatusNum >> (len - i - 1)) % 2 === 1) {
          putNum += 1
          let newStatusNum = curStatusNum & ~(1 << ((len - j) - 1))
          let fee = this.avgFee(pricesArr, newStatusNum, depth + 1)
          result += (fee / len)
        }
      }
      // 打成
      let fee = this.avgFee(pricesArr, curStatusNum, depth)
      result += (fee * (len - putNum) / len)
      return result
    }
  }
}
</script>

<style scoped>

</style>
