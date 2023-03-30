<template>
  <div class="index">
    <shoujue-num />
    <shoujue-fee />
  </div>
</template>
<script>
import shoujueFee from "./components/shoujue-fee";
import shoujueNum from "./components/shoujue-num";

export default {
  components: {shoujueFee, shoujueNum},
  data() {
    return {
    }
  },
  methods: {
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
