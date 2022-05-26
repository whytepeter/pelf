<template>
  <v-container fluid class="pa-0">
    <p-header :height="120" pcard :color="'purple'" :classes="'pt-12'">
      <v-row justify="center" no-gutters>
        <v-col cols="12" md="11" class="d-flex flex-column mt-6 text-h6 font-weight-medium">
          <span style="z-index:5">
            <v-btn text class="px-0 text-subtitle-1" @click="goBack">
              <v-icon left>
                mdi-arrow-left
              </v-icon>
              Savings
            </v-btn>
          </span>
          <span class="white--text text-capitalize">
            {{ id | title }}
          </span>
        </v-col>
      </v-row>
    </p-header>
    <component :is="`p-${id}`" />
  </v-container>
</template>

<script>
import pHeader from '~/components/other/pHeader.vue'
import PDailyMicroSavings from '~/components/savings/pDailyMicroSavings.vue'
import PDailySavings from '~/components/savings/pDailySavings.vue'
import PSmartSavings from '~/components/savings/smartSavings/pSmartSavings.vue'

export default {
  components: { pHeader, PDailySavings, PSmartSavings, PDailyMicroSavings },
  layout: 'dashboard',
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
    },
    title (val) {
      return val.split('-').join(' ')
    }
  },
  data: () => ({
    id: ''

  }),
  computed: {
    getIcon () {
      const icons = {
        'daily-savings': 'mdi-safe-square',
        'daily-micro-savings': 'mdi-buffer',
        'smart-savings': 'mdi-bullseye-arrow'
      }
      console.log(this.id)
      return icons[this.id && this.id]
    }
  },
  created () {
    this.id = this.$route.params.id
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
