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
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset
              v-if="!isLoginRoute"
              class="form-group"
            >
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
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
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'Login',
  setup () {
    const isLoginRoute = computed(() => useRoute().name === 'Login')
    const buttonTip = computed(() => (isLoginRoute.value ? 'Sign in' : 'Sign up'))
    return {
      isLoginRoute,
      buttonTip
    }
  }
}
</script>

<style scoped>

</style>
