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
        <li
          v-if="isLogin"
          class="nav-item"
        >
          <a
            class="nav-link"
            href=""
          >
            <i class="ion-compose" />&nbsp;New Post
          </a>
        </li>
        <li
          v-if="isLogin"
          class="nav-item"
        >
          <a
            class="nav-link"
            href=""
          >
            <i class="ion-gear-a" />&nbsp;Settings
          </a>
        </li>
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
            to="/login"
            exact-active-class="active"
          >
            Sign up
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'NavHeader',
  setup () {
    const isLogin = ref(false)
    return {
      isLogin
    }
  }
}
</script>

<style scoped>

</style>
