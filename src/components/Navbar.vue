<template>
  <nav>
    <v-toolbar app dark class="primary">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="font-weight-light">iCMS</span>
        <span>Careers</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-badge left color="accent" v-if="authUser" class="hidden-xs-only">
        <template v-slot:badge>
          <span>6</span>
        </template>
        <v-icon>notifications_active</v-icon>
      </v-badge>

      <v-badge left color="accent" v-if="authUser" class="hidden-xs-only ml-5">
        <template v-slot:badge>
          <span>12</span>
        </template>
        <v-icon>email</v-icon>
      </v-badge>

      <v-menu open-on-hover top offset-y v-if="authUser" class="ml-5">
        <template v-slot:activator="{ on }">
          <v-btn flat v-on="on">
            <v-icon left>person_pin</v-icon>
            <span class="hidden-xs-only">{{ curUserData.firstname }}</span>
          </v-btn>
        </template>

        <v-list>
          <v-list-tile>
            <router-link :to="`/profile/${curUserData.firstname}${curUserData.id}`">
              <v-icon left>person</v-icon>Profile
            </router-link>
          </v-list-tile>
          <v-list-tile>
            <router-link :to="`/account-settings/${curUserData.firstname}${curUserData.id}`">
              <v-icon left>settings</v-icon>Settings
            </router-link>
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
            <img v-if="curUserData.avatar === 'avatar.png'" src="/avatar.png" alt>
            <img v-else :src="curUserData.avatar" alt>
          </v-avatar>
          <p
            class="white--text sunheading mt-1"
          >{{ curUserData.firstname + " " + curUserData.surname }}</p>
        </v-flex>
      </v-layout>
      <v-layout column align-center class="blue-grey darken-4" v-if="!authUser">
        <v-flex class="mt-4">
          <v-avatar size="100">
            <img src="/avatar.png" alt>
          </v-avatar>
          <p class="white--text sunheading mt-1">Guest Account</p>
        </v-flex>
      </v-layout>
      <v-list v-if="authUser">
        <div v-for="link in links" :key="link.text">
          <v-list-tile v-if="!link.subLinks" router :to="link.route">
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ link.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-group v-else :key="link.text" no-action>
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>{{ link.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ link.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile v-for="sublink in link.subLinks" :key="sublink.text" :to="sublink.route">
              <v-list-tile v-text="sublink.text"></v-list-tile>
            </v-list-tile>
          </v-list-group>
        </div>
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
          route: "/profile/:id"
        },
        {
          icon: "settings",
          text: "Account Settings",
          route: "/account-settings/:id"
        }
      ],
      links: [
        {
          route: "/",
          icon: "dashboard",
          text: "Dashboard"
        },
        {
          icon: "person",
          text: "Application Forms",
          subLinks: [
            {
              icon: "account_box",
              text: "Applicant Data Manager",
              route: "/applicant-data-manager"
            },
            {
              icon: "home",
              text: "Residential Address",
              route: "/residential-address"
            },
            {
              icon: "home",
              text: "Home Town Address",
              route: "/home-town-address"
            },
            {
              icon: "people_outline",
              text: "Next Of Kin",
              route: "/next-of-kin"
            },
            {
              icon: "group_add",
              text: "Dependants",
              route: "/dependants"
            },
            {
              icon: "group",
              text: "Parents",
              route: "/parents"
            },
            {
              icon: "group",
              text: "Guardian",
              route: "/guardian"
            },
            {
              icon: "school",
              text: "Academic Qualification",
              route: "/academic-qualification"
            },
            {
              icon: "school",
              text: "Professional Qualification",
              route: "/professional-qualification"
            },
            {
              icon: "school",
              text: "Professional Membership",
              route: "/professional-membership"
            },
            {
              icon: "school",
              text: "School Leaving Certificate",
              route: "/school-leaving-certificate"
            },
            {
              icon: "work",
              text: "Employment History",
              route: "/employment-history"
            },
            {
              icon: "work_outline",
              text: "National Youth Service Corps",
              route: "/nysc"
            },
            {
              icon: "school",
              text: "General Information",
              route: "/general"
            },
            {
              icon: "fitness_center",
              text: "Hobbies",
              route: "/hobbies"
            },
            {
              icon: "school",
              text: "Social Membership",
              route: "/social-membership"
            },
            {
              icon: "account_balance",
              text: "Banking Details",
              route: "/banking-details"
            },
            {
              icon: "accessibility",
              text: "Self Disclosure",
              route: "/self-disclosure"
            },
            {
              icon: "supervisor_account",
              text: "Referees",
              route: "/referees"
            },
            {
              icon: "check_box",
              text: "Declaration",
              route: "/declaration"
            },
            {
              icon: "work",
              text: "Employment Self-Assessment",
              route: "/employment-self-assessment"
            }
          ]
        },
        {
          to: "/tournaments",
          icon: "kitchen",
          text: "Tournaments"
        }
      ]
    };
  },

  mounted() {
    // console.log(this.$root)
  },

  computed: {
    authUser() {
      return this.$root.auth.access_token;
    },
    curUserData() {
      return this.$root.curuser;
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$root.auth = {};
      localStorage.removeItem("curuser");
      this.$root.curuser = {};
      localStorage.removeItem("curuseradm");
      this.$root.curuseradm = {};
      localStorage.removeItem("curuserra");
      this.$root.curuserra = {};
      localStorage.removeItem("curuserhta");
      this.$root.curuserhta = {};
      localStorage.removeItem("curusernok");
      this.$root.curusernok = {};
      localStorage.removeItem("curuserdep");
      this.$root.curuserdep = {};
      localStorage.removeItem("curuserparent");
      this.$root.curuserparent = {};
      localStorage.removeItem("curuserguardian");
      this.$root.curuserguardian = {};
      localStorage.removeItem("curuserae");
      this.$root.curuserae = {};
      localStorage.removeItem("curuserpe");
      this.$root.curuserpe = {};
      localStorage.removeItem("curuserpm");
      this.$root.curuserpm = {};
      this.$noty.success("Successfully logged out");
      location.reload()
    }
  }
};
</script>
