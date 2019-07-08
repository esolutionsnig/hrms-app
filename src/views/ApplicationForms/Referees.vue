<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Referees</h2>
    <h4 class="subheading">View and manage your referees information</h4>

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
                :items="refdata"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.address }}</td>
                  <td>{{ props.item.phone_number }}</td>
                  <td>{{ props.item.email_address }}</td>
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
                Create Referee
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm4>
          <v-card flat>
            <v-card-text>
                <p class="primary--text">You are advised to provide names and details of three referees who are not near relatives and from whom testimonials may be obtained.</p>
              <v-form ref="saveForm" @submit.prevent="saveRecord">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      v-model="name"
                      label="Referee's Name"
                      type="text"
                      :rules="nameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="address"
                      v-model="address"
                      label="Contact Address"
                      type="text"
                      :rules="addressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="phone_number"
                      v-model="phone_number"
                      label="Phone Number"
                      type="text"
                      :rules="phoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="email_address"
                      v-model="email_address"
                      :rules="emailRules"
                      label="Email Address"
                      type="text"
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
    this.getReferees();
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Address", value: "address" },
        { text: "Phone Number", value: "phone_number" },
        { text: "Email Address", value: "email_address" },
        { text: "ACTION", value: "action" }
      ],
      refdata: this.$root.curuserref,
      disabled: 1,
      loading: false,
      deleting: false,
      error: false,
      errors: {},
      ref_id: "",
      name: "",
      address: "",
      phone_number: "",
      email_address: "",
      response: "",
      nameRules: [v => !!v || "Name is required"],
      addressRules: [v => !!v || "Address is required"],
      phoneRules: [v => !!v || "Phone number is required"],
      emailRules: [
        v => !!v || "Email address name is required",
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Invalid Email address"
      ]
    };
  },

  computed: {
    ref() {
      return this.$root.curuserref;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getReferees() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/referees`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserref = response.data.data;
            localStorage.setItem(
              "curuserref",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("b");
            this.$root.curuserref = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserref");
        });
    },

    saveRecord() {
      if (this.$refs.saveForm.validate()) {
        this.loading = true;
        this.disabled = 1;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/referees`,
          {
            user_id: this.$root.curuser.id,
            name: this.name,
            address: this.address,
            phone_number: this.phone_number,
            email_address: this.email_address
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.disabled = 0;
            console.log(response.data);
            this.$noty.success("Referee Successfully Created.");
            this.getReferees();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = 0;
            this.$noty.error(`Saving failed ${response.data.message}`);
          });
      }
    },

    deleteRecord(id) {
      if (id) {
        this.deleting = true;
        Axios.delete(
          `${config.apiUrl}/users/${this.$root.curuser.id}/referees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.deleting = false;
            this.$noty.success("Referee Successfully Deleted.");
            console.log(response.data);
            this.getReferees();
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
