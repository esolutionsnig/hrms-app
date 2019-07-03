<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Home Town Address</h2>
    <h4 class="subheading">View and manage your home town address</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              <h3>Current Data</h3>
            </v-card-title>
            <v-card-text>
              <p
                class="subheading"
              >To update your data click the CREATE/UPDATE  button</p>
              <v-list two-line>
                <div v-if="hta">

                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Popular Sports From Which Your Residence Can Be Located</v-list-tile-sub-title>
                          <v-list-tile-title>{{ hta.landmarks }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>
                  
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Residential Area</v-list-tile-sub-title>
                          <v-list-tile-title>{{ hta.residential_area }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm2>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>House Number</v-list-tile-sub-title>
                          <v-list-tile-title>{{ hta.house_number }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm10>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Street Name</v-list-tile-sub-title>
                          <v-list-tile-title>{{ hta.street_name}}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Suburb</v-list-tile-sub-title>
                          <v-list-tile-title>{{ hta.suburb }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Town</v-list-tile-sub-title>
                          <v-list-tile-title>{{ hta.town }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>District</v-list-tile-sub-title>
                          <v-list-tile-title>{{ hta.district }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Home Telephone Number</v-list-tile-sub-title>
                          <v-list-tile-title>{{ hta.home_phone }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>
                  
                </div>
              </v-list>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="hta.id > 0" @click="disabled = (disabled + 1) % 2">
                Update Home Town Address
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn color="secondary" v-else @click="disabled = (disabled + 1) % 2">
                Create Home Town Address
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6>
          <v-card flat>
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="hta.id > 0">
                <v-text-field
                  name="landmarks"
                  v-model="landmarks"
                  label="Popular Spots From Which Your Residence Can Be Located"
                  type="text"
                  :rules="landmarksRules"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-text-field
                  name="residential_area"
                  v-model="residential_area"
                  label="Residential Area"
                  type="text"
                  :rules="residentialRules"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-layout row wrap>
                  <v-flex xs12 sm2 md2>
                    <v-text-field
                      name="house_number"
                      v-model="house_number"
                      label="House Number"
                      type="text"
                      :rules="houseNumberRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm10 md10>
                    <v-text-field
                      name="street_name"
                      v-model="street_name"
                      label="Street Name"
                      type="text"
                      :rules="streetNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="suburb"
                      v-model="suburb"
                      label="Suburb"
                      type="text"
                      :rules="suburbRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="town"
                      v-model="town"
                      label="Town"
                      type="text"
                      :rules="townRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="district"
                      v-model="district"
                      label="District"
                      type="text"
                      :rules="districtRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="home_phone"
                      v-model="home_phone"
                      label="Home Telephone Number"
                      type="text"
                      :rules="regionRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

              </v-form>
              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-text-field
                  name="landmarks"
                  v-model="landmarks"
                  label="Popular Spots From Which Your Residence Can Be Located"
                  type="text"
                  :rules="landmarksRules"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-text-field
                  name="residential_area"
                  v-model="residential_area"
                  label="Residential Area"
                  type="text"
                  :rules="residentialRules"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-layout row wrap>
                  <v-flex xs12 sm2 md2>
                    <v-text-field
                      name="house_number"
                      v-model="house_number"
                      label="House Number"
                      type="text"
                      :rules="houseNumberRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm10 md10>
                    <v-text-field
                      name="street_name"
                      v-model="street_name"
                      label="Street Name"
                      type="text"
                      :rules="streetNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="suburb"
                      v-model="suburb"
                      label="Suburb"
                      type="text"
                      :rules="suburbRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="town"
                      v-model="town"
                      label="Town"
                      type="text"
                      :rules="townRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="district"
                      v-model="district"
                      label="District"
                      type="text"
                      :rules="districtRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="home_phone"
                      v-model="home_phone"
                      label="Home Telephone Number"
                      type="text"
                      :rules="regionRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
            
              </v-form>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn :disabled="disabled == 1 ? true : false" color="primary" @click="updateRecord()" v-if="hta.id > 0">
                <v-icon left v-if="!loading">save</v-icon>
                {{ loading ? 'Processing...' : 'Save Changes' }}
              </v-btn>
              <v-btn :disabled="disabled == 1 ? true : false" color="primary" @click="saveRecord()" v-else>
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
    this.getHomeTownAddress();
  },

  data() {
    return {
      disabled: 1,
      loading: false,
      error: false,
      errors: {},
      ra_id: this.$root.curuserhta.id,
      landmarks: this.$root.curuserhta.landmarks,
      residential_area: this.$root.curuserhta.residential_area,
      house_number: this.$root.curuserhta.house_number,
      street_name: this.$root.curuserhta.street_name,
      suburb: this.$root.curuserhta.suburb,
      town: this.$root.curuserhta.town,
      district: this.$root.curuserhta.district,
      region: this.$root.curuserhta.region,
      home_phone: this.$root.curuserhta.home_phone,
      response: "",
      landmarksRules: [v => !!v || "Popular spot is required"],
      residentialRules: [v => !!v || "Residential area is required"],
      houseNumberRules: [v => !!v || "House number is required"],
      streetNameRules: [v => !!v || "Street name is required"],
      suburbRules: [v => !!v || "Suburb is required"],
      townRules: [v => !!v || "Town is required"],
      districtRules: [v => !!v || "District is required"],
      regionRules: [v => !!v || "Phone number is required"]
    };
  },

  computed: {
    hta() {
      return this.$root.curuserhta;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getHomeTownAddress() {
      Axios.get(
        `${config.apiUrl}/users/${this.$root.curuser.id}/hometownaddresses`
      )
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserhta = response.data.data[0];
            localStorage.setItem(
              "curuserhta",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curuserhta = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserhta");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/hometownaddresses/${this.$root.curuserhta.id}`,
          {
            previous_name: this.previous_name,
            landmarks: this.landmarks,
            residential_area: this.residential_area,
            house_number: this.house_number,
            street_name: this.street_name,
            suburb: this.suburb,
            town: this.town,
            district: this.district,
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
            this.$noty.success("Applicant Home Town Address Successfully Updated.");
            console.log(response.data);
            this.getHomeTownAddress()
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/hometownaddresses`,
          {
            user_id: this.$root.curuser.id,
            landmarks: this.landmarks,
            residential_area: this.residential_area,
            house_number: this.house_number,
            street_name: this.street_name,
            suburb: this.suburb,
            town: this.town,
            district: this.district,
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
            this.$noty.success("Applicant Home Town Address Successfully Created.");
            console.log(response.data);
            this.getHomeTownAddress()
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
