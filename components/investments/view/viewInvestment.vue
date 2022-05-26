<template>
  <p-side-bar :divided="false" :loading="loading" :drawer="drawer" :toggle="toggle">
    <template v-slot:header>
      <div class="text-subtitle-2 secondary--text">
        {{ details && details.status }} Investment
      </div>
    </template>
    <v-row v-if="!next" no-gutters class="ma-0">
      <v-col cols="12" class="pa-0">
        <v-card flat color="secondary" class="mt-2">
          <v-card-text>
            <v-row no-gutters class="ma-0">
              <v-col cols="12" class="text-center">
                <v-icon color="white" large left>
                  mdi-bullseye-arrow
                </v-icon>
                <div class="text-subtitle-1 white--text">
                  {{ details && details.name }}
                </div>
              </v-col>

              <v-col cols="12" class="d-flex flex-column pa-0 mb-n2 mt-2">
                <div class="d-flex align-center my-1 text-subtitle-1 text-md-h6  font-weight-medium white--text">
                  <span>
                    Growth Fund
                  </span>
                  <v-spacer />
                  <span class="text-caption">Brass & Books MPCS</span>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card flat>
          <v-card-text class="px-0">
            <v-row no-gutters class="ma-0">
              <v-col v-if="view" cols="5" class="d-flex flex-column text-center">
                <div class="text-caption text1--text">
                  Min Amount
                </div>
                <div class="text3--text font-weight-medium text-subtitle-2 text-sm-subtitle-1">
                  {{ 5300000 | currency }}
                </div>
              </v-col>
              <v-col v-if="view" cols="4" class="d-flex flex-column text-center">
                <div class="text-caption text1--text">
                  Max Amount
                </div>
                <div class="text3--text font-weight-medium text-subtitle-2 text-sm-subtitle-1">
                  {{ 5300000 | currency }}
                </div>
              </v-col>
              <v-col v-if="!view" cols="5" class="d-flex flex-column text-center">
                <div class="text-caption text1--text">
                  Principal
                </div>
                <div class="text3--text font-weight-medium text-subtitle-2 text-sm-subtitle-1">
                  {{ 5300000 | currency }}
                </div>
              </v-col>
              <v-col v-if="!view" cols="4" class="d-flex flex-column text-center">
                <div class="text-caption text1--text">
                  Dividend
                </div>
                <div class="text3--text font-weight-medium text-subtitle-2 text-sm-subtitle-1">
                  {{ 50000 | currency }}
                </div>
              </v-col>
              <v-col cols="3" class="d-flex flex-column text-center">
                <div class="text-caption text1--text">
                  Interest/Annum
                </div>
                <div class="success--text font-weight-medium text-subtitle-2 text-sm-subtitle-1">
                  48%
                </div>
              </v-col>

              <v-col cols="12" class="pa-2">
                <v-divider class="my-1" />
              </v-col>
              <v-col cols="12" class="pa-2 mb-2">
                <div class="text3--text font-weight-bold d-flex">
                  About this Opportunity
                  <v-spacer />
                  <v-icon @click="show = !show">
                    {{ show ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
                  </v-icon>
                </div>
                <div v-show="show" class=" text1--text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem eos eius laudantium aliquam accusamus enim harum animi dolore optio, sed est consectetur et veniam sequi aliquid hic, modi magnam fugiat.
                </div>
              </v-col>
              <v-col v-if="!view" cols="12" class="pa-2 mb-2">
                <v-card outlined @click="loading = !loading">
                  <v-card-text class="d-flex align-center py-1">
                    Investment Certificate
                    <v-spacer />
                    <v-btn depressed :loading="loading" color="secondary" icon>
                      <v-icon>
                        mdi-file
                      </v-icon>
                    </v-btn>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col v-if="!view" cols="12" class="py-2">
                <v-row class="ma-0">
                  <v-col cols="6" class="pa-1">
                    <p-lil-card :name="'Effective Date'" :withdrawal-date="'21 March, 2021'" :type="'date'" />
                  </v-col>
                  <v-col cols="6" class="pa-1">
                    <p-lil-card :name="'Expiry Date'" :withdrawal-date="'21 August, 2021'" :type="'date'" />
                  </v-col>
                </v-row>
              </v-col>
              <v-col v-if="view" cols="12" class="px-2 mt-4">
                <div class="text-center text-caption my-1">
                  Tap the button below to perform action.
                </div>
                <v-btn block depressed color="secondary" class="text-subtitle-2 font-weight-normal" @click="next = true">
                  Invest Now
                </v-btn>
              </v-col>

              <v-col cols="12" class="pa-2">
                <v-divider class="my-2" />
              </v-col>
              <v-col v-if="!view" cols="12" class="py-2 px-0 mb-2">
                <div class="text3--text font-weight-bold d-flex">
                  Payment Schedule
                  <v-spacer />
                  <v-icon @click="show2 = !show2">
                    {{ show2 ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
                  </v-icon>
                </div>
                <v-row v-show="show2" class="ma-0 text1--text">
                  <v-col cols="4" class="text-caption font-weight-medium pa-2">
                    Dividend
                  </v-col>
                  <v-col cols="2" class="text-caption font-weight-medium pa-2">
                    Day
                  </v-col>
                  <v-col cols="3" class="text-caption font-weight-medium pa-2">
                    Months
                  </v-col>
                  <v-col cols="3" class="text-caption font-weight-medium pa-2">
                    Status
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-divider class="mb-2" />
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-row class="ma-0">
                      <v-col cols="4" class=" pa-2">
                        {{ 53000 | currency }}
                      </v-col>
                      <v-col cols="2" class=" pa-2">
                        5th
                      </v-col>
                      <v-col cols="3" class=" pa-2">
                        August
                      </v-col>
                      <v-col cols="3" class=" pa-2">
                        <v-chip small class="success">
                          <span class="text-caption">
                            Paid
                          </span>
                        </v-chip>
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <v-divider class="" />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="pa-0">
                    <v-row class="ma-0">
                      <v-col cols="4" class=" pa-2">
                        {{ 53000 | currency }}
                      </v-col>
                      <v-col cols="2" class=" pa-2">
                        5th
                      </v-col>
                      <v-col cols="3" class=" pa-2">
                        September
                      </v-col>
                      <v-col cols="3" class=" pa-2">
                        <v-chip small class="accent">
                          <span class="text-caption">
                            Pending
                          </span>
                        </v-chip>
                      </v-col>
                      <v-col cols="12" class="pa-0">
                        <v-divider class="" />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <investnow v-else :toggle="toggleNext" />
  </p-side-bar>
</template>

<script>

import PSideBar from '../../other/pSideBar.vue'
import Investnow from './investnow.vue'
import PLilCard from '~/components/other/pLilCard.vue'
export default {
  components: { PLilCard, PSideBar, Investnow },
  filters: {
    currency (val) {
      if (val) {
        val = parseFloat(val)
        return val.toLocaleString('en-NG', {
          style: 'currency',
          code: 'NG',
          currency: 'NGN'
        })
      } else {
      }
    }
  },
  props: {
    start: {
      type: Boolean,
      default: false
    },
    drawer: {
      type: Boolean,
      default: false
    },
    view: {
      type: Boolean,
      default: true
    },
    details: Object,
    toggle: Function
  },

  data: () => ({
    amount: 10000,
    loading: true,
    show: false,
    show2: false,
    next: false
  }),

  computed: {
    getPercent () {
      const percent = (parseInt(this.details && this.details.amountSaved && this.details && this.details.amountSaved) * 100) / parseInt(this.details && this.details.targetAmount && this.details && this.details.targetAmount)
      console.log(percent)
      return percent
    }
  },

  methods: {
    submit () {
      console.log(this.amount)
    },
    getBankImg (name) {
      return `/banks/${name}.png`
    },
    toggleNext (state) {
      this.next = state
    }
  }
}
</script>

<style>

</style>
