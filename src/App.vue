<template>
  <v-app class="grey lighten-4">
    <Navbar/>

    <v-content class="mx-4 my-4">
      <router-view></router-view>
    </v-content>

    <v-footer class="pa-3 white">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }} Integrated Cash Management Services Ltd</div>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      // loginDialog: false
    };
  }
  
};
</script>
