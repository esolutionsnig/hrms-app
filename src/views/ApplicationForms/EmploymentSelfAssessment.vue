<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Employment Self Assessment</h2>
    <h4 class="subheading">View and manage your employment self assessment information</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              <h3>Current Data</h3>
            </v-card-title>
            <v-card-text v-if="esa">
              <p class="subheading">To update your data click the CREATE/UPDATE button</p>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Programmes (Academic/Professional) Currently Engaged In:</p>
                  <h4 v-html="esa.current_engagements"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Present/Last Monthly Salary</p>
                  <h4 v-html="esa.last_monthly_salary"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>POther Non-Cash Incentives</p>
                  <h4 v-html="esa.non_cash_incentives"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Minimum Monthly Salary Expectation</p>
                  <h4 v-html="esa.minimum_salary_expectation"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Profile Summary:</p>
                  <h4 v-html="esa.profile_summary"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Why Should You Be Considered For This Position?</p>
                  <h4 v-html="esa.why_you"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Five Years Career Expectation</p>
                  <h4 v-html="esa.five_years_expectation"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Why Did You Leave Your Last Job Or Why Are You Leaving Your Present Job?</p>
                  <h4 v-html="esa.why_you_left"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>What Aspects Of Your Present/Last Job Is Most Challenging?</p>
                  <h4 v-html="esa.most_challenging"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Professional Challenge On The Job And How It Was Resolved</p>
                  <h4 v-html="esa.professional_challenge"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Most Significant Accomplishments On The Job</p>
                  <h4 v-html="esa.job_accomplishments"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm12 md12>
                  <p>Specific Values/Contributions You Envisage To Bring To This New Job Opportunity</p>
                  <h4 v-html="esa.what_you_offer"></h4>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12 sm8 md8>
                  <p>Interviewed By</p>
                  <h4 v-html="esa.interviewed_by"></h4>
                </v-flex>
                <v-flex xs12 sm4 md4>
                  <p>Interviewed On</p>
                  <h4 v-html="esa.interviewed_on"></h4>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="esa.id > 0" @click="disabled = (disabled + 1) % 2">
                Update Employment Self Assessment
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn color="secondary" v-else @click="disabled = (disabled + 1) % 2">
                Create Employment Self Assessment
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6>
          <v-card flat>
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="esa.id > 0">
                <v-layout row wrap>
                  <v-flex xs12 sm6 md8>
                    <v-text-field
                      name="interviewed_by"
                      v-model="interviewed_by"
                      label="Interviewer's Name"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      name="interview_date"
                      v-model="interview_date"
                      label="Interviewer Date"
                      type="text"
                      :rules="dateRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-5">
                  <v-flex xs12 sm12>
                    <p>Current Engagements</p>
                    <small>Please List Programmes (Academic/Professional) Currently Engaged In</small>
                    <ckeditor
                      :editor="editor"
                      v-model="current_engagements"
                      :config="editorConfig"
                      :rules="engagementRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-5">
                  <v-flex xs12 sm12>
                    <p>Monthly Pay</p>
                    <small>What Is Your Present/Last Monthly Salary</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="last_monthly_salary"
                      v-model="last_monthly_salary"
                      :rules="payRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Non-Cash Incentives</p>
                    <small>List Other Non-Cash Incentives</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="non_cash_incentives"
                      v-model="non_cash_incentives"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Salary Expectation</p>
                    <small>What Is Your Minimum Monthly Salary Expectation?</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="minimum_salary_expectation"
                      v-model="minimum_salary_expectation"
                      :rules="expectationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Profile Summary</p>
                    <small>Write Briefly About Yourself</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="profile_summary"
                      v-model="profile_summary"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Why Should We Consider You FOr Thiis Position?</p>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="why_you"
                      v-model="why_you"
                      :rules="whyYouRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Career Expectations</p>
                    <small>Write Your Career Expectations In The Next 5 Years</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="five_years_expectation"
                      v-model="five_years_expectation"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>State Why You Left/Are Leaving Your Last/Present Job</p>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="why_you_left"
                      v-model="why_you_left"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Most Challenging Task</p>
                    <small>What Aspects Of Your Present/Last Jobs Do You Find Most Challenging?</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="most_challenging"
                      v-model="most_challenging"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Describe a Professional Challenge On The Job And How It Was Resolved</p>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="professional_challenge"
                      v-model="professional_challenge"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Accomplishments</p>
                    <small>Write The Most Significant Accomplishments On The Job</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="job_accomplishments"
                      v-model="job_accomplishments"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>What Are You Offering?</p>
                    <small>What Specific Values/Contributions Do You Envisage You Will Bring To This New Job Opportunity?</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="what_you_offer"
                      v-model="what_you_offer"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>
              </v-form>

              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md8>
                    <v-text-field
                      name="interviewed_by"
                      v-model="interviewed_by"
                      label="Interviewer's Name"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                      <v-text-field
                      name="interview_date"
                      v-model="interview_date"
                      label="Interviewer Date"
                      type="text"
                      :rules="dateRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-5">
                  <v-flex xs12 sm12>
                    <p>Current Engagements</p>
                    <small>Please List Programmes (Academic/Professional) Currently Engaged In</small>
                    <ckeditor
                      :editor="editor"
                      v-model="current_engagements"
                      :config="editorConfig"
                      :rules="engagementRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-5">
                  <v-flex xs12 sm12>
                    <p>Monthly Pay</p>
                    <small>What Is Your Present/Last Monthly Salary</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="last_monthly_salary"
                      v-model="last_monthly_salary"
                      :rules="payRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Non-Cash Incentives</p>
                    <small>List Other Non-Cash Incentives</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="non_cash_incentives"
                      v-model="non_cash_incentives"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Salary Expectation</p>
                    <small>What Is Your Minimum Monthly Salary Expectation?</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="minimum_salary_expectation"
                      v-model="minimum_salary_expectation"
                      :rules="expectationRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Profile Summary</p>
                    <small>Write Briefly About Yourself</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="profile_summary"
                      v-model="profile_summary"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Why Should We Consider You FOr Thiis Position?</p>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="why_you"
                      v-model="why_you"
                      :rules="whyYouRules"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Career Expectations</p>
                    <small>Write Your Career Expectations In The Next 5 Years</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="five_years_expectation"
                      v-model="five_years_expectation"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>State Why You Left/Are Leaving Your Last/Present Job</p>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="why_you_left"
                      v-model="why_you_left"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Most Challenging Task</p>
                    <small>What Aspects Of Your Present/Last Jobs Do You Find Most Challenging?</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="most_challenging"
                      v-model="most_challenging"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Describe a Professional Challenge On The Job And How It Was Resolved</p>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="professional_challenge"
                      v-model="professional_challenge"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>Accomplishments</p>
                    <small>Write The Most Significant Accomplishments On The Job</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="job_accomplishments"
                      v-model="job_accomplishments"
                      :disabled="disabled == 1 ? true : false"
                    ></ckeditor>
                  </v-flex>
                </v-layout>

                <v-layout row wrap class="mb-3">
                  <v-flex xs12 sm12>
                    <p>What Are You Offering?</p>
                    <small>What Specific Values/Contributions Do You Envisage You Will Bring To This New Job Opportunity?</small>
                    <ckeditor
                      :editor="editor"
                      :config="editorConfig"
                      name="what_you_offer"
                      v-model="what_you_offer"
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
                v-if="esa.id > 0"
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
    this.getEmploymentSelfAssessment();
  },

  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
      disabled: 1,
      modal: false,
      loading: false,
      error: false,
      errors: {},
      id: this.$root.curuseresa.id,
      interview_date: this.$root.curuseresa.interview_date,
      current_engagements: this.$root.curuseresa.current_engagements,
      last_monthly_salary: this.$root.curuseresa.last_monthly_salary,
      non_cash_incentives: this.$root.curuseresa.non_cash_incentives,
      minimum_salary_expectation: this.$root.curuseresa
        .minimum_salary_expectation,
      profile_summary: this.$root.curuseresa.profile_summary,
      why_you: this.$root.curuseresa.why_you,
      five_years_expectation: this.$root.curuseresa.five_years_expectation,
      why_you_left: this.$root.curuseresa.why_you_left,
      most_challenging: this.$root.curuseresa.most_challenging,
      professional_challenge: this.$root.curuseresa.professional_challenge,
      job_accomplishments: this.$root.curuseresa.job_accomplishments,
      what_you_offer: this.$root.curuseresa.what_you_offer,
      interviewed_by: this.$root.curuseresa.interviewed_by,
      interviewed_on: this.$root.curuseresa.interviewed_on,
      response: "",
      dateRules: [v => !!v || "Interview date is required"],
      engagementRules: [v => !!v || "Current engagement is required"],
      payRules: [v => !!v || "Last monthly salary is required"],
      expectationRules: [v => !!v || "Monthly salary expectation is required"],
      whyYouRules: [v => !!v || "Why you should be employed is required"]
    };
  },

  computed: {
    esa() {
      return this.$root.curuseresa;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getEmploymentSelfAssessment() {
      Axios.get(
        `${config.apiUrl}/users/${this.$root.curuser.id}/employmentselfassessments`
      )
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curuseresa = response.data.data[0];
            localStorage.setItem(
              "curuseresa",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curuseresa = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuseresa");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/employmentselfassessments/${this.$root.curuseresa.id}`,
          {
            interview_date: this.interview_date,
            current_engagements: this.current_engagements,
            last_monthly_salary: this.last_monthly_salary,
            non_cash_incentives: this.non_cash_incentives,
            minimum_salary_expectation: this.minimum_salary_expectation,
            profile_summary: this.profile_summary,
            why_you: this.why_you,
            five_years_expectation: this.five_years_expectation,
            why_you_left: this.why_you_left,
            most_challenging: this.most_challenging,
            professional_challenge: this.professional_challenge,
            job_accomplishments: this.job_accomplishments,
            what_you_offer: this.what_you_offer,
            interviewed_by: this.interviewed_by,
            interviewed_on: this.interview_date
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("Data Successfully Updated.");
            console.log(response.data);
            this.getEmploymentSelfAssessment();
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/employmentselfassessments`,
          {
            user_id: this.$root.curuser.id,
            interview_date: this.interview_date,
            current_engagements: this.current_engagements,
            last_monthly_salary: this.last_monthly_salary,
            non_cash_incentives: this.non_cash_incentives,
            minimum_salary_expectation: this.minimum_salary_expectation,
            profile_summary: this.profile_summary,
            why_you: this.why_you,
            five_years_expectation: this.five_years_expectation,
            why_you_left: this.why_you_left,
            most_challenging: this.most_challenging,
            professional_challenge: this.professional_challenge,
            job_accomplishments: this.job_accomplishments,
            what_you_offer: this.what_you_offer,
            interviewed_by: this.interviewed_by,
            interviewed_on: this.interview_date
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("Data Successfully Created.");
            console.log(response.data);
            this.getEmploymentSelfAssessment();
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
