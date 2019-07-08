<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Sports &amp; Recreation</h2>
    <h4 class="subheading">View and manage your sport and recreational information</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm8>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="sports"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.type_of_game }}</td>
                  <td>{{ props.item.club }}</td>
                  <td>{{ props.item.date }}</td>
                  <td>{{ props.item.status }}</td>
                  <td>
                    <v-btn
                      :disabled="deleting"
                      color="primary"
                       @click="deleteRecord(props.item.id)"
                    >
                      <v-icon left v-if="!deleting">delete_forever</v-icon>
                      {{ deleting ? 'Deleting...' : 'Delete' }}
                    </v-btn>
                  </td>
                </template>
                <template v-slot:no-results>
                  <v-alert
                    :value="true"
                    color="error"
                    icon="warning"
                  >Your search for "{{ search }}" found no results.</v-alert>
                </template>
              </v-data-table>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" @click="disabled = (disabled + 1) % 2">
                Create Sport
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm4>
          <v-card flat>
            <v-card-text>
              <v-form ref="saveForm" @submit.prevent="saveRecord">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="type_of_game"
                      v-model="type_of_game"
                      label="Type Of Game"
                      type="text"
                      :rules="nameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="club"
                      v-model="club"
                      label="Club"
                      type="text"
                      :rules="clubRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="date"
                      v-model="date"
                      label="Date Joined - Date Exited"
                      type="text"
                      :rules="dateOfAttendanceRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-select
                      name="status"
                      :items="statuses"
                      v-model="status"
                      label="Current Status"
                      :rules="statusRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn :disabled="disabled == 1 ? true : false" color="primary" @click="saveRecord()">
                <v-icon left v-if="!loading">save</v-icon>
                {{ loading ? 'Processing...' : 'Save' }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import config from "@/config";
import Axios from "axios";

export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("auth")) {
      return next({ path: "/login" });
    }
    next();
  },

  mounted() {
    // console.log(process.env)
    this.getSports();
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Type Of Game",
          align: "left",
          sortable: false,
          value: "type_of_game"
        },
        { text: "Club", value: "club" },
        { text: "Dates Of Attendance", value: "date" },
        { text: "Current Status", value: "status" },
        { text: "ACTION", value: "action" }
      ],
      sports: this.$root.curusersp,
      disabled: 1,
      loading: false,
      deleting: false,
      error: false,
      errors: {},
      statuses: ["Active", "Inactive", "Suspended"],
      sp_id: "",
      type_of_game: "",
      club: "",
      date: "",
      status: "",
      response: "",
      nameRules: [v => !!v || "Type of game is required"],
      clubRules: [v => !!v || "Club is required"],
      dateOfAttendanceRules: [v => !!v || "Date of attendance is required"],
      statusRules: [v => !!v || "Current status is required"]
    };
  },
    
  computed: {
    sp() {
      return this.$root.curusersp;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getSports() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/sports`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curusersp = response.data.data;
            localStorage.setItem(
              "curusersp",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("b");
            this.$root.curusersp = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curusersp");
        });
    },

    saveRecord() {
      if (this.$refs.saveForm.validate()) {
        this.loading = true;
        this.disabled = 1
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/sports`,
          {
            user_id: this.$root.curuser.id,
            type_of_game: this.type_of_game,
            club: this.club,
            date: this.date,
            status: this.status
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.disabled = 0
            console.log(response.data);
            this.$noty.success("Sport Successfully Created.");
            this.getSports()
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = 0
            this.$noty.error(`Saving failed ${response.data.message}`);
          });
      }
    },

    deleteRecord(id) {
      if (id) {
        this.deleting = true;
        Axios.delete(
          `${config.apiUrl}/users/${this.$root.curuser.id}/sports/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.deleting = false;
            this.$noty.success("Sport Successfully Deleted.");
            console.log(response.data);
            this.getSports()
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.deleting = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    }
  }
};
</script>

<style>
</style>
