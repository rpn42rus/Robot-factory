<template>
  <div class="fifth-section" id="fifth-section">
    <!-- Левая часть секции с её порядковым номером -->
    <div class="number__section">
      <div class="number">05</div>
    </div>
    <!-- Контент секции -->
    <div class="content__section">
      <!-- Заголовок -->
      <div class="title">Производство</div>
      <!-- Обертка -->
      <div class="content__wrapper">
        <!-- Блок с радиокнопками и кнопкой "Произвести" -->
        <div class="config__robot">
          <div class="radio__buttons-wrapper">
            <div class="type__robot">
              <div class="type__robot-title">Тип биоробота:</div>
              <div class="buttons__wrapper">
                <div class="radio">
                  <input
                    class="radio__input"
                    type="radio"
                    id="one"
                    name="FrontEnd"
                    value="FrontEnd"
                    v-model="typeRobot"
                  />
                  <label class="radio__label" for="one">FrontEnd</label>
                </div>
                <div class="radio">
                  <input
                    class="radio__input"
                    type="radio"
                    id="two"
                    name="Design"
                    value="Design"
                    v-model="typeRobot"
                  />
                  <label class="radio__label" for="two">Design</label>
                </div>
              </div>
            </div>
            <div class="stabilizer">
              <div class="stabilizer-title">Стабилизатор:</div>
              <div class="buttons__wrapper">
                <div class="radio">
                  <input
                    class="radio__input"
                    type="radio"
                    id="three"
                    value="Male"
                    v-model="stabilizerPicked"
                  />
                  <label class="radio__label" for="three">Male</label>
                </div>
                <div class="radio">
                  <input
                    class="radio__input"
                    type="radio"
                    id="four"
                    value="Famale"
                    v-model="stabilizerPicked"
                  />
                  <label class="radio__label" for="four">Famale</label>
                </div>
              </div>
            </div>
          </div>
          <div class="produce__button" @click="produceRobot()">
            <div
              class="button__title"
              :class="availabilityOfParts === 'productionParts' && currentNumberCoins >= 10 ? 'normal' : 'missing'"
            >Произвести за 10 монет</div>
          </div>
        </div>
        <!-- Блок с иконками компонентов и текстом для недостающих деталей -->
        <div class="amount__components">
          <div class="row__component">
            <!-- Биомеханизм -->
            <div class="component-wrapper">
              <div
                class="component"
                @click="setComponent(component.id, biomechanism)"
                v-for="component in biomechanism.components"
                :key="component.id"
              >
                <div
                  :class="{'missBiomech': component.state === 'miss', 'readyBiomech': component.state === 'ready', 'selectedBiomech': component.state === 'selected'}"
                ></div>
              </div>
            </div>
            <!-- Процессор -->
            <div class="component-wrapper">
              <div
                class="component"
                @click="setComponent(component.id, CPU)"
                v-for="component in CPU.components"
                :key="component.id"
              >
                <div
                  :class="{'missCPU': component.state === 'miss', 'readyCPU': component.state === 'ready', 'selectedCPU': component.state === 'selected'}"
                ></div>
              </div>
            </div>
            <!-- Душа -->
            <div class="component-wrapper">
              <div
                class="component"
                @click="setComponent(component.id, soul)"
                v-for="component in soul.components"
                :key="component.id"
              >
                <div
                  :class="{'missSoul': component.state === 'miss', 'readySoul': component.state === 'ready', 'selectedSoul': component.state === 'selected'}"
                ></div>
              </div>
            </div>
          </div>

          <div class="amount__components-text" v-if="availabilityOfParts !== 'productionParts'">
            <p>
              Для производства биоробота не хватает
              <span
                v-if="biomechanism.numberMissing > 0"
              >{{checkDeclination(biomechanism.numberMissing, ['биомеханизм', 'биомеханизма'])}},</span> &nbsp;
              <span
                v-if="CPU.numberMissing > 0"
              >{{checkDeclination(CPU.numberMissing, ['процессор', 'процессора'])}}</span> &nbsp;
              <span v-if="soul.numberMissing > 0">
                <span v-if="biomechanism.numberMissing > 0 || CPU.numberMissing > 0">и</span> &nbsp; души
              </span>
            </p>
          </div>
        </div>

        <!-- Блок с картинкой робота -->
        <div class="kind__robot">
          <img v-bind:src="checkParametersRobot()" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FifthSection",

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

  data() {
    return {
      typeRobot: "FrontEnd", // флаг переключения радио кнопки для блока с типом робота
      stabilizerPicked: "Male" // флаг переключения радио кнопки для блока с стабилизатором
    };
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
    },

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
     * Свойство проверки наличия деталей для производства
     */
    availabilityOfParts() {
      let statesArray = []; // переменная для хранения всех состояний деталей
      let stateComponents = "productionParts"; // переменная для хранения общего состояния

      // перебор деталей биомеханизма и добавление в массив состояний деталей
      for (let bioComponent in this.biomechanism.components) {
        statesArray.push(this.biomechanism.components[bioComponent].state);
      }
      // перебор деталей процессора и добавление в массив состояний деталей
      for (let cpuComponent in this.CPU.components) {
        statesArray.push(this.CPU.components[cpuComponent].state);
      }
      // добавление в массив состояния компонента души
      statesArray.push(this.soul.components[1].state);

      // перебор массива состояний всех деталей
      for (let i in statesArray) {
        // если есть состояние miss, устанавливаем переменной значение missingParts и прерываем цикл
        if (statesArray[i] === "miss") {
          stateComponents = "missingParts";
          break;
          // если есть состояние ready и нет ни одного с состояние miss, устанавливаем переменной значение readyParts
        } else if (statesArray[i] !== "miss" && statesArray[i] === "ready") {
          stateComponents = "readyParts";
        }
      }

      return stateComponents; // возвращается общее состояние готовности компонентов
    }
  },

  methods: {
    /**
     * Метод проверки выбранных параметров и установленных деталей для подставления соответствующей иконки
     */
    checkParametersRobot() {
      if (this.availabilityOfParts === "missingParts") {
        if (this.typeRobot === "FrontEnd" && this.stabilizerPicked === "Male") {
          return require("../../assets/img/robots/FrontMale3.png");
        } else if (
          this.typeRobot === "FrontEnd" &&
          this.stabilizerPicked === "Famale"
        ) {
          return require("../../assets/img/robots/FrontFamale3.png");
        } else if (
          this.typeRobot === "Design" &&
          this.stabilizerPicked === "Male"
        ) {
          return require("../../assets/img/robots/DesignerMale3.png");
        } else if (
          this.typeRobot === "Design" &&
          this.stabilizerPicked === "Famale"
        ) {
          return require("../../assets/img/robots/DesignerFamale3.png");
        }
      } else if (this.availabilityOfParts === "readyParts") {
        if (this.typeRobot === "FrontEnd" && this.stabilizerPicked === "Male") {
          return require("../../assets/img/robots/FrontMale2.png");
        } else if (
          this.typeRobot === "FrontEnd" &&
          this.stabilizerPicked === "Famale"
        ) {
          return require("../../assets/img/robots/FrontFamale2.png");
        } else if (
          this.typeRobot === "Design" &&
          this.stabilizerPicked === "Male"
        ) {
          return require("../../assets/img/robots/DesignerMale2.png");
        } else if (
          this.typeRobot === "Design" &&
          this.stabilizerPicked === "Famale"
        ) {
          return require("../../assets/img/robots/DesignerFamale2.png");
        }
      } else if (this.availabilityOfParts === "productionParts") {
        if (this.typeRobot === "FrontEnd" && this.stabilizerPicked === "Male") {
          return require("../../assets/img/robots/FrontMale1.png");
        } else if (
          this.typeRobot === "FrontEnd" &&
          this.stabilizerPicked === "Famale"
        ) {
          return require("../../assets/img/robots/FrontFamale1.png");
        } else if (
          this.typeRobot === "Design" &&
          this.stabilizerPicked === "Male"
        ) {
          return require("../../assets/img/robots/DesignerMale1.png");
        } else if (
          this.typeRobot === "Design" &&
          this.stabilizerPicked === "Famale"
        ) {
          return require("../../assets/img/robots/DesignerFamale1.png");
        }
      }
    },

    /**
     * Метод смены состояния компонента
     * Входные параметры:
     *    componentId - id детали
     * 		nameComponent - имя компонента
     */
    setComponent(componentId, nameComponent) {
      // если установлено состояние "ready", то меняем на "selected" и уменьшаем количество деталей на складе и недостающих
      if (nameComponent.components[componentId].state === "ready") {
        nameComponent.components[componentId].state = "selected";
        nameComponent.quantityInStock--;
        nameComponent.numberMissing--;
        // если установлено состояние "selected", то меняем на "ready" и увеличиваем количество деталей на складе и недостающих
      } else if (nameComponent.components[componentId].state === "selected") {
        nameComponent.components[componentId].state = "ready";
        nameComponent.quantityInStock++;
        nameComponent.numberMissing++;
      }
    },

    /**
     * Функция для склонения количества лет
     * @param number (number) - числительная переменная
     * @param titles (string) - массив из форм слова при разных числовых значениях
     */
    checkDeclination(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2]; // в переменной хранятся индексы из массива
      return (
        number +
        " " +
        titles[
          number % 100 > 4 && number % 100 < 20
            ? 2
            : cases[number % 10 < 5 ? number % 10 : 5]
        ]
      );
    },

    /**
     * Метод производства робота и открытия модального окна
     */
    produceRobot() {
      if (
        this.availabilityOfParts === "productionParts" &&
        this.currentNumberCoins >= 10
      ) {
        this.activeModal = "succsess";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.fifth-section {
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
      font-family: Montserrat;
      font-style: normal;
      font-size: 32px;
      line-height: 40px;
      color: #ffffff;
      margin-bottom: 50px;
    }
    .content__wrapper {
      display: flex;
      .config__robot {
        flex: 0 0 30%;
        .radio__buttons-wrapper {
          width: 75%;
          margin-bottom: 50px;
          .type__robot {
            margin-bottom: 30px;
            .type__robot-title {
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
              color: #ffffff;
              margin-bottom: 20px;
            }
            .buttons__wrapper {
              display: flex;
              justify-content: space-between;
              .radio {
                position: relative;
                display: flex;
                height: 25px;
                align-items: center;
                .radio__input {
                  appearance: none;
                  -webkit-appearance: none;
                  position: absolute;
                  &:hover {
                    cursor: pointer;
                  }
                }
                .radio__label {
                  display: flex;
                  align-items: center;
                  padding-left: 35px;
                  font-size: 12px;
                  line-height: 16px;
                  color: #ffffff;
                  &:hover {
                    cursor: pointer;
                  }
                  &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 24px;
                    height: 24px;
                    border: 2px solid #a3b8cc;
                    border-radius: 50%;
                    z-index: 1;
                  }
                  &:after {
                    content: "";
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    display: block;
                    width: 16px;
                    height: 16px;
                    background: #ff7f22;
                    border-radius: 50%;
                    z-index: 2;
                    opacity: 0;
                  }
                }
                .radio__input:checked + .radio__label:after {
                  opacity: 1;
                }
              }
            }
          }
          .stabilizer {
            &-title {
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
              color: #ffffff;
              margin-bottom: 20px;
            }
            .buttons__wrapper {
              display: flex;
              justify-content: space-between;
              .radio {
                position: relative;
                display: flex;
                height: 25px;
                align-items: center;
                .radio__input {
                  appearance: none;
                  -webkit-appearance: none;
                  position: absolute;
                  &:hover {
                    cursor: pointer;
                  }
                }
                .radio__label {
                  display: flex;
                  align-items: center;
                  padding-left: 35px;
                  font-size: 12px;
                  line-height: 16px;
                  color: #ffffff;
                  &:hover {
                    cursor: pointer;
                  }
                  &:before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: block;
                    width: 24px;
                    height: 24px;
                    border: 2px solid #a3b8cc;
                    border-radius: 50%;
                    z-index: 1;
                  }
                  &:after {
                    content: "";
                    position: absolute;
                    top: 4px;
                    left: 4px;
                    display: block;
                    width: 16px;
                    height: 16px;
                    background: #ff7f22;
                    border-radius: 50%;
                    z-index: 2;
                    opacity: 0;
                  }
                }
                .radio__input:checked + .radio__label:after {
                  opacity: 1;
                }
              }
            }
          }
        }
        .produce__button {
          width: 236px;
          height: 48px;
          box-sizing: border-box;
          border-radius: 60px;
          color: #4c5865;
          .button__title {
            height: 100%;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
      .amount__components {
        flex: 0 0 35%;
        padding-left: 50px;
        display: flex;
        flex-direction: column;
        .row__component {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .component-wrapper {
            display: flex;
            margin-bottom: 10px;
            .component {
              margin-right: 10px;
            }
          }
        }
        .amount__components-text {
          width: 160px;
          margin-top: 15px;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: #a3b8cc;
        }
      }
      .kind__robot {
        flex: 0 0 35%;
        display: flex;
        justify-content: center;
        img {
          max-width: 100%;
          height: 275px;
        }
      }
    }
  }
}

.missBiomech {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/hand1.png") no-repeat;
}
.selectedBiomech {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/hand3.png") no-repeat;
  cursor: pointer;
}
.readyBiomech {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/hand2.png") no-repeat;
  cursor: pointer;
}
.missCPU {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/cpu1.png") no-repeat;
}
.selectedCPU {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/cpu3.png") no-repeat;
  cursor: pointer;
}
.readyCPU {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/cpu2.png") no-repeat;
  cursor: pointer;
}
.missSoul {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/soul1.png") no-repeat;
}
.selectedSoul {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/soul3.png") no-repeat;
  cursor: pointer;
}
.readySoul {
  height: 50px;
  width: 50px;
  background: url("../../assets/img/robotComponents/soul2.png") no-repeat;
  cursor: pointer;
}

/* Активная кнопка "произвести" */
.normal {
  color: #ffffff;
  border-radius: 60px;
  border: 2px solid #ff7f22;
  &:hover {
    background: #ff5722;
  }
}

/* Заблокированная кнопка "произвести" */
.missing {
  color: #4c5865;
  border-radius: 60px;
  border: 2px solid #4c5865;
  cursor: not-allowed;
}
</style>