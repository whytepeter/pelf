<template>
  <v-container>
    <v-row style="height:100hv" align="center" justify="center" class="py-10 my-5">
      <v-col cols="12">
        <v-img height="70" contain src="/logo/brass&books.png" class="" />
      </v-col>

      <v-col cols="12" class="mx-auto d-flex justify-center">
        <keep-alive>
          <component :is="registerForm" :update="update" :set-form="setForm" />
        </keep-alive>
      </v-col>

      <!-- <v-col cols="12" class="py-2 text-center">
        <v-btn depressed color="white primary--text" class="rounded mx-1" @click="currentForm = 'Start'">
          Start
        </v-btn>
        <v-btn depressed color="white primary--text" class="rounded mx-1" @click="currentForm = 'Personal'">
          Personal
        </v-btn>
        <v-btn depressed color="white primary--text" class="rounded mx-1" @click="currentForm = 'Security'">
          Security
        </v-btn>
        <v-btn depressed color="white primary--text" class="rounded mx-1" @click="currentForm = 'Otp'">
          OTP
        </v-btn>
        <v-btn depressed color="white primary--text" class="rounded mx-1" @click="currentForm = 'Notify'">
          Notify
        </v-btn>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import Personal from '~/components/register/personal'
import Start from '~/components/register/start'
import Security from '~/components/register/security'
import Otp from '~/components/register/otp'
import Notify from '~/components/other/pNotify.vue'

export default {
  components: { Start, Personal, Security, Otp, Notify },
  layout: 'welcome',

  computed: {
    ...mapGetters({
      loading: 'authentication/getLoading',
      registerForm: 'authentication/getRegisterForm'
    })

  },

  methods: {
    ...mapMutations({ setState: 'authentication/setState', setRegistration: 'authentication/setRegistration' }),
    ...mapActions({ loginUser: 'authentication/loginUser' }),
    update (type, value) {
      this.setRegistration({ type, value })
    },
    setForm (value) {
      this.setState({ type: 'registerForm', value })
    }
  }

}
</script>

<style>

</style>
