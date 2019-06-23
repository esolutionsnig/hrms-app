<template>
  <nav>
    <v-toolbar app dark class="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="font-weight-light">iCMS</span>
        <span>Careers</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-badge left color="accent" v-if="authUser">
        <template v-slot:badge>
          <span>6</span>
        </template>
        <v-icon>notifications_active</v-icon>
      </v-badge>

      <v-badge color="accent" v-if="authUser">
        <template v-slot:badge>
          <span>12</span>
        </template>
        <v-icon>email</v-icon>
      </v-badge>

      <v-menu open-on-hover top offset-y v-if="authUser">
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-icon left>person</v-icon>
            {{ authUser.firstname }}
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            v-for="profilelink in profilelinks"
            :key="profilelink.text"
            router
            :to="profilelink.route"
          >
            <v-icon left>{{ profilelink.icon }}</v-icon>
            <v-list-tile-title>{{ profilelink.text }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="logout()">
            <v-icon color="primary" left>power_settings_new</v-icon>Sign Out
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu open-on-hover top offset-y v-if="!authUser">
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-icon left>person</v-icon>Guest
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            v-for="guestlink in guestlinks"
            :key="guestlink.text"
            router
            :to="guestlink.route"
          >
            <v-icon left>{{ guestlink.icon }}</v-icon>
            <v-list-tile-title>{{ guestlink.text }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="white">
      <v-layout column align-center class="blue-grey darken-4" v-if="authUser">
        <v-flex class="mt-4">
          <v-avatar size="100">
            <img src="/e.png" alt>
          </v-avatar>
          <p class="white--text sunheading mt-1">{{ authUser.firstname + " " + authUser.surname }}</p>
        </v-flex>
      </v-layout>
      <v-layout column align-center class="blue-grey darken-4" v-if="!authUser">
        <v-flex class="mt-4">
          <v-avatar size="100">
            <img src="/default.png" alt>
          </v-avatar>
          <p class="white--text sunheading mt-1">Guest Account</p>
        </v-flex>
      </v-layout>
      <v-list v-if="authUser">
        <v-list-tile
          v-for="sidemenulink in sidemenulinks"
          :key="sidemenulink.text"
          router
          :to="sidemenulink.route"
        >
          <v-list-tile-action>
            <v-icon>{{ sidemenulink.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ sidemenulink.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list v-if="!authUser">
        <v-list-tile
          v-for="guestlink in guestlinks"
          :key="guestlink.text"
          router
          :to="guestlink.route"
        >
          <v-list-tile-action>
            <v-icon>{{ guestlink.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ guestlink.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      guestlinks: [
        {
          icon: "exit_to_app",
          text: "Sign In",
          route: "/login"
        },
        {
          icon: "group_add",
          text: "Sign Up",
          route: "/signup"
        }
      ],
      profilelinks: [
        {
          icon: "person",
          text: "Profile",
          route: "/profile"
        },
        {
          icon: "settings",
          text: "Account Settings",
          route: "/account-settings"
        }
      ],
      sidemenulinks: [
        {
          icon: "dashboard",
          text: "Dashboard",
          route: "/"
        },
        {
          icon: "folder",
          text: "My Projects",
          route: "/projects"
        },
        {
          icon: "people",
          text: "Team Members",
          route: "/team"
        }
      ]
    };
  },

  mounted() {
    // console.log(this.$root)
  },

  computed: {
    authUser() {
      return this.$root.auth.user;
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$root.auth = {};
      this.$noty.success("Successfully logged out");
    }
  }
};
</script>
