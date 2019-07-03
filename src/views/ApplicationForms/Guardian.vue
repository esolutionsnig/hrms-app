<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Guardian</h2>
    <h4 class="subheading">View and manage your guardian information</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              <h3>Current Data</h3>
            </v-card-title>
            <v-card-text>
              <p class="subheading">To update your data click the CREATE/UPDATE button</p>
              <v-list two-line>
                <div v-if="guardian">
                  <v-layout row wrap>
                    <v-flex xs12 sm8>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Guardian's Name</v-list-tile-sub-title>
                          <v-list-tile-title>{{ guardian.guardian_name }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Guardian's Nationality</v-list-tile-sub-title>
                          <v-list-tile-title>{{ guardian.guardian_nationality }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm8>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Guardian's Occupation</v-list-tile-sub-title>
                          <v-list-tile-title>{{ guardian.guardian_occupation }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Guadian's Phone Number</v-list-tile-sub-title>
                          <v-list-tile-title>{{ guardian.guardian_phone }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Guardian's Address</v-list-tile-sub-title>
                          <v-list-tile-title>{{ guardian.guardian_address }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                </div>
              </v-list>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="guardian.id > 0" @click="disabled = (disabled + 1) % 2">
                Update Guardian
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn color="secondary" v-else @click="disabled = (disabled + 1) % 2">
                Create Guardian
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6>
          <v-card flat>
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="guardian.id > 0">
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="guardian_name"
                      v-model="guardian_name"
                      label="Guardian's Full Name"
                      type="text"
                      :rules="guardianNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="guardian_nationality"
                      v-model="guardian_nationality"
                      label="Guardian's Nationality"
                      type="text"
                      :rules="guardianNationalityRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="guardian_occupation"
                      v-model="guardian_occupation"
                      label="Guardian's Occupation"
                      type="text"
                      :rules="guardianOccupationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="guardian_phone"
                      v-model="guardian_phone"
                      label="Guardian's Phone"
                      type="text"
                      :rules="guardianPhoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="guardian_address"
                      v-model="guardian_address"
                      label="Guardian's Address"
                      type="text"
                      :rules="guardianAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

              </v-form>
              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="guardian_name"
                      v-model="guardian_name"
                      label="Guardian's Full Name"
                      type="text"
                      :rules="guardianNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="guardian_nationality"
                      v-model="guardian_nationality"
                      label="Guardian's Nationality"
                      type="text"
                      :rules="guardianNationalityRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="guardian_occupation"
                      v-model="guardian_occupation"
                      label="Guardian's Occupation"
                      type="text"
                      :rules="guardianOccupationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="guardian_phone"
                      v-model="guardian_phone"
                      label="Guardian's Phone"
                      type="text"
                      :rules="guardianPhoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="guardian_address"
                      v-model="guardian_address"
                      label="Guardian's Address"
                      type="text"
                      :rules="guardianAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn
                :disabled="disabled == 1 ? true : false"
                color="primary"
                @click="updateRecord()"
                v-if="guardian.id > 0"
              >
                <v-icon left v-if="!loading">save</v-icon>
                {{ loading ? 'Processing...' : 'Save Changes' }}
              </v-btn>
              <v-btn
                :disabled="disabled == 1 ? true : false"
                color="primary"
                @click="saveRecord()"
                v-else
              >
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
    this.getGuardian();
  },

  data() {
    return {
      disabled: 1,
      loading: false,
      error: false,
      errors: {},
      guardian_id: this.$root.curuserguardian.id,
      guardian_name: this.$root.curuserguardian.guardian_name,
      guardian_nationality: this.$root.curuserguardian.guardian_nationality,
      guardian_occupation: this.$root.curuserguardian.guardian_occupation,
      guardian_address: this.$root.curuserguardian.guardian_address,
      guardian_phone: this.$root.curuserguardian.guardian_phone,
      response: "",
      guardianNameRules: [v => !!v || "Guardian's name is required"],
      guardianNationalityRules: [v => !!v || "Guardian's nationality is required"],
      guardianOccupationRules: [v => !!v || "Guardian's occupation is required"],
      guardianAddressRules: [v => !!v || "Guardian's address is required"],
      guardianPhoneRules: [v => !!v || "Guardian's phone is required"]
    };
  },

  computed: {
    guardian() {
      return this.$root.curuserguardian;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getGuardian() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/guardians`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserguardian = response.data.data[0];
            localStorage.setItem(
              "curuserguardian",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curuserguardian = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserguardian");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/guardians/${this.$root.curuserguardian.id}`,
          {
            guardian_name: this.guardian_name,
            guardian_nationality: this.guardian_nationality,
            guardian_occupation: this.guardian_occupation,
            guardian_address: this.guardian_address,
            guardian_phone: this.guardian_phone
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("Applicant Guadian Successfully Updated.");
            console.log(response.data);
            this.getGuardian();
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord() {
      if (this.$refs.saveForm.validate()) {
        this.loading = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/guardians`,
          {
            user_id: this.$root.curuser.id,
            guardian_name: this.guardian_name,
            guardian_nationality: this.guardian_nationality,
            guardian_occupation: this.guardian_occupation,
            guardian_address: this.guardian_address,
            guardian_phone: this.guardian_phone
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("Applicant Guardian Successfully Created.");
            console.log(response.data);
            this.getGuardian();
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    }
  }
};
</script>

<style>
</style>
