<template>
  <div class="profile">
    <v-container fluid fill-height class="my-4">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                <h2 class="text-uppercase display-1">Login Here</h2>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <h4 class="subheading">Welcome, enter your credentials below to proceed</h4>
              <v-form ref="loginform">
                <v-text-field
                  prepend-icon="email"
                  name="email"
                  v-model="email"
                  :rules="emailRules"
                  label="Email Address"
                  type="text"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  v-model="password"
                  :rules="passwordRules"
                  type="password"
                ></v-text-field>
                <v-checkbox v-model="remember_me" :label="`Keep me loged in for a while`"></v-checkbox>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <span class="blue-grey--text text--darken-3 text-uppercase ml-3">
                <router-link to="/resetPassword">Forgot password?</router-link>
              </span>
              <v-spacer></v-spacer>
              <v-btn :disabled="loading" color="primary" @click="login()">
                {{ loading ? 'Authenticating...' : 'Sign In' }}
                <v-icon right v-if="!loading">exit_to_app</v-icon>
              </v-btn>
            </v-card-actions>
            <v-divider class="mt-3"></v-divider>
            <div class="ma-3 pa-3">
              <span class="blue-grey--text text--lighten-1">New to this platform? &nbsp; </span>
              <span class="blue-grey--text text--darken-3">
                <router-link to="/signup">REEGISTER HERE</router-link>
              </span>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Axios from "axios";
import config from "@/config";
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next({ path: "/" })
    }
    next()
  },

  data() {
    return {
      drawer: null,
      valid: false,
      remember_me: false,
      loading: false,
      errors: {},
      response: "",
      email: "",
      password: "",
      emailRules: [
        v => !!v || "Email address name is required",
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Invalid Email address"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Minimum of 8 characters required"
      ]
    };
  },

  methods: {
    login() {
      if (this.$refs.loginform.validate()) {
        this.loading = true;
        Axios.post(`${config.apiUrl}/auth/login`, {
          email: this.email,
          password: this.password,
          remember_me: this.remember_me
        })
          .then(response => {
            this.loading = false;
            this.$root.auth = response.data;
            this.$root.curuser = response.data.user;
            localStorage.setItem("auth", JSON.stringify(response.data))
            localStorage.setItem("curuser", JSON.stringify(response.data.user))
            this.$noty.success("Authentication successful.")
            setTimeout(() => this.$router.push({ path: "/" }), 2000);
          })
          .catch(({ response }) => {
            this.loading = false;
            this.error = true;
            if (response.status === 401) {
              this.$noty.error("These credentials do not match our records.")
            } else {
              this.errors = response.data.errors;
              this.$noty.error("Authentication failed: " + response.data.message)
            }
          });
      }
    }
  }
};
</script>

<style>
a {
  color: #37474f;
  cursor: pointer;
  text-decoration: none;
}
a:visited {
  color: #37474f;
  cursor: pointer;
  text-decoration: none;
}
a:active {
  color: #37474f;
  cursor: pointer;
  text-decoration: none;
}
</style>