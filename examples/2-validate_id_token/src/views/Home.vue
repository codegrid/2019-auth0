<template>
  <div class="home">
    <div v-if="isLoggedIn">
      <p>
        <img :src="userProfile.picture" width="32" height="32" />
        {{ userProfile.name }} としてログインしています。
      </p>
      <div style="margin-bottom: 1em">
        <button @click="logout">Logout</button>
      </div>
    </div>
    <div v-else>
      <p>ログインしていません。</p>
      <div style="margin-bottom: 1em">
        <button @click="login">Login</button>
      </div>
    </div>
    <div style="margin-bottom: 0.5em">
      <button @click="getGreeting">
        Greeting
      </button>
    </div>
    <div style="margin-bottom: 1em">
      <button @click="getPrivateGreeting">
        Private Greeting
      </button>
    </div>
    <div style="margin-bottom: 0.5em">
      <form @submit.prevent="postEcho">
        <input v-model="postEchoInput" />
        <button>
          Echo
        </button>
      </form>
    </div>
    <div style="margin-bottom: 1em">
      <form @submit.prevent="postPrivateEcho">
        <input v-model="postPrivateEchoInput" />
        <button>
          Echo
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const createHeaders = idToken => {
  return idToken !== null
    ? {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    : {};
};

export default {
  name: 'home',
  data() {
    return {
      postEchoInput: '',
      postPrivateEchoInput: '',
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    userProfile() {
      return this.$store.getters.userProfile;
    },
    idToken() {
      return this.$store.getters.idToken;
    },
  },
  methods: {
    login() {
      this.$store.dispatch('login');
    },
    logout() {
      this.$store.dispatch('logout');
    },
    async getGreeting() {
      try {
        const response = await axios.get('/api/greeting');
        alert(response.data.message);
      } catch (err) {
        alert(err.response.data.message);
      }
    },
    async getPrivateGreeting() {
      const headers = createHeaders(this.idToken);
      const config = { ...headers };
      try {
        const response = await axios.get('/api/private/greeting', config);
        alert(response.data.message);
      } catch (err) {
        alert(err.response.data.message);
      }
    },
    async postEcho() {
      try {
        const body = { message: this.postEchoInput };
        const response = await axios.post('/api/echo', body);
        alert(response.data.message);
      } catch (err) {
        alert(err.response.data.message);
      }
    },
    async postPrivateEcho() {
      const body = { message: this.postPrivateEchoInput };
      const headers = createHeaders(this.idToken);
      const config = { ...headers };
      try {
        const response = await axios.post('/api/private/echo', body, config);
        alert(response.data.message);
      } catch (err) {
        alert(err.response.data.message);
      }
    },
  },
};
</script>
