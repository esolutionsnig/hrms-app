<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Next Of Kin</h2>
    <h4 class="subheading">View and manage your next of kin information</h4>

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
                <div v-if="nok">
                  <v-layout row wrap>
                    <v-flex xs12 sm8>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Name</v-list-tile-sub-title>
                          <v-list-tile-title>{{ nok.name }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Relationship</v-list-tile-sub-title>
                          <v-list-tile-title>{{ nok.relationship }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm8>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Office Address</v-list-tile-sub-title>
                          <v-list-tile-title>{{ nok.office_address }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Home Phone Number</v-list-tile-sub-title>
                          <v-list-tile-title>{{ nok.office_phone }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm8>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Home Address</v-list-tile-sub-title>
                          <v-list-tile-title>{{ nok.home_address }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Home Phone Number</v-list-tile-sub-title>
                          <v-list-tile-title>{{ nok.office_phone }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>
                </div>
              </v-list>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="nok.id > 0" @click="disabled = (disabled + 1) % 2">
                Update Next Of Kin
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn color="secondary" v-else @click="disabled = (disabled + 1) % 2">
                Create Next Of Kin
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6>
          <v-card flat>
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="nok.id > 0">
                <v-layout row wrap>
                  <v-flex xs12 sm8 md8>
                    <v-text-field
                      name="name"
                      v-model="name"
                      label="Full Name"
                      type="text"
                      :rules="nameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="relationship"
                      v-model="relationship"
                      label="Relationship"
                      type="text"
                      :rules="relationshipRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm8 md8>
                    <v-text-field
                      name="office_address"
                      v-model="office_address"
                      label="Office Address"
                      type="text"
                      :rules="officeAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="office_phone"
                      v-model="office_phone"
                      label="Office Phone Number"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm8 md8>
                    <v-text-field
                      name="home_address"
                      v-model="home_address"
                      label="Home Address"
                      type="text"
                      :rules="homeAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="home_phone"
                      v-model="home_phone"
                      label="Home Phone Number"
                      type="text"
                      :rules="homePhoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-form>
              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-layout row wrap>
                  <v-flex xs12 sm8 md8>
                    <v-text-field
                      name="name"
                      v-model="name"
                      label="Full Name"
                      type="text"
                      :rules="nameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="relationship"
                      v-model="relationship"
                      label="Relationship"
                      type="text"
                      :rules="relationshipRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm8 md8>
                    <v-text-field
                      name="office_address"
                      v-model="office_address"
                      label="Office Address"
                      type="text"
                      :rules="officeAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="office_phone"
                      v-model="office_phone"
                      label="Office Phone Number"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm8 md8>
                    <v-text-field
                      name="home_address"
                      v-model="home_address"
                      label="Home Address"
                      type="text"
                      :rules="homeAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="home_phone"
                      v-model="home_phone"
                      label="Home Phone Number"
                      type="text"
                      :rules="homePhoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn
                :disabled="disabled == 1 ? true : false"
                color="primary"
                @click="updateRecord()"
                v-if="nok.id > 0"
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
    this.getNextOfKin();
  },

  data() {
    return {
      disabled: 1,
      loading: false,
      error: false,
      errors: {},
      nok_id: this.$root.curusernok.id,
      name: this.$root.curusernok.name,
      relationship: this.$root.curusernok.relationship,
      office_address: this.$root.curusernok.office_address,
      office_phone: this.$root.curusernok.office_phone,
      home_address: this.$root.curusernok.home_address,
      home_phone: this.$root.curusernok.home_phone,
      response: "",
      nameRules: [v => !!v || "Full name is required"],
      relationshipRules: [v => !!v || "Relationship is required"],
      officeAddressRules: [v => !!v || "Office address is required"],
      homeAddressRules: [v => !!v || "Home address is required"],
      homePhoneRules: [v => !!v || "Home phone is required"]
    };
  },

  computed: {
    nok() {
      return this.$root.curusernok;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getNextOfKin() {
      Axios.get(
        `${config.apiUrl}/users/${this.$root.curuser.id}/nextofkins`
      )
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curusernok = response.data.data[0];
            localStorage.setItem(
              "curusernok",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curusernok = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curusernok");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/nextofkins/${this.$root.curusernok.id}`,
          {
            name: this.name,
            relationship: this.relationship,
            office_address: this.office_address,
            office_phone: this.office_phone,
            home_address: this.home_address,
            home_phone: this.home_phone
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success(
              "Applicant Next Of Kin Successfully Updated."
            );
            console.log(response.data);
            this.getNextOfKin()
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/nextofkins`,
          {
            user_id: this.$root.curuser.id,
            name: this.name,
            relationship: this.relationship,
            office_address: this.office_address,
            office_phone: this.office_phone,
            home_address: this.home_address,
            home_phone: this.home_phone
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success(
              "Applicant Next Of Kin Successfully Created."
            );
            console.log(response.data);
            this.getNextOfKin()
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
