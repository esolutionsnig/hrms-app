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
                  <h4 class="subheading">Enter your email address to proceed</h4>
                <v-form>
                  <v-text-field prepend-icon="email" name="emal" label="Email Address" type="email"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                  <span class="blue-grey--text text--darken-3 text-uppercase ml-3"> 
                      <router-link to="/login">Remembered your password?</router-link>
                  </span>
                <v-spacer></v-spacer>
                <v-btn color="primary">
                    <v-icon left>restore</v-icon>
                    Reset Password
                </v-btn>
              </v-card-actions>
              <v-divider class="mt-3"></v-divider>
              <div class="ma-3 pa-3">
                  <span class="blue-grey--text text--lighten-1">Need a fresh account? </span> 
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

  export default {
    data: () => ({
    drawer: null,
    checkbox: false
  })
  }
</script>

<style>
a {
  color: #37474F;
  cursor: pointer;
  text-decoration: none;
}
a:visited {
  color: #37474F;
  cursor: pointer;
  text-decoration: none;
}
a:active {
  color: #37474F;
  cursor: pointer;
  text-decoration: none;
}
</style>