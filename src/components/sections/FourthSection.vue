<template>
  <div class="fourth-section">
    <!-- Левая часть секции с её порядковым номером -->
    <div class="number__section">
      <div class="number">04</div>
    </div>
    <!-- Контент секции -->
    <div class="content__section">
      <!-- Заголовок -->
      <div class="title">Склад</div>
      <!-- Обертка -->
      <div class="store__wrapper">
        <div class="store">
          <div class="store__title">{{biomechanism.title}}</div>
          <div class="store__cost">Стоимость: {{biomechanism.costSale}} монет</div>
          <div class="store__count">{{biomechanism.quantityInStock}} шт</div>
          <div
            class="store__button"
            :class="{'disabled__button': biomechanism.quantityInStock < 1}"
            v-on:click="saleComponent(biomechanism)"
          >Продать</div>
        </div>
        <div class="store">
          <div class="store__title">{{CPU.title}}</div>
          <div class="store__cost">Стоимость: {{CPU.costSale}} монет</div>
          <div class="store__count">{{CPU.quantityInStock}} шт</div>
          <div
            class="store__button"
            :class="{'disabled__button': CPU.quantityInStock < 1}"
            v-on:click="saleComponent(CPU)"
          >Продать</div>
        </div>
        <div class="store">
          <div class="store__title">{{soul.title}}</div>
          <div class="store__cost">Стоимость: {{soul.costSale}} монет</div>
          <div class="store__count">{{soul.quantityInStock}} шт</div>
          <div
            class="store__button"
            :class="{'disabled__button': soul.quantityInStock < 1}"
            @click="saleComponent(soul)"
          >Продать</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FourthSection",

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
    /**
     * Метод продажи компонента робота
     */
    saleComponent(nameComponent) {
      if (nameComponent.quantityInStock > 0) {
        // прибавляем к текущему значению цену продажи
        this.currentNumberCoins =
          Number(this.currentNumberCoins) + Number(nameComponent.costSale);
        // уменьшаем количество на складе
        nameComponent.quantityInStock--;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fourth-section {
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
      margin-bottom: 40px;
    }

    .store__wrapper {
      display: flex;
      .store {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0 0 33.333%;
        .store__title {
          font-size: 20px;
          line-height: 32px;
          text-align: center;
          color: #ffffff;
          margin-bottom: 5px;
        }
        .store__cost {
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          color: #a3b8cc;
          margin-bottom: 15px;
        }
        .store__count {
          font-size: 20px;
          line-height: 24px;
          margin-bottom: 20px;
          color: #ffffff;
        }
        .store__button {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          color: #7cdaf9;
          width: 200px;
          height: 48px;
          border-radius: 60px;
          border: 2px solid #7cdaf9;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
          user-select: none;
          &:hover {
            cursor: pointer;
            color: #212529;
            background: linear-gradient(180deg, #7cdaf9 0%, #7cdaf9 100%);
          }
        }
        .disabled__button {
          border: 2px solid #4c5865;
          border-radius: 60px;
          color: #4c5865;
          &:hover {
            cursor: not-allowed;
            color: #4c5865;
            background: transparent;
          }
        }
      }
    }
  }
}
</style>