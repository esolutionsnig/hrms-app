<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Employmennt History</h2>
    <h4 class="subheading">View and manage your employmennt history information</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm7>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              <h3>Current Data</h3>
            </v-card-title>
            <v-card-text>
              <v-list two-line>
                <div v-if="ehs">
                  <div class="elevation-1 my-3" v-for="eh in ehs" :key="eh.id">
                    <div class="teal lighten-5" v-if="eh.end_date === 'Works Here'">
                      <div class="pa-3"><h3 class="text-uppercase text-center">Currently Works Here</h3><hr></div>
                      <v-layout row>
                        <v-flex xs12 sm12 md12>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Employer</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.employer_name }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm8>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Contact Address</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.employer_address }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm4>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Contact Phone</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.employer_phone }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                        <v-flex xs12 sm5>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Duration</v-list-tile-sub-title>
                              <v-list-tile-title>
                                {{ eh.start_date }}
                                <v-icon>arrow_right_alt</v-icon>
                                {{ eh.end_date }}
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                        <v-flex xs12 sm3>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Monthly Income</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.monthly_income }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm8>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Job Function</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.job_function }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                        <v-flex xs12 sm4>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Job Grade</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.job_grade }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Reason For Leaving</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.reason_for_leaving }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm9>
                          <v-btn @click="deleteRecord(eh.id)" color="primary--text">
                            <v-icon left>delete_forever</v-icon>Delete
                          </v-btn>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs12 sm3>
                          <v-btn
                            @click="editEmploymentHistory(eh.id, eh.employer_name, eh.employer_address, eh.employer_phone, eh.job_grade, eh.job_function, eh.start_date, eh.end_date, eh.monthly_income, eh.reason_for_leaving)"
                          >
                            <v-icon left>edit</v-icon>Update
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </div>

                    <div v-else>
                      <v-layout row>
                        <v-flex xs12 sm12 md12>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Employer</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.employer_name }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm8>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Contact Address</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.employer_address }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm4>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Contact Phone</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.employer_phone }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                        <v-flex xs12 sm5>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Duration</v-list-tile-sub-title>
                              <v-list-tile-title>
                                {{ eh.start_date }}
                                <v-icon>arrow_right_alt</v-icon>
                                {{ eh.end_date }}
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                        <v-flex xs12 sm3>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Monthly Income</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.monthly_income }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm8>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Job Function</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.job_function }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                        <v-flex xs12 sm4>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Job Grade</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.job_grade }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-sub-title>Reason For Leaving</v-list-tile-sub-title>
                              <v-list-tile-title>{{ eh.reason_for_leaving }}</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-flex>
                      </v-layout>

                      <v-layout row>
                        <v-flex xs12 sm9>
                          <v-btn @click="deleteRecord(eh.id)" color="primary--text">
                            <v-icon left>delete_forever</v-icon>Delete
                          </v-btn>
                        </v-flex>
                        <v-spacer></v-spacer>
                        <v-flex xs12 sm3>
                          <v-btn
                            @click="editEmploymentHistory(eh.id, eh.employer_name, eh.employer_address, eh.employer_phone, eh.job_grade, eh.job_function, eh.start_date, eh.end_date, eh.monthly_income, eh.reason_for_leaving)"
                          >
                            <v-icon left>edit</v-icon>Update
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </div>
                  </div>
                </div>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm5>
          <v-card flat v-if="isEditing">
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord">
                <h2 class="subheading text-uppercase">Edit Employment History</h2>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="employer_name"
                      v-model="oldHistory.employer_name"
                      label="Employer Name"
                      type="text"
                      :rules="employerNameRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-text-field name="id" v-model="oldHistory.id" type="hidden" :rules="idRules"></v-text-field>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="employer_address"
                      v-model="oldHistory.employer_address"
                      label="Employer Contact Address"
                      type="text"
                      :rules="employerAddressRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="employer_phone"
                      v-model="oldHistory.employer_phone"
                      label="Employer Phone Number"
                      type="text"
                      :rules="employerPhoneRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="job_grade"
                      v-model="oldHistory.job_grade"
                      label="Job Grade"
                      type="text"
                      :rules="jobGradeRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="job_function"
                      v-model="oldHistory.job_function"
                      label="Job Function"
                      type="text"
                      :rules="jobFunctionRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs7>
                    <v-text-field
                      name="monthly_income"
                      v-model="oldHistory.monthly_income"
                      label="Consolidated Monthly Income"
                      type="text"
                      :rules="monthlyIncomeRules"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-dialog
                      ref="sddialog"
                      v-model="sdmodal"
                      :return-value.sync="oldHistory.start_date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="oldHistory.start_date"
                          label="Resumption Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="startDateRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="oldHistory.start_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="sdmodal = false">Cancel</v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.sddialog.save(oldHistory.start_date)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm7>
                    <v-switch v-model="worksHere" :label="`I am currently working here`"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-dialog
                      v-if="!worksHere"
                      ref="eddialog"
                      v-model="edmodal"
                      :return-value.sync="oldHistory.end_date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="oldHistory.end_date"
                          label="Date Exited"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="endDateRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="oldHistory.end_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="edmodal = false">Cancel</v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.eddialog.save(oldHistory.end_date)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="reason_for_leaving"
                      v-model="oldHistory.reason_for_leaving"
                      label="Reason For Leaving"
                      type="text"
                      :rules="reasonForLeavingRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn :disabled="disabled" color="primary" @click="updateRecord()">
                <v-icon left v-if="!loading">save</v-icon>
                {{ loading ? 'Processing...' : 'Save Changes' }}
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card flat v-else>
            <v-card-text>
              <v-form ref="saveForm" @submit.prevent="saveRecord">
                <h2 class="subheading text-uppercase">Create Employment History</h2>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="employer_name"
                      v-model="newHistory.employer_name"
                      label="Employer Name"
                      type="text"
                      :rules="employerNameRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="employer_address"
                      v-model="newHistory.employer_address"
                      label="Employer Contact Address"
                      type="text"
                      :rules="employerAddressRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="employer_phone"
                      v-model="newHistory.employer_phone"
                      label="Employer Phone Number"
                      type="text"
                      :rules="employerPhoneRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="job_grade"
                      v-model="newHistory.job_grade"
                      label="Job Grade"
                      type="text"
                      :rules="jobGradeRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="job_function"
                      v-model="newHistory.job_function"
                      label="Job Function"
                      type="text"
                      :rules="jobFunctionRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs7>
                    <v-text-field
                      name="monthly_income"
                      v-model="newHistory.monthly_income"
                      label="Consolidated Monthly Income"
                      type="text"
                      :rules="monthlyIncomeRules"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-dialog
                      ref="sddialog"
                      v-model="sdmodal"
                      :return-value.sync="newHistory.start_date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="newHistory.start_date"
                          label="Resumption Date"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="startDateRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="newHistory.start_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="sdmodal = false">Cancel</v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.sddialog.save(newHistory.start_date)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm7>
                    <v-switch v-model="worksHere" :label="`I am currently working here`"></v-switch>
                  </v-flex>
                  <v-flex xs12 sm5>
                    <v-dialog
                      v-if="!worksHere"
                      ref="eddialog"
                      v-model="edmodal"
                      :return-value.sync="newHistory.end_date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="newHistory.end_date"
                          label="Date Exited"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="endDateRules"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="newHistory.end_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="edmodal = false">Cancel</v-btn>
                        <v-btn
                          flat
                          color="primary"
                          @click="$refs.eddialog.save(newHistory.end_date)"
                        >OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      name="reason_for_leaving"
                      v-model="newHistory.reason_for_leaving"
                      label="Reason For Leaving"
                      type="text"
                      :rules="reasonForLeavingRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn :disabled="disabled" color="primary" @click="saveRecord()">
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
    this.getEmploymentHistory();
  },

  data() {
    return {
      isEditing: false,
      worksHere: false,
      sdmodal: false,
      edmodal: false,
      disabled: false,
      loading: false,
      error: false,
      errors: {},
      newHistory: {
        employer_name: "",
        employer_address: "",
        employer_phone: "",
        job_grade: "",
        job_function: "",
        start_date: "",
        end_date: "",
        monthly_income: "",
        reason_for_leaving: ""
      },
      oldHistory: {
        id: "",
        employer_name: "",
        employer_address: "",
        employer_phone: "",
        job_grade: "",
        job_function: "",
        start_date: "",
        end_date: "",
        monthly_income: "",
        reason_for_leaving: ""
      },
      response: "",
      idRules: [v => !!v || "UID is required"],
      employerNameRules: [v => !!v || "Employer's name is required"],
      employerAddressRules: [
        v => !!v || "Employer's contact address is required"
      ],
      employerPhoneRules: [v => !!v || "Employer's phone number is required"],
      jobGradeRules: [v => !!v || "Job grade is required"],
      jobFunctionRules: [v => !!v || "Job function is required"],
      startDateRules: [v => !!v || "Date you resumed this work is required"],
      endDateRules: [v => !!v || "Date you exited this work is required"],
      monthlyIncomeRules: [
        v => !!v || "Consolidated monthly income is required"
      ],
      reasonForLeavingRules: [v => !!v || "Your reason for leaving is required"]
    };
  },

  computed: {
    ehs() {
      return this.$root.curusereh;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getEmploymentHistory() {
      Axios.get(
        `${config.apiUrl}/users/${this.$root.curuser.id}/employmenthistories`
      )
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curusereh = response.data.data;
            localStorage.setItem(
              "curusereh",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("b");
            this.$root.curusereh = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curusereh");
        });
    },

    saveRecord() {
      if (this.$refs.saveForm.validate()) {
        this.loading = true;
        this.disabled = true;
        if (this.worksHere === true) {
          this.newHistory.end_date = "I currently work here";
        } else {
          this.newHistory.end_date = this.newHistory.end_date;
        }
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/employmenthistories`,
          {
            user_id: this.$root.curuser.id,
            employer_name: this.newHistory.employer_name,
            employer_address: this.newHistory.employer_address,
            employer_phone: this.newHistory.employer_phone,
            job_grade: this.newHistory.job_grade,
            job_function: this.newHistory.job_function,
            start_date: this.newHistory.start_date,
            end_date: this.newHistory.end_date,
            monthly_income: this.newHistory.monthly_income,
            reason_for_leaving: this.newHistory.reason_for_leaving
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm.reset();
            this.loading = false;
            this.disabled = false;
            this.$noty.success("Employment History Successfully Created.");
            console.log(response.data);
            this.getEmploymentHistory();
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    editEmploymentHistory(
      empId,
      empName,
      empAddress,
      empPhone,
      jobGrade,
      jobFunction,
      startDate,
      endDate,
      monthlyIncome,
      reasonForLeaving
    ) {
      this.isEditing = true;
      (this.oldHistory.id = empId),
        (this.oldHistory.employer_name = empName),
        (this.oldHistory.employer_address = empAddress),
        (this.oldHistory.employer_phone = empPhone),
        (this.oldHistory.job_grade = jobGrade),
        (this.oldHistory.job_function = jobFunction),
        (this.oldHistory.start_date = startDate),
        (this.oldHistory.end_date = endDate),
        (this.oldHistory.monthly_income = monthlyIncome),
        (this.oldHistory.reason_for_leaving = reasonForLeaving);
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.disabled = true;
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/employmenthistories/${this.oldHistory.id}`,
          {
            employer_name: this.oldHistory.employer_name,
            employer_address: this.oldHistory.employer_address,
            employer_phone: this.oldHistory.employer_phone,
            job_grade: this.oldHistory.job_grade,
            job_function: this.oldHistory.job_function,
            start_date: this.oldHistory.start_date,
            end_date: this.oldHistory.end_date,
            monthly_income: this.oldHistory.monthly_income,
            reason_for_leaving: this.oldHistory.reason_for_leaving
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.disabled = false;
            this.$noty.success("Employment History Successfully Updated.");
            console.log(response.data);
            this.getEmploymentHistory();
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.disabled = false;
            this.loading = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    deleteRecord(id) {
      if (id) {
        this.deleting = true;
        Axios.delete(
          `${config.apiUrl}/users/${this.$root.curuser.id}/employmenthistories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.deleting = false;
            this.$noty.success("Employment History Successfully Deleted.");
            console.log(response.data);
            this.getEmploymentHistory();
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
