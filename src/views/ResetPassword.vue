<template>
  <div class="profile">
    <v-container fluid fill-height class="my-4">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                <h2 class="text-uppercase display-1">Reset Password Here</h2>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <h4 class="subheading">We will send you a password reset link after a successful request. Enter your email address to proceed</h4>
              <v-form ref="resetform">
                <v-text-field
                  prepend-icon="email"
                  name="email"
                  v-model="email"
                  :rules="emailRules"
                  label="Email Address"
                  type="text"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <span class="blue-grey--text text--darken-3 text-uppercase ml-3">
                <router-link to="/login">Remembered your password?</router-link>
              </span>
              <v-spacer></v-spacer>
              <v-btn :disabled="loading" color="primary" @click="resetPassword()">
                {{ loading ? 'Reseting...' : 'Reset Password' }}
                <v-icon right v-if="!loading">restore</v-icon>
              </v-btn>
            </v-card-actions>
            <v-divider class="mt-3"></v-divider>
            <div class="ma-3 pa-3">
              <span class="blue-grey--text text--lighten-1">Need a fresh account?</span>
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
      return next({ path: "/" });
    }
    next();
  },

  data() {
    return {
      drawer: null,
      valid: false,
      loading: false,
      errors: {},
      response: "",
      email: "",
      emailRules: [
        v => !!v || "Email address name is required",
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Invalid Email address"
      ]
    };
  },

  methods: {
    resetPassword() {
      if (this.$refs.resetform.validate()) {
        this.loading = true;

        Axios.post(`${config.apiUrl}/password/create`, {
          email: this.email
        })
          .then(response => {
            this.loading = false;
            this.$noty.success(response.data.message);
            console.log(response.data.message)
            setTimeout(() => this.$router.push({ path: "/" }), 5000); //03:08:3
          })
          .catch(({ response }) => {
            this.loading = false;
            this.error = true;
            this.errors = response.data.errors;
            this.$noty.error("Failed: " + response.data.message);
            console.log(response.data.message)
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