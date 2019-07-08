<template>
  <div class="dashboard">
    <h2
      class="grey--text primary--text text-uppercase display-1"
    >Criminal Records And Full Self Disclosure</h2>
    <h4
      class="subheading"
    >View and manage your criminal records and full self disclosure information</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm7>
          <v-card>
            <v-card-title class="blue-grey lighten-4">
              <v-layout row class="text-uppercase">
                <v-flex xs12 sm6 md6>
                  <h4>Description</h4>
                </v-flex>
                <v-flex xs12 sm1 md1>
                  <h4>Ans.</h4>
                </v-flex>
                <v-flex xs12 sm5 md5>
                  <h4>Additional Details</h4>
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-list two-line>
                <div v-if="fsds">
                  <div class="elevation-1 my-3 pa-3" v-for="fsd in fsds" :key="fsd.id">
                    <v-layout row>
                      <v-flex xs12 sm6 md6>{{ fsd.description }}</v-flex>
                      <v-flex xs12 sm1 md1>
                        <p>{{ fsd.your_response }}</p>
                      </v-flex>
                      <v-flex xs12 sm5 md5>
                        <p>{{ fsd.additional_details }}</p>
                      </v-flex>
                    </v-layout>
                  </div>
                </div>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm5>
          <div class="pt-3 pl-3 mb-4">
            <h4 class="text-uppercase">Create Criminal Records And Full Self Disclosure</h4>
            <p class="primary--text">Think carefully before answering this questions, you have one shot at this.</p>
          </div>
          <div v-if="qt1 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>1</strong>
                  . {{ question1Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm1" @submit.prevent="saveRecord1">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response1"
                        :items="statuses"
                        v-model="response1"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details1"
                        v-model="details1"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord1()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt2 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>2</strong>
                  . {{ question2Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm2" @submit.prevent="saveRecord2">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response2"
                        :items="statuses"
                        v-model="response2"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details2"
                        v-model="details2"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord2()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt3 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>3</strong>
                  . {{ question3Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm3" @submit.prevent="saveRecord3">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response3"
                        :items="statuses"
                        v-model="response3"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details3"
                        v-model="details3"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord3()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt4 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>4</strong>
                  . {{ question4Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm4" @submit.prevent="saveRecord4">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response4"
                        :items="statuses"
                        v-model="response4"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details4"
                        v-model="details4"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord4()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt5 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>5</strong>
                  . {{ question5Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm5" @submit.prevent="saveRecord5">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response5"
                        :items="statuses"
                        v-model="response5"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details5"
                        v-model="details5"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord5()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt6 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>6</strong>
                  . {{ question6Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm6" @submit.prevent="saveRecord6">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response6"
                        :items="statuses"
                        v-model="response6"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details6"
                        v-model="details6"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord6()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt7 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>7</strong>
                  . {{ question7Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm7" @submit.prevent="saveRecord7">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response7"
                        :items="statuses"
                        v-model="response7"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details7"
                        v-model="details7"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord7()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt8 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>8</strong>
                  . {{ question8Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm8" @submit.prevent="saveRecord8">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response8"
                        :items="statuses"
                        v-model="response8"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details8"
                        v-model="details8"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord8()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt9 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>9</strong>
                  . {{ question9Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm9" @submit.prevent="saveRecord9">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response9"
                        :items="statuses"
                        v-model="response9"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details9"
                        v-model="details9"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord9()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt10 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>10</strong>
                  . {{ question10Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm10" @submit.prevent="saveRecord10">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response10"
                        :items="statuses"
                        v-model="response10"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details10"
                        v-model="details10"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord10()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>

          <div v-if="qt1 === 'Saved'"></div>
          <div v-else>
            <v-card class="mb-3">
              <v-card-title>
                <p>
                  <strong>11</strong>
                  . {{ question11Title }}
                </p>
              </v-card-title>
              <v-card-text>
                <v-form ref="saveForm11" @submit.prevent="saveRecord11">
                  <v-layout row wrap>
                    <v-flex xs1 sm3 md3>
                      <v-select
                        name="response11"
                        :items="statuses"
                        v-model="response11"
                        label="Response"
                        :rules="statusRules"
                      ></v-select>
                    </v-flex>
                    <v-flex xs1 sm9 md9>
                      <v-text-field
                        name="details11"
                        v-model="details11"
                        label="Explain your answer"
                        type="text"
                        :rules="additionalRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="disabled" color="primary" @click="saveRecord11()">
                  <v-icon left v-if="!loading">save</v-icon>
                  {{ loading ? 'Processing...' : 'Save' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
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
    this.getSelfDisclosure();
  },

  data() {
    return {
      counter: 0,
      question1Title:
        "Were you ever involved in cultism or similar activities on campus while in school?",
      response1: "No",
      details1: "",
      question2Title: "Have you ever been involved in any criminal activities?",
      response2: "No",
      details2: "",
      question3Title: "Have you ever been involved in drug abuse?",
      response3: "No",
      details3: "",
      question4Title: "Have you ever been involved in prostitution?",
      response4: "No",
      details4: "",
      question5Title:
        "Have you ever been arrested for driving related offences before?",
      response5: "No",
      details5: "",
      question6Title:
        "Have you ever been arrested by the police for any offence of general misdemeanor?",
      response6: "No",
      details6: "",
      question7Title: "Have you ever jumped bail before?",
      response7: "No",
      details7: "",
      question8Title:
        "Have you ever been conveicted in any law court and sentenced to prison?",
      response8: "No",
      details8: "",
      question9Title:
        "Have you ever served as a guarantor for any person (dead or living) before?",
      response9: "No",
      details9: "",
      question10Title:
        "Are there any conflicts of interests that may affect your employment with ICMS?",
      response10: "No",
      details10: "",
      question11Title:
        "Do you have your immediate or distant family member/blood relations employed in or working for  ICMS in the last 5 years?",
      response11: "No",
      details11: "",

      isEditing: false,
      worksHere: false,
      sdmodal: false,
      edmodal: false,
      disabled: false,
      loading: false,
      error: false,
      errors: {},
      statuses: ["Yes", "No"],
      response: "",
      statusRules: [v => !!v || "Your answer is required"],
      additionalRules: [v => !!v || "Additional detail is required"],
      qt1: this.$root.qt1,
      qt2: this.$root.qt2,
      qt3: this.$root.qt3,
      qt4: this.$root.qt4,
      qt5: this.$root.qt5,
      qt6: this.$root.qt6,
      qt7: this.$root.qt7,
      qt8: this.$root.qt8,
      qt9: this.$root.qt9,
      qt10: this.$root.qt10,
      qt11: this.$root.qt11,
    };
  },

  computed: {
    fsds() {
      return this.$root.curusersd;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getSelfDisclosure() {
      Axios.get(
        `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`
      )
        .then(response => {
          if (response.data.data.length != 0) {
            this.$root.curusersd = response.data.data;
            localStorage.setItem(
              "curusersd",
              JSON.stringify(response.data.data)
            );
          } else {
            console.log("b");
            this.$root.curusersd = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curusersd");
        });
    },

    saveRecord1() {
      if (this.$refs.saveForm1.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question1Title,
            your_response: this.response1,
            additional_details: this.details1
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm1.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt1 = "Saved";
            localStorage.setItem("qt1", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord2() {
      if (this.$refs.saveForm2.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question2Title,
            your_response: this.response2,
            additional_details: this.details2
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm2.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt2 = "Saved";
            localStorage.setItem("qt2", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord3() {
      if (this.$refs.saveForm3.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question3Title,
            your_response: this.response3,
            additional_details: this.details3
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm3.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt3 = "Saved";
            localStorage.setItem("qt3", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord4() {
      if (this.$refs.saveForm4.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question4Title,
            your_response: this.response4,
            additional_details: this.details4
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm4.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt4 = "Saved";
            localStorage.setItem("qt4", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord5() {
      if (this.$refs.saveForm5.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question5Title,
            your_response: this.response5,
            additional_details: this.details5
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm5.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt5 = "Saved";
            localStorage.setItem("qt5", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord6() {
      if (this.$refs.saveForm6.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question6Title,
            your_response: this.response6,
            additional_details: this.details6
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm6.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt6 = "Saved";
            localStorage.setItem("qt6", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord7() {
      if (this.$refs.saveForm7.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question7Title,
            your_response: this.response7,
            additional_details: this.details7
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm7.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt7 = "Saved";
            localStorage.setItem("qt7", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord8() {
      if (this.$refs.saveForm8.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question8Title,
            your_response: this.response8,
            additional_details: this.details8
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm8.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt8 = "Saved";
            localStorage.setItem("qt8", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord9() {
      if (this.$refs.saveForm9.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question9Title,
            your_response: this.response9,
            additional_details: this.details9
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm9.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt9 = "Saved";
            localStorage.setItem("qt9", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord10() {
      if (this.$refs.saveForm10.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question10Title,
            your_response: this.response10,
            additional_details: this.details10
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm10.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt10 = "Saved";
            localStorage.setItem("qt10", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    saveRecord11() {
      if (this.$refs.saveForm11.validate()) {
        this.loading = true;
        this.disabled = true;
        Axios.post(
          `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures`,
          {
            user_id: this.$root.curuser.id,
            description: this.question11Title,
            your_response: this.response11,
            additional_details: this.details11
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.$refs.saveForm11.reset();
            this.loading = false;
            this.$noty.success("Data Successfully Saved.");
            console.log(response.data);
            this.$root.qt11 = "Saved";
            localStorage.setItem("qt11", "Saved");
            this.getSelfDisclosure();
            setTimeout(() => location.reload(), 2000);
          })
          .catch(({ response }) => {
            console.log(response.data);
            this.loading = false;
            this.disabled = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },

    // deleteRecord1(id) {
    //   if (id) {
    //     this.deleting = true;
    //     Axios.delete(
    //       `${config.apiUrl}/users/${this.$root.curuser.id}/fullselfdisclosures/${id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${this.$root.auth.access_token}`
    //         }
    //       }
    //     )
    //       .then(response => {
    //         this.deleting = false;
    //         this.$noty.success("Employment History Successfully Deleted.");
    //         console.log(response.data);
    //         localStorage.removeItem("qt1");
    //         this.$root.qt1 = {};
    //         this.getSelfDisclosure();
    //         setTimeout(() => location.reload(), 2000);
    //       })
    //       .catch(({ response }) => {
    //         console.log(response.data);
    //         this.deleting = false;
    //         this.$noty.error(`Update failed ${response.data.message}`);
    //       });
    //   }
    // }

  }
};
</script>

<style>
</style>
