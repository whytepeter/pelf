<template>
  <v-container fluid class="pa-0">
    <p-header :height="$vuetify.breakpoint.xsOnly ? 290 : 260" pcard :color="'green'" :styles="'pt-6'">
      <v-row justify="center" no-gutters>
        <!--########################### Profile Avatar and Notification ###########################-->
        <v-col cols="12" class="d-flex  pa-0">
          <p-profile :name="'Whyte Peter'" :username="'whytepeter'" :link="'/dashboard/account'" :photo="'/team/whyte.jpg'" />
          <v-spacer />
          <p-notification style="z-index:3" />
        </v-col>
        <!-- ########################### Pelf Wallet ###########################-->

        <v-col cols="12" class="pa-0 mt-n4 mt-md-n8 ">
          <p-wallet :name="'Savings'" :amount="user && user.Savings" :icon="'mdi-piggy-bank'" :buttons="buttons" />
        </v-col>
      </v-row>
    </p-header>
    <v-row justify="center" class="ma-0">
      <v-col cols="12" md="10">
        <v-row class="ma-0">
          <v-col
            v-for="(card, i) in savingsCard"
            :key="i"
            cols="12"
            sm="6"
            md="4"
          >
            <p-savings-card
              :amount="card.amount"
              :icon="card.icon"
              :title="card.title"
              :description="card.description"
              :action="card.action"
              :label="card.label"
              class="mx-auto"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="10">
        <p-transaction />
      </v-col>
      <p-quick-saving :drawer="drawer" :toggle="toggle" />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import pHeader from '~/components/other/pHeader.vue'
import PNotification from '~/components/other/pNotification.vue'
import PTransaction from '~/components/other/pTransaction.vue'
import PWallet from '~/components/other/pWallet.vue'
import PQuickSaving from '~/components/savings/pQuickSaving.vue'
import PSavingsCard from '~/components/savings/pSavingsCard.vue'
import PProfile from '~/components/user/pProfile.vue'
export default {
  name: 'Savings',
  components: { pHeader, PWallet, PNotification, PProfile, PSavingsCard, PTransaction, PQuickSaving },
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
    }
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    savingsCard () {
      return [
        {
          title: 'Daily Savings',
          description: 'Save periodically, weekly, daily or monthly and earn 2.5% p.a',
          icon: 'mdi-safe-square',
          amount: 1000,
          action: () => {
            this.$router.push('/dashboard/savings/daily-savings')
          }
        },
        {
          title: 'DMI',
          description: 'Save periodically, weekly, daily or monthly and earn 2.5% p.a',
          icon: 'mdi-buffer',
          amount: 1000,
          action: () => {
            this.$router.push('/dashboard/savings/daily-micro-savings')
          }
        },
        {
          title: 'Smart Savings',
          description: 'Save periodically, weekly, daily or monthly and earn 2.5% p.a',
          icon: 'mdi-bullseye-arrow',
          amount: 1000,
          label: 2,
          action: () => {
            this.$router.push('/dashboard/savings/smart-savings')
          }
        }

      ]
    },
    buttons () {
      return [
        {
          name: 'Quick Save',
          icon: 'mdi-plus',
          color: 'green',

          action: () => {
            // this.initAlert({
            //   is: true,
            //   type: 'info',
            //   message: 'Quick Save'
            // })

            this.toggle(true)
          }
        },
        {
          name: 'Withdraw',
          icon: 'mdi-bank',
          color: 'green',

          action: () => {
            this.initAlert({
              is: true,
              type: 'info',
              message: 'Withdraw'
            })
          }
        }

      ]
    }
  },
  methods: {
    ...mapActions({ initAlert: 'controller/initAlert' }),
    toggle (state) {
      this.drawer = state
    }
  }

}
</script>

<style>

</style>
