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
        <p>
          <a class="tpl" @click="changeTpl('ap')" title="法爆、魔心、法连、神佑、强壮、感知、反震、会心、协力、先发、驱鬼、招架">法宠模板</a>
          <a class="tpl" @click="changeTpl('ad1')" title="连击、必杀、偷袭、神佑、强壮、反击、防御、突进、强力、招架、协力、敏捷">一刀模板</a>
          <a class="tpl" @click="changeTpl('ad2')" title="必杀、偷袭、神佑、强壮、反击、防御、突进、感知、驱鬼、招架、协力、敏捷">连击模板</a>
          <a class="tpl" @click="changeTpl('ad3')" title="隐身、连击、必杀、偷袭、神佑、驱鬼、突进、强力">隐攻模板</a>
        </p>
      </el-form-item>
      <el-form-item label="特殊技能数">
        <el-input-number type="number" :min="0" :max="12" :step="1" size="small" v-model="formData.specials"
                         @change="pricesChange"
                         placeholder="请输入内容"></el-input-number>
      </el-form-item>
      <div>
        此模块计算量较大，故已提前通过matlab计算好公式系数，因此不支持初始状态和空格子
      </div>
      <!--      <el-form-item label="格子数">-->
      <!--        <el-input-number type="number" :min="0" :max="12" :step="1" size="small" v-model="formData.num"-->
      <!--                         placeholder="请输入数量"></el-input-number>-->
      <!--      </el-form-item>-->
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
          }
        ]
      },
      status: 0,
      result: "",
      tpl: {
        // 连击、必杀、偷袭、神佑、强壮、反击、防御、突进、强力、招架、协力、敏捷
        ad1: [9, 9, 6, 30, 30, 1, 2.5, 3, 2.5, 3, 9, 5],
        // 必杀、偷袭、神佑、强壮、反击、防御、突进、感知、驱鬼、招架、协力、敏捷
        ad2: [9, 6, 30, 30, 1, 2.5, 3, 3, 4, 9, 5],
        // 隐身、连击、必杀、偷袭、神佑、驱鬼、突进、强力
        ad3: [10, 9, 9, 6, 30, 3, 2.5, 2.5],
        // 法爆、魔心、法连、神佑、强壮、感知、反震、会心、协力、先发、驱鬼、招架
        ap: [19, 18, 18, 30, 30, 3, 6, 3, 9, 4, 4],
      },
      formulaFactor: {
        1: [1],
        2: [1.666, 1.333],
        3: [2.125, 1.875, 1.500],
        4: [2.466, 2.266, 2, 1.6],
        5: [2.736, 2.569, 2.361, 2.083, 1.666],
        6: [2.957, 2.814, 2.642, 2.428, 2.142, 1.714],
        7: [3.143, 3.018, 2.873, 2.698, 2.479, 2.187, 1.75],
        8: [3.304, 3.193, 3.066, 2.918, 2.74, 2.518, 2.222, 1.777],
        9: [3.44600240638488, 3.34600240638488, 3.23350240638488, 3.10493097781345, 2.95493097781345, 2.77493097781345,
          2.54993097781346, 2.24993097781346, 1.79993097756686],
        10: [3.57152371289302, 3.48061462198393, 3.37960452097383, 3.26596815733747, 3.13609802746734, 2.98458287595218,
          2.80276469413400, 2.57549196686128, 2.27246166383094],
        11: [3.68408940156693, 3.60075606823359, 3.50908940156693, 3.40723754971508, 3.29265421638174, 3.16170183542936,
          3.00892405765158, 2.82559072431825, 2.59642405765158, 2.29086850209404],
        12: [3.785582765508071, 3.708659688584994, 3.624743604668911, 3.53243591236122, 3.42987180979712, 3.31448719441250,
          3.18261906254437, 3.02877290869822, 2.84415752408283, 2.61338829331360, 2.30569598556485, 1.84415708950747]
      },
      formData: {
        prices: "10,20,30,40",
        specials: 0,
        num: 4,
        initStatus: "0000"
      }
    }
  },
  methods: {
    changeTpl(tpl) {
      let priceArr = this.formData.prices.split(",").filter(i => i !== "");
      this.formData.prices = this.tpl[tpl].slice(0, Math.min(priceArr.length, this.tpl[tpl].length)).sort((a, b) => a - b).join(",")
    },
    pricesChange() {
      let priceArr = this.formData.prices.split(",").filter(i => i !== "");
      this.formData.num = priceArr.length + this.formData.specials;
      this.formData.initStatus = "0".repeat(priceArr.length);
    },
    formula(...args) {
      let arr = this.formulaFactor[args.length];
      let total = 0;
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i];
          total += item * args[i];
        }
      }
      return total
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

<style lang="scss" scoped>
.tpl {
  margin-right: $spacing-row-sm;
}
</style>
