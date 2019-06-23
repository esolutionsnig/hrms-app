<template>
  <div class="profile">
    <v-container fluid fill-height class="my-4">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                <h2 class="text-uppercase display-1">Choose Password</h2>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <h4 class="subheading">Enter your emaill and new password below</h4>
              <v-form ref="resetform">
                <v-text-field
                  prepend-icon="email"
                  name="email"
                  v-model="email"
                  :rules="emailRules"
                  label="Email Address"
                  type="text"
                ></v-text-field>
                <div class="errors ml-4" v-if="errors.email">
                  <small class="error--text" :key="error" v-for="error in errors.email">{{ error }}</small>
                </div>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  v-model="password"
                  :rules="passwordRules"
                  hint="At least 8 characters"
                  type="password"
                ></v-text-field>
                <div class="errors ml-4" v-if="errors.password">
                  <small
                    class="error--text"
                    :key="error"
                    v-for="error in errors.password"
                  >{{ error }}</small>
                </div>
                <v-text-field
                  prepend-icon="lock"
                  name="password_confirmation"
                  label="Confirm Password"
                  v-model="password_confirmation"
                  :rules="confirmpasswordRules"
                  hint="At least 8 characters"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="loading" color="primary" @click="changePassword()">
                <v-icon left v-if="!loading">save</v-icon>
                {{ loading ? 'Proessing...' : 'Save Password' }}
              </v-btn>
            </v-card-actions>
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
      loading: false,
      checkbox: false,
      errors: {},
      error: false,
      ss: false,
      errMsg: "",
      ssMsg: "",
      response: "",
      email: "",
      password: "",
      password_confirmation: "",
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
      ],
      confirmpasswordRules: [
        v => !!v || "Password confirmation is required",
        v => v.length >= 8 || "Minimum of 8 characters required",
        v => v === this.password || "Passwors do not match"
      ]
    };
  },

  methods: {
    changePassword() {
      if (this.$refs.resetform.validate()) {
          this.loading = true
        Axios.post(`${config.apiUrl}/password/reset`, {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: this.$route.params.id
        })
          .then(response => {
            this.loading = false;
            this.$noty.success("Dear " + response.data.surname + ", Password reset completed.")
              setTimeout(() => this.$router.push({ path: "/login" }), 3000);
          })
          .catch(({ response }) => {
            console.log(response.data.message);
            this.loading = false;
            this.error = true;
            this.errors = response.data.message;
            this.errMsg =
              response.data.message +
              " Ensure you clicked or copied the right link.";
            // setTimeout(() => this.$router.push({ path: "/" }), 5000);
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