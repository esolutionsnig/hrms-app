<template>
  <div class="profile">
    <v-container fluid fill-height class="my-4">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>
                <h2 class="text-uppercase display-1">Password Reset </h2>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <div class="text-center" v-if="loading">
                <v-layout row wrap>
                  <v-flex d-flex xs7 sm9 md10>
                    <h4>Wait while we confirm your password reset request</h4>
                  </v-flex>
                  <v-flex d-flex xs5 sm3 md2>
                    <img src="/loada.gif" alt="Activating" width="20">
                  </v-flex>
                </v-layout>
              </div>

              <v-alert v-if="ss" :value="true" type="success">{{ ssMsg }}</v-alert>
              <v-alert v-if="error" :value="true" type="error">{{ errMsg }}</v-alert>
            </v-card-text>
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
      loading: true,
      checkbox: false,
      errors: {},
      error: false,
      ss: false,
      errMsg: "",
      ssMsg: "",
      response: ""
    };
  },

  mounted() {
    this.getActivationKey();
  },

  methods: {
    getActivationKey() {
      Axios.get(
        `${config.apiUrl}/password/find/${this.$route.params.id}`
      )
        .then((response) => {
          this.loading = false;
          console.log(response.data.token)
          this.$router.push({ path: "/Reset/" + response.data.token })
        })
        .catch(({ response }) => {
          console.log(response.data.errors);
          this.loading = false;
          this.error = true;
          this.errors = response.data.errors;
          this.errMsg =
            response.data +
            " Ensure you clicked or copied the right link.";
            setTimeout(() => this.$router.push({ path: "/" }), 5000);
        });
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