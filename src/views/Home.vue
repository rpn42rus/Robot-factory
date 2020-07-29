<template>
  <div class="home">
    <div class="container">
      <Header />
    </div>
  </div>
</template>

<script>
import Header from "@/components/baseComponents/Header.vue";

export default {
  name: "Home",
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1016px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
