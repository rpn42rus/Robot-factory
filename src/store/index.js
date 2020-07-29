import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentNumberCoins: 0,

		activeModal: ''  // переменная для хранения наименования активного модального окна 

	},

	mutations: {
		SET_NUMBER_COINS(state, numberCoins) {
			state.currentNumberCoins = numberCoins;
		},

		/**
		* Установка имени модального окна в activeModalName
		**/
		SET_ACTIVE_MODAL(state, activeModalName) {
			state.activeModal = activeModalName;
		},
	},

	actions: {
		getCoins({ commit }, numberCoins) {
			commit('SET_NUMBER_COINS', numberCoins);
		},

		/**
		* Метод установки модального окна
		**/
		setActiveModal({ commit }, activeModalName) {
			commit('SET_ACTIVE_MODAL', activeModalName);
		},
	},

	getters: {
		CURRENT_NUMBER_COINS: state => state.currentNumberCoins,

		/**
		* Получение состояния(имени модального окна) activeModal
		*/
		ACTIVE_MODAL: state => state.activeModal,
	},

	modules: {}
});
