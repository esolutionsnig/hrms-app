<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Dependants</h2>
    <h4 class="subheading">View and manage your dependants information</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm8>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              Nutrition
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
                :items="dependants"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.dependant_name }}</td>
                  <td>{{ props.item.relationship }}</td>
                  <td>{{ props.item.date_of_birth }}</td>
                  <td>{{ props.item.gender }}</td>
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
                Create Next Of Kin
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
                      name="dependant_name"
                      v-model="dependant_name"
                      label="Dependant Name"
                      type="text"
                      :rules="nameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="relationship"
                      v-model="relationship"
                      label="Relationship"
                      type="text"
                      :rules="relationshipRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="birth_date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="birth_date"
                          label="Date Of Birth Picker"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="birthDateRules"
                          :disabled="disabled == 1 ? true : false"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="birth_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(birth_date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-select
                      name="gender"
                      :items="genders"
                      v-model="gender"
                      label="Gender"
                      :rules="genderRules"
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
    this.getDependants();
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Dependant's Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Relationship", value: "relationship" },
        { text: "Date Of Birth", value: "dob" },
        { text: "Gender", value: "gender" },
        { text: "ACTION", value: "action" }
      ],
      dependants: this.$root.curuserdep,
      modal: false,
      disabled: 1,
      loading: false,
      deleting: false,
      error: false,
      errors: {},
      genders: ["Male", "Female", "Trans Gender", "Others"],
      dep_id: "",
      dependant_name: "",
      relationship: "",
      birth_date: "",
      gender: "",
      response: "",
      nameRules: [v => !!v || "Full name is required"],
      relationshipRules: [v => !!v || "Relationship is required"],
      genderRules: [v => !!v || "Gender is required"],
      birthDateRules: [v => !!v || "Date of birth is required"]
    };
  },
    
  computed: {
    dep() {
      return this.$root.curuserdep;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getDependants() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/dependants`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserdep = response.data.data;
            localStorage.setItem(
              "curuserdep",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("b");
            this.$root.curuserdep = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserdep");
        });
    },

    saveRecord() {
      if (this.$refs.saveForm.validate()) {
        this.loading = true;
        this.disabled = 1
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/dependants`,
          {
            user_id: this.$root.curuser.id,
            dependant_name: this.dependant_name,
            relationship: this.relationship,
            date_of_birth: this.birth_date,
            gender: this.gender
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
            this.$noty.success("Applicant Dependant Successfully Created.");
            this.getDependants()
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/dependants/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.deleting = false;
            this.$noty.success("Applicant Dependant Successfully Deleted.");
            console.log(response.data);
            this.getDependants()
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
