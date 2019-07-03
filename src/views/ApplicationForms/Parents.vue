<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Parents</h2>
    <h4 class="subheading">View and manage your parent information</h4>

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
                <div v-if="parent">
                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Father's Name</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.father_name }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Mother's Name / Maiden Name</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.mother_name }} / {{ parent.mother_maiden_name }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Father's Nationality</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.father_nationality }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Mother's Nationality</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.mother_nationality }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Father's Occupation</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.father_occupation }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Mother's Occupation</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.mother_occupation }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Father's Address</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.father_address }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Mother's Address</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.mother_address }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Father's Contact Phone Number</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.father_phone }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Mother's Contact Phone Number</v-list-tile-sub-title>
                          <v-list-tile-title>{{ parent.mother_phone }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>
                </div>
              </v-list>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="parent.id > 0" @click="disabled = (disabled + 1) % 2">
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
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="parent.id > 0">
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="father_name"
                      v-model="father_name"
                      label="Father's Full Name"
                      type="text"
                      :rules="fatherNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="father_nationality"
                      v-model="father_nationality"
                      label="Father's Nationality"
                      type="text"
                      :rules="fatherNationalityRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="father_occupation"
                      v-model="father_occupation"
                      label="Father's Full Occupation"
                      type="text"
                      :rules="fatherOccupationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="father_phone"
                      v-model="father_phone"
                      label="Father's Phone"
                      type="text"
                      :rules="fatherPhoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="father_address"
                      v-model="father_address"
                      label="Father's Address"
                      type="text"
                      :rules="fatherAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="mother_name"
                      v-model="mother_name"
                      label="Mother's Full Name"
                      type="text"
                      :rules="motherNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="mother_maiden_name"
                      v-model="mother_maiden_name"
                      label="Mother's Maiden Name"
                      type="text"
                      :rules="motherMaidenNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="mother_nationality"
                      v-model="mother_nationality"
                      label="Mother's Nationality"
                      type="text"
                      :rules="motherNationalityRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="mother_occupation"
                      v-model="mother_occupation"
                      label="Mother's Full Occupation"
                      type="text"
                      :rules="motherOccupationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="mother_phone"
                      v-model="mother_phone"
                      label="Mother's Phone"
                      type="text"
                      :rules="motherPhoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="mother_address"
                      v-model="mother_address"
                      label="Mother's Address"
                      type="text"
                      :rules="motherAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="father_name"
                      v-model="father_name"
                      label="Father's Full Name"
                      type="text"
                      :rules="fatherNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="father_nationality"
                      v-model="father_nationality"
                      label="Father's Nationality"
                      type="text"
                      :rules="fatherNationalityRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="father_occupation"
                      v-model="father_occupation"
                      label="Father's Full Occupation"
                      type="text"
                      :rules="fatherOccupationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="father_phone"
                      v-model="father_phone"
                      label="Father's Phone"
                      type="text"
                      :rules="fatherPhoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="father_address"
                      v-model="father_address"
                      label="Father's Address"
                      type="text"
                      :rules="fatherAddressRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="mother_name"
                      v-model="mother_name"
                      label="Mother's Full Name"
                      type="text"
                      :rules="motherNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="mother_maiden_name"
                      v-model="mother_maiden_name"
                      label="Mother's Maiden Name"
                      type="text"
                      :rules="motherMaidenNameRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="mother_nationality"
                      v-model="mother_nationality"
                      label="Mother's Nationality"
                      type="text"
                      :rules="motherNationalityRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="mother_occupation"
                      v-model="mother_occupation"
                      label="Mother's Full Occupation"
                      type="text"
                      :rules="motherOccupationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="mother_phone"
                      v-model="mother_phone"
                      label="Mother's Phone"
                      type="text"
                      :rules="motherPhoneRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12>
                    <v-text-field
                      name="mother_address"
                      v-model="mother_address"
                      label="Mother's Address"
                      type="text"
                      :rules="motherAddressRules"
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
                v-if="parent.id > 0"
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
    this.getParents();
  },

  data() {
    return {
      disabled: 1,
      loading: false,
      error: false,
      errors: {},
      parent_id: this.$root.curuserparent.id,
      father_name: this.$root.curuserparent.father_name,
      father_nationality: this.$root.curuserparent.father_nationality,
      father_occupation: this.$root.curuserparent.father_occupation,
      father_address: this.$root.curuserparent.father_address,
      father_phone: this.$root.curuserparent.father_phone,
      mother_name: this.$root.curuserparent.mother_name,
      mother_maiden_name: this.$root.curuserparent.mother_maiden_name,
      mother_nationality: this.$root.curuserparent.mother_nationality,
      mother_occupation: this.$root.curuserparent.mother_occupation,
      mother_address: this.$root.curuserparent.mother_address,
      mother_phone: this.$root.curuserparent.mother_phone,
      response: "",
      fatherNameRules: [v => !!v || "Father's name is required"],
      fatherNationalityRules: [v => !!v || "Father's nationality is required"],
      fatherOccupationRules: [v => !!v || "Father's occupation is required"],
      fatherAddressRules: [v => !!v || "Father's address is required"],
      fatherPhoneRules: [v => !!v || "Father's phone is required"],
      motherNameRules: [v => !!v || "Mother's name is required"],
      motherMaidenNameRules: [v => !!v || "Mother's maiden name is required"],
      motherNationalityRules: [v => !!v || "Mother's nationality is required"],
      motherOccupationRules: [v => !!v || "Mother's occupation is required"],
      motherAddressRules: [v => !!v || "Mother's address is required"],
      motherPhoneRules: [v => !!v || "Mother's phone is required"]
    };
  },

  computed: {
    parent() {
      return this.$root.curuserparent;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getParents() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/prents`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserparent = response.data.data[0];
            localStorage.setItem(
              "curuserparent",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curuserparent = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserparent");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/prents/${this.$root.curuserparent.id}`,
          {
            father_name: this.father_name,
            father_nationality: this.father_nationality,
            father_occupation: this.father_occupation,
            father_address: this.father_address,
            father_phone: this.father_phone,
            mother_name: this.mother_name,
            mother_maiden_name: this.mother_maiden_name,
            mother_nationality: this.mother_nationality,
            mother_occupation: this.mother_occupation,
            mother_address: this.mother_address,
            mother_phone: this.mother_phone
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("Applicant Parents Successfully Updated.");
            console.log(response.data);
            this.getParents();
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/prents`,
          {
            user_id: this.$root.curuser.id,
            father_name: this.father_name,
            father_nationality: this.father_nationality,
            father_occupation: this.father_occupation,
            father_address: this.father_address,
            father_phone: this.father_phone,
            mother_name: this.mother_name,
            mother_maiden_name: this.mother_maiden_name,
            mother_nationality: this.mother_nationality,
            mother_occupation: this.mother_occupation,
            mother_address: this.mother_address,
            mother_phone: this.mother_phone
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("Applicant Parent Successfully Created.");
            console.log(response.data);
            this.getParents();
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
