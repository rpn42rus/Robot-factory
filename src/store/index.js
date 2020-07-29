import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentNumberCoins: 0,
	},

	mutations: {
		SET_NUMBER_COINS(state, numberCoins) {
			state.currentNumberCoins = numberCoins;
		}
	},

	actions: {
		getCoins({ commit }, numberCoins) {
			commit('SET_NUMBER_COINS', numberCoins);
		}
	},

	getters: {
		CURRENT_NUMBER_COINS: state => state.currentNumberCoins
	},

	modules: {}
});
