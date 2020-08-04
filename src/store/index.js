import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentNumberCoins: 0,

		activeModal: '',  // переменная для хранения наименования активного модального окна 

		biomechanism: {
			name: "biomechanism",
			title: "Биомеханизм", // наименование
			costBuy: 7, // стоимость покупки
			costSale: 5, // стоимость продажи
			quantityInStock: 0, // наличие на складе
			numberMissing: 4,
			components: {
				1: {
					id: 1,
					state: 'miss'
				},
				2: {
					id: 2,
					state: 'miss'
				},
				3: {
					id: 3,
					state: 'miss'
				},
				4: {
					id: 4,
					state: 'miss'
				},
			},
			iconUrl: require("@/assets/img/icon 5.png"), // иконка
		},

		CPU: {
			name: "CPU",
			title: "Процессор", // наименование
			costBuy: 5, // стоимость покупки
			costSale: 3, // стоимость продажи
			quantityInStock: 0, // наличие на складе
			numberMissing: 4,
			components: {
				1: {
					id: 1,
					state: 'miss'
				},
				2: {
					id: 2,
					state: 'miss'
				},
				3: {
					id: 3,
					state: 'miss'
				},
				4: {
					id: 4,
					state: 'miss'
				},
			},
			iconUrl: require("@/assets/img/icon 4.png") // иконка
		},

		soul: {
			name: "soul",
			title: "Душа", // наименование
			costBuy: 25, // стоимость покупки
			costSale: 15, // стоимость продажи
			quantityInStock: 0, // наличие на складе
			numberMissing: 1,
			components: {
				1: {
					id: 1,
					state: 'miss'
				}
			},
			iconUrl: require("@/assets/img/icon 3.png") // иконка
		},


	},

	mutations: {

		/**
		* Установка нового значения количества монет
		*/
		SET_NUMBER_COINS(state, numberCoins) {
			state.currentNumberCoins = numberCoins;
		},

		/**
		* Установка новых значений в объект biomechanism
		*/
		SET_INFO_BIOMECHANISM(state, biomechanismInfo) {
			state.biomechanism = biomechanismInfo;
		},

		/**
		* Установка новых значений в объект CPU
		*/
		SET_INFO_CPU(state, CPUInfo) {
			state.CPU = CPUInfo;
		},

		/**
		* Установка новых значений в объект soul
		*/
		SET_INFO_SOUL(state, soulInfo) {
			state.soul = soulInfo;
		},

		/**
		* Установка имени модального окна в activeModalName
		*/
		SET_ACTIVE_MODAL(state, activeModalName) {
			state.activeModal = activeModalName;
		},
	},

	actions: {

		/**
		* Метод установки количества монет
		*/
		setNumberCoins({ commit }, numberCoins) {
			commit('SET_NUMBER_COINS', numberCoins);
		},

		/**
		* Метод установки информации об объекте biomechanism
		*/
		setInfoBiomechanism({ commit }, biomechanismInfo) {
			commit('SET_INFO_BIOMECHANISM', biomechanismInfo);
		},

		/**
		* Метод установки информации об объекте biomechanism
		*/
		setInfoCPU({ commit }, CPUInfo) {
			commit('SET_INFO_CPU', CPUInfo);
		},

		/**
		* Метод установки информации об объекте biomechanism
		*/
		setInfoSoul({ commit }, soulInfo) {
			commit('SET_INFO_SOUL', soulInfo);
		},

		/**
		* Метод установки модального окна
		*/
		setActiveModal({ commit }, activeModalName) {
			commit('SET_ACTIVE_MODAL', activeModalName);
		},
	},

	getters: {
		/**
		* Получение текущего количества монет
		*/
		CURRENT_NUMBER_COINS: state => state.currentNumberCoins,

		/**
		* Получение объекта с инфо о биомеханизме
		*/
		BIOMECHANISM: state => state.biomechanism,

		/**
		* Получение объекта с инфо о процессоре
		*/
		CPU: state => state.CPU,

		/**
		* Получение объекта с инфо о душе
		*/
		SOUL: state => state.soul,

		/**
		* Получение состояния(имени модального окна) activeModal
		*/
		ACTIVE_MODAL: state => state.activeModal,
	},

	modules: {}
});
