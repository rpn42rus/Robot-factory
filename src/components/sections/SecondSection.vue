<template>
  <div class="second-section">
    <!-- Левая часть секции с её порядковым номером -->
    <div class="number__section">
      <div class="number">02</div>
    </div>
    <!-- Контент секции -->
    <div class="content__section">
      <!-- Заголовок -->
      <div class="title">Кошелёк криптовалют</div>
      <!-- Монетки -->
      <div class="coins">
        <img
          class="coin"
          src="@/assets/img/coin.png"
          v-for="coin in currentNumberCoins"
          :key="coin"
        />
      </div>
      <!-- Количество монет -->
      <div class="count__coins">{{currentNumberCoins}} biorobo монет</div>
      <!-- Добавить монет -->
      <div class="charge__wrapper">
        <div class="one__coin" v-on:click="addCoins">Нацыганить</div>
        <div
          class="checkbox"
          v-bind:class="{activeCheckbox: fiveCoinsFlag}"
          v-on:click="setCheckboxActive"
        ></div>
        <div class="five__coins" v-on:click="setCheckboxActive">Цыганить по 5 монет</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SecondSection",

  data() {
    return {
      fiveCoinsFlag: false // флаг уставновки чекбокса для начисления currentNumberCoins по 5 монет
    };
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
     * Свойтво для получения и установки имени активного окна/выпадающего списка/контекстного меню
     */
    activeModal: {
      get() {
        return this.$store.getters.ACTIVE_MODAL;
      },
      set(newActiveModal) {
        this.$store.dispatch("setActiveModal", newActiveModal);
      }
    }
  },

  methods: {
    /**
     * Метод добавления монет к текущему значению
     */
    addCoins() {
      // проверка количества монет(если больше 100, то начисления прекращаются и отображается модалка)
      if (this.currentNumberCoins >= 100) {
        this.activeModal = "warning";
        this.fiveCoinsFlag = false;
      } else {
        // проверка на активный чекбокс и количество монет(если больше 95, то по 5 монет начислятся не будет)
        if (this.fiveCoinsFlag && this.currentNumberCoins <= 95) {
          this.currentNumberCoins += 5;
        } else {
          this.fiveCoinsFlag = false;
          this.activeModal = "";
          this.currentNumberCoins++;
        }
      }
    },

    /**
     * Метод установки чекбокса
     */
    setCheckboxActive() {
      this.fiveCoinsFlag = !this.fiveCoinsFlag;
    }
  }
};
</script>

<style lang="scss" scoped>
.second-section {
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
      margin-bottom: 50px;
    }
    .coins {
      height: 20px;
      display: flex;
      margin-bottom: 20px;
      .coin {
        margin-right: -8px;
      }
    }
    .count__coins {
      font-size: 24px;
      line-height: 24px;
      color: #a3b8cc;
      margin-bottom: 43px;
    }
    .charge__wrapper {
      height: 35px;
      display: flex;
      align-items: center;
      .one__coin {
        height: 25px;
        margin-right: 20px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #ff7f22;
        user-select: none;
        &:hover {
          cursor: pointer;
          border-bottom: 1px solid #ff9549;
        }
      }
      .checkbox {
        width: 24px;
        height: 24px;
        border: 2px solid #a3b8cc;
        position: relative;
        margin-right: 10px;
        &:hover {
          border: 2px solid #4c5865;
          cursor: pointer;
        }
      }
      .five__coins {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  /* Флажок в чекбоксе */
  .activeCheckbox {
    background: url("../../assets/img/Vector.png") center no-repeat;
  }
}
</style>