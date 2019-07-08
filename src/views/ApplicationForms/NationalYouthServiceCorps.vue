<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">National Youth Service Corps</h2>
    <h4 class="subheading">View and manage your national youth service corps information</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              <h3>Current Data</h3>
            </v-card-title>
            <v-card-text>
              <p class="subheading">To update your data click the CREATE/UPDATE button</p>

              <div v-if="nysc">
                <v-layout row wrap>
                  <v-flex xs12 sm10>
                    <small>Primary Place Of Assignment</small>
                    <p>{{ nysc.place_of_assignment }}</p>
                  </v-flex>
                  <v-flex xs12 sm2>
                    <small>Year</small>
                    <p>{{ nysc.year }}</p>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm12 md12>
                    <small>Precise Job Functions</small>
                        <div v-html="nysc.job_function"></div>
                  </v-flex>
                </v-layout>
              </div>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="nysc.id > 0" @click="disabled = (disabled + 1) % 2">
                Update National Youth Service Corps
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn color="secondary" v-else @click="disabled = (disabled + 1) % 2">
                Create National Youth Service Corps
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6>
          <v-card flat>
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="nysc.id > 0">
                <v-layout row wrap>
                  <v-flex xs12 sm10 md10>
                    <v-text-field
                      name="place_of_assignment"
                      v-model="place_of_assignment"
                      label="Primary Place Of Assignment"
                      type="text"
                      :rules="nameRules"
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

                <v-layout row wrap class="mt-3">
                  <v-flex xs12 sm12>
                    <p>Precise Job Function</p>
                    <small>Be as precise as possible</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="competence_profile"
                      v-model="job_function"
                      :rules="jobFunctionRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>
              </v-form>
              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-layout row wrap>
                  <v-flex xs12 sm10 md10>
                    <v-text-field
                      name="place_of_assignment"
                      v-model="place_of_assignment"
                      label="Primary Place Of Assignment"
                      type="text"
                      :rules="nameRules"
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

                <v-layout row wrap class="mt-3">
                  <v-flex xs12 sm12>
                    <p>Precise Job Function</p>
                    <small>Be as precise as possible</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="competence_profile"
                      v-model="job_function"
                      :rules="jobFunctionRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
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
                v-if="nysc.id > 0"
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
    this.getNysc();
  },

  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      disabled: 1,
      loading: false,
      error: false,
      errors: {},
      id: this.$root.curusernysc.id,
      place_of_assignment: this.$root.curusernysc.place_of_assignment,
      year: this.$root.curusernysc.year,
      job_function: this.$root.curusernysc.job_function,
      response: "",
      nameRules: [v => !!v || "Primary place of assignmeent is required"],
      yearRules: [v => !!v || "Year is required"],
      jobFunctionRules: [v => !!v || "Presice job function is required"]
    };
  },

  computed: {
    nysc() {
      return this.$root.curusernysc;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getNysc() {
      Axios.get(
        `${config.apiUrl}/users/${this.$root.curuser.id}/nationalservices`
      )
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curusernysc = response.data.data[0];
            localStorage.setItem(
              "curusernysc",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curusernysc = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curusernysc");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/nationalservices/${this.$root.curusernysc.id}`,
          {
            place_of_assignment: this.place_of_assignment,
            year: this.year,
            job_function: this.job_function
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("NYSC Successfully Updated.");
            console.log(response.data);
            this.getNysc();
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/nationalservices`,
          {
            user_id: this.$root.curuser.id,
            place_of_assignment: this.place_of_assignment,
            year: this.year,
            job_function: this.job_function
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("NYSC Successfully Created.");
            console.log(response.data);
            this.getNysc();
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
