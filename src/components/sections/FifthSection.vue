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
          <div class="produce__button" v-on:click="produceRobot()">
            <div
              class="button__title"
              v-bind:class="produceButtonActive === true ? 'normal' : 'missing'"
            >Произвести за 10 монет</div>
          </div>
        </div>
        <!-- Блок с иконками компонентов и текстом для недостающих деталей -->
        <div class="amount__components">
          <div class="row__component">
            <div class="component-wrapper">
              <div
                class="component"
                @click="setComponent(component.id, biomechanism)"
                v-for="component in biomechanism.components"
                :key="component.id"
              >
                <div class="miss" v-if="component.state === 'miss'"></div>
                <div class="ready" v-if="component.state === 'ready'"></div>
                <div class="selected" v-if="component.state === 'selected'"></div>
              </div>
            </div>

            <div class="component-wrapper">
              <div
                class="component"
                @click="setComponent(component.id, CPU)"
                v-for="component in CPU.components"
                :key="component.id"
              >
                <div class="miss" v-if="component.state === 'miss'"></div>
                <div class="ready" v-if="component.state === 'ready'"></div>
                <div class="selected" v-if="component.state === 'selected'"></div>
              </div>
            </div>

            <div class="component-wrapper">
              <div
                class="component"
                @click="setComponent(component.id, soul)"
                v-for="component in soul.components"
                :key="component.id"
              >
                <div class="miss" v-if="component.state === 'miss'"></div>
                <div class="ready" v-if="component.state === 'ready'"></div>
                <div class="selected" v-if="component.state === 'selected'"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div
          class="amount__components-text"
          v-if="numberMissingHands > 0 || numberMissingCPU > 0 || numberMissingSoul > 0"
        >
          <p>
            Для производства биоробота не хватает
            <span
              v-if="numberMissingHands > 0"
            >{{checkDeclination(numberMissingHands, ['биомеханизм', 'биомеханизма'])}},</span> &nbsp;
            <span
              v-if="numberMissingCPU > 0"
            >{{checkDeclination(numberMissingCPU, ['процессор', 'процессора'])}}</span> &nbsp;
            <span v-if="numberMissingSoul > 0">
              <span v-if="numberMissingHands > 0 || numberMissingCPU > 0">и</span> &nbsp; души
            </span>
          </p>
        </div>-->

        <!-- </div> -->

        <!-- Блок с картинкой робота -->
        <!-- <div class="kind__robot">
          <img v-bind:src="checkParametersRobot()" alt />
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FifthSection",

  props: {
    biomechanism: {
      type: Object
    },
    CPU: {
      type: Object
    },
    soul: {
      type: Object
    }
  },

  data() {
    return {
      typeRobot: "FrontEnd", // флаг переключения радио кнопки для блока с типом робота
      stabilizerPicked: "Male", // флаг переключения радио кнопки для блока с стабилизатором
      produceButtonActive: false, // флаг для разблокировки кнопки "Произвести за 10 монет"

      select: []
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
    }
  },

  methods: {
    getIcon(pic) {
      return require("../../assets/img/robotComponents/" + pic);
    },

    setComponent(componentId, nameComponent) {
      if (nameComponent.components[componentId].state === "ready") {
        nameComponent.components[componentId].state = "selected";
        nameComponent.quantityInStock--;
      } else if (nameComponent.components[componentId].state === "selected") {
        nameComponent.components[componentId].state = "ready";
        nameComponent.quantityInStock++;
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
          border: 2px solid #4c5865;
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
            color: #fff;
            background: #ff5722;
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

.miss {
  height: 50px;
  width: 50px;

  background: url("../../assets/img/robotComponents/hand1.png") no-repeat;
}
.selected {
  height: 50px;
  width: 50px;

  background: url("../../assets/img/robotComponents/hand3.png") no-repeat;
}
.ready {
  height: 50px;
  width: 50px;

  background: url("../../assets/img/robotComponents/hand2.png") no-repeat;
}
</style>