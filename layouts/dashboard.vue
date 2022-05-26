<template>
  <v-app class="grey lighten-3" style="position: relative;">
    <div>
      <v-app-bar
        fixed
        flat
        app
        dark
        elevation
        outlined
        color="transparent"
      >
        <!-- <v-app-bar-nav-icon class=" d-none d-sm-block" @click.stop="mini = !mini, drawer = true" /> -->
        <!-- <v-toolbar-items flat color="transparent white--text">
          <v-btn
            tile=""
            color=""
            class="font-weight-regular"
            text
            exact
          >
            {{ activePage }}
          </v-btn>
        </v-toolbar-items> -->
        <v-spacer />

        <!-- <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              icon
              fab
              v-on="on"
            >
              <v-icon>
                fas fa-user-circle
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item dense to="/admin/settings" @click="switchPage('Settings')">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  mdi-cog
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>

            <v-divider />
            <v-list-item dense @click="logout">
              <v-list-item-icon>
                <v-icon size="20" class="px-1">
                  fas fa-sign-out-alt
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
      </v-app-bar>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      app
      src="/bg/pattern.png"
      width="220"
      mobile-breakpoint="700"
      class="white "
    >
      <v-list-item class=" px-2 dark--text">
        <v-list-item-title class=" text-h4 font-weight-bold py-4">
          <v-img height="40" contain :src="mini ? '/logo/brass&books.png' : '/logo/brass&books2.png'" class="" />
        </v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon color="secondary">
            mdi-chevron-left
          </v-icon>
        </v-btn>
      </v-list-item>
      <v-divider />
      <v-list nav>
        <v-list-item
          v-for="link in sideLinks"
          :key="link.name"
          :to="link.route"
          exact
          link
          :active-class="`${activeColor(link.name)}--text font-weight-medium`"
          @click="switchPage(link.name)"
        >
          <v-list-item-icon>
            <v-icon>
              {{ link.icon }}
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list class="font-weight-medium">
        <v-list-item class="" @click="logout">
          <v-list-item-icon>
            <v-icon color="error">
              fas fa-sign-out-alt
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="error--text">
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <p-side-bar />

    <v-main class="openSans text2--text pb-12">
      <!-- This code alerts the user if he/she is offline -->
      <!-- <v-card v-if="$nuxt.isOffline" tile flat dark color="secondary">
        <v-card-text class="py-1">
          <v-icon

            color="white"
            size="36"
            left
          >
            mdi-wifi-strength-alert-outline
          </v-icon>
          Unable to verify your Internet connection
        </v-card-text>
      </v-card> -->
      <p-loading />
      <p-alert />
      <v-idle
        v-if="false"
        :reminders="[10]"
        :duration="10"
        @idle="onidle"
        @remind="onremind"
      />
      <v-slide-y-transition mode="out-in">
        <keep-alive>
          <nuxt />
        </keep-alive>
      </v-slide-y-transition>
    </v-main>

    <v-footer fixed class="pa-0 ">
      <v-bottom-navigation

        :color="color"
        shift
        class="d-block d-sm-none d-flex justity-space-around"
      >
        <v-btn
          v-for="link in buttomLinks"
          :key="link.name"
          @click="goto(link.name, link.route)"
        >
          <span :class="`${activePage === link.name ? activeColor(link.name) : ''}--text`">{{ link.name }}</span>
          <v-icon :color="activePage === link.name ? activeColor(link.name) : ''">
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import PAlert from '~/components/other/pAlert.vue'
import PLoading from '~/components/other/pLoading.vue'

export default {
  components: { PAlert, PLoading },
  data: () => ({
    tab: null,
    messages: 2,
    drawer: true,
    mini: true,
    permanent: true,
    color: 'secondary',

    sideLinks: [
      { name: 'Home', route: '/dashboard/home', icon: 'mdi-home-variant' },
      {
        name: 'My Wallet',
        route: '/dashboard/wallet',
        icon: 'mdi-wallet'
      },
      {
        name: 'Savings',
        route: '/dashboard/savings',
        icon: 'mdi-piggy-bank'
      },
      {
        name: 'Investments',
        route: '/dashboard/investments',
        icon: 'mdi-finance'
      },

      {
        name: 'Account',
        route: '/dashboard/account',
        icon: 'mdi-account'
      }

    ],
    buttomLinks: [
      { name: 'Home', route: '/dashboard/home', icon: 'mdi-home-variant' },
      {
        name: 'My Wallet',
        route: '/dashboard/wallet',
        icon: 'mdi-wallet'
      },
      {
        name: 'Savings',
        route: '/dashboard/savings',
        icon: 'mdi-piggy-bank'
      },
      {
        name: 'Investments',
        route: '/dashboard/investments',
        icon: 'mdi-finance'
      }
    ]
  }),

  head () {
    return {

      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Karla:wght@200;300;500;700;800&family=Open+Sans:wght@300;400;600&display=swap'
        },
        {
          rel: 'stylesheet',
          href:
            'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
        },
        {
          rel: 'stylesheet',
          href:
            'https://use.fontawesome.com/releases/v5.15.1/css/all.css'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({ user: 'authentication/getUser', activePage: 'controller/getActivePage', sideBar: 'controller/getSideBar' })

  },
  created () {
    this.$store.dispatch('authentication/handleAuth')
    if (this.$vuetify.breakpoint.xsOnly) {
      this.drawer = false
    }
  },
  methods: {
    ...mapMutations({ setActivePage: 'controller/setActivePage' }),
    ...mapActions({ initAlert: 'controller/initAlert' }),
    switchPage (page) {
      this.setActivePage(page)
    },
    goto (page, to) {
      this.$router.push(to)
      this.setActivePage(page)
    },
    activeColor (page) {
      const pages = {
        home: 'secondary',
        account: 'secondary',
        'my wallet': 'secondary',
        savings: 'success',
        investments: 'black'
      }
      page = page.toLowerCase()
      return pages[page]
    },

    logout () {
      this.$store.dispatch('authentication/logoutUser')
    },
    onidle () {
      // this.logout()
      this.initAlert({
        is: true,
        type: 'info',
        timer: 0,
        message: 'You have been logged out'
      })
    },
    onremind (time) {
      console.log(time)
      // this.initAlert({
      //   is: true,
      //   persistence: true,
      //   timer: time,
      //   type: 'info',
      //   message: 'Due to inactivity you will be logged out in'
      // })
    }
  }
}
</script>

<style scoped>
.logo.v-btn:before {
  background-color: transparent;
}

.relative {
  position:relative;
}
.absolute {
  width:100vw;
  position:absolute;
  z-index: 99;
  top:0;
  left:0
}

.karla {
font-family: 'Karla', sans-serif;
}
.openSans {
font-family: 'Open Sans', sans-serif;
}
.dmSans {
  font-family: 'DM Sans', sans-serif;
}

@media only screen and (max-width: 600px) {

}
</style>
