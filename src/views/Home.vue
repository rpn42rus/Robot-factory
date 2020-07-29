<template>
  <div class="home">
    <div class="container">
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />

      <ModalWindow v-if="activeModal === 'warning'" />
    </div>
  </div>
</template>

<script>
import Header from "@/components/baseComponents/Header.vue";
import ModalWindow from "@/components/baseComponents/ModalWindow.vue";
import FirstSection from "@/components/sections/FirstSection.vue";
import SecondSection from "@/components/sections/SecondSection.vue";
import ThirdSection from "@/components/sections/ThirdSection.vue";
import FourthSection from "@/components/sections/FourthSection.vue";

export default {
  name: "Home",
  components: {
    Header,
    FirstSection,
    SecondSection,
    ThirdSection,
    FourthSection,
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
