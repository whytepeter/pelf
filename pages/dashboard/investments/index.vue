<template>
  <v-container fluid class="pa-0">
    <p-header :height="$vuetify.breakpoint.xsOnly ? 290 : 260" pcard :color="'black'" :styles="'pt-6'">
      <v-row justify="center" no-gutters>
        <!--########################### Profile Avatar and Notification ###########################-->
        <v-col cols="12" class="d-flex  pa-0">
          <p-profile :name="'Whyte Peter'" :username="'whytepeter'" :link="'/dashboard/account'" :photo="'/team/whyte.jpg'" />
          <v-spacer />
          <p-notification style="z-index:3" />
        </v-col>
        <!-- ########################### Pelf Wallet ###########################-->

        <v-col cols="12" class="pa-0 mt-n4 mt-md-n8 ">
          <p-wallet :name="'Investments'" :amount="user && user.Savings" :icon="'mdi-finance'" :buttons="buttons" />
        </v-col>
      </v-row>
    </p-header>
    <v-row justify="center" no-gutters class="ma-0">
      <v-col cols="12" md="10" class="pa-0">
        <v-card tile flat>
          <v-card-text class="pa-0">
            <v-tabs
              v-model="tab"
              fixed-tabs
              icons-and-text
              color="secondary"
              class=""
            >
              <v-tabs-slider />

              <v-tab v-for="(item, i) in tabItems" :key="i" :href="`#${item.slug}`">
                <span>{{ $vuetify.breakpoint.xsOnly ? item.short : item.name }}</span>
                <v-icon>{{ item.icon }}</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="(item, i) in tabItems"
                :key="i"
                :value="item.slug"
              >
                <component :is="item.slug" />
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Expired from '~/components/investments/expired.vue'
import Explore from '~/components/investments/explore.vue'
import My from '~/components/investments/my.vue'
import pHeader from '~/components/other/pHeader.vue'
import PNotification from '~/components/other/pNotification.vue'
import PWallet from '~/components/other/pWallet.vue'
import PProfile from '~/components/user/pProfile.vue'
export default {
  name: 'Savings',
  components: { pHeader, PWallet, PNotification, PProfile, My, Explore, Expired },
  layout: 'dashboard',
  data: () => ({
    tab: null
  }),
  computed: {
    tabItems () {
      return [
        {
          name: 'My Investments',
          short: 'Investments',
          slug: 'my',
          icon: 'mdi-finance',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Explore Investments',
          short: 'Explore',
          slug: 'explore',
          icon: 'mdi-finance',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          name: 'Expired Investments',
          short: 'Expired',
          slug: 'expired',
          icon: 'mdi-finance',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
      ]
    },
    buttons () {
      return [
        {
          name: 'Invest Now',
          icon: 'mdi-plus',
          color: 'black',

          action: () => {
            this.initAlert({
              is: true,
              type: 'info',
              message: 'Invest Now'
            })
          }
        },
        {
          name: 'Withdraw',
          icon: 'mdi-bank',
          color: 'black',

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
    ...mapActions({ initAlert: 'controller/initAlert' })
  }

}
</script>

<style>
.v-slide-group:not(.v-slide-group--has-affixes) > .v-slide-group__prev, .v-slide-group:not(.v-slide-group--has-affixes) > .v-slide-group__next {
    display: none;
}

.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right) > .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes) .v-slide-group__prev {
    display: none;
    /* display: initial; */
    /* visibility: hidden; */
}

</style>
