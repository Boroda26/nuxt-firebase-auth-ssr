import jwtDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

export const actions = {
	async nuxtServerInit({ dispatch }, { req }) {
		if (process.server && process.static) return
		if (!req.headers.cookie) return

		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie)
			const accessTokenCookie = parsed.token
			if (!accessTokenCookie) return
			const decodedToken = jwtDecode(accessTokenCookie)
			if (!decodedToken) return

			dispatch('auth/user', decodedToken)
		}
	},
}
