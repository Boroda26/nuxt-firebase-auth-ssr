import Cookies from 'js-cookie'

export const state = () => ({
	user: null,
})

export const mutations = {
	user(state, data) {
		state.user = data
	},
}

export const actions = {
	user(state, data) {
		state.commit('user', data)
	},
	async onAuthStateChangedAction(state, { authUser, claims }) {
		if (authUser) {
			const token = await authUser.getIdToken()
			Cookies.set('token', token)
			state.commit('user', {
				uid: authUser.uid,
				email: authUser.email,
			})
		} else {
			Cookies.remove('token');
			state.commit('user', null)
		}
	},
}

export const getters = {
	user: state => state.user,
	isAuth: state => !!state.user,
}
