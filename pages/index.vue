<template>
	<div class="my-5 px-4 py-5 mx-auto" style="max-width: 350px">
		<h1 class="h2 mb-3">Войти</h1>
		<b-form @submit.prevent="login">
			<b-form-group>
				<b-form-input v-model="email" type="text" placeholder="Email" required></b-form-input>
			</b-form-group>
			<b-form-group>
				<b-form-input v-model="password" type="password" placeholder="Password" required></b-form-input>
			</b-form-group>

			<b-button v-if="!isAuth" type="submit" variant="primary"> Войти </b-button>
			<b-button v-if="isAuth" @click="logout()" variant="primary"> Выйти </b-button>
		</b-form>

		<b-alert class="mt-5" show> isAuth: {{ isAuth }} </b-alert>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			email: 'admin@admin.ru',
			password: '123456',
		}
	},
	computed: {
		...mapGetters({
			user: 'auth/user',
			isAuth: 'auth/isAuth',
		}),
	},
	methods: {
		async login() {
			try {
				await this.$fire.auth.signInWithEmailAndPassword(this.email, this.password)
			} catch (error) {
				alert(error)
			}
		},
		async logout() {
			try {
				await this.$fire.auth.signOut()
			} catch (error) {}
		},
	},
}
</script>
