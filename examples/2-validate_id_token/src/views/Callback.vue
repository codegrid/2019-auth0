<template>
  <div class="callback"></div>
</template>

<script>
export default {
  name: 'callback',
  created() {
    this.$store.dispatch('handleAuthentication');
    this.$router.replace('/');
  },
};
</script>
