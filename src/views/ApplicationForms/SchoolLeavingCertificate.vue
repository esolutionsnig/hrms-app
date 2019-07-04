<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">School Leaving Certificate</h2>
    <h4 class="subheading">View and manage your school leaving certificate information</h4>

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
                <div v-if="slc">
                  <v-layout row wrap>
                    <v-flex xs12 sm10>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>College / School</v-list-tile-sub-title>
                          <v-list-tile-title>{{ slc.school }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm2>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Year</v-list-tile-sub-title>
                          <v-list-tile-title>{{ slc.year }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm12>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Result One</v-list-tile-sub-title>
                          <v-list-tile-title>{{ slc.result_1 }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm12>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Result Two</v-list-tile-sub-title>
                          <v-list-tile-title>{{ slc.result_2 }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm12>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Result Three</v-list-tile-sub-title>
                          <v-list-tile-title>{{ slc.result_3 }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm12>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Result Four</v-list-tile-sub-title>
                          <v-list-tile-title>{{ slc.result_4 }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm12>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Result Five</v-list-tile-sub-title>
                          <v-list-tile-title>{{ slc.result_5 }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                </div>
              </v-list>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="slc.id > 0" @click="disabled = (disabled + 1) % 2">
                Update School Leaving Certificate
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn color="secondary" v-else @click="disabled = (disabled + 1) % 2">
                Create School Leaving Certificate
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6>
          <v-card flat>
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="slc.id > 0">
                <v-layout row wrap>
                  <v-flex xs12 sm10 md10>
                    <v-text-field
                      name="school"
                      v-model="school"
                      label="College / School"
                      type="text"
                      :rules="schoolRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm2 md2>
                    <v-text-field
                      name="year"
                      v-model="year"
                      label="Year"
                      type="text"
                      :rules="yearRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_1"
                      v-model="result_1"
                      label="Result 1 e.g English Language - C4"
                      type="text"
                      :rules="result1Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_2"
                      v-model="result_2"
                      label="Result 2 e.g Mathematics - C4"
                      type="text"
                      :rules="result2Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_3"
                      v-model="result_3"
                      label="Result 3 e.g Physics - C4"
                      type="text"
                      :rules="result3Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_4"
                      v-model="result_4"
                      label="Result 4 e.g Chemistry - C4"
                      type="text"
                      :rules="result4Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_5"
                      v-model="result_5"
                      label="Result 5 e.g Biology - C4"
                      type="text"
                      :rules="result5Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

              </v-form>
              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-layout row wrap>
                  <v-flex xs12 sm10 md10>
                    <v-text-field
                      name="school"
                      v-model="school"
                      label="College / School"
                      type="text"
                      :rules="schoolRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm2 md2>
                    <v-text-field
                      name="year"
                      v-model="year"
                      label="Year"
                      type="text"
                      :rules="yearRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_1"
                      v-model="result_1"
                      label="Result 1 e.g English Language - C4"
                      type="text"
                      :rules="result1Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_2"
                      v-model="result_2"
                      label="Result 2 e.g Mathematics - C4"
                      type="text"
                      :rules="result2Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_3"
                      v-model="result_3"
                      label="Result 3 e.g Physics - C4"
                      type="text"
                      :rules="result3Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_4"
                      v-model="result_4"
                      label="Result 4 e.g Chemistry - C4"
                      type="text"
                      :rules="result4Rules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="result_5"
                      v-model="result_5"
                      label="Result 5 e.g Biology - C4"
                      type="text"
                      :rules="result5Rules"
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
                v-if="slc.id > 0"
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
    this.getSchoolLeavingCertificate();
  },

  data() {
    return {
      disabled: 1,
      loading: false,
      error: false,
      errors: {},
      slc_id: this.$root.curuserslc.id,
      school: this.$root.curuserslc.school,
      year: this.$root.curuserslc.year,
      result_1: this.$root.curuserslc.result_1,
      result_2: this.$root.curuserslc.result_2,
      result_3: this.$root.curuserslc.result_3,
      result_4: this.$root.curuserslc.result_4,
      result_5: this.$root.curuserslc.result_5,
      response: "",
      schoolRules: [v => !!v || "College / School's name is required"],
      yearRules: [v => !!v || "Year is required"],
      result1Rules: [v => !!v || "This field is required"],
      result2Rules: [v => !!v || "This field is required"],
      result3Rules: [v => !!v || "This field is required"],
      result4Rules: [v => !!v || "This field is required"],
      result5Rules: [v => !!v || "This field is required"]
    };
  },

  computed: {
    slc() {
      return this.$root.curuserslc;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getSchoolLeavingCertificate() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/schoolleavingcertificates`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuserslc = response.data.data[0];
            localStorage.setItem(
              "curuserslc",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curuserslc = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuserslc");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/schoolleavingcertificates/${this.$root.curuserslc.id}`,
          {
            school: this.school,
            year: this.year,
            result_1: this.result_1,
            result_2: this.result_2,
            result_3: this.result_3,
            result_4: this.result_4,
            result_5: this.result_5
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("School Leaving Certificate Successfully Updated.");
            console.log(response.data);
            this.getSchoolLeavingCertificate();
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/schoolleavingcertificates`,
          {
            user_id: this.$root.curuser.id,
            school: this.school,
            year: this.year,
            result_1: this.result_1,
            result_2: this.result_2,
            result_3: this.result_3,
            result_4: this.result_4,
            result_5: this.result_5
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("School Leaving Certificate Successfully Created.");
            console.log(response.data);
            this.getSchoolLeavingCertificate();
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
