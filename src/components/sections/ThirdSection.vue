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
        <!-- Биомеханизм -->
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
        <!-- Процессор -->
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
        <!-- Душа -->
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

  props: {
    biomechanism: {
      type: Object,
      required: true
    }, // биомеханизм
    CPU: {
      type: Object,
      required: true
    }, // процессор
    soul: {
      type: Object,
      required: true
    } // душа
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
    }
  },

  methods: {
    /**
     * Метод покупки деталей и добавления на склад
     * Входные параметры:
     *   nameComponent - имя компонента
     */
    buyComponent(nameComponent) {
      // если текущее количество монет больше или равно стоимости покупки
      if (this.currentNumberCoins >= nameComponent.costBuy) {
        // отнимаем от текущего значение цену покупки
        this.currentNumberCoins =
          Number(this.currentNumberCoins) - Number(nameComponent.costBuy);
        // увеличиваем количество комплектующего на складе
        nameComponent.quantityInStock++;
        // цикл по компонентам детали
        for (let component in nameComponent.components) {
          // если состояние компонента = "miss", то изменяем его и прерываем цикл
          if (nameComponent.components[component].state === "miss") {
            nameComponent.components[component].state = "ready";
            break;
          }
        }
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