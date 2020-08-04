<template>
  <div class="home">
    <div class="container">
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection :soul="soul" :biomechanism="biomechanism" :CPU="CPU" />
      <FourthSection :soul="soul" :biomechanism="biomechanism" :CPU="CPU" />
      <FifthSection :soul="soul" :biomechanism="biomechanism" :CPU="CPU" />

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
import FifthSection from "@/components/sections/FifthSection.vue";

export default {
  name: "Home",
  components: {
    Header,
    FirstSection,
    SecondSection,
    ThirdSection,
    FourthSection,
    FifthSection,
    ModalWindow
  },

  computed: {
    /**
     * Свойтво для получения и усатновки имени активного модального окна
     */
    activeModal: {
      get() {
        return this.$store.getters.ACTIVE_MODAL;
      },
      set(newActiveModal) {
        this.$store.dispatch("setActiveModal", newActiveModal);
      }
    },

    /**
     * Свойство для получения и установки новых значений в объекте биомеханизма
     */
    biomechanism: {
      get() {
        return this.$store.getters.BIOMECHANISM; // получение объекта
      },
      set(biomechanismInfo) {
        this.$store.dispatch("setInfoBiomechanism", biomechanismInfo); // вызов action из локального хранилища для записи в объект новых значений
      }
    },

    /**
     * Свойство для получения и установки новых значений в объекте процессора
     */
    CPU: {
      get() {
        return this.$store.getters.CPU; // получение объекта
      },
      set(CPUInfo) {
        this.$store.dispatch("setInfoBiomechanism", CPUInfo); // вызов action из локального хранилища для записи в объект новых значений
      }
    },

    /**
     * Свойство для получения и установки новых значений в объекте души
     */
    soul: {
      get() {
        return this.$store.getters.SOUL; // получение объекта
      },
      set(soulInfo) {
        this.$store.dispatch("setInfoBiomechanism", soulInfo); // вызов action из локального хранилища для записи в объект новых значений
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
