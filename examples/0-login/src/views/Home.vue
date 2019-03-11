<template>
  <div class="home">
    <div v-if="isLoggedIn">
      <p>
        <img :src="userProfile.picture" width="32" height="32" />
        {{ userProfile.name }} としてログインしています。
      </p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <p>ログインしていません。</p>
      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userProfile() {
      return this.$store.getters.userProfile;
    },
  },
  methods: {
    login() {
      this.$store.dispatch('login');
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
