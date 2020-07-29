<template>
  <div class="modal">
    <!-- Модальное окно -->
    <transition name="modal">
      <div class="modal-wrapper" v-if="activeModal !== ''">
        <div class="modal__content">
          <!-- Шапка -->
          <div class="modal__content-header">
            <img src="../../assets/img/Close.png" alt v-on:click.stop="closeModal()" />
          </div>
          <!-- Тело -->
          <div class="modal__content-body">
            <div
              class="modal__title-wrapper"
              v-bind:class="(activeModal === 'succsess') ? 'padding-title' : ''"
            >
              <img
                src="../../assets/img/Layer 19 copy 117 2.svg"
                alt
                v-if="activeModal === 'warning'"
              />
              <div class="modal__title" v-if="activeModal === 'warning'">Количество монет ограничено</div>
              <div class="modal__title" v-if="activeModal === 'succsess'">
                Биоробот
                <br />произведён
              </div>
            </div>

            <div
              class="modal__text"
              v-if="activeModal === 'warning'"
            >Вы не можете нацыганить более 100 монет biorobo</div>
            <div class="modal__text" v-if="activeModal === 'succsess'">
              Поздравляем!
              <br />Вы произвели биоробота
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ModalWindow",

  data() {
    return {};
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
    }
  },

  methods: {
    /**
     * Метод закрытия модального окна
     */
    closeModal() {
      this.activeModal = "";
    }
  }
};
</script>

<style lang="scss" scoped>
/* Модальное окно */
.modal-wrapper {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  .modal__content {
    width: 496px;
    height: 240px;
    background: #ffffff;
    position: fixed;
    top: 40%;
    left: 40%;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    overflow: hidden;
    &-header {
      text-align: right;
      img {
        cursor: pointer;
      }
    }
    &-body {
      display: flex;
      justify-content: center;
      flex-direction: column;

      .modal__title-wrapper {
        display: flex;
        margin-bottom: 23px;
        img {
          padding: 0 31px;
          object-fit: contain;
        }
        .modal__title {
          font-weight: 600;
          font-size: 32px;
          line-height: 40px;
          color: #212529;
        }
      }
      .modal__text {
        width: 57%;
        margin: 0 auto;
        font-size: 20px;
        line-height: 32px;
        color: #4c5865;
      }
      .padding-title {
        padding-left: 110px;
      }
    }
  }
}

/* Анимация модального окна */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>