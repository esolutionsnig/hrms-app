<template>
  <div class="profile">
    <v-container fluid fill-height class="my-4">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                <h2 class="text-uppercase display-1">Sign Up Here</h2>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <h4 class="subheading">
                Welcome, enter your credentials below to proceed.
                <span
                  class="orange--text"
                >Note that all fields are required and email must be valid and accessible email address.</span>
              </h4>
              <v-form ref="regform">
                <v-text-field
                  prepend-icon="person"
                  name="surname"
                  v-model="surname"
                  :rules="surnameRules"
                  label="Family Name"
                  type="text"
                ></v-text-field>
                <div class="errors ml-4" v-if="errors.surname">
                  <small
                    class="error--text"
                    :key="error"
                    v-for="error in errors.surname"
                  >{{ error }}</small>
                </div>
                <v-text-field
                  prepend-icon="person"
                  name="firstname"
                  v-model="firstname"
                  :rules="firstnameRules"
                  label="Given Name"
                  type="text"
                ></v-text-field>
                <div class="errors ml-4" v-if="errors.firstname">
                  <small
                    class="error--text"
                    :key="error"
                    v-for="error in errors.firstname"
                  >{{ error }}</small>
                </div>
                <v-text-field
                  prepend-icon="person"
                  name="othernames"
                  v-model="othernames"
                  :rules="othernamesRules"
                  label="Additional Name"
                  type="text"
                ></v-text-field>
                <div class="errors ml-4" v-if="errors.othernames">
                  <small
                    class="error--text"
                    :key="error"
                    v-for="error in errors.othernames"
                  >{{ error }}</small>
                </div>
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
              <v-alert v-if="ss" :value="true" type="success">{{ ssMsg }}</v-alert>
              <v-alert v-if="error" :value="true" type="error">{{ errMsg }}</v-alert>
            </v-card-text>
            <v-card-actions>
              <span class="blue-grey--text text--darken-3 ml-3">
                <v-checkbox v-model="checkbox" :label="`Accept terms of usage`"></v-checkbox>
              </span>
              <v-spacer></v-spacer>
              <v-btn :disabled="loading" v-if="checkbox" color="primary" @click="registerUser()">
                <v-icon left v-if="!loading">group_add</v-icon>
                {{ loading ? 'Processing...' : 'Sign Up' }}
              </v-btn>
            </v-card-actions>
            <v-divider class="mt-3"></v-divider>
            <div class="ma-3 pa-3">
              <span class="blue-grey--text text--lighten-1">Already have an account? &nbsp;</span>
              <span class="blue-grey--text text--darken-3 text-uppercase">
                <router-link to="/login">Sign In HERE</router-link>
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

export default {
  data() {
    return {
      drawer: null,
      minp: 0,
      surname: "",
      firstname: "",
      othernames: "",
      email: "",
      password: "",
      password_confirmation: "",
      checkbox: false,
      errors: {},
      error: false,
      ss: false,
      valid: false,
      errMsg: "",
      ssMsg: "",
      response: "",
      surnameRules: [v => !!v || "Family name is required"],
      firstnameRules: [v => !!v || "Given name is required"],
      othernamesRules: [v => !!v || "Additional name is required"],
      emailRules: [
        v => !!v || "Email address name is required",
        v => (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(v) || 'Invalid Email address'
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Minimum of 8 characters required"
      ],
      confirmpasswordRules: [
        v => !!v || "Password confirmation is required",
        v => v.length >= 8 || "Minimum of 8 characters required",
        v => v === this.password || "Passwors do not match"
      ],
      loading: false
    };
  },

  methods: {
    registerUser() {
      if (this.$refs.regform.validate()) {
        this.loading = true;
        console.log(
          this.surname,
          this.firstname,
          this.othernames,
          this.email,
          this.password,
          this.password_confirmation
        );

        Axios.post("http://xloutsourcingltd.com/careers/api/auth/signup", {
          surname: this.surname,
          firstname: this.firstname,
          othernames: this.othernames,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
          .then(response => {
            this.loading = false;
            console.log(response.data);
            this.ss = true;
            this.ssMsg =
              "Dear " +
              this.surname +
              " " +
              this.firstname +
              ", Your registration was successful and we sent an email to this  ( " +
              this.email +
              " ) email address. Kindly click on the CONFIRM ACCOUNT button on the body of the mail received to complete this process.";
            setTimeout(() => this.$router.push({ path: "/" }), 5000);
          })
          .catch(({ response }) => {
            console.log(response.data.errors);
            this.loading = false;
            this.error = true;
            this.errors = response.data.errors;
            this.errMsg = "Registration failed: " + response.data.message;
              setTimeout(function(){ this.errMsg = '' }, 3000);
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
