<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Profile Page</h2>
    <h4 class="subheading">View and manage your career account with us</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-card>
            <v-img v-if="userData.avatar === 'avatar.png'" src="/avatar.png" height="300px">
              <v-layout column fill-height>
                <v-spacer></v-spacer>

                <v-card-title class="pl-5 pt-5">
                  <div class="display-1 pl-5 pt-5">{{ userData.firstname + " " + userData.surname }}</div>
                </v-card-title>
              </v-layout>
            </v-img>
            <v-img v-else :src="userData.avatar" height="300px">
              <v-layout column fill-height>
                <v-spacer></v-spacer>

                <v-card-title class="white--text pl-5 pt-5">
                  <div class="display-1 pl-5 pt-5">{{ userData.firstname + " " + userData.surname }}</div>
                </v-card-title>
              </v-layout>
            </v-img>

            <v-list two-line>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="primary">phone</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>+234 (0) 802 555 1234</v-list-tile-title>
                  <v-list-tile-sub-title>Mobile Number</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>chat</v-icon>
                </v-list-tile-action>
              </v-list-tile>

              <v-divider inset></v-divider>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="primary">mail</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ userData.email }}</v-list-tile-title>
                  <v-list-tile-sub-title>Personal Email Address</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider inset></v-divider>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon color="primary">date_range</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>{{ userData.created_at }}</v-list-tile-title>
                  <v-list-tile-sub-title>Account created on</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>

        <v-flex xs12 sm8>
          <v-tabs centered color="blue-grey lighten-4" icons-and-text>
            <v-tabs-slider color="primary"></v-tabs-slider>

            <v-tab href="#tab-1">
              Update Passport Image
              <v-icon>add_a_photo</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              Update Profile
              <v-icon>person_pin</v-icon>
            </v-tab>

            <v-tab href="#tab-3">
              Account Settings
              <v-icon>settings</v-icon>
            </v-tab>

            <v-tab-item :value="'tab-1'">
              <v-card flat>
                <v-card-text>
                  <h3>Update Passport Image</h3>
                  <p>Ensure the image file is JPG or PNG and the size should be a 400 x 400 pixels</p>
                  <picture-input
                    width="400"
                    height="400"
                    margin="16"
                    accept="image/jpeg, image/png"
                    size="5"
                    button-class="btn btn-danger"
                    @change="onChange"
                  ></picture-input>
                </v-card-text>
                <v-card-actions class="blue-grey lighten-4">
                  <v-spacer></v-spacer>
                  <v-btn :disabled="loading" color="primary" @click="uploadPassportImage()">
                    {{ loading ? 'Updating profile...' : 'Save Changes' }}
                    <v-icon right v-if="!loading">cloud_upload</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <v-tab-item :value="'tab-2'">
              <v-card flat>
                <v-card-text>
                  <h4 class="subheading my-3">Kindly fill all fields with valid data</h4>
                  <v-form ref="profileform">
                    <v-text-field
                      prepend-icon="person"
                      name="surname"
                      v-model="surname"
                      :rules="surnameRules"
                      label="Family Name"
                      type="text"
                    ></v-text-field>
                    <div class="errors ml-4" v-if="errors.surname">
                      <small
                        class="error--text"
                        :key="error"
                        v-for="error in errors.surname"
                      >{{ error }}</small>
                    </div>
                    <v-text-field
                      prepend-icon="person"
                      name="firstname"
                      v-model="firstname"
                      :rules="firstnameRules"
                      label="Given Name"
                      type="text"
                    ></v-text-field>
                    <div class="errors ml-4" v-if="errors.firstname">
                      <small
                        class="error--text"
                        :key="error"
                        v-for="error in errors.firstname"
                      >{{ error }}</small>
                    </div>
                    <v-text-field
                      prepend-icon="person"
                      name="othernames"
                      v-model="othernames"
                      :rules="othernamesRules"
                      label="Additional Name"
                      type="text"
                    ></v-text-field>
                    <div class="errors ml-4" v-if="errors.othernames">
                      <small
                        class="error--text"
                        :key="error"
                        v-for="error in errors.othernames"
                      >{{ error }}</small>
                    </div>
                  </v-form>
                </v-card-text>
                <v-card-actions class="blue-grey lighten-4">
                  <v-spacer></v-spacer>
                  <v-btn :disabled="loading" color="primary" @click="updateProfile()">
                    <v-icon left v-if="!loading">save</v-icon>
                    {{ loading ? 'Processing...' : 'Save Changes' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>

            <v-tab-item :value="'tab-3'">
              <v-card flat>
                <v-card-text>
                  <h4 class="subheading my-3">Enter your prefered password, note that you will be logged out after a successful request.</h4>
                  <v-form ref="passwordform">
                    <v-text-field
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      v-model="password"
                      :rules="passwordRules"
                      hint="At least 8 characters"
                      type="password"
                    ></v-text-field>
                    <div class="errors ml-4" v-if="errors.password">
                      <small
                        class="error--text"
                        :key="error"
                        v-for="error in errors.password"
                      >{{ error }}</small>
                    </div>
                    <v-text-field
                      prepend-icon="lock"
                      name="password_confirmation"
                      label="Confirm Password"
                      v-model="password_confirmation"
                      :rules="confirmpasswordRules"
                      hint="At least 8 characters"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="blue-grey lighten-4">
                  <v-spacer></v-spacer>
                  <v-btn :disabled="loading" color="primary" @click="changePassword()">
                    <v-icon left v-if="!loading">save</v-icon>
                    {{ loading ? 'Processing...' : 'Save Changes' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import config from "@/config";
import Axios from "axios";
import PictureInput from "vue-picture-input";
export default {
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("auth")) {
      return next({ path: "/login" });
    }
    next();
  },

  data() {
    return {
      dialog: false,
      image: null,
      loading: false,
      error: false,
      errors: {},
      surname: this.$root.curuser.surname,
      firstname: this.$root.curuser.firstname,
      othernames: this.$root.curuser.othernames,
      password: "",
      password_confirmation: "",
      response: "",
      surnameRules: [v => !!v || "Family name is required"],
      firstnameRules: [v => !!v || "Given name is required"],
      othernamesRules: [v => !!v || "Additional name is required"],
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length >= 8 || "Minimum of 8 characters required"
      ],
      confirmpasswordRules: [
        v => !!v || "Password confirmation is required",
        v => v.length >= 8 || "Minimum of 8 characters required",
        v => v === this.password || "Passwors do not match"
      ]
    };
  },

  mounted() {
    // console.log(process.env)
  },

  components: {
    PictureInput
  },

  computed: {
    userData() {
      return this.$root.curuser;
    }
  },

  methods: {
    onChange(image) {
      this.image = image;
    },
    uploadPassportImage() {
      this.loading = true;
      const form = new FormData();
      form.append("file", this.image);
      form.append("upload_preset", process.env.VUE_APP_CLOUDINARY_PRESET);
      form.append("api_key", process.env.VUE_APP_CLOUDINARY_API_KEY);

      Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
        .then(res =>
          Axios.patch(
            `${config.apiUrl}/auth/users/${this.$root.curuser.id}/avatar`,
            {
              avatar: res.data.secure_url
            },
            {
              headers: {
                Authorization: `Bearer ${this.$root.auth.access_token}`
              }
            }
          )
            .then(response => {
              this.loading = false;
              this.$root.curuser = response.data.user;
              console.log(this.$root.curuser);
              localStorage.setItem(
                "curuser",
                JSON.stringify(response.data.user)
              );
              this.$noty.success("Passport image successfully updated.");
              setTimeout(
                () =>
                  this.$router.push({
                    path: `/profile/${response.data.user.firstname}${
                      response.data.user.id
                    }`
                  }),
                2000
              );
            })
            .catch(({ response }) => {
              this.loading = false;
              this.$noty.error(`Update failed ${response.data.message}`);
            })
        )
        .catch(err => {
          this.$noty.error("Oops! Upload failed");
          console.log(err);
        });
    },
    // Update Profile Information
    updateProfile() {
      if (this.$refs.profileform.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/auth/users/${this.$root.curuser.id}/update`,
          {
            surname: this.surname,
            firstname: this.firstname,
            othernames: this.othernames
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            this.$root.curuser = response.data.user;
            console.log(this.$root.curuser);
            localStorage.setItem("curuser", JSON.stringify(response.data.user));
            this.$noty.success("Profile successfully updated.");
            setTimeout(
              () =>
                this.$router.push({
                  path: `/profile/${response.data.user.firstname}${
                    response.data.user.id
                  }`
                }),
              2000
            );
          })
          .catch(({ response }) => {
            this.loading = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    },
    // Update Profile Password
    changePassword() {
      if (this.$refs.passwordform.validate()) {
        this.loading = true;
        Axios.patch(
          `${config.apiUrl}/auth/users/${this.$root.curuser.id}/updatePassword`,
          {
            password: this.password,
            password_confirmation: this.password_confirmation
          },
          {
            headers: {
              Authorization: `Bearer ${this.$root.auth.access_token}`
            }
          }
        )
          .then(response => {
            this.loading = false;
            localStorage.clear();
            this.$noty.success("Password successfully updated.");
            setTimeout(
              () =>
                location.reload(),
              2000
            );
          })
          .catch(({ response }) => {
            this.loading = false;
            this.$noty.error(`Update failed ${response.data.message}`);
          });
      }
    }
  }
};
</script>
