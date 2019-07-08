<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">General</h2>
    <h4 class="subheading">View and manage your general information</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              <h3>Current Data</h3>
            </v-card-title>
            <v-card-text>
              <p class="subheading">To update your data click the CREATE/UPDATE button</p>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <h3>Computer Literacy</h3>
                  <div v-html="gen.computer_literacy"></div>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <h3>Competence Profile</h3>
                  <div v-html="gen.competence_profile"></div>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <h3>Personal Traits (In Relations To Strengths And Weaknesses</h3>
                  <div v-html="gen.personal_traits"></div>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="gen.id > 0" @click="disabled = (disabled + 1) % 2">
                Update General
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn color="secondary" v-else @click="disabled = (disabled + 1) % 2">
                Create General
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6>
          <v-card flat>
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="gen.id > 0">
                <v-layout row wrap class="mb-5">
                  <v-flex xs12 sm12>
                    <p>Computer Literacy</p>
                    <small>Please List Softwares and Programme You Can Proficiently Use</small>
                    <ckeditor
                      :editor="editor"
                      v-model="computer_literacy"
                      :config="editorConfig"
                      :rules="computerRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-5">
                  <v-flex xs12 sm12>
                    <p>Competence Profile</p>
                    <small>Please List Areas Of Competencies That You Believe Will Add Value</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="competence_profile"
                      v-model="competence_profile"
                      :rules="competenceRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Precise Job Function</p>
                    <small>Focus On Your Strength And Weaknesses</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="personal_traits"
                      v-model="personal_traits"
                      :rules="jobFunctionRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>
              </v-form>
              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-layout row wrap class="mb-5">
                  <v-flex xs12 sm12>
                    <p>Computer Literacy</p>
                    <small>Please List Softwares and Programme You Can Proficiently Use</small>
                    <ckeditor
                      :editor="editor"
                      v-model="computer_literacy"
                      :config="editorConfig"
                      :rules="computerRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>
                
                <v-layout row wrap class="mb-5">
                  <v-flex xs12 sm12>
                    <p>Competence Profile</p>
                    <small>Please List Areas Of Competencies That You Believe Will Add Value</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="competence_profile"
                      v-model="competence_profile"
                      :rules="competenceRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Precise Job Function</p>
                    <small>Focus On Your Strength And Weaknesses</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="personal_traits"
                      v-model="personal_traits"
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
                v-if="gen.id > 0"
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
    this.getGeneral();
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
      id: this.$root.curusergen.id,
      computer_literacy: this.$root.curusergen.computer_literacy,
      competence_profile: this.$root.curusergen.competence_profile,
      personal_traits: this.$root.curusergen.personal_traits,
      response: "",
      computerRules: [v => !!v || "Computer literacy is required"],
      competenceRules: [v => !!v || "Competence profile is required"],
      personalRules: [v => !!v || "Personal traits is required"]
    };
  },

  computed: {
    gen() {
      return this.$root.curusergen;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getGeneral() {
      Axios.get(`${config.apiUrl}/users/${this.$root.curuser.id}/generals`)
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curusergen = response.data.data[0];
            localStorage.setItem(
              "curusergen",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curusergen = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curusergen");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/generals/${this.$root.curusergen.id}`,
          {
            computer_literacy: this.computer_literacy,
            competence_profile: this.competence_profile,
            personal_traits: this.personal_traits
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("General Successfully Updated.");
            console.log(response.data);
            this.getGeneral();
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/generals`,
          {
            user_id: this.$root.curuser.id,
            computer_literacy: this.computer_literacy,
            competence_profile: this.competence_profile,
            personal_traits: this.personal_traits
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("General Successfully Created.");
            console.log(response.data);
            this.getGeneral();
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
