<template>
  <div class="home">
    <div class="container">
      <Header />
      <FirstSection />
      <SecondSection />

      <ModalWindow v-if="activeModal === 'warning'" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/baseComponents/Header.vue";
import FirstSection from "@/components/sections/FirstSection.vue";
import SecondSection from "@/components/sections/SecondSection.vue";
import ModalWindow from "@/components/baseComponents/ModalWindow.vue";

export default {
  name: "Home",
  components: {
    Header,
    FirstSection,
    SecondSection,
    ModalWindow
  },

  computed: {
    /**
     * Свойтво для получения и усатновки имени активного окна/выпадающего списка/контекстного меню
     */
    activeModal: {
      get() {
        return this.$store.getters.ACTIVE_MODAL;
      },
      set(newActiveModal) {
        this.$store.dispatch("setActiveModal", newActiveModal);
      }
    }
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
