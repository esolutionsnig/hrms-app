<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Applicant Data Manager</h2>
    <h4 class="subheading">View and manage your applicant data</h4>

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
              >To update your data click the CREATE/UPDATE APPLICANT DATA MANAGER button</p>
              <v-list two-line>
                <v-layout row wrap>
                  <v-flex xs12 sm4>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>Surname</v-list-tile-sub-title>
                        <v-list-tile-title>{{ userData.surname }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>First Name (Given Name)</v-list-tile-sub-title>
                        <v-list-tile-title>{{ userData.firstname }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-flex>
                  <v-flex xs12 sm4>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>Other Names</v-list-tile-sub-title>
                        <v-list-tile-title>{{ userData.othernames }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-flex>
                </v-layout>
                <div v-if="adm">
                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Previous Name</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.previous_name }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm8>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Reason For Change Of Name</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.why_change_name }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Birth Data</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.birth_date }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Birth Place</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.birth_place }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Given Birth To</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.birth_date | getAge }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Nationality At Birth / Current</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.nationality }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Means Of Identification</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.id_card }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Gender</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.gender }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm8>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Physical Defects</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.physical_defects }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Region</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.region }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Tribe</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.tribe }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Tribal Chief</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.tribal_chief }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Marital Status / Kids</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.marital_status }} / {{ adm.number_of_kids }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Religion</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.religion }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>GSM Phone Number</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.phone_number }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm4>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Height / Weight</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.height }} / {{ adm.weight }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm3>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Complexion</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.complexion }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                    <v-flex xs12 sm5>
                      <v-list-tile>
                        <v-list-tile-content>
                          <v-list-tile-sub-title>Color Of Eyes / Hair</v-list-tile-sub-title>
                          <v-list-tile-title>{{ adm.color_eyes }} / {{ adm.color_hair }}</v-list-tile-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-flex>
                  </v-layout>
                </div>
              </v-list>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn color="secondary" v-if="adm.id > 0" @click="disabled = (disabled + 1) % 2">
                Update Applicant Data Manager
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn color="secondary" v-else @click="disabled = (disabled + 1) % 2">
                Create Applicant Data Manager
                <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6>
          <v-card flat>
            <v-card-text>
              <v-form ref="updateForm" @submit.prevent="updateRecord" v-if="adm.id > 0">
                <v-text-field
                  name="previous_name"
                  v-model="previous_name"
                  label="Previous Name"
                  type="text"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-text-field
                  name="why_change_name"
                  v-model="why_change_name"
                  label="Reason For Change Of Name"
                  type="text"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md4>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="birth_date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="birth_date"
                          label="Date Of Birth Picker"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="birthDateRules"
                          :disabled="disabled == 1 ? true : false"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="birth_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(birth_date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm6 md8>
                    <v-text-field
                      name="birth_place"
                      v-model="birth_place"
                      label="Birth Place"
                      type="text"
                      :rules="birthPlaceRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="nationality"
                      v-model="nationality"
                      label="Nationality at Birth - Current"
                      type="text"
                      :rules="nationalityRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="id_Card"
                      v-model="id_card"
                      label="Means of Identification"
                      type="text"
                      :rules="idCardRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm3 md3>
                    <v-select
                      name="gender"
                      :items="genders"
                      v-model="gender"
                      label="Gender"
                      :rules="genderRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm9 md9>
                    <v-text-field
                      name="physical_defects"
                      v-model="physical_defects"
                      label="Physical Defects"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="region"
                      v-model="region"
                      label="Region"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="tribe"
                      v-model="tribe"
                      label="Tribe"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-text-field
                  name="tribal_chief"
                  v-model="tribal_chief"
                  label="Tribal Cheif"
                  type="text"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-layout row wrap>
                  <v-flex xs12 sm3 md3>
                    <v-select
                      name="marital_status"
                      :items="maritalstatus"
                      v-model="marital_status"
                      label="Marital Status"
                      :rules="maritalStatusRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm3 md3>
                    <v-text-field
                      name="number_of_kids"
                      v-model="number_of_kids"
                      label="Number of Kids"
                      type="text"
                      :rules="numberOfKidsRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-autocomplete
                      v-model="religion"
                      :items="religions"
                      hide-no-data
                      hide-selected
                      label="Your Religion"
                      placeholder="Start typing to Search"
                      :rules="religionRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-autocomplete>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="phone_number"
                      v-model="phone_number"
                      label="Phone Number"
                      type="text"
                      :rules="phoneNumberRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="height"
                      v-model="height"
                      label="Height"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="weight"
                      v-model="weight"
                      label="Weight"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="complexion"
                      v-model="complexion"
                      label="Complexion"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="color_eyes"
                      v-model="color_eyes"
                      label="Color Of Eyes"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="color_hair"
                      v-model="color_hair"
                      label="Color Of Hair"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
              <v-form ref="saveForm" @submit.prevent="saveRecord" v-else>
                <v-text-field
                  name="previous_name"
                  v-model="previous_name"
                  label="Previous Name"
                  type="text"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-text-field
                  name="why_change_name"
                  v-model="why_change_name"
                  label="Reason For Change Of Name"
                  type="text"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md4>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="birth_date"
                      persistent
                      lazy
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="birth_date"
                          label="Date Of Birth Picker"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :rules="birthDateRules"
                          :disabled="disabled == 1 ? true : false"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="birth_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(birth_date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12 sm6 md8>
                    <v-text-field
                      name="birth_place"
                      v-model="birth_place"
                      label="Birth Place"
                      type="text"
                      :rules="birthPlaceRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="nationality"
                      v-model="nationality"
                      label="Nationality at Birth - Current"
                      type="text"
                      :rules="nationalityRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="id_Card"
                      v-model="id_card"
                      label="Means of Identification"
                      type="text"
                      :rules="idCardRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm3 md3>
                    <v-select
                      name="gender"
                      :items="genders"
                      v-model="gender"
                      label="Gender"
                      :rules="genderRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm9 md9>
                    <v-text-field
                      name="physical_defects"
                      v-model="physical_defects"
                      label="Physical Defects"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="region"
                      v-model="region"
                      label="Region"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      name="tribe"
                      v-model="tribe"
                      label="Tribe"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-text-field
                  name="tribal_chief"
                  v-model="tribal_chief"
                  label="Tribal Cheif"
                  type="text"
                  :disabled="disabled == 1 ? true : false"
                ></v-text-field>

                <v-layout row wrap>
                  <v-flex xs12 sm3 md3>
                    <v-select
                      name="marital_status"
                      :items="maritalstatus"
                      v-model="marital_status"
                      label="Marital Status"
                      :rules="maritalStatusRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm3 md3>
                    <v-text-field
                      name="number_of_kids"
                      v-model="number_of_kids"
                      label="Number of Kids"
                      type="text"
                      :rules="numberOfKidsRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-autocomplete
                      v-model="religion"
                      :items="religions"
                      hide-no-data
                      hide-selected
                      label="Your Religion"
                      placeholder="Start typing to Search"
                      :rules="religionRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-autocomplete>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="phone_number"
                      v-model="phone_number"
                      label="Phone Number"
                      type="text"
                      :rules="phoneNumberRules"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="height"
                      v-model="height"
                      label="Height"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="weight"
                      v-model="weight"
                      label="Weight"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-spacer></v-spacer>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="complexion"
                      v-model="complexion"
                      label="Complexion"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="color_eyes"
                      v-model="color_eyes"
                      label="Color Of Eyes"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm4 md4>
                    <v-text-field
                      name="color_hair"
                      v-model="color_hair"
                      label="Color Of Hair"
                      type="text"
                      :disabled="disabled == 1 ? true : false"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card-text>
            <v-card-actions class="blue-grey lighten-4">
              <v-spacer></v-spacer>
              <v-btn :disabled="disabled == 1 ? true : false" color="primary" @click="updateRecord()" v-if="adm.id > 0">
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
    this.getApplicantDataManagers();
  },

  data() {
    return {
      adms: {},
      religions: [
        "Christianity",
        "Islam",
        "Catholicism",
        "Hinduism",
        "Agnosticism",
        "Buddhism",
        "Atheism",
        "Anglicanism",
        "Sikhism",
        "Seventh-Day Adventists",
        "Latter Day Saint Movement",
        "Judaism"
      ],
      genders: ["Male", "Female", "Trans Gender", "Others"],
      maritalstatus: ["Single", "Married", "Divorced"],
      modal: false,
      disabled: 1,
      loading: false,
      error: false,
      errors: {},
      adm_id: this.$root.curuseradm.id,
      previous_name: this.$root.curuseradm.previous_name,
      why_change_name: this.$root.curuseradm.why_change_name,
      birth_date: this.$root.curuseradm.birth_date,
      birth_place: this.$root.curuseradm.birth_place,
      nationality: this.$root.curuseradm.nationality,
      id_card: this.$root.curuseradm.id_card,
      gender: this.$root.curuseradm.gender,
      physical_defects: this.$root.curuseradm.physical_defects,
      region: this.$root.curuseradm.region,
      tribe: this.$root.curuseradm.tribe,
      tribal_chief: this.$root.curuseradm.tribal_chief,
      marital_status: this.$root.curuseradm.marital_status,
      number_of_kids: this.$root.curuseradm.number_of_kids,
      phone_number: this.$root.curuseradm.phone_number,
      height: this.$root.curuseradm.height,
      weight: this.$root.curuseradm.weight,
      religion: this.$root.curuseradm.religion,
      complexion: this.$root.curuseradm.complexion,
      color_eyes: this.$root.curuseradm.color_eyes,
      color_hair: this.$root.curuseradm.color_hair,
      response: "",
      birthDateRules: [v => !!v || "Birth date is required"],
      birthPlaceRules: [v => !!v || "Birth place is required"],
      nationalityRules: [v => !!v || "Nationality is required"],
      idCardRules: [v => !!v || "Means of identification is required"],
      genderRules: [v => !!v || "Gender is required"],
      maritalStatusRules: [v => !!v || "Marital status is required"],
      numberOfKidsRules: [v => !!v || "Number of kids is required"],
      religionRules: [v => !!v || "Religion is required"],
      phoneNumberRules: [v => !!v || "Phone number is required"]
    };
  },

  computed: {
    userData() {
      return this.$root.curuser;
    },
    adm() {
      return this.$root.curuseradm;
    }
  },

  methods: {
    // Get Applicant Data From Api
    getApplicantDataManagers() {
      Axios.get(
        `${config.apiUrl}/users/${this.$root.curuser.id}/applicantdatamanagers`
      )
        .then(response => {
          if (response.data.data.length != 0) {
            console.log("g");
            this.$root.curuseradm = response.data.data[0];
            localStorage.setItem(
              "curuseradm",
              JSON.stringify(response.data.data[0])
            );
          } else {
            console.log("b");
            this.$root.curuseradm = {};
          }
        })
        .catch(response => {
          console.log(response.data);
          localStorage.removeItem("curuseradm");
        });
    },

    updateRecord() {
      if (this.$refs.updateForm.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/users/${this.$root.curuser.id}/applicantdatamanagers/${this.$root.curuseradm.id}`,
          {
            previous_name: this.previous_name,
            why_change_name: this.why_change_name,
            birth_date: this.birth_date,
            birth_place: this.birth_place,
            nationality: this.nationality,
            id_card: this.id_card,
            gender: this.gender,
            physical_defects: this.physical_defects,
            region: this.region,
            tribr: this.tribe,
            tribal_chief: this.tribal_chief,
            marital_status: this.marital_status,
            number_of_kids: this.number_of_kids,
            religion: this.religion,
            phone_number: this.phone_number,
            height: this.height,
            weight: this.weight,
            complexion: this.complexion,
            color_eyes: this.color_eyes,
            color_hair: this.color_hair
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("Data Manager Successfully Updated.");
            console.log(response.data);
            this.getApplicantDataManagers()
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
          `${config.apiUrl}/users/${this.$root.curuser.id}/applicantdatamanagers`,
          {
            user_id: this.$root.curuser.id,
            previous_name: this.previous_name,
            why_change_name: this.why_change_name,
            birth_date: this.birth_date,
            birth_place: this.birth_place,
            nationality: this.nationality,
            id_card: this.id_card,
            gender: this.gender,
            physical_defects: this.physical_defects,
            region: this.region,
            tribr: this.tribe,
            tribal_chief: this.tribal_chief,
            marital_status: this.marital_status,
            number_of_kids: this.number_of_kids,
            religion: this.religion,
            phone_number: this.phone_number,
            height: this.height,
            weight: this.weight,
            complexion: this.complexion,
            color_eyes: this.color_eyes,
            color_hair: this.color_hair
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$noty.success("Data Manager Successfully Created.");
            console.log(response.data);
            this.getApplicantDataManagers()
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
