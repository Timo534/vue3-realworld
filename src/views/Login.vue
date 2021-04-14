<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ buttonTip }}
          </h1>
          <p class="text-xs-center">
            <router-link :to="isLoginRoute ? '/register' : '/login'">
              {{ isLoginRoute ? 'Need' : 'Have' }} an account?
            </router-link>
          </p>

          <ul class="error-messages">
            <template
              v-for="(value, key) in errors"
              :key="key"
            >
              <li
                v-for="(error, index) in value"
                :key="index"
              >
                {{ key }} {{ error }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset
              v-if="!isLoginRoute"
              class="form-group"
            >
              <input
                v-model="user.username"
                class="form-control form-control-lg"
                type="text"
                required
                placeholder="Your Name"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.email"
                class="form-control form-control-lg"
                type="email"
                required
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password"
                required
                minlength="8"
                placeholder="Password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ buttonTip }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, reactive, toRaw, computed } from 'vue'
import { login, register } from '@/api/auth'

export default {
  name: 'Login',
  setup () {
    const router = useRouter()
    const store = useStore()

    const user = reactive({
      username: '',
      email: '',
      password: ''
    })
    const errors = ref(null)

    const isLoginRoute = computed(() => useRoute().name === 'Login')
    const buttonTip = computed(() => (isLoginRoute.value ? 'Sign in' : 'Sign up'))

    async function onSubmit () {
      try {
        const { data } = isLoginRoute.value ? await login({ user: toRaw(user) }) : await register({ user: toRaw(user) })
        store.commit('setUser', data.user)
        router.replace('/')
      } catch (e) {
        errors.value = e?.response?.data?.errors
      }
    }

    return {
      user,
      errors,
      isLoginRoute,
      buttonTip,
      onSubmit
    }
  }
}
</script>

<style scoped>

</style>
