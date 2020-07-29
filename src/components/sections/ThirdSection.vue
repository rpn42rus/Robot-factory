<template>
  <div class="third-section">
    <!-- Левая часть секции с её порядковым номером -->
    <div class="number__section">
      <div class="number">03</div>
    </div>
    <!-- Контент секции -->
    <div class="content__section">
      <!-- Заголовок -->
      <div class="title">Рынок комплектующих</div>
      <!-- Обертка -->
      <div class="components__wrapper">
        <div class="component">
          <div class="component__icon">
            <img v-bind:src="biomechanism.iconUrl" alt />
          </div>
          <div class="component__title">{{biomechanism.title}}</div>
          <div class="component__cost">Стоимость: {{biomechanism.costBuy}} монет</div>
          <div
            class="component__button"
            :class="{'disabled__button': currentNumberCoins < biomechanism.costBuy}"
            @click="buyComponent(biomechanism)"
          >Установить</div>
        </div>
        <div class="component">
          <div class="component__icon">
            <img v-bind:src="CPU.iconUrl" alt />
          </div>
          <div class="component__title">{{CPU.title}}</div>
          <div class="component__cost">Стоимость: {{CPU.costBuy}} монет</div>
          <div
            class="component__button"
            :class="{'disabled__button': currentNumberCoins < CPU.costBuy}"
            @click="buyComponent(CPU)"
          >Установить</div>
        </div>
        <div class="component">
          <div class="component__icon">
            <img v-bind:src="soul.iconUrl" alt />
          </div>
          <div class="component__title">{{soul.title}}</div>
          <div class="component__cost">Стоимость: {{soul.costBuy}} монет</div>
          <div
            class="component__button"
            :class="{'disabled__button': currentNumberCoins < soul.costBuy}"
            @click="buyComponent(soul)"
          >Установить</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThirdSection",

  data() {
    return {};
  },

  computed: {
    /**
     * Свойство для получения и установки количества монет
     */
    currentNumberCoins: {
      get() {
        return this.$store.getters.CURRENT_NUMBER_COINS; // получение lastOpenedRoomId из локального хранилища
      },
      set(numberCoins) {
        this.$store.dispatch("setNumberCoins", numberCoins); // вызов action из локального хранилища для записи в lastOpenedRoomId значение roomId
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
     * Свойство для получения и установки новых значений в объекте биомеханизма
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
     * Свойство для получения и установки новых значений в объекте биомеханизма
     */
    soul: {
      get() {
        return this.$store.getters.SOUL; // получение объекта
      },
      set(soulInfo) {
        this.$store.dispatch("setInfoBiomechanism", soulInfo); // вызов action из локального хранилища для записи в объект новых значений
      }
    }
  },

  methods: {
    buyComponent(nameComponent) {
      if (this.currentNumberCoins >= nameComponent.costBuy) {
        // отнимаем от текущего значение цену покупки
        this.currentNumberCoins =
          Number(this.currentNumberCoins) - Number(nameComponent.costBuy);
        // увеличиваем количество комплектующего на складе
        nameComponent.quantityInStock++;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.third-section {
  display: flex;
  margin-bottom: 100px;
  .number__section {
    flex: 0 0 10%;
    padding-top: 15px;
    .number {
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #667380;
    }
  }
  .content__section {
    flex: 0 0 90%;
    .title {
      font-size: 32px;
      line-height: 40px;
      color: #ffffff;
    }
    .components__wrapper {
      display: flex;
      .component {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 0 33.333%;
        .component__icon {
          height: 210px;
          img {
            max-width: 100%;
          }
        }
        .component__title {
          font-size: 20px;
          line-height: 32px;
          text-align: center;
          color: #ffffff;
          margin-bottom: 5px;
        }
        .component__cost {
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          color: #a3b8cc;
          margin-bottom: 25px;
        }
        .component__button {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          color: #ffffff;
          width: 200px;
          height: 48px;
          border: 2px solid #ff7f22;
          border-radius: 60px;
          user-select: none;
          &:hover {
            cursor: pointer;
            background: linear-gradient(180deg, #ff7f22 0%, #ff5722 100%);
          }
        }
        .disabled__button {
          border: 2px solid #4c5865;
          border-radius: 60px;
          color: #4c5865;
          &:hover {
            cursor: not-allowed;
            background: transparent;
          }
        }
      }
    }
  }
}
</style>