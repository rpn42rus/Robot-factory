<template>
  <div class="header">
    <!-- Логотип -->
    <div class="header__logo">
      <img src="@/assets/img/Logo.png" alt />
    </div>
    <!--Кнопка "Произвести робота" -->
    <div class="header__button">
      <a href="#fifth-section" class="link">Произвести биоробота</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {}
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 48px 0 96px;
  &__button {
    width: 236px;
    height: 48px;
    border: 2px solid #ff7f22;
    border-radius: 60px;
    .link {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 1px;
      color: #ffffff;
    }
  }
}
</style>