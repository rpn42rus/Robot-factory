<template>
  <div class="first-section">
    <!-- Левая часть секции с её порядковым номером -->
    <div class="number__section">
      <div class="number">01</div>
      <div class="scroll">скролл</div>
      <div class="arrow">
        <svg
          width="12"
          height="18"
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 0V16" stroke="#667380" />
          <path d="M1 11.5L6 16.5L11 11.5" stroke="#667380" />
        </svg>
      </div>
    </div>
    <!-- Заголовок секции -->
    <div class="title__section">
      <div class="title">Фабрика по производству биороботов</div>
      <div class="subtitle">класса «монитор-кресло»</div>
    </div>
    <!-- Правая часть секции с картинками -->
    <div class="image__section">
      <div class="background"></div>
      <div class="first__img">
        <img src="@/assets/img/robots/FrontMale1.png" alt />
      </div>
      <div class="second__img">
        <img src="@/assets/img/robots/DesignerMale1.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstSection",
  components: {}
};
</script>

<style lang="scss" scoped>
.first-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  .number__section {
    display: flex;
    flex-direction: column;
    flex: 0 0 10%;
    position: relative;
    padding-top: 35px;
    .number {
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #667380;
    }
    .scroll {
      transform: rotate(270deg);
      position: absolute;
      bottom: 15px;
      left: 0;
      transform-origin: 0 0;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #667380;
      font-weight: 500;
      font-size: 12px;
    }
    .arrow {
      position: absolute;
      bottom: 0;
      margin-left: 5px;
    }
  }
  .title__section {
    flex: 0 0 50%;
    .title {
      font-size: 56px;
      line-height: 72px;
      color: #ffffff;
      margin-bottom: 25px;
    }
    .subtitle {
      font-size: 24px;
      line-height: 32px;
      color: #a3b8cc;
    }
  }
  .image__section {
    display: flex;
    justify-content: center;
    flex: 0 0 40%;
    position: relative;
    .background {
      background: #1e2936;
      border-radius: 50%;
      width: 275px;
      height: 275px;
    }
    .first__img {
      position: absolute;
      left: 25px;
    }
    .second__img {
      position: absolute;
      right: 20px;
      transform: matrix(-1, 0, 0, 1, 0, 0);
      bottom: -35px;
      img {
        width: 85%;
      }
    }
  }
}
</style>