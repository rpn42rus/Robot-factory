import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentNumberCoins: 100,

		activeModal: '',  // переменная для хранения наименования активного модального окна 

		missingComponents: {
			id: 1,
			biomechanism: 4,
			CPU: 4,
			soul: 1
		},

		readyComponents: {
			id: 2,
			biomechanism: 0,
			CPU: 0,
			soul: 0
		},

		productionComponents: {
			id: 3,
			biomechanism: 0,
			CPU: 0,
			soul: 0
		},

		biomechanism: {
			name: "biomechanism",
			title: "Биомеханизм", // наименование
			costBuy: 7, // стоимость покупки
			costSale: 5, // стоимость продажи
			quantityInStock: 0, // наличие на складе
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
			icons: [
				{ src: "hand1.png", name: "missingIcon" },
				{ src: "hand2.png", name: "selectedIcon" },
				{ src: "hand3.png", name: "readyIcon" },
			],
		},

		CPU: {
			name: "CPU",
			title: "Процессор", // наименование
			costBuy: 5, // стоимость покупки
			costSale: 3, // стоимость продажи
			quantityInStock: 0, // наличие на складе
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
		* Установка новых значений в объект
		*/
		SET_READY_COMPONENT(state, components) {
			state.readyComponents = components;
		},

		/**
		* Установка новых значений в объект
		*/
		SET_MISSING_COMPONENT(state, component) {
			state.missingComponents = component;
		},

		/**
		* Установка новых значений в объект
		*/
		SET_PRODUCTION_COMPONENT(state, component) {
			state.productionComponents = component;
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
		* Метод установки информации об объекте biomechanism
		*/
		setReadyComponents({ commit }, component) {
			commit('SET_READY_COMPONENTS', component);
		},

		/**
		* Метод установки информации об объекте biomechanism
		*/
		setMissingComponent({ commit }, component) {
			commit('SET_MISSING_COMPONENT', component);
		},

		/**
	* Метод установки информации об объекте biomechanism
	*/
		setProductionComponent({ commit }, component) {
			commit('SET_PRODUCTION_COMPONENT', component);
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
		* Получение объекта
		*/
		READY_COMPONENTS: state => state.readyComponents,

		/**
		* Получение объекта
		*/
		MISSING_COMPONENTS: state => state.missingComponents,

		/**
			* Получение объекта
			*/
		PRODUCTION_COMPONENTS: state => state.productionComponents,

		/**
		* Получение состояния(имени модального окна) activeModal
		*/
		ACTIVE_MODAL: state => state.activeModal,
	},

	modules: {}
});
