<template>
  <div class="index">
    <shoujue-num />
    <!--效率太低先不加-->
    <!--<shoujue-fee />-->
    <hechong />
  </div>
</template>
<script>
import shoujueNum from "./components/shoujue-num";
import hechong from "./components/hechong";

export default {
  components: {shoujueNum, hechong},
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
