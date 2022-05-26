<template>
  <v-container fluid class="pa-0">
    <p-header :height="130" pcard :color="'transparent'" :classes="'pt-16'">
      <v-row justify="center" no-gutters>
        <!--########################### Profile Avatar and Notification ###########################-->
        <v-col cols="12" class="d-flex  pa-0 mt-6">
          <p-profile :name="'Whyte Peter'" :username="'whytepeter'" :link="'/dashboard/account'" :photo="'/team/whyte.jpg'" />
          <v-spacer />
          <p-notification style="z-index:3" />
        </v-col>
        <!-- ########################### Pelf Wallet ###########################-->
      </v-row>
    </p-header>

    <v-row no-gutters class="ma-0 ">
      <v-col cols="12" md="9" class="pa-0">
        <v-row class="ma-0">
          <v-col cols="12" class="pa-0">
            <p-banner :banner="banner" />
          </v-col>
          <v-col cols="12" class="pa-0">
            <p-scroll>
              <p-wallet-cards
                v-for="(wallet, i) in wallets"
                :key="i"
                :loading="false"
                :color="wallet.color"
                :icon="wallet.icon"
                :amount="wallet.amount"
                :to="wallet.to"
                :name="wallet.name"
                :button="wallet.button"
              />
            </p-scroll>
          </v-col>
          <v-col cols="12" class="mt-6 mb-2 mt-sm-8 py-0 px-sm-4">
            <span class="text-subtitle-2 font-weight-light text-uppercase">
              Recommended for you
            </span>
          </v-col>
          <v-col cols="12" class="mb-2">
            <p-showcase />
          </v-col>
          <v-col cols="12" class="mt-6 mb-2 py-0 px-sm-4">
            <span class="text-subtitle-2 font-weight-light text-uppercase">
              Featured Investments
            </span>
          </v-col>

          <v-col cols="12" class="mb-2">
            <p-featured-investments />
          </v-col>
        </v-row>
      </v-col>

      <!-- Quick Actions on the right side pannel -->
      <v-col cols="12" md="3" :class="$vuetify.breakpoint.mdAndUp ?'grey lighten-4':''" class="pa-2 ">
        <v-card :height="$vuetify.breakpoint.mdAndUp ? '100%' : 'auto' " tile flat class="pa-0 transparent">
          <v-card-text class="pa-0">
            <v-row class="ma-0">
              <p-container :style="$vuetify.breakpoint.mdAndUp ? 'height:100vh' : 'height: auto'" divider tile :border="false" :title="'Quick Actions'">
                <p-icon-card
                  v-for="(action, i) in actions"
                  :key="i"
                  :styles="'py-3 px-1'"
                  outline
                  :size="26"
                  :action="action.action"
                  :title="action.title"
                  :icon="action.icon"
                  class="mb-4"
                />
              </p-container>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import PBanner from '~/components/other/pBanner.vue'
import PContainer from '~/components/other/pContainer.vue'
import pHeader from '~/components/other/pHeader.vue'
import PIconCard from '~/components/other/pIconCard.vue'
import PNotification from '~/components/other/pNotification.vue'
import PScroll from '~/components/other/pScroll.vue'
import PWalletCards from '~/components/other/pWalletCards.vue'
import PProfile from '~/components/user/pProfile.vue'
import PShowcase from '~/components/other/pShowcase.vue'
import PFeaturedInvestments from '~/components/investments/pFeaturedInvestments.vue'
export default {
  name: 'Dashboard',
  components: { pHeader, PProfile, PNotification, PWalletCards, PScroll, PBanner, PContainer, PIconCard, PShowcase, PFeaturedInvestments },
  layout: 'dashboard',
  filters: {
    currency (val) {
      if (val) {
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
    banner: {
      is: true,
      type: 'error',
      title: 'No BBMPCS Account Number!',
      message: 'You have no BVN connected to your Pelf account. Please add your BVN to get your Pelf account number.'
    }

  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),

    wallets () {
      return [
        {
          name: 'My Wallet',
          icon: 'mdi-wallet',
          amount: this.user && this.user.Wallet.balance,
          color: 'purple',
          to: '/dashboard/wallet'
          // button: {
          //   is: true,
          //   text: 'Fund Wallet',
          //   icon: 'mdi-plus',
          //   action: () => {
          //     alert(`This is ${this.wallets[0].name}`)
          //   }
          // }
        },
        {
          name: 'Savings',
          icon: 'mdi-piggy-bank',
          amount: this.user && this.user.Savings,
          color: 'green',
          to: '/dashboard/savings'
        },
        {
          name: 'Investments',
          icon: 'mdi-finance',
          amount: 0,
          color: 'black',
          to: '/dashboard/investments'
        }
      ]
    },

    actions () {
      return [
        {
          title: 'Purchase A GrowthFund',
          icon: 'mdi-finance',
          action: () => {
            this.initAlert({
              is: true,
              type: 'info',
              message: 'Purchase an Investment'
            })
          }
        },
        {
          title: 'Start a Savings Plan',
          icon: 'mdi-piggy-bank',
          action: () => {
            this.initAlert({
              is: true,
              type: 'info',
              message: 'Start a Savings Plan'
            })
          }
        },
        {
          title: 'Update Profile Info',
          icon: 'mdi-account-check',
          action: () => {
            this.initAlert({
              is: true,
              type: 'info',
              message: 'Update Profile Info'
            })
          }
        },
        {
          title: 'Refer & Earn',
          icon: 'mdi-gift-open',
          action: () => {
            this.initAlert({
              is: true,
              type: 'info',
              message: 'Refer & Earn'
            })
          }
        }
      ]
    }
  },

  methods: {
    ...mapActions({ initAlert: 'controller/initAlert' })
  }

}
</script>

<style>

</style>
