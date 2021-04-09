<template>
  <NavHeader></NavHeader>

  <router-view></router-view>

  <FooterBottom></FooterBottom>
</template>

<script>
// @ is an alias to /src
import NavHeader from '@/components/NavHeader.vue'
import FooterBottom from '@/components/FooterBottom.vue'

export default {
  name: 'Home',
  components: {
    NavHeader,
    FooterBottom
  }
}
</script>
