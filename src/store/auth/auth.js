import { Auth } from 'aws-amplify'

export const auth = {
	namespace: true,
	state: {
		user: null,
		isAuthenticated: false,
		isAuthenticating: false,
		error: null,
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload
		},
	},
	// Callouts to api's. Async actions.
	actions: {
		async logout({ commit }) {
			try {
				commit('setUser', null)
				return await Auth.signOut()
			} catch (error) {
				console.error(error)
			}
		},
		async login({ commit }, { username, password }) {
			commit('setIsAuthenticating', true)
			try {
				await Auth.signIn(username, password)
				const userAttributes = await Auth.currentUserInfo()
				commit('setUser', userAttributes)
				return Promise.resolve('Success')
			} catch (error) {
				console.log(error)
				return Promise.reject(error)
			}
		},
		async confirmSignUp(_, { username, code }) {
			try {
				await Auth.confirmSignUp(username, code)
				return Promise.resolve('Success')
			} catch (error) {
				console.log(error)
				return Promise.reject(error)
			}
		},
		async signUp(_, { username, password, email }) {
			try {
				await Auth.signUp(username, password, { email })
				return Promise.resolve('Success')
			} catch (error) {
				console.log(error)
				return Promise.reject(error)
			}
		},
		async authAction({ commit }) {
			try {
				const userAttributes = await Auth.currentUserInfo()
				commit('setUser', userAttributes)
				return Promise.resolve(userAttributes)
			} catch (error) {
				console.log(error)
				return Promise.reject(error)
			}
		},
	},
	getters: {
		user: (state) => state.user,
	},
}
