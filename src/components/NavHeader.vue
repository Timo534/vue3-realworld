<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link
        class="navbar-brand"
        to="/"
      >
        conduit
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link
            class="nav-link"
            to="/"
            exact-active-class="active"
          >
            Home
          </router-link>
        </li>
        <template v-if="isLogin">
          <li
            class="nav-item"
          >
            <router-link
              class="nav-link"
              to="/editor"
              exact-active-class="active"
            >
              <i class="ion-compose" />&nbsp;New Post
            </router-link>
          </li>
          <li
            class="nav-item"
          >
            <router-link
              class="nav-link"
              to="/settings"
              exact-active-class="active"
            >
              <i class="ion-gear-a" />&nbsp;Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/profile"
              exact-active-class="active"
            >
              <img
                class="user-pic"
                src="https://i.loli.net/2021/04/13/S7BxTqR1X2oGfpK.jpg"
              >
              qrq2
            </router-link>
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/login"
              exact-active-class="active"
            >
              Sign in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              to="/register"
              exact-active-class="active"
            >
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'NavHeader',
  setup () {
    const isLogin = computed(() => !!useStore().state.user)
    return {
      isLogin
    }
  }
}
</script>

<style scoped>

</style>
