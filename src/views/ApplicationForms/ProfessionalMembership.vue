<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Professional Membership</h2>
    <h4 class="subheading">View and manage your professional membership information</h4>

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
                :items="pms"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.association }}</td>
                  <td>{{ props.item.status }}</td>
                  <td>{{ props.item.year_of_conferment }}</td>
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
                Create Professional Membership
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
                      name="association"
                      v-model="association"
                      label="Association Name"
                      type="text"
                      :rules="nameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="year_of_conferment"
                      v-model="year_of_conferment"
                      label="Year Of Conferment"
                      type="text"
                      :rules="dateOfAttendanceRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="status"
                      v-model="status"
                      label="Membership Status"
                      type="text"
                      :rules="qualificationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
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
    this.getProfessionalMembership();
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Association's Name",
          align: "left",
          sortable: false,
          value: "association"
        },
        { text: "Year Of Conferment", value: "year_of_conferment" },
        { text: "Membership Status", value: "status" },
        { text: "ACTION", value: "action" }
      ],
      pms: this.$root.curuserpm,
      disabled: 1,
      loading: false,
      deleting: false,
      error: false,
      errors: {},
      ae_id: "",
      association: "",
      year_of_conferment: "",
      status: "",
      response: "",
      nameRules: [v => !!v || "Association name is required"],
      dateOfAttendanceRules: [v => !!v || "Year of conferment is required"],
      qualificationRules: [v => !!v || "Membership status is required"]
    };
  },
    
  computed: {
    pm() {
      return this.$root.curuserpm;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getProfessionalMembership() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/professionalmemberships`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserpm = response.data.data;
            localStorage.setItem(
              "curuserpm",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("b");
            this.$root.curuserpm = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserpm");
        });
    },

    saveRecord() {
      if (this.$refs.saveForm.validate()) {
        this.loading = true;
        this.disabled = 1
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/professionalmemberships`,
          {
            user_id: this.$root.curuser.id,
            association: this.association,
            status: this.status,
            year_of_conferment: this.year_of_conferment
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
            this.$noty.success("Professional Membership Successfully Created.");
            this.getProfessionalMembership()
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = 0
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    deleteRecord(id) {
      if (id) {
        this.deleting = true;
        Axios.delete(
          `${config.apiUrl}/users/${this.$root.curuser.id}/professionalmemberships/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.deleting = false;
            this.$noty.success("Professional Membership Successfully Deleted.");
            console.log(response.data);
            this.getProfessionalMembership()
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
