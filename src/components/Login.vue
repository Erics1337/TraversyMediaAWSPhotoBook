<template>
	<div class="">
		<form
			action=""
			class="flex flex-col items-center"
			@submit.prevent="login"
		>
			<div class="flex flex-col user">
				<label
					for="username"
					class="block text-gray-700 text-sm font-bold mb-2"
					type="text"
					>Username</label
				>
				<input
					type="text"
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
					v-model="username"
					id="userName"
				/>
			</div>
			<div class="flex flex-col mt-10">
				<label
					class="block text-gray-700 text-sm font-bold mb-2"
					for="password"
					>Password</label
				>
				<input
					type="text"
					class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700"
					v-model="password"
				/>
			</div>
			<button class="btn-blue">Sign in</button>
		</form>
		<div class="text-red-600">{{ error.message }}</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	data: () => ({
		username: '',
		password: '',
		email: '',
		error: '',
	}),
	methods: {
		// mapActions is a Vuex utility for mapping the actions to the component's methods
		...mapActions({
			loginVue: 'auth/login',
		}),
		async login() {
			try {
				await this.loginVue({
					username: this.username,
					password: this.password,
				})
				this.$router.push('/')
			} catch (error) {
				this.error = error.message
			}
		},
	},
}
</script>

<style></style>
