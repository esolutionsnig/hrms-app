<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Academic Qualification</h2>
    <h4 class="subheading">View and manage your academic qualification information</h4>

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
                :items="aes"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.institution }}</td>
                  <td>{{ props.item.dates }}</td>
                  <td>{{ props.item.qualify }}</td>
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
                Create Academic Qualification
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
                      name="institution"
                      v-model="institution"
                      label="Institution Name"
                      type="text"
                      :rules="nameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="date_of_attendance"
                      v-model="date_of_attendance"
                      label="Dates Of Attendance"
                      type="text"
                      :rules="dateOfAttendanceRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="qualification"
                      v-model="qualification"
                      label="Qualification"
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
    this.getAcademicQualifications();
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Institution's Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Dates Of Attendance", value: "dates" },
        { text: "Qualification", value: "qualify" },
        { text: "ACTION", value: "action" }
      ],
      aes: this.$root.curuserae,
      disabled: 1,
      loading: false,
      deleting: false,
      error: false,
      errors: {},
      ae_id: "",
      institution: "",
      date_of_attendance: "",
      qualification: "",
      response: "",
      nameRules: [v => !!v || "Institution name is required"],
      dateOfAttendanceRules: [v => !!v || "Date of attendance is required"],
      qualificationRules: [v => !!v || "Qualification is required"]
    };
  },
    
  computed: {
    ae() {
      return this.$root.curuserae;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getAcademicQualifications() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/academiceducations`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserae = response.data.data;
            localStorage.setItem(
              "curuserae",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("b");
            this.$root.curuserae = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserae");
        });
    },

    saveRecord() {
      if (this.$refs.saveForm.validate()) {
        this.loading = true;
        this.disabled = 1
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/academiceducations`,
          {
            user_id: this.$root.curuser.id,
            institution: this.institution,
            date_of_attendance: this.date_of_attendance,
            qualification: this.qualification
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
            this.$noty.success("Academic Qualification Successfully Created.");
            this.getAcademicQualifications()
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/academiceducations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.deleting = false;
            this.$noty.success("Academic Qualification Successfully Deleted.");
            console.log(response.data);
            this.getAcademicQualifications()
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
