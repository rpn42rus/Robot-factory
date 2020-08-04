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
        <!-- Биомеханизм -->
        <div class="store">
          <div class="store__title">{{biomechanism.title}}</div>
          <div class="store__cost">Стоимость: {{biomechanism.costSale}} монет</div>
          <div class="store__count">{{biomechanism.quantityInStock}} шт</div>
          <div
            class="store__button"
            :class="{'disabled__button': biomechanism.quantityInStock < 1 || currentNumberCoins + biomechanism.costSale > 100}"
            v-on:click="saleComponent(biomechanism)"
          >Продать</div>
        </div>
        <!-- Процессор -->
        <div class="store">
          <div class="store__title">{{CPU.title}}</div>
          <div class="store__cost">Стоимость: {{CPU.costSale}} монет</div>
          <div class="store__count">{{CPU.quantityInStock}} шт</div>
          <div
            class="store__button"
            :class="{'disabled__button': CPU.quantityInStock < 1 || currentNumberCoins + CPU.costSale > 100}"
            v-on:click="saleComponent(CPU)"
          >Продать</div>
        </div>
        <!-- Душа -->
        <div class="store">
          <div class="store__title">{{soul.title}}</div>
          <div class="store__cost">Стоимость: {{soul.costSale}} монет</div>
          <div class="store__count">{{soul.quantityInStock}} шт</div>
          <div
            class="store__button"
            :class="{'disabled__button': soul.quantityInStock < 1 || currentNumberCoins + soul.costSale > 100}"
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
     * Метод продажи компонента робота
     */
    saleComponent(nameComponent) {
      // если на складе есть детали и сумма текущего количества монет и цена продажи детали не превышает 100
      if (
        nameComponent.quantityInStock > 0 &&
        this.currentNumberCoins + nameComponent.costSale <= 100
      ) {
        // прибавляем к текущему значению цену продажи
        this.currentNumberCoins += nameComponent.costSale;

        let componentsKeysArray = Object.keys(nameComponent.components); // переменная для хранения массива ключей из объекта components
        let selectedComponentsCount = 0; // переменная для хранение количества выбранных компонентов

        // перебор свойств объекта components
        Object.values(nameComponent.components).forEach(currentElement => {
          // если у компонента установлено состояние "selected", то увеличиваем количество selectedComponentsCount
          if (currentElement.state === "selected") {
            selectedComponentsCount++;
          }
        });

        // если сумма деталей на складе и количество выбранных компонентов <= длине массива компонентов
        if (
          nameComponent.quantityInStock + selectedComponentsCount <=
          componentsKeysArray.length
        ) {
          // перебор массива ключей(начинается с конца)
          for (let i = componentsKeysArray.length - 1; i >= 0; i--) {
            // если у компонента установлено состояние "ready", то изменяем его на "miss" и прерываем цикл
            if (
              nameComponent.components[componentsKeysArray[i]].state === "ready"
            ) {
              nameComponent.components[componentsKeysArray[i]].state = "miss";
              break;
            }
          }
        }

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