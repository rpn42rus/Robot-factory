<template>
  <div class="home">
    <div class="container">
      <Header />
      <FirstSection />
    </div>
  </div>
</template>

<script>
import Header from "@/components/baseComponents/Header.vue";
import FirstSection from "@/components/sections/FirstSection.vue";

export default {
  name: "Home",
  components: {
    Header,
    FirstSection
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
