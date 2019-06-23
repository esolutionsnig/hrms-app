<template>
  <div class="dashboard">
    <h2 class="grey--text primary--text text-uppercase display-1">Dashboard Page</h2>
    <h4 class="subheading">An overview of your activities on this portal</h4>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card class="mx-auto purple lighten-1 white--text">
            <v-card-title>
              <v-icon
                :color="checking ? 'red lighten-2' : 'indigo'"
                class="mr-5"
                size="64"
                @click="takePulse"
              >mdi-heart-pulse</v-icon>
              <v-layout column align-start>
                <div class="caption white--text text-uppercase">Heart rate</div>
                <div>
                  <span class="display-2 font-weight-black" v-text="avg || '—'"></span>
                  <strong v-if="avg">BPM</strong>
                </div>
              </v-layout>

              <v-spacer></v-spacer>

              <v-btn icon class="align-self-start white--text">
                <v-icon size="66">span</v-icon>
              </v-btn>
            </v-card-title>

            <v-sheet color="transparent">
              <v-sparkline
                :key="String(avg)"
                :smooth="16"
                :gradient="['#f72047', '#ffd200', '#1feaea']"
                :line-width="3"
                :value="heartbeats"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-card class="mx-auto orange darken-3 white--text">
            <v-layout justify-space-between>
              <v-flex xs8>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Lunch Breaks</div>
                    <div>Monday - Friday</div>
                    <div>12:30 - 1:30 PM</div>
                  </div>
                </v-card-title>
              </v-flex>
              <div class="ma-4 pa4">
                <v-icon size="66" color="white">fastfood</v-icon>
              </div>
            </v-layout>
            <v-divider dark></v-divider>
            <v-card-actions class="pa-3">
              Ratings by staff
              <v-spacer></v-spacer>
              <span class="grey--text text--lighten-2 caption mr-2">({{ rating }})</span>
              <v-rating
                v-model="rating"
                background-color="white"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="18"
              ></v-rating>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-card class="mx-auto teal white--text">
            <v-layout justify-space-between>
              <v-flex xs8>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">Social Networking</div>
                    <div>Last Saturday Of Each Quarter</div>
                    <div>4:00 - 10:00 PM</div>
                  </div>
                </v-card-title>
              </v-flex>
              <div class="ma-4 pa4">
                <v-icon size="66" color="white">people</v-icon>
              </div>
            </v-layout>
            <v-divider dark></v-divider>
            <v-card-actions class="pa-3">
              Raings by staff
              <v-spacer></v-spacer>
              <span class="grey--text text--lighten-2 caption mr-2">({{ rating }})</span>
              <v-rating
                v-model="rating"
                background-color="white"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="18"
              ></v-rating>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md4 v-for="carditem in carditems"
          :key="carditem.title">
          <v-card>
            <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ carditem.title }}</h3>
                <div>{{ carditem.jd }}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="primary">Share</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary">Apply</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const exhale = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  data: () => ({
    checking: false,
    heartbeats: [],
    carditems: [
      {
        title: "Python Developer",
        jd: "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
      },
      {
        title: "VueJs Front-End Developer",
        jd: "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
      },
      {
        title: "Java & Swift Developer",
        jd: "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
      }
    ],
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ],
    rating: 4.3
  }),

  computed: {
    avg() {
      const sum = this.heartbeats.reduce((acc, cur) => acc + cur, 0);
      const length = this.heartbeats.length;

      if (!sum && !length) return 0;

      return Math.ceil(sum / length);
    }
  },

  created() {
    this.takePulse(false);
  },

  methods: {
    heartbeat() {
      return Math.ceil(Math.random() * (120 - 80) + 80);
    },
    async takePulse(inhale = true) {
      this.checking = true;

      inhale && (await exhale(1000));

      this.heartbeats = Array.from({ length: 20 }, this.heartbeat);

      this.checking = false;
    }
  }
};
</script>
