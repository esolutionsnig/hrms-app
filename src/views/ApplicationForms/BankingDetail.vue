<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Banking Details</h2>
    <h4 class="subheading">View and manage your banking detail information</h4>

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
                :items="bankingdetails"
                :search="search"
                class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.bank_name }}</td>
                  <td>{{ props.item.account_number }}</td>
                  <td>{{ props.item.account_status }}</td>
                  <td>{{ props.item.bvn_number }}</td>
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
                Create Banking Detail
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
                      name="bank_name"
                      v-model="bank_name"
                      label="Name Of Bank"
                      type="text"
                      :rules="nameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="account_number"
                      v-model="account_number"
                      label="Account Number (NUBAN)"
                      type="text"
                      :counter="max"
                      :rules="accountNumberRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="bvn_number"
                      v-model="bvn_number"
                      label="Bank Verification Number (BVN)"
                      type="text"
                      :rules="bvnRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-select
                      name="account_status"
                      :items="statuses"
                      v-model="account_status"
                      label="Account Status"
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
    this.getBankingDetails();
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name Of Bank",
          align: "left",
          sortable: false,
          value: "bank_name"
        },
        { text: "Account Number (NUBAN)", value: "account_number" },
        { text: "Bank Verification Number (BVN)", value: "bvn_number" },
        { text: "Account Status", value: "account_status" },
        { text: "ACTION", value: "action" }
      ],
      bankingdetails: this.$root.curuserbd,
      disabled: 1,
      loading: false,
      deleting: false,
      error: false,
      errors: {},
      max: 10,
      statuses: ["Active", "Inactive", "Suspended"],
      bd_id: "",
      bank_name: "",
      account_number: "",
      account_status: "",
      bvn_number: "",
      response: "",
      nameRules: [v => !!v || "Name 0f bank is required"],
      accountNumberRules: [
          v => !!v || "Account number is required",
          v => v.length == 10 || 'Account number must be less than 10 characters'
      ],
      bvnRules: [v => !!v || "Bank verification number is required"],
      statusRules: [v => !!v || "Account status is required"]
    };
  },
    
  computed: {
    bd() {
      return this.$root.curuserbd;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getBankingDetails() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/bankingdetails`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserbd = response.data.data;
            localStorage.setItem(
              "curuserbd",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("b");
            this.$root.curuserbd = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserbd");
        });
    },

    saveRecord() {
      if (this.$refs.saveForm.validate()) {
        this.loading = true;
        this.disabled = 1
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/bankingdetails`,
          {
            user_id: this.$root.curuser.id,
            bank_name: this.bank_name,
            account_number: this.account_number,
            account_status: this.account_status,
            bvn_number: this.bvn_number
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
            this.$noty.success("Banking Detail Successfully Created.");
            this.getBankingDetails()
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/bankingdetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.deleting = false;
            this.$noty.success("Banking Detail Successfully Deleted.");
            console.log(response.data);
            this.getBankingDetails()
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.deleting = false;
            this.$noty.error(`Deletion failed ${response.data.message}`);
          });
      }
    }
  }
};
</script>

<style>
</style>
