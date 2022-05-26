<template>
  <v-container fluid class="pa-0">
    <p-header :height="$vuetify.breakpoint.xsOnly ? 290 : 260" pcard :color="'transparent'" :styles="'pt-6'">
      <v-row justify="center" no-gutters>
        <!--########################### Profile Avatar and Notification ###########################-->
        <v-col cols="12" class="d-flex  pa-0">
          <p-profile :name="'Whyte Peter'" :username="'whytepeter'" :link="'/dashboard/account'" :photo="'/team/whyte.jpg'" />
          <v-spacer />
          <p-notification style="z-index:3" />
        </v-col>
        <!-- ########################### Pelf Wallet ###########################-->

        <v-col cols="12" class="pa-0 mt-n4 mt-md-n8 ">
          <p-wallet :name="'My Wallet'" :amount="user && user.Wallet.balance" :icon="'mdi-wallet'" :buttons="buttons" />
        </v-col>
      </v-row>
    </p-header>
    <v-row v-if="user && user.Account && !user.Account.bvnVerified" class="ma-0" justify="center">
      <v-col cols="12" md="11" class="pa-0">
        <p-banner :banner="banner" />
      </v-col>
    </v-row>
    <v-row justify="center" class="px-md-10 mb-16 ma-0">
      <v-col cols="12" md="4" class="d-block d-md-none">
        <!-- Mobile display of the pelf account number -->
        <p-container :border="false" :title="'Account Numner'">
          <p-account :acc-name="'Peter Emmanuel Whyte'" :bank="'Wema Bank'" :acc-number="7820765461" />
        </p-container>
      </v-col>
      <v-col cols="12" md="8">
        <p-transaction />
      </v-col>
      <v-col cols="12" md="4" class="d-none d-md-block">
        <!-- Desktop display of the pelf account number -->
        <p-container :border="false" :title="'Account Numner'">
          <p-account :acc-name="'Peter Emmanuel Whyte'" :bank="'Wema Bank'" :acc-number="7820765461" />
        </p-container>
      </v-col>
    </v-row>
    <p-alert />
    <p-fund-wallet :drawer="drawer.fundWallet" :toggle="toggleFundWallet" />
    <p-transfer :drawer="drawer.transfer" :toggle="toggleTransfer" />
    <p-withdraw-funds :drawer="drawer.withdraw" :toggle="toggleWithdraw" />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import pHeader from '~/components/other/pHeader.vue'
import PNotification from '~/components/other/pNotification.vue'
import PProfile from '~/components/user/pProfile.vue'
import PTransaction from '~/components/other/pTransaction.vue'
import PAccount from '~/components/user/pAccount.vue'
import PContainer from '~/components/other/pContainer.vue'
import PBanner from '~/components/other/pBanner.vue'
import PWallet from '~/components/other/pWallet.vue'
import PAlert from '~/components/other/pAlert.vue'
import PFundWallet from '~/components/user/fundWallet/pFundWallet.vue'
import PTransfer from '~/components/user/pTransfer/pTransferFunds.vue'
import PWithdrawFunds from '~/components/user/pWithdrawFunds.vue'
export default {
  name: 'Home',
  components: { pHeader, PProfile, PNotification, PTransaction, PAccount, PContainer, PBanner, PWallet, PAlert, PFundWallet, PTransfer, PWithdrawFunds },
  layout: 'dashboard',

  data: () => ({
    drawer: {
      fundWallet: false,
      transfer: false,
      withdraw: false
    },
    banner: {
      is: true,
      type: 'error',
      title: 'No BBMPCS Account Number!',
      message: 'You have no BVN connected to your Pelf account. Please add your BVN to get your Pelf account number.'
    }
  }),
  computed: {
    ...mapGetters({ user: 'authentication/getUser' }),
    buttons () {
      return [
        {
          name: 'Fund Wallet',
          icon: 'mdi-plus',

          action: () => {
            this.toggleFundWallet(true)
          }
        },
        {
          name: 'Transfer',
          icon: 'mdi-share',

          action: () => {
            this.toggleTransfer(true)
          }
        },
        {
          name: 'Withdraw',
          icon: 'mdi-bank',

          action: () => {
            this.toggleWithdraw(true)
          }
        }
      ]
    }
  },
  methods: {
    ...mapMutations({ setState: 'controller/setState' }),
    toggleFundWallet (state) {
      this.drawer.fundWallet = state
    },
    toggleTransfer (state) {
      this.drawer.transfer = state
    },
    toggleWithdraw (state) {
      this.drawer.withdraw = state
    }
  }

}
</script>

<style>

</style>
